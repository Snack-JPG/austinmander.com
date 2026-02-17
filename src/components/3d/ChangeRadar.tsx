"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { RadarScene } from "./ChangeRadar/RadarScene";
import { Suspense } from "react";

interface ChangeRadarProps {
    className?: string;
    theme?: any;
}

export function ChangeRadar({ className, theme }: ChangeRadarProps) {
    return (
        <div className={`relative w-full h-full ${className}`}>
            <Canvas
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <PerspectiveCamera makeDefault position={[5, 4, 7]} fov={45} />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />
                <Suspense fallback={null}>
                    <RadarScene theme={theme} />
                    <Environment preset="city" />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                </Suspense>
            </Canvas>

            {/* Optional: Add a gradient overlay if you want it to fade into the background smoothly */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-transparent via-transparent to-transparent" />
        </div>
    );
}
