import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { scrollStore } from '../lib/scrollStore'

const ICE = '#8ec5ff'
const GOLD = '#ffc86b'
const WHITE = '#eaf2ff'
const damp = THREE.MathUtils.damp

// Particle field that slowly turns and tilts as the page scrolls.
function Stars({ count = 2600 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 32
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((_, dt) => {
    const p = scrollStore.progress
    ref.current.rotation.y += dt * 0.012
    ref.current.rotation.x = damp(ref.current.rotation.x, p * 0.9, 2, dt)
    ref.current.rotation.z = damp(ref.current.rotation.z, p * 0.6, 2, dt)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color={WHITE}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  )
}

// The hero object: distorted core, wireframe shell, gyroscope rings and orbiters.
// It glides between the left and right of the screen as you scroll.
function Core() {
  const group = useRef()
  const shell = useRef()
  const rings = [useRef(), useRef(), useRef()]
  const orbit = useRef()
  const { viewport, size } = useThree()
  const mobile = size.width < 800

  useFrame((state, dt) => {
    const p = scrollStore.progress
    const t = state.clock.elapsedTime
    const g = group.current

    // `hero` is 1 at the top of the page and eases to 0 just after it: the core starts as the
    // centrepiece, then shrinks and drifts to the edges so it never sits on top of the copy.
    const hero = 1 - THREE.MathUtils.smoothstep(p, 0, 0.06)
    const edge = viewport.width * 0.37 * Math.cos(p * Math.PI * 3)
    const tx = mobile ? 0 : THREE.MathUtils.lerp(edge, viewport.width * 0.27, hero)
    const ty = mobile ? -2.3 : Math.sin(p * Math.PI * 5) * 0.6 * (1 - hero)
    const tz = mobile ? -4 : THREE.MathUtils.lerp(-3.5 - Math.abs(Math.sin(p * Math.PI * 3)), -0.5, hero)
    const ts =
      (mobile ? 0.6 : THREE.MathUtils.lerp(0.5, 0.9, hero)) * (1 + 0.15 * Math.sin(p * Math.PI * 6))

    g.position.x = damp(g.position.x, tx, 3, dt)
    g.position.y = damp(g.position.y, ty, 3, dt)
    g.position.z = damp(g.position.z, tz, 3, dt)
    g.scale.setScalar(damp(g.scale.x, ts, 3, dt))
    g.rotation.y = damp(g.rotation.y, state.pointer.x * 0.7 + p * Math.PI * 4, 2.5, dt)
    g.rotation.x = damp(g.rotation.x, -state.pointer.y * 0.5 + Math.sin(t * 0.4) * 0.12, 2.5, dt)

    shell.current.rotation.y += dt * 0.25
    shell.current.rotation.x += dt * 0.12
    rings[0].current.rotation.x += dt * 0.5
    rings[1].current.rotation.y += dt * 0.38
    rings[2].current.rotation.z -= dt * 0.3
    orbit.current.rotation.y += dt * 0.6
    orbit.current.rotation.z += dt * 0.15
  })

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.05, 64, 64]} />
        <MeshDistortMaterial
          color="#bcd9ff"
          emissive={ICE}
          emissiveIntensity={0.28}
          metalness={0.9}
          roughness={0.16}
          distort={0.42}
          speed={2}
        />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.75, 1]} />
        <meshBasicMaterial color={ICE} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh ref={rings[0]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.35, 0.014, 16, 220]} />
        <meshBasicMaterial color={GOLD} />
      </mesh>
      <mesh ref={rings[1]} rotation={[0, Math.PI / 4, Math.PI / 5]}>
        <torusGeometry args={[2.75, 0.012, 16, 220]} />
        <meshBasicMaterial color={ICE} />
      </mesh>
      <mesh ref={rings[2]} rotation={[Math.PI / 2.4, Math.PI / 6, 0]}>
        <torusGeometry args={[3.15, 0.01, 16, 220]} />
        <meshBasicMaterial color={WHITE} transparent opacity={0.7} />
      </mesh>
      <group ref={orbit}>
        {Array.from({ length: 7 }).map((_, i) => {
          const a = (i / 7) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * 3.3, Math.sin(a * 2) * 0.8, Math.sin(a) * 3.3]}>
              <octahedronGeometry args={[0.13, 0]} />
              <meshStandardMaterial
                color={i % 2 ? GOLD : ICE}
                emissive={i % 2 ? GOLD : ICE}
                emissiveIntensity={1.2}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

// Shapes spread down the page that drift past at their own depth (parallax).
function Drifters() {
  const group = useRef()
  const { viewport } = useThree()
  const COUNT = 16
  const GAP = 2.8
  const items = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        kind: i % 4,
        x: (i % 2 ? 1 : -1) * (0.28 + Math.random() * 0.2),
        y: -i * GAP - 2,
        z: -4 + Math.random() * 4.5,
        s: 0.35 + Math.random() * 0.5,
        color: [ICE, GOLD, WHITE][i % 3],
      })),
    [],
  )

  useFrame((_, dt) => {
    group.current.position.y = damp(group.current.position.y, scrollStore.progress * COUNT * GAP, 4, dt)
  })

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <Float key={i} speed={1.4} rotationIntensity={1.6} floatIntensity={1.6}>
          <mesh position={[it.x * viewport.width, it.y, it.z]} scale={it.s}>
            {it.kind === 0 && <octahedronGeometry args={[1, 0]} />}
            {it.kind === 1 && <torusKnotGeometry args={[0.7, 0.22, 90, 10]} />}
            {it.kind === 2 && <dodecahedronGeometry args={[1, 0]} />}
            {it.kind === 3 && <coneGeometry args={[0.9, 1.6, 5]} />}
            <meshStandardMaterial
              color={it.color}
              wireframe={i % 2 === 0}
              metalness={0.8}
              roughness={0.25}
              emissive={it.color}
              emissiveIntensity={0.18}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Two coloured lights that chase the pointer, so the metal catches ice and gold highlights.
function MouseLights() {
  const a = useRef()
  const b = useRef()
  useFrame((s) => {
    a.current.position.set(s.pointer.x * 7, s.pointer.y * 4, 4)
    b.current.position.set(-s.pointer.x * 6, -s.pointer.y * 3, 3)
  })
  return (
    <>
      <pointLight ref={a} color={ICE} intensity={90} distance={30} />
      <pointLight ref={b} color={GOLD} intensity={80} distance={30} />
    </>
  )
}

export default function Scene({ reduced }) {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        eventSource={document.getElementById('root')}
        eventPrefix="client"
        frameloop={reduced ? 'demand' : 'always'}
      >
        <fog attach="fog" args={['#07090f', 10, 38]} />
        <ambientLight intensity={0.5} />
        <MouseLights />
        <Stars />
        <Core />
        <Drifters />
      </Canvas>
    </div>
  )
}
