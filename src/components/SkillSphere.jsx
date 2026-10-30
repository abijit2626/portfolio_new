import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { skills } from '../data'

const COLORS = ['#8ec5ff', '#eaf2ff', '#ffc86b']
const RADIUS = 3.3

function fibonacciSphere(n, r) {
  const pts = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const rad = Math.sqrt(1 - y * y)
    const theta = golden * i
    pts.push(new THREE.Vector3(Math.cos(theta) * rad * r, y * r, Math.sin(theta) * rad * r))
  }
  return pts
}

// A word drawn onto a canvas texture and shown as a sprite, fading with depth.
function Word({ text, position, color }) {
  const sprite = useRef()
  const world = useMemo(() => new THREE.Vector3(), [])
  const { canvas, texture } = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 128
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return { canvas: c, texture: t }
  }, [])

  useEffect(() => {
    const draw = () => {
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, 512, 128)
      ctx.font = '600 54px "Space Grotesk", sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.shadowColor = color
      ctx.shadowBlur = 20
      ctx.fillStyle = color
      ctx.fillText(text, 256, 64)
      texture.needsUpdate = true
    }
    draw()
    document.fonts?.ready.then(draw)
  }, [canvas, texture, text, color])

  useFrame(() => {
    sprite.current.getWorldPosition(world)
    sprite.current.material.opacity = THREE.MathUtils.mapLinear(world.z, -RADIUS, RADIUS, 0.12, 1)
  })

  return (
    <sprite ref={sprite} position={position} scale={[2.3, 0.575, 1]}>
      <spriteMaterial map={texture} transparent depthTest={false} />
    </sprite>
  )
}

function Globe() {
  const group = useRef()
  const points = useMemo(() => fibonacciSphere(skills.length, RADIUS), [])

  useFrame((state, dt) => {
    const g = group.current
    g.rotation.y += dt * (0.22 + state.pointer.x * 0.5)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.45, 3, dt)
  })

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[RADIUS * 0.96, 2]} />
        <meshBasicMaterial color="#8ec5ff" wireframe transparent opacity={0.1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color="#ffc86b" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshBasicMaterial color="#ffc86b" transparent opacity={0.12} />
      </mesh>
      {skills.map((s, i) => (
        <Word key={s.name} text={s.name} position={points[i]} color={COLORS[i % COLORS.length]} />
      ))}
    </group>
  )
}

export default function SkillSphere() {
  return (
    <div className="sphere" role="img" aria-label="Rotating 3D globe of skills and tools">
      <Canvas camera={{ position: [0, 0, 9.5], fov: 45 }} dpr={[1, 1.75]} gl={{ alpha: true }}>
        <Globe />
      </Canvas>
    </div>
  )
}
