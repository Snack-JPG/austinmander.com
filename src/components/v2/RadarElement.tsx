"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { RadarFallback, isWebGLSupported } from "./RadarFallback";

const INEFFICIENCIES = [
  "Manual Data Entry",
  "Repetitive Emails",
  "Status Updates",
  "Report Compilation",
  "Client Onboarding",
  "Invoice Processing",
  "Proposal Writing",
  "Meeting Scheduling",
];

function RadarSweep() {
  const sweepRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const angle = elapsed * 0.8; // Slower rotation

    if (sweepRef.current) {
      sweepRef.current.rotation.z = angle;
    }
    if (trailRef.current) {
      trailRef.current.rotation.z = angle;
    }
  });

  return (
    <group position={[0, 0, 0.01]}>
      {/* Sweep line */}
      <mesh ref={sweepRef}>
        <planeGeometry args={[2.5, 0.02]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.9} />
      </mesh>

      {/* Trail effect */}
      <mesh ref={trailRef}>
        <circleGeometry args={[2.5, 64, 0, Math.PI / 4]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

interface DetectedLabelProps {
  text: string;
  angle: number;
  radius: number;
  delay: number;
}

function DetectedLabel({ text, angle, radius, delay }: DetectedLabelProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [visible, setVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const sweepAngle = (elapsed * 0.8) % (Math.PI * 2);
    const labelAngle = angle % (Math.PI * 2);
    const angleDiff = Math.abs(sweepAngle - labelAngle);

    // Show label when sweep passes it
    if (angleDiff < 0.3 || angleDiff > Math.PI * 2 - 0.3) {
      setVisible(true);
    }

    // Fade in/out cycle
    if (visible) {
      const timeSinceVisible = (elapsed - delay) % 8;
      if (timeSinceVisible < 2) {
        setOpacity(Math.min(timeSinceVisible / 0.5, 1));
      } else if (timeSinceVisible > 6) {
        setOpacity(Math.max(1 - (timeSinceVisible - 6) / 2, 0));
      } else {
        setOpacity(1);
      }
    }

    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angle) * radius;
      meshRef.current.position.y = Math.sin(angle) * radius;
    }
  });

  if (!visible || opacity < 0.01) return null;

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
      <group ref={meshRef}>
        {/* Glow point */}
        <mesh>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={opacity * 0.8} />
        </mesh>
        <mesh>
          <circleGeometry args={[0.12, 16]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={opacity * 0.3} />
        </mesh>

        {/* Label text */}
        <Text
          position={[0.2, 0, 0]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          fillOpacity={opacity}
        >
          {text}
        </Text>
      </group>
    </Float>
  );
}

function RadarGrid() {
  return (
    <group>
      {/* Concentric circles */}
      {[0.8, 1.4, 2.0, 2.5].map((radius, i) => (
        <mesh key={i} rotation={[0, 0, 0]}>
          <ringGeometry args={[radius - 0.01, radius, 64]} />
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={0.15 - i * 0.02}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Cross lines */}
      {[0, Math.PI / 4, Math.PI / 2, (Math.PI * 3) / 4].map((angle, i) => (
        <mesh key={`line-${i}`} rotation={[0, 0, angle]}>
          <planeGeometry args={[5, 0.005]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} />
        </mesh>
      ))}

      {/* Center glow */}
      <mesh>
        <circleGeometry args={[0.15, 32]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.25, 32]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function RadarScene() {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Subtle parallax effect
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mousePos.y * 0.1,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePos.x * 0.1,
        0.05
      );
    }
  });

  const labels = useMemo(() => {
    return INEFFICIENCIES.map((text, i) => ({
      text,
      angle: (i / INEFFICIENCIES.length) * Math.PI * 2,
      radius: 1.2 + Math.random() * 0.8,
      delay: i * 0.8,
    }));
  }, []);

  const scale = Math.min(viewport.width, viewport.height) / 6;

  return (
    <group ref={groupRef} scale={scale} rotation={[-0.3, 0, 0]}>
      <RadarGrid />
      <RadarSweep />
      {labels.map((label, i) => (
        <DetectedLabel key={i} {...label} />
      ))}
    </group>
  );
}

function WebGLRadar() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <RadarFallback />;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        // Check if context was created successfully
        if (!gl.getContext()) {
          setHasError(true);
        }
      }}
      fallback={<RadarFallback />}
    >
      <color attach="background" args={["#0a0a0f"]} />
      <ambientLight intensity={0.5} />
      <RadarScene />
    </Canvas>
  );
}

export default function RadarElement() {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setWebGLSupported(isWebGLSupported());
  }, []);

  // Show loading state during SSR/initial load
  if (webGLSupported === null) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20" />
      </div>
    );
  }

  // Show fallback if WebGL not supported
  if (!webGLSupported) {
    return <RadarFallback />;
  }

  // Show 3D radar
  return (
    <div className="h-full w-full">
      <WebGLRadar />
    </div>
  );
}
