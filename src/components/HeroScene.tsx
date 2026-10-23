import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export interface HeroSceneProps {
  className?: string;
  paused?: boolean;
}

/**
 * An interactive, kinetic 3D Gyroscopic Quantum Core sculpture.
 * Features a multi-layered wireframe icosahedron core, counter-rotating gimbal rings,
 * orbiting telemetry nodes, floating star dust, and tactile drag-to-rotate physics.
 */
export default function HeroScene({ className = '', paused = false }: HeroSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const syncRef = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
    syncRef.current?.();
  }, [paused]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;cursor:grab;touch-action:none;';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.set(0, 0, 7.5);

    const environment = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environmentTarget = pmrem.fromScene(environment, 0.04);
    scene.environment = environmentTarget.texture;
    environment.dispose();
    pmrem.dispose();

    // Main Group
    const artifact = new THREE.Group();
    scene.add(artifact);

    // 1. Core Polyhedron (Icosahedron)
    const coreGroup = new THREE.Group();
    artifact.add(coreGroup);

    const icosahedronGeo = new THREE.IcosahedronGeometry(1.2, 1);

    // Outer Wireframe Mesh
    const wireframeMat = new THREE.MeshPhysicalMaterial({
      color: 0xd94b27,
      wireframe: true,
      metalness: 0.6,
      roughness: 0.25,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.5,
    });
    const coreWireframe = new THREE.Mesh(icosahedronGeo, wireframeMat);
    coreGroup.add(coreWireframe);

    // Inner Faceted Core with glass sheen
    const innerGeo = new THREE.IcosahedronGeometry(0.85, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x242620,
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 1,
      reflectivity: 0.9,
    });
    const coreInner = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(coreInner);

    // Glowing Vertex Nodes on Core
    const vertexMat = new THREE.PointsMaterial({
      color: 0xff7a45,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const vertexNodes = new THREE.Points(icosahedronGeo, vertexMat);
    coreGroup.add(vertexNodes);

    // 2. Gimbal Rings (Gyroscope)
    const ringMatAccent = new THREE.MeshPhysicalMaterial({
      color: 0xd94b27,
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 1,
    });
    const ringMatMuted = new THREE.MeshBasicMaterial({
      color: 0x8b9082,
      transparent: true,
      opacity: 0.35,
    });

    // Ring 1 (Equatorial / Yaw)
    const ring1Geo = new THREE.TorusGeometry(1.95, 0.012, 12, 160);
    const ring1 = new THREE.Mesh(ring1Geo, ringMatAccent);
    artifact.add(ring1);

    // Ring 2 (Pitch Gimbal)
    const ring2Geo = new THREE.TorusGeometry(2.2, 0.009, 10, 160);
    const ring2 = new THREE.Mesh(ring2Geo, ringMatMuted);
    ring2.rotation.x = Math.PI / 3;
    artifact.add(ring2);

    // Ring 3 (Roll Gimbal)
    const ring3Geo = new THREE.TorusGeometry(2.45, 0.008, 10, 160);
    const ring3 = new THREE.Mesh(ring3Geo, ringMatAccent);
    ring3.rotation.y = Math.PI / 4;
    ring3.rotation.z = Math.PI / 6;
    artifact.add(ring3);

    // Orbiting Satellite Nodes
    const satGeo = new THREE.SphereGeometry(0.11, 24, 20);
    const sat1 = new THREE.Mesh(satGeo, ringMatAccent);
    const sat2 = new THREE.Mesh(satGeo, innerMat);
    sat2.scale.setScalar(0.75);
    const sat3 = new THREE.Mesh(satGeo, ringMatAccent);
    sat3.scale.setScalar(0.6);
    artifact.add(sat1, sat2, sat3);

    // 3. Stardust Particle Nebula
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.9 + Math.random() * 2.1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xd94b27,
      size: 0.034,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(particleGeo, dustMat);
    artifact.add(dust);

    // Lighting
    scene.add(new THREE.HemisphereLight(0xffffff, 0x222520, 2.2));
    const key = new THREE.DirectionalLight(0xffffff, 4.5);
    key.position.set(4, 5, 5);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xff9f7d, 3.2);
    rim.position.set(-5, -2, 3);
    scene.add(rim);

    const backLight = new THREE.DirectionalLight(0xffffff, 2.5);
    backLight.position.set(0, 4, -4);
    scene.add(backLight);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = motionQuery.matches;
    let visible = true;
    let disposed = false;
    let elapsed = 0;
    let lastTime = 0;
    let pointerX = 0;
    let pointerY = 0;
    let scroll = window.scrollY;

    // Interactive Drag Physics
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragRotX = 0;
    let dragRotY = 0;
    let velX = 0;
    let velY = 0;

    const frame = (time: number) => {
      if (disposed) return;
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
      lastTime = time;
      if (!reduced && !pausedRef.current) elapsed += delta;

      // Handle drag inertia
      if (!isDragging) {
        dragRotX += velY;
        dragRotY += velX;
        velX *= 0.94;
        velY *= 0.94;
      }

      // Smooth rhythmic breathing pulse
      const pulseCycle = Math.sin(elapsed * 2.2);
      const pulseScale = 1 + pulseCycle * 0.075;
      coreGroup.scale.setScalar(pulseScale);
      dustMat.opacity = 0.42 + pulseCycle * 0.22;
      vertexMat.size = 0.08 + pulseCycle * 0.02;

      // Independent Gimbal and Core Rotations
      coreWireframe.rotation.y = elapsed * 0.28;
      coreWireframe.rotation.x = elapsed * 0.18;
      coreInner.rotation.y = -elapsed * 0.35;
      coreInner.rotation.z = elapsed * 0.22;

      ring1.rotation.z = elapsed * 0.16;
      ring2.rotation.y = -elapsed * 0.22;
      ring2.rotation.x = Math.PI / 3 + Math.sin(elapsed * 0.4) * 0.15;
      ring3.rotation.z = elapsed * 0.28;

      // Satellites orbiting the rings
      const t1 = elapsed * 0.65;
      sat1.position.set(Math.cos(t1) * 1.95, Math.sin(t1) * 1.95, 0);

      const t2 = -elapsed * 0.5 + 1.2;
      sat2.position.set(
        Math.cos(t2) * 2.2,
        Math.sin(t2) * Math.cos(ring2.rotation.x) * 2.2,
        Math.sin(t2) * Math.sin(ring2.rotation.x) * 2.2
      );

      const t3 = elapsed * 0.45 + 2.5;
      sat3.position.set(
        Math.cos(t3) * 2.45,
        Math.sin(t3) * 1.5,
        Math.sin(t3) * 1.8
      );

      dust.rotation.y = elapsed * 0.05;
      dust.rotation.x = elapsed * 0.03;

      // Pointer tilt + drag orientation
      const ease = reduced ? 1 : 1 - Math.exp(-delta * 3.2);
      const targetRotX = (reduced ? 0 : pointerY * 0.15 + scroll * 0.00014) + dragRotX;
      const targetRotY = (reduced ? 0 : pointerX * 0.25 + scroll * 0.00018) + dragRotY;

      artifact.rotation.x += (targetRotX - artifact.rotation.x) * ease;
      artifact.rotation.y += (targetRotY - artifact.rotation.y) * ease;
      artifact.position.y = Math.sin(elapsed * 0.8) * 0.07;

      renderer.render(scene, camera);
    };

    const syncAnimation = () => {
      lastTime = 0;
      const playing = visible && !document.hidden && !reduced && !pausedRef.current;
      renderer.setAnimationLoop(playing ? frame : null);
      if (visible && !document.hidden) frame(performance.now());
    };
    syncRef.current = syncAnimation;

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      camera.aspect = width / height;
      camera.position.z = camera.aspect < 0.9 ? 8.4 / camera.aspect : 7.5;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      if (visible && !document.hidden) frame(performance.now());
    };

    const pointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointerX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
      pointerY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1));

      if (isDragging) {
        const dx = event.clientX - dragStartX;
        const dy = event.clientY - dragStartY;
        dragStartX = event.clientX;
        dragStartY = event.clientY;

        const deltaRotX = dy * 0.007;
        const deltaRotY = dx * 0.007;

        dragRotX += deltaRotX;
        dragRotY += deltaRotY;

        velX = deltaRotY * 0.8;
        velY = deltaRotX * 0.8;
      }
    };

    const pointerDown = (event: PointerEvent) => {
      isDragging = true;
      setIsGrabbing(true);
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      velX = 0;
      velY = 0;
      if (renderer.domElement) renderer.domElement.style.cursor = 'grabbing';
    };

    const pointerUp = () => {
      if (isDragging) {
        isDragging = false;
        setIsGrabbing(false);
        if (renderer.domElement) renderer.domElement.style.cursor = 'grab';
      }
    };

    const pointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
      pointerUp();
    };

    const onScroll = () => {
      scroll = window.scrollY;
    };
    const onMotionChange = () => {
      reduced = motionQuery.matches;
      syncAnimation();
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      renderer.setAnimationLoop(null);
      setReady(false);
    };
    const onContextRestored = () => {
      setReady(true);
      syncAnimation();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncAnimation();
      },
      { rootMargin: '80px' }
    );
    intersectionObserver.observe(host);

    host.addEventListener('pointermove', pointerMove);
    host.addEventListener('pointerdown', pointerDown);
    window.addEventListener('pointerup', pointerUp);
    host.addEventListener('pointerleave', pointerLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', syncAnimation);
    motionQuery.addEventListener('change', onMotionChange);
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

    resize();
    syncAnimation();
    setReady(true);

    return () => {
      disposed = true;
      syncRef.current = null;
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener('pointermove', pointerMove);
      host.removeEventListener('pointerdown', pointerDown);
      window.removeEventListener('pointerup', pointerUp);
      host.removeEventListener('pointerleave', pointerLeave);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', syncAnimation);
      motionQuery.removeEventListener('change', onMotionChange);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);

      icosahedronGeo.dispose();
      innerGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      satGeo.dispose();
      particleGeo.dispose();

      wireframeMat.dispose();
      innerMat.dispose();
      vertexMat.dispose();
      ringMatAccent.dispose();
      ringMatMuted.dispose();
      dustMat.dispose();

      environmentTarget.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      className={className || undefined}
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        userSelect: 'none',
      }}
    >
      {!ready && (
        <div
          style={{
            position: 'absolute',
            inset: '17%',
            border: 'clamp(28px, 6vw, 72px) solid #c6c9c2',
            borderRadius: '46% 54% 55% 45%',
            transform: 'rotate(-28deg)',
            boxShadow: 'inset 12px 12px 22px #707a78, 10px 18px 35px #0002',
          }}
        />
      )}
      <div
        ref={hostRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: ready ? 1 : 0,
          cursor: isGrabbing ? 'grabbing' : 'grab',
        }}
      />
    </div>
  );
}
