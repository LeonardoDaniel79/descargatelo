import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HolographicCoreProps {
  accentColor?: string;
}

export const HolographicCore: React.FC<HolographicCoreProps> = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 380;
    const height = container.clientHeight || 380;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all rotating elements
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Central Icosahedron Wireframe with Glowing Nodes
    const icosaGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const icosaMesh = new THREE.Mesh(icosaGeo, wireMat);
    coreGroup.add(icosaMesh);

    // 2. Inner Pulsing Core Sphere
    const innerGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x7928ca,
      transparent: true,
      opacity: 0.5,
      wireframe: true,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // 3. Gyroscopic Orbital Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });

    const ringGeo1 = new THREE.TorusGeometry(1.7, 0.015, 16, 100);
    const ringGeo2 = new THREE.TorusGeometry(1.9, 0.015, 16, 100);
    const ringGeo3 = new THREE.TorusGeometry(2.1, 0.012, 16, 100);

    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);

    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    ring3.rotation.z = Math.PI / 6;

    coreGroup.add(ring1);
    coreGroup.add(ring2);
    coreGroup.add(ring3);

    // 4. Floating Holographic Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.3 + Math.random() * 0.9;
      const sinPhi = Math.sin(phi);
      particlePositions[i] = r * sinPhi * Math.cos(theta);
      particlePositions[i + 1] = r * sinPhi * Math.sin(theta);
      particlePositions[i + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f2fe,
      size: 0.04,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particlesMesh = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particlesMesh);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / height) * 2 - 1);

      targetRotationY = mouseX * 0.9;
      targetRotationX = -mouseY * 0.9;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 380;
      const newHeight = container.clientHeight || 380;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous Gyroscopic Rotations
      ring1.rotation.x += 0.008;
      ring1.rotation.y += 0.006;

      ring2.rotation.y -= 0.009;
      ring2.rotation.z += 0.007;

      ring3.rotation.x += 0.005;
      ring3.rotation.z -= 0.008;

      icosaMesh.rotation.y += 0.004;
      icosaMesh.rotation.x -= 0.003;

      // Pulsing effect
      const scale = 1 + Math.sin(elapsedTime * 2.5) * 0.04;
      innerCore.scale.set(scale, scale, scale);

      // Smooth inertia rotation following mouse
      coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.05;
      coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.05;

      // Slight global floating oscillation
      coreGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="holographic-core-wrapper">
      <div className="holo-glow-backdrop" />
      <div ref={mountRef} className="holo-canvas-mount" />

      {/* Futuristic Orbit Badge */}
      <div className="holo-status-pill">
        <span className="holo-pulse-point" />
        <span>NÚCLEO CUÁNTICO 3D ACTIVO</span>
      </div>

      <style>{`
        .holographic-core-wrapper {
          position: relative;
          width: 380px;
          height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
        }

        .holo-canvas-mount {
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 2;
          cursor: grab;
        }

        .holo-canvas-mount:active {
          cursor: grabbing;
        }

        .holo-glow-backdrop {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 242, 254, 0.35) 0%, rgba(121, 40, 202, 0.25) 45%, transparent 70%);
          filter: blur(50px);
          pointer-events: none;
          z-index: 1;
          animation: pulseGlow 3s infinite alternate;
        }

        .holo-status-pill {
          position: absolute;
          bottom: 10px;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.3rem 0.85rem;
          background: rgba(3, 7, 18, 0.85);
          border: 1px solid rgba(0, 242, 254, 0.35);
          border-radius: var(--radius-full);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--cyan-400);
          letter-spacing: 0.08em;
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
          z-index: 3;
          pointer-events: none;
        }

        .holo-pulse-point {
          width: 7px;
          height: 7px;
          background: var(--cyan-400);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--cyan-400);
          animation: pulseGlow 1.4s infinite;
        }

        @media (max-width: 992px) {
          .holographic-core-wrapper {
            width: 320px;
            height: 320px;
            margin-top: 1rem;
          }
        }
      `}</style>
    </div>
  );
};
