import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const HollowCylinder = ({ innerRadius, outerRadius, depth, color, metalness, roughness, segments = 48, ...props }) => {
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        s.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
        const hole = new THREE.Path();
        hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
        s.holes.push(hole);
        return s;
    }, [innerRadius, outerRadius]);

    const extrudeSettings = useMemo(() => ({
        depth: depth,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.05,
        bevelThickness: 0.05,
        curveSegments: segments,
    }), [depth, segments]);

    return (
        <mesh {...props}>
            <extrudeGeometry args={[shape, extrudeSettings]} />
            <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} envMapIntensity={1.5} />
        </mesh>
    );
};

const Bolts = () => {
    const bolts = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const radius = 3.05;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        bolts.push(
            <mesh key={i} position={[x, y, -0.4]} rotation={[0, 0, angle]}>
                <cylinderGeometry args={[0.08, 0.08, 0.8, 16]} />
                <meshStandardMaterial color="#111823" metalness={0.9} roughness={0.3} />
            </mesh>
        );
    }
    return <group rotation={[Math.PI / 2, 0, 0]}>{bolts}</group>;
}

const BearingAssembly = () => {
    const groupRef = useRef();
    const scrollYRef = useRef(0);

    useEffect(() => {
        const onScroll = () => { scrollYRef.current = window.scrollY; };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useFrame((state, delta) => {
        const scrollY = scrollYRef.current;
        // Effect over the first 800px of scroll
        const progress = Math.min(scrollY / 800, 1);

        // Eased progress for smoother feeling
        const ease = 1 - Math.pow(1 - progress, 3);

        // Initial hero view: gracefully hovering around text
        // Target view: shrunk, rotated horizontally, moved down
        const targetRotX = THREE.MathUtils.lerp(0.3, Math.PI / 2.5, ease);
        const targetRotY = THREE.MathUtils.lerp(-0.4, Math.PI / 4, ease);
        const targetRotZ = THREE.MathUtils.lerp(0.1, 2.5, ease);

        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 4);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 4);
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, delta * 4);

        // Scaling dimension dramatically
        const targetScale = THREE.MathUtils.lerp(1.8, 0.25, ease);
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 4));

        // Move it down and away
        const targetY = THREE.MathUtils.lerp(0, -3, ease);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 4);

        const targetZ = THREE.MathUtils.lerp(-2, -8, ease);
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 4);
    });

    return (
        <group ref={groupRef}>
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
                <group position={[0, 0, 0]}>
                    {/* Outer Shell (Dark Industrial Steel) */}
                    <HollowCylinder position={[0, 0, -1]} innerRadius={2.0} outerRadius={2.8} depth={2} color="#162032" metalness={0.8} roughness={0.4} />

                    {/* Inner Babbitt Liner (Precision Silver/White Metal) */}
                    <HollowCylinder position={[0, 0, -1.01]} innerRadius={1.8} outerRadius={2.01} depth={2.02} color="#D1D5DB" metalness={1} roughness={0.1} />

                    {/* Center Flange Ring */}
                    <HollowCylinder position={[0, 0, -0.3]} innerRadius={2.8} outerRadius={3.3} depth={0.6} color="#0F172A" metalness={0.9} roughness={0.5} />

                    {/* Oil Groove detail inside liner */}
                    <HollowCylinder position={[0, 0, -0.1]} innerRadius={1.75} outerRadius={1.82} depth={0.2} color="#050B14" metalness={0.6} roughness={0.7} />

                    {/* Simulated Bolt details on Flange */}
                    <Bolts />
                </group>
            </Float>
        </group>
    );
};

const BearingScene = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none w-full h-full xl:ml-32">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} color="#FFFFFF" />
                <directionalLight position={[-10, 5, -10]} intensity={0.8} color="#F97316" />
                <directionalLight position={[0, -10, 5]} intensity={0.6} color="#38BDF8" />

                <Environment preset="studio" />
                <BearingAssembly />

                <ContactShadows resolution={256} scale={30} blur={2.5} opacity={0.6} far={15} color="#000000" position={[0, -5, 0]} />
            </Canvas>
        </div>
    );
};

export default BearingScene;
