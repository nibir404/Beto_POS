"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const GRAPHITE = "#5a5d66";
const GRAPHITE_DARK = "#43454c";
const ORANGE = "#ff7a1a";
const GREY_BAND = "#9a9ca3";

function Band({ y, r = 0.13, color = ORANGE }: { y: number; r?: number; color?: string }) {
  return (
    <mesh position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[r, 0.028, 12, 32]} />
      <meshStandardMaterial color={color} roughness={0.4} emissive={color === ORANGE ? ORANGE : "#000"} emissiveIntensity={color === ORANGE ? 0.25 : 0} />
    </mesh>
  );
}

function Limb({ length, radius = 0.11 }: { length: number; radius?: number }) {
  return (
    <mesh position={[0, -length / 2, 0]}>
      <capsuleGeometry args={[radius, length - radius * 2, 8, 16]} />
      <meshStandardMaterial color={GRAPHITE} roughness={0.55} metalness={0.15} />
    </mesh>
  );
}

function Hand() {
  return (
    <group>
      <mesh scale={[1.15, 0.7, 1]}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color={GRAPHITE_DARK} roughness={0.5} />
      </mesh>
      {[-0.09, -0.03, 0.03, 0.09].map((x) => (
        <mesh key={x} position={[x, -0.04, 0.13]} rotation={[0.4, 0, 0]}>
          <capsuleGeometry args={[0.03, 0.08, 6, 10]} />
          <meshStandardMaterial color={GRAPHITE_DARK} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Beto({ happy }: { happy: boolean }) {
  const head = useRef<THREE.Group>(null);
  const bar = useRef<THREE.Mesh>(null);
  const smile = useRef<THREE.Mesh>(null);
  const bulb = useRef<THREE.MeshStandardMaterial>(null);
  const legL = useRef<THREE.Group>(null);
  const legR = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const screenLight = useRef<THREE.PointLight>(null);

  const blinkAt = useRef(2);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const { pointer } = state;

    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, pointer.x * 0.55, 0.08);
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -pointer.y * 0.25 + Math.sin(t * 0.8) * 0.02, 0.08);
      head.current.rotation.z = THREE.MathUtils.lerp(head.current.rotation.z, -pointer.x * 0.08, 0.06);
    }
    if (body.current) body.current.position.y = Math.sin(t * 1.6) * 0.012;

    // Legs swing like someone sitting on a ledge.
    if (legL.current) legL.current.rotation.x = Math.sin(t * 1.8) * 0.28;
    if (legR.current) legR.current.rotation.x = Math.sin(t * 1.8 + Math.PI) * 0.28;

    // Blink the light bar every few seconds.
    if (bar.current) {
      const since = t - blinkAt.current;
      let s = 1;
      if (since > 0 && since < 0.16) s = Math.max(0.08, Math.abs(Math.cos((since / 0.16) * Math.PI)));
      if (since >= 0.16) blinkAt.current = t + 3 + Math.random() * 3;
      bar.current.scale.y = s;
      bar.current.visible = !happy;
    }
    if (smile.current) smile.current.visible = happy;

    if (bulb.current) bulb.current.emissiveIntensity = 1.6 + Math.sin(t * 3) * 0.8;
    if (screenLight.current) screenLight.current.intensity = 3.2 + Math.sin(t * 2.2) * 0.25 + (Math.random() > 0.985 ? -1.2 : 0);
    void dt;
  });

  const barGeo = useMemo(() => new THREE.CapsuleGeometry(0.055, 0.5, 6, 12), []);

  return (
    <group ref={body}>
      {/* Pelvis sitting on the ledge (y = 0) */}
      <RoundedBox args={[0.82, 0.32, 0.62]} radius={0.12} position={[0, 0.18, 0.05]}>
        <meshStandardMaterial color={GRAPHITE_DARK} roughness={0.6} />
      </RoundedBox>

      {/* Torso */}
      <RoundedBox args={[1.08, 0.98, 0.78]} radius={0.2} smoothness={5} position={[0, 0.86, 0]}>
        <meshStandardMaterial color={GRAPHITE} roughness={0.6} metalness={0.12} />
      </RoundedBox>

      {/* Neck */}
      <mesh position={[0, 1.44, 0]}>
        <cylinderGeometry args={[0.15, 0.17, 0.22, 24]} />
        <meshStandardMaterial color={GRAPHITE_DARK} roughness={0.5} />
      </mesh>
      <Band y={1.4} r={0.18} />
      <Band y={1.49} r={0.17} color={GREY_BAND} />

      {/* Head */}
      <group ref={head} position={[0, 1.55, 0]}>
        <RoundedBox args={[1.78, 1.36, 1.2]} radius={0.32} smoothness={6} position={[0, 0.7, 0]}>
          <meshStandardMaterial color={GRAPHITE} roughness={0.62} metalness={0.1} />
        </RoundedBox>
        {/* Screen bezel + glowing glass */}
        <RoundedBox args={[1.42, 0.98, 0.08]} radius={0.2} position={[0, 0.72, 0.58]}>
          <meshStandardMaterial color="#1b1410" roughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[1.3, 0.86, 0.06]} radius={0.18} position={[0, 0.72, 0.61]}>
          <meshPhysicalMaterial color={ORANGE} emissive="#ff5a00" emissiveIntensity={1.15} roughness={0.08} clearcoat={1} clearcoatRoughness={0.05} />
        </RoundedBox>
        <mesh ref={bar} geometry={barGeo} position={[0, 0.74, 0.66]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#fff6e8" emissive="#fff1d6" emissiveIntensity={2.4} />
        </mesh>
        <mesh ref={smile} position={[0, 0.82, 0.66]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.28, 0.05, 10, 32, Math.PI]} />
          <meshStandardMaterial color="#fff6e8" emissive="#fff1d6" emissiveIntensity={2.4} />
        </mesh>
        <pointLight ref={screenLight} position={[0, 0.72, 1.2]} color="#ff8a3d" intensity={3.2} distance={4} />

        {/* Antenna */}
        <mesh position={[0.1, 1.55, 0]}>
          <cylinderGeometry args={[0.025, 0.035, 0.42, 12]} />
          <meshStandardMaterial color={GRAPHITE_DARK} />
        </mesh>
        <mesh position={[0.1, 1.8, 0]}>
          <sphereGeometry args={[0.085, 24, 24]} />
          <meshStandardMaterial ref={bulb} color="#ffc23d" emissive="#ffae2a" emissiveIntensity={1.6} />
        </mesh>
      </group>

      {/* Arms: shoulders out, hands resting on the ledge */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.66, 1.18, 0.02]} rotation={[0.1, 0, side * 0.5]}>
          <mesh>
            <sphereGeometry args={[0.17, 24, 24]} />
            <meshStandardMaterial color={GRAPHITE} roughness={0.55} />
          </mesh>
          <Limb length={0.48} />
          <Band y={-0.26} />
          <group position={[0, -0.48, 0]} rotation={[0, 0, -side * 0.15]}>
            <Limb length={0.4} radius={0.12} />
            <Band y={-0.16} r={0.14} />
            <Band y={-0.24} r={0.14} color={GREY_BAND} />
            <group position={[0, -0.46, 0.04]}>
              <Hand />
            </group>
          </group>
        </group>
      ))}

      {/* Legs: thighs forward on the ledge, shins dangling over the edge */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.24, 0.12, 0.22]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <Limb length={0.5} radius={0.11} />
          </group>
          <group ref={side < 0 ? legL : legR} position={[0, 0, 0.5]}>
            <mesh>
              <sphereGeometry args={[0.13, 20, 20]} />
              <meshStandardMaterial color={GRAPHITE_DARK} />
            </mesh>
            <Limb length={0.5} radius={0.1} />
            <Band y={-0.12} r={0.12} />
            <Band y={-0.38} r={0.12} color={GREY_BAND} />
            <RoundedBox args={[0.42, 0.3, 0.58]} radius={0.13} position={[0, -0.64, 0.08]}>
              <meshStandardMaterial color={GRAPHITE_DARK} roughness={0.45} metalness={0.1} />
            </RoundedBox>
          </group>
        </group>
      ))}
    </group>
  );
}

function CameraRig() {
  const camera = useThree((s) => s.camera);
  useFrame(() => camera.lookAt(0, 1.05, 0));
  return null;
}

export default function Beto3D({ className }: { className?: string }) {
  const [happy, setHappy] = useState(false);
  return (
    <div
      className={className}
      onPointerEnter={() => setHappy(true)}
      onPointerLeave={() => setHappy(false)}
      aria-label="Beto, the Beto POS mascot, sitting on the console"
      role="img"
    >
      <Canvas dpr={[1, 2]} camera={{ position: [0, 2.6, 9], fov: 30 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.7} />
        <CameraRig />
        <directionalLight position={[0, 2, 6]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[3, 5, 4]} intensity={2.4} color="#fff3e6" />
        <directionalLight position={[-4, 2, -3]} intensity={1.2} color="#ff9a52" />
        <Environment resolution={128}>
          <Lightformer intensity={1.4} position={[0, 4, 3]} scale={[6, 2, 1]} color="#fff0e0" />
          <Lightformer intensity={0.8} position={[-4, 1, 2]} scale={[2, 4, 1]} color="#ff9a52" />
          <Lightformer intensity={0.5} position={[4, 1, -2]} scale={[2, 4, 1]} color="#ffffff" />
        </Environment>
        <group position={[0, 0, 0]} scale={0.95}>
          <Beto happy={happy} />
        </group>
      </Canvas>
    </div>
  );
}
