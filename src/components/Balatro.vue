<template>
  <div ref="containerRef" class="balatro-container" />
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
  import { Renderer, Program, Mesh, Triangle } from 'ogl'

  function hexToVec4(hex) {
    let hexStr = hex.replace('#', '')
    let r = 0,
      g = 0,
      b = 0,
      a = 1
    if (hexStr.length === 6) {
      r = parseInt(hexStr.slice(0, 2), 16) / 255
      g = parseInt(hexStr.slice(2, 4), 16) / 255
      b = parseInt(hexStr.slice(4, 6), 16) / 255
    } else if (hexStr.length === 8) {
      r = parseInt(hexStr.slice(0, 2), 16) / 255
      g = parseInt(hexStr.slice(2, 4), 16) / 255
      b = parseInt(hexStr.slice(4, 6), 16) / 255
      a = parseInt(hexStr.slice(6, 8), 16) / 255
    }
    return [r, g, b, a]
  }

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

#define PI 3.14159265359

uniform float iTime;
uniform vec3 iResolution;
uniform float uSpinRotation;
uniform float uSpinSpeed;
uniform vec2 uOffset;
uniform vec4 uColor1;
uniform vec4 uColor2;
uniform vec4 uColor3;
uniform float uContrast;
uniform float uLighting;
uniform float uSpinAmount;
uniform float uPixelFilter;
uniform float uSpinEase;
uniform bool uIsRotate;
uniform vec2 uMouse;

varying vec2 vUv;

vec4 effect(vec2 screenSize, vec2 screen_coords) {
    float pixel_size = length(screenSize.xy) / uPixelFilter;
    vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size - 0.5 * screenSize.xy) / length(screenSize.xy) - uOffset;
    float uv_len = length(uv);
    
    float speed = (uSpinRotation * uSpinEase * 0.2);
    if(uIsRotate){
       speed = iTime * speed;
    }
    speed += 302.2;
    
    // Mouse influence for gentle rotation (applied additively)
    float mouseInfluence = (uMouse.x * 2.0 - 1.0);
    speed += mouseInfluence * 0.1;
    
    float new_pixel_angle = atan(uv.y, uv.x) + speed - uSpinEase * 20.0 * (uSpinAmount * uv_len + (1.0 - uSpinAmount));
    vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;
    uv = (vec2(uv_len * cos(new_pixel_angle) + mid.x, uv_len * sin(new_pixel_angle) + mid.y) - mid);
    
    uv *= 30.0;
    // Fix: Apply mouse influence additively rather than scaling with time.
    float baseSpeed = iTime * uSpinSpeed;
    speed = baseSpeed + mouseInfluence * 2.0;
    
    vec2 uv2 = vec2(uv.x + uv.y);
    
    for(int i = 0; i < 5; i++) {
        uv2 += sin(max(uv.x, uv.y)) + uv;
        uv += 0.5 * vec2(
            cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121),
            sin(uv2.x - 0.113 * speed)
        );
        uv -= cos(uv.x + uv.y) - sin(uv.x * 0.711 - uv.y);
    }
    
    float contrast_mod = (0.25 * uContrast + 0.5 * uSpinAmount + 1.2);
    float paint_res = min(2.0, max(0.0, length(uv) * 0.035 * contrast_mod));
    float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
    float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
    float c3p = 1.0 - min(1.0, c1p + c2p);
    float light = (uLighting - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + uLighting * max(c2p * 5.0 - 4.0, 0.0);
    
    return (0.3 / uContrast) * uColor1 + (1.0 - 0.3 / uContrast) * (uColor1 * c1p + uColor2 * c2p + vec4(c3p * uColor3.rgb, c3p * uColor1.a)) + light;
}

void main() {
    vec2 uv = vUv * iResolution.xy;
    gl_FragColor = effect(iResolution.xy, uv);
}
`

  const props = defineProps({
    spinRotation: { type: Number, default: -2.0 },
    spinSpeed: { type: Number, default: 7.0 },
    offset: { type: Array, default: () => [0.0, 0.0] },
    color1: { type: String, default: '#DE443B' },
    color2: { type: String, default: '#006BB4' },
    color3: { type: String, default: '#162325' },
    contrast: { type: Number, default: 3.5 },
    lighting: { type: Number, default: 0.4 },
    spinAmount: { type: Number, default: 0.25 },
    pixelFilter: { type: Number, default: 745.0 },
    spinEase: { type: Number, default: 1.0 },
    isRotate: { type: Boolean, default: false },
    mouseInteraction: { type: Boolean, default: true },
  })

  const containerRef = ref(null)
  let renderer, gl, program, mesh, animationFrameId

  const resize = () => {
    if (!renderer || !program) return
    renderer.setSize(containerRef.value.offsetWidth, containerRef.value.offsetHeight)
    program.uniforms.iResolution.value = [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height]
  }

  const handleMouseMove = (e) => {
    if (!props.mouseInteraction || !program) return
    const rect = containerRef.value.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = 1.0 - (e.clientY - rect.top) / rect.height
    program.uniforms.uMouse.value = [x, y]
  }

  const update = (time) => {
    animationFrameId = requestAnimationFrame(update)
    program.uniforms.iTime.value = time * 0.001
    renderer.render({ scene: mesh })
  }

  onMounted(() => {
    if (!containerRef.value) return

    renderer = new Renderer()
    gl = renderer.gl
    gl.clearColor(0, 0, 0, 1)

    const geometry = new Triangle(gl)
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: [0, 0, 0] },
        uSpinRotation: { value: props.spinRotation },
        uSpinSpeed: { value: props.spinSpeed },
        uOffset: { value: props.offset },
        uColor1: { value: hexToVec4(props.color1) },
        uColor2: { value: hexToVec4(props.color2) },
        uColor3: { value: hexToVec4(props.color3) },
        uContrast: { value: props.contrast },
        uLighting: { value: props.lighting },
        uSpinAmount: { value: props.spinAmount },
        uPixelFilter: { value: props.pixelFilter },
        uSpinEase: { value: props.spinEase },
        uIsRotate: { value: props.isRotate },
        uMouse: { value: [0.5, 0.5] },
      },
    })

    mesh = new Mesh(gl, { geometry, program })

    window.addEventListener('resize', resize)
    containerRef.value.addEventListener('mousemove', handleMouseMove)

    resize()
    animationFrameId = requestAnimationFrame(update)
    containerRef.value.appendChild(gl.canvas)
  })

  onBeforeUnmount(() => {
    if (!containerRef.value) return

    cancelAnimationFrame(animationFrameId)
    window.removeEventListener('resize', resize)
    containerRef.value.removeEventListener('mousemove', handleMouseMove)
    containerRef.value.removeChild(gl.canvas)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  })

  // Watch for prop changes
  watch(
    () => ({
      spinRotation: props.spinRotation,
      spinSpeed: props.spinSpeed,
      offset: props.offset,
      color1: props.color1,
      color2: props.color2,
      color3: props.color3,
      contrast: props.contrast,
      lighting: props.lighting,
      spinAmount: props.spinAmount,
      pixelFilter: props.pixelFilter,
      spinEase: props.spinEase,
      isRotate: props.isRotate,
    }),
    (newProps) => {
      if (!program) return

      program.uniforms.uSpinRotation.value = newProps.spinRotation
      program.uniforms.uSpinSpeed.value = newProps.spinSpeed
      program.uniforms.uOffset.value = newProps.offset
      program.uniforms.uColor1.value = hexToVec4(newProps.color1)
      program.uniforms.uColor2.value = hexToVec4(newProps.color2)
      program.uniforms.uColor3.value = hexToVec4(newProps.color3)
      program.uniforms.uContrast.value = newProps.contrast
      program.uniforms.uLighting.value = newProps.lighting
      program.uniforms.uSpinAmount.value = newProps.spinAmount
      program.uniforms.uPixelFilter.value = newProps.pixelFilter
      program.uniforms.uSpinEase.value = newProps.spinEase
      program.uniforms.uIsRotate.value = newProps.isRotate
    },
    { deep: true }
  )
</script>

<style>
  .balatro-container {
    width: 100%;
    height: 100%;
  }
</style>
