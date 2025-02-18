<template>
  <div ref="ctnRef" class="iridescence-container" v-bind="$attrs" />
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
  import { Renderer, Program, Mesh, Color, Triangle } from 'ogl'

  const props = defineProps({
    color: {
      type: Array,
      default: () => [1, 1, 1],
    },
    speed: {
      type: Number,
      default: 1.0,
    },
    amplitude: {
      type: Number,
      default: 0.1,
    },
    mouseReact: {
      type: Boolean,
      default: true,
    },
  })

  const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`

  const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  // Add a subtle offset based on the mouse position
  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`

  const ctnRef = ref(null)
  const mousePos = ref({ x: 0.5, y: 0.5 })
  let renderer, gl, program, mesh, animateId

  const resize = () => {
    const ctn = ctnRef.value
    const scale = 1
    renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale)
    if (program) {
      program.uniforms.uResolution.value = new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
    }
  }

  onMounted(() => {
    if (!ctnRef.value) return
    const ctn = ctnRef.value
    renderer = new Renderer()
    gl = renderer.gl
    gl.clearColor(1, 1, 1, 1)
    window.addEventListener('resize', resize, false)
    resize()
    const geometry = new Triangle(gl)
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(...props.color) },
        uResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height),
        },
        uMouse: { value: new Float32Array([mousePos.value.x, mousePos.value.y]) },
        uAmplitude: { value: props.amplitude },
        uSpeed: { value: props.speed },
      },
    })

    mesh = new Mesh(gl, { geometry, program })

    const update = (t) => {
      animateId = requestAnimationFrame(update)
      program.uniforms.uTime.value = t * 0.001
      renderer.render({ scene: mesh })
    }

    animateId = requestAnimationFrame(update)
    ctn.appendChild(gl.canvas)

    const handleMouseMove = (e) => {
      const rect = ctn.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = 1.0 - (e.clientY - rect.top) / rect.height
      mousePos.value = { x, y }
      program.uniforms.uMouse.value[0] = x
      program.uniforms.uMouse.value[1] = y
    }

    if (props.mouseReact) {
      ctn.addEventListener('mousemove', handleMouseMove)
    }
  })

  onBeforeUnmount(() => {
    if (!ctnRef.value || !gl) return
    cancelAnimationFrame(animateId)
    window.removeEventListener('resize', resize)
    if (props.mouseReact) {
      ctnRef.value.removeEventListener('mousemove', handleMouseMove)
    }
    ctnRef.value.removeChild(gl.canvas)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  })

  // Watch for props changes
  watch([() => props.color, () => props.speed, () => props.amplitude], ([newColor, newSpeed, newAmplitude]) => {
    if (program) {
      program.uniforms.uColor.value = new Color(...newColor)
      program.uniforms.uSpeed.value = newSpeed
      program.uniforms.uAmplitude.value = newAmplitude
    }
  })
</script>

<style>
  .iridescence-container {
    width: 100%;
    height: 100%;
  }
</style>
