<template>
  <div ref="ctnRef" class="aurora-container" />
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
  import { Renderer, Program, Mesh, Color, Triangle } from 'ogl'

  const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

  const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;

out vec4 fragColor;

vec3 permute(vec3 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
    const vec4 C = vec4(
        0.211324865405187, 0.366025403784439,
        -0.577350269189626, 0.024390243902439
    );
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);

    vec3 p = permute(
        permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0)
    );

    vec3 m = max(
        0.5 - vec3(
            dot(x0, x0),
            dot(x12.xy, x12.xy),
            dot(x12.zw, x12.zw)
        ), 
        0.0
    );
    m = m * m;
    m = m * m;

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

struct ColorStop {
    vec3 color;
    float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
    int index = 0;                                            \
    for (int i = 0; i < 2; i++) {                               \
       ColorStop currentColor = colors[i];                    \
       bool isInBetween = currentColor.position <= factor;    \
       index = int(mix(float(index), float(i), float(isInBetween))); \
    }                                                         \
    ColorStop currentColor = colors[index];                   \
    ColorStop nextColor = colors[index + 1];                  \
    float range = nextColor.position - currentColor.position; \
    float lerpFactor = (factor - currentColor.position) / range; \
    finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
    // Compute UVs from gl_FragCoord
    vec2 uv = gl_FragCoord.xy / uResolution;
    
    // Build our three color stops from uniform array uColorStops
    ColorStop colors[3];
    colors[0] = ColorStop(uColorStops[0], 0.0);
    colors[1] = ColorStop(uColorStops[1], 0.5);
    colors[2] = ColorStop(uColorStops[2], 1.0);

    // Interpolate color along uv.x
    vec3 rampColor;
    COLOR_RAMP(colors, uv.x, rampColor);

    // Noise-based "height," scaled by amplitude
    float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) 
                   * 0.5 
                   * uAmplitude;
    height = exp(height);
    height = (uv.y * 2.0 - height + 0.2);

    fragColor.rgb = 0.6 * height * rampColor;
    fragColor.a = 1.0;
}
`

  const props = defineProps({
    colorStops: { type: Array, default: () => ['#00d8ff', '#7cff67', '#00d8ff'] },
    amplitude: {
      type: Number,
      default: 1.0,
    },
    time: Number,
    speed: {
      type: Number,
      default: 1.0,
    },
  })

  const ctnRef = ref(null)
  let renderer, gl, program, mesh, animateId
  const resize = () => {
    const ctn = ctnRef.value
    const width = ctn.offsetWidth
    const height = ctn.offsetHeight
    renderer.setSize(width, height)
    if (program) {
      program.uniforms.uResolution.value = [width, height]
    }
  }
  onMounted(() => {
    const ctn = ctnRef.value
    if (!ctn) return
    renderer = new Renderer()
    gl = renderer.gl
    gl.clearColor(1, 1, 1, 1)
    window.addEventListener('resize', resize)
    const geometry = new Triangle(gl)
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv
    }
    const colorStopsArray = props.colorStops.map((hex) => {
      const c = new Color(hex)
      return [c.r, c.g, c.b]
    })
    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: props.amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
      },
    })
    mesh = new Mesh(gl, { geometry, program })
    ctn.appendChild(gl.canvas)
    const update = (t) => {
      animateId = requestAnimationFrame(update)
      program.uniforms.uTime.value = (props.time ?? t * 0.01) * props.speed * 0.1
      program.uniforms.uAmplitude.value = props.amplitude
      program.uniforms.uColorStops.value = props.colorStops.map((hex) => {
        const c = new Color(hex)
        return [c.r, c.g, c.b]
      })
      renderer.render({ scene: mesh })
    }
    animateId = requestAnimationFrame(update)
    resize()
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(animateId)
    window.removeEventListener('resize', resize)
    if (ctnRef.value && gl.canvas.parentNode === ctnRef.value) {
      ctnRef.value.removeChild(gl.canvas)
    }
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  })

  // Watch for props changes
  watch(
    () => props.amplitude,
    (newVal) => {
      if (program) {
        program.uniforms.uAmplitude.value = newVal
      }
    }
  )
  watch(
    () => props.colorStops,
    (newVal) => {
      if (program) {
        program.uniforms.uColorStops.value = newVal.map((hex) => {
          const c = new Color(hex)
          return [c.r, c.g, c.b]
        })
      }
    },
    { deep: true }
  )
</script>

<style>
  .aurora-container {
    width: 100%;
    height: 100%;
  }
</style>
