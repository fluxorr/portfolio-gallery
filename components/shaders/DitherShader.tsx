"use client"

import { useEffect, useRef } from "react"
import { Color } from "three"

type DitherShaderProps = {
    className?: string
    gridSize?: number
    scale?: number
    color?: string | [number, number, number]
    bgColor?: string | [number, number, number]
}

const vertexShader = `
attribute vec2 position;

void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragmentShader = `
precision highp float;

uniform vec2 iResolution;
uniform float iTime;

uniform float uGridSize;
uniform float uScale;
uniform vec3 uColor;
uniform vec3 uBgColor;

float Bayer2(vec2 a) {
    a = floor(a);
    return fract(a.x / 2.0 + a.y * a.y * 0.75);
}

float Bayer32(vec2 a) {
    float value = 0.0;
    float scale = 1.0;
    vec2 pos = a;

    for (int i = 0; i < 5; ++i) {
        value += Bayer2(pos) * scale;
        scale *= 0.25;
        pos *= 0.5;
    }

    return value;
}

float f(float n) {
    float s = sin(n);
    return s * s * uGridSize;
}

void main() {
    vec2 fragCoord = gl_FragCoord.xy;

    vec2 uv = fragCoord / iResolution.xy;

    vec2 wave = vec2(
        sin(uv.y * 8.0 + iTime * 1.2),
        cos(uv.x * 10.0 + iTime * 0.9)
    );

    uv += wave * 0.03;

    vec2 pos = uv * uGridSize;

    float x = pos.y;
    float y = pos.x;

    float a = 3.0;

    float s = sin(iTime / 4.0);

    float timeFactor0 = f(0.0 + s);
    float timeFactor1 = f(1.0 + s);
    float timeFactor2 = f(2.0 + s);

    a += sin(
        2.0 * atan(
            (x - 62.0) /
            (y - timeFactor0 + 0.0001)
        )
    );

    a += sin(
        2.0 * atan(
            (y - 71.0) /
            (y - timeFactor1 + 0.0001)
        )
    );

    a += sin(
        2.0 * atan(
            (x - 80.0) /
            (x - timeFactor2 + 0.0001)
        )
    );

    float plasma = sin(a - iTime);
    plasma = plasma * plasma;

    vec3 col = mix(uBgColor, uColor, plasma);

    float m = Bayer32(fragCoord * uScale);

    vec3 d = step(vec3(m), col);

    gl_FragColor = vec4(d, 1.0);
}
`

function createShader(
    gl: WebGLRenderingContext,
    type: number,
    source: string
) {
    const shader = gl.createShader(type)

    if (!shader) return null

    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
    }

    return shader
}

export default function DitherShader({
    className,
    gridSize = 150,
    scale = 0.5,
    color = "#ffffff",
    bgColor = "#000000",
}: DitherShaderProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const resolveColor = (value: string | [number, number, number]) => {
        if (Array.isArray(value)) {
            const [r, g, b] = value
            const maxChannel = Math.max(r, g, b)

            if (maxChannel > 1) {
                return [r / 255, g / 255, b / 255]
            }

            return value
        }

        return new Color(value).toArray()
    }

    useEffect(() => {
        const canvas = canvasRef.current

        if (!canvas) return

        const gl = canvas.getContext("webgl", {
            antialias: false,
            alpha: false,
            depth: false,
            stencil: false,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
        })

        if (!gl) return

        const vertex = createShader(
            gl,
            gl.VERTEX_SHADER,
            vertexShader
        )

        const fragment = createShader(
            gl,
            gl.FRAGMENT_SHADER,
            fragmentShader
        )

        if (!vertex || !fragment) return

        const program = gl.createProgram()

        if (!program) return

        gl.attachShader(program, vertex)
        gl.attachShader(program, fragment)

        gl.linkProgram(program)

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program))
            return
        }

        gl.useProgram(program)

        const vertices = new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,

            -1, 1,
            1, -1,
            1, 1,
        ])

        const buffer = gl.createBuffer()

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

        const position = gl.getAttribLocation(program, "position")

        gl.enableVertexAttribArray(position)

        gl.vertexAttribPointer(
            position,
            2,
            gl.FLOAT,
            false,
            0,
            0
        )

        const iResolution = gl.getUniformLocation(
            program,
            "iResolution"
        )

        const iTime = gl.getUniformLocation(
            program,
            "iTime"
        )

        const uGridSize = gl.getUniformLocation(
            program,
            "uGridSize"
        )

        const uScale = gl.getUniformLocation(
            program,
            "uScale"
        )

        const uColor = gl.getUniformLocation(
            program,
            "uColor"
        )

        const uBgColor = gl.getUniformLocation(
            program,
            "uBgColor"
        )

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 1.5)

            const width = Math.floor(
                canvas.clientWidth * dpr
            )

            const height = Math.floor(
                canvas.clientHeight * dpr
            )

            canvas.width = width
            canvas.height = height

            gl.viewport(0, 0, width, height)
        }

        resize()

        window.addEventListener("resize", resize)

        let frame = 0

        const start = performance.now()

        const render = () => {
            const time =
                (performance.now() - start) * 0.001

            gl.uniform2f(
                iResolution,
                canvas.width,
                canvas.height
            )

            gl.uniform1f(iTime, time)

            gl.uniform1f(uGridSize, gridSize)

            gl.uniform1f(uScale, scale)

            const [r, g, b] = resolveColor(color)
            const [br, bg, bb] = resolveColor(bgColor)

            gl.uniform3f(uColor, r, g, b)
            gl.uniform3f(uBgColor, br, bg, bb)

            gl.drawArrays(gl.TRIANGLES, 0, 6)

            frame = requestAnimationFrame(render)
        }

        render()

        return () => {
            cancelAnimationFrame(frame)

            window.removeEventListener(
                "resize",
                resize
            )

            gl.deleteProgram(program)
            gl.deleteShader(vertex)
            gl.deleteShader(fragment)
            gl.deleteBuffer(buffer)
        }
    }, [gridSize, scale, color, bgColor])

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                width: "100%",
                height: "100%",
                display: "block",
            }}
        />
    )
}