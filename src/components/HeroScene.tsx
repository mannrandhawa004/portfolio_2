import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export interface HeroSceneProps {
  className?: string;
  paused?: boolean;
  theme?: "light" | "dark";
}

/**
 * High-End Interactive 3D Cybernetic Quantum Core.
 * Features:
 * - Real-time Morphing Liquid Chrome Mesh with harmonic wave ripples
 * - Inner Luminous Singularity Core with refractive transmission
 * - Outer Holographic Geodesic Shield with pulsing vertex beacons
 * - Precision Gyroscopic Telemetry Rings with radar markers
 * - Orbiting Quantum Satellites & Cosmic Stardust Nebula
 * - Silky drag-to-spin physics with inertia, flick momentum & spring elasticity
 * - Interactive cursor hover wave distortion
 * - Live Theme Synchronization (Light: Liquid Titanium Pearl / Dark: Obsidian Plasma Ember)
 */
export default function HeroScene({ className = "", paused = false, theme = "light" }: HeroSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const themeRef = useRef(theme);
  const syncRef = useRef<(() => void) | null>(null);
  const updateThemeRef = useRef<((t: "light" | "dark") => void) | null>(null);
  const [ready, setReady] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
    syncRef.current?.();
  }, [paused]);

  useEffect(() => {
    themeRef.current = theme;
    updateThemeRef.current?.(theme);
  }, [theme]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = themeRef.current === "light" ? 1.45 : 1.35;
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%;cursor:grab;touch-action:none;";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    camera.position.set(0, 0, 7.2);

    // Environment map for hyper-realistic metallic and glass reflections
    const environment = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environmentTarget = pmrem.fromScene(environment, 0.04);
    scene.environment = environmentTarget.texture;
    environment.dispose();
    pmrem.dispose();

    // Main Kinetic Group
    const artifact = new THREE.Group();
    scene.add(artifact);

    // Dynamic Theme Color Palette
    const isLight = themeRef.current === "light";
    const chromeColor = isLight ? 0xf0eee9 : 0x121715;
    const accentColor = isLight ? 0xd94b27 : 0xff6b4a;
    const rimSecondaryColor = isLight ? 0x4d7285 : 0x38bdf8;
    const haloMutedColor = isLight ? 0x8a9082 : 0x4a5d4e;

    // 1. PRIMARY SCULPTURE: Morphing Liquid Chrome Mesh
    const liquidGeo = new THREE.IcosahedronGeometry(1.22, 16);
    const basePositionAttribute = liquidGeo.attributes.position.clone();
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: chromeColor,
      metalness: isLight ? 0.94 : 0.98,
      roughness: isLight ? 0.12 : 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 1.0,
      envMapIntensity: isLight ? 2.3 : 2.8,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    artifact.add(liquidMesh);

    // 2. INNER LUMINOUS SINGULARITY CORE
    const innerCoreGeo = new THREE.OctahedronGeometry(0.68, 0);
    const innerCoreMat = new THREE.MeshPhysicalMaterial({
      color: accentColor,
      metalness: 0.35,
      roughness: 0.08,
      transmission: isLight ? 0.5 : 0.75,
      ior: 1.55,
      reflectivity: 0.9,
      clearcoat: 1.0,
      emissive: accentColor,
      emissiveIntensity: isLight ? 0.18 : 0.45,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    artifact.add(innerCoreMesh);

    // Inner wireframe lattice
    const innerLatticeGeo = new THREE.IcosahedronGeometry(0.5, 1);
    const innerLatticeMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.35 : 0.6,
    });
    const innerLattice = new THREE.Mesh(innerLatticeGeo, innerLatticeMat);
    artifact.add(innerLattice);

    // 3. OUTER HOLOGRAPHIC GEODESIC SHIELD
    const shieldGeo = new THREE.IcosahedronGeometry(1.68, 1);
    const shieldMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.38 : 0.55,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    artifact.add(shieldMesh);

    // Glowing Vertex Beacon Nodes on Shield
    const beaconMat = new THREE.PointsMaterial({
      color: accentColor,
      size: 0.09,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const shieldBeacons = new THREE.Points(shieldGeo, beaconMat);
    artifact.add(shieldBeacons);

    // 4. PRECISION GYROSCOPIC TELEMETRY RINGS
    // Halo 1: Equatorial Cyber Ring
    const halo1Geo = new THREE.TorusGeometry(2.35, 0.016, 20, 180);
    const halo1Mat = new THREE.MeshPhysicalMaterial({
      color: accentColor,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 1.0,
    });
    const halo1 = new THREE.Mesh(halo1Geo, halo1Mat);
    artifact.add(halo1);

    // 12 Radar Dots around Equatorial Ring
    const radarGroup = new THREE.Group();
    const radarGeo = new THREE.SphereGeometry(0.04, 12, 12);
    const radarMat = new THREE.MeshBasicMaterial({ color: accentColor });
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const dot = new THREE.Mesh(radarGeo, radarMat);
      dot.position.set(Math.cos(angle) * 2.35, Math.sin(angle) * 2.35, 0);
      radarGroup.add(dot);
    }
    artifact.add(radarGroup);

    // Halo 2: Inclined Gyroscope Ring
    const halo2Geo = new THREE.TorusGeometry(2.65, 0.012, 16, 180);
    const halo2Mat = new THREE.MeshPhysicalMaterial({
      color: haloMutedColor,
      metalness: 0.7,
      roughness: 0.25,
      transparent: true,
      opacity: 0.7,
    });
    const halo2 = new THREE.Mesh(halo2Geo, halo2Mat);
    halo2.rotation.x = Math.PI / 3;
    halo2.rotation.y = Math.PI / 6;
    artifact.add(halo2);

    // 5. ORBITING QUANTUM SATELLITES
    const satGeo = new THREE.SphereGeometry(0.1, 24, 20);
    const satMatAccent = new THREE.MeshPhysicalMaterial({
      color: accentColor,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
    });
    const satMatSecondary = new THREE.MeshPhysicalMaterial({
      color: rimSecondaryColor,
      metalness: 0.85,
      roughness: 0.15,
      clearcoat: 1.0,
    });

    const sat1 = new THREE.Mesh(satGeo, satMatAccent);
    const sat2 = new THREE.Mesh(satGeo, satMatSecondary);
    sat2.scale.setScalar(0.85);
    const sat3 = new THREE.Mesh(satGeo, satMatAccent);
    sat3.scale.setScalar(0.7);
    artifact.add(sat1, sat2, sat3);

    // 6. AMBIENT STARDUST NEBULA
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.9 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: accentColor,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(particleGeo, dustMat);
    artifact.add(dust);

    // 7. STUDIO LIGHTING RIG
    const hemiLight = new THREE.HemisphereLight(0xffffff, isLight ? 0xd8d4c7 : 0x111613, 2.8);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(accentColor, 4.4);
    rimLight.position.set(-5, -2, 3);
    scene.add(rimLight);

    const secondaryRim = new THREE.DirectionalLight(rimSecondaryColor, 2.8);
    secondaryRim.position.set(2, -4, -4);
    scene.add(secondaryRim);

    const topLight = new THREE.DirectionalLight(0xffffff, 2.5);
    topLight.position.set(0, 5, -2);
    scene.add(topLight);

    // Dynamic Theme Swapping
    updateThemeRef.current = (t: "light" | "dark") => {
      const light = t === "light";
      const knotC = light ? 0xf0eee9 : 0x121715;
      const accC = light ? 0xd94b27 : 0xff6b4a;
      const rimC = light ? 0x4d7285 : 0x38bdf8;
      const mutC = light ? 0x8a9082 : 0x4a5d4e;

      liquidMat.color.setHex(knotC);
      liquidMat.metalness = light ? 0.94 : 0.98;
      liquidMat.roughness = light ? 0.12 : 0.08;
      liquidMat.envMapIntensity = light ? 2.3 : 2.8;

      innerCoreMat.color.setHex(accC);
      innerCoreMat.emissive.setHex(accC);
      innerCoreMat.emissiveIntensity = light ? 0.18 : 0.45;
      innerCoreMat.transmission = light ? 0.5 : 0.75;

      innerLatticeMat.color.setHex(accC);
      innerLatticeMat.opacity = light ? 0.35 : 0.6;

      shieldMat.color.setHex(accC);
      shieldMat.opacity = light ? 0.38 : 0.55;
      beaconMat.color.setHex(accC);

      halo1Mat.color.setHex(accC);
      radarMat.color.setHex(accC);
      halo2Mat.color.setHex(mutC);

      satMatAccent.color.setHex(accC);
      satMatSecondary.color.setHex(rimC);

      dustMat.color.setHex(accC);
      rimLight.color.setHex(accC);
      secondaryRim.color.setHex(rimC);

      hemiLight.groundColor.setHex(light ? 0xd8d4c7 : 0x111613);
      renderer.toneMappingExposure = light ? 1.45 : 1.35;
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;
    let visible = true;
    let disposed = false;
    let elapsed = 0;
    let lastTime = 0;
    let pointerX = 0;
    let pointerY = 0;
    let scroll = window.scrollY;

    // Interactive Drag Physics & Spring Elasticity
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragRotX = 0;
    let dragRotY = 0;
    let velX = 0;
    let velY = 0;
    let scaleSpring = 1.0;
    let scaleVelocity = 0;

    const basePositions = basePositionAttribute.array as Float32Array;
    const currentPositions = liquidGeo.attributes.position.array as Float32Array;
    const vertexCount = liquidGeo.attributes.position.count;

    const frame = (time: number) => {
      if (disposed) return;
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
      lastTime = time;
      if (!reduced && !pausedRef.current) elapsed += delta;

      // Inertia & Flick Physics
      if (!isDragging) {
        dragRotX += velY;
        dragRotY += velX;
        velX *= 0.94;
        velY *= 0.94;
      }

      // Spring physics for click/drag scale elasticity
      const targetScale = isDragging ? 0.94 : 1.0;
      const springK = 190;
      const springDamp = 14;
      const springForce = (targetScale - scaleSpring) * springK;
      scaleVelocity += (springForce - scaleVelocity * springDamp) * delta;
      scaleSpring += scaleVelocity * delta;
      artifact.scale.setScalar(scaleSpring);

      // REAL-TIME PROCEDURAL LIQUID WAVE DEFORMATION
      const t = elapsed * 1.8;
      const pX = pointerX * 0.5;
      const pY = pointerY * 0.5;

      for (let i = 0; i < vertexCount; i++) {
        const i3 = i * 3;
        const bx = basePositions[i3];
        const by = basePositions[i3 + 1];
        const bz = basePositions[i3 + 2];

        // Multi-frequency harmonic liquid ripples + pointer proximity wave
        const wave1 = Math.sin(bx * 2.5 + t) * Math.cos(by * 2.5 + t * 0.85);
        const wave2 = Math.sin(bz * 3.0 + t * 1.2) * Math.cos(bx * 2.0 - t * 0.6);
        const mouseDist = Math.hypot(bx - pX, by - pY);
        const mouseRipple = Math.sin(mouseDist * 4.5 - t * 2.5) * 0.06;

        const displacement = 1 + (wave1 * 0.09 + wave2 * 0.06 + mouseRipple);

        currentPositions[i3] = bx * displacement;
        currentPositions[i3 + 1] = by * displacement;
        currentPositions[i3 + 2] = bz * displacement;
      }
      liquidGeo.computeVertexNormals();
      liquidGeo.attributes.position.needsUpdate = true;

      // Liquid Core and Geodesic Shield Independent Tumbling
      liquidMesh.rotation.y = elapsed * 0.28;
      liquidMesh.rotation.x = elapsed * 0.18;

      innerCoreMesh.rotation.y = -elapsed * 0.48;
      innerCoreMesh.rotation.x = elapsed * 0.38;
      innerLattice.rotation.y = elapsed * 0.52;
      innerLattice.rotation.z = -elapsed * 0.32;

      shieldMesh.rotation.y = -elapsed * 0.15;
      shieldMesh.rotation.z = elapsed * 0.12;
      shieldBeacons.rotation.y = -elapsed * 0.15;
      shieldBeacons.rotation.z = elapsed * 0.12;
      beaconMat.size = 0.085 + Math.sin(elapsed * 2.5) * 0.02;

      // Gyro Halos
      halo1.rotation.z = elapsed * 0.18;
      radarGroup.rotation.z = elapsed * 0.18;

      halo2.rotation.y = -elapsed * 0.25;
      halo2.rotation.x = Math.PI / 3 + Math.sin(elapsed * 0.5) * 0.18;

      // Satellites orbiting on dynamic paths weaving around the core
      const t1 = elapsed * 0.72;
      sat1.position.set(Math.cos(t1) * 2.35, Math.sin(t1) * 2.35, Math.sin(t1 * 2) * 0.45);

      const t2 = -elapsed * 0.58 + 1.4;
      sat2.position.set(
        Math.cos(t2) * 2.65,
        Math.sin(t2) * Math.cos(halo2.rotation.x) * 2.65,
        Math.sin(t2) * Math.sin(halo2.rotation.x) * 2.65
      );

      const t3 = elapsed * 0.5 + 2.8;
      sat3.position.set(Math.cos(t3) * 1.95, Math.sin(t3 * 1.6) * 1.6, Math.cos(t3 * 1.4) * 1.4);

      // Stardust gentle rotation & alpha twinkle
      dust.rotation.y = elapsed * 0.04;
      dust.rotation.x = elapsed * 0.02;
      dustMat.opacity = 0.55 + Math.sin(elapsed * 2.4) * 0.18;

      // Pointer tilt + drag orientation with smooth decay
      const ease = reduced ? 1 : 1 - Math.exp(-delta * 3.4);
      const targetRotX = (reduced ? 0 : pointerY * 0.18 + scroll * 0.00015) + dragRotX;
      const targetRotY = (reduced ? 0 : pointerX * 0.28 + scroll * 0.0002) + dragRotY;

      artifact.rotation.x += (targetRotX - artifact.rotation.x) * ease;
      artifact.rotation.y += (targetRotY - artifact.rotation.y) * ease;
      artifact.position.y = Math.sin(elapsed * 0.9) * 0.07;

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
      camera.position.z = camera.aspect < 1 ? 7.2 / camera.aspect : 7.2;
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

        velX = deltaRotY * 0.82;
        velY = deltaRotX * 0.82;
      }
    };

    const pointerDown = (event: PointerEvent) => {
      isDragging = true;
      setIsGrabbing(true);
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      velX = 0;
      velY = 0;
      if (renderer.domElement) renderer.domElement.style.cursor = "grabbing";
    };

    const pointerUp = () => {
      if (isDragging) {
        isDragging = false;
        setIsGrabbing(false);
        if (renderer.domElement) renderer.domElement.style.cursor = "grab";
      }
    };

    const pointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
      pointerUp();
    };

    const onScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - scroll;
      scroll = currentScroll;
      velY += delta * 0.0003;
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
      { rootMargin: "80px" }
    );
    intersectionObserver.observe(host);

    host.addEventListener("pointermove", pointerMove);
    host.addEventListener("pointerdown", pointerDown);
    window.addEventListener("pointerup", pointerUp);
    host.addEventListener("pointerleave", pointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", syncAnimation);
    motionQuery.addEventListener("change", onMotionChange);
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);

    resize();
    syncAnimation();
    setReady(true);

    return () => {
      disposed = true;
      syncRef.current = null;
      updateThemeRef.current = null;
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener("pointermove", pointerMove);
      host.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("pointerup", pointerUp);
      host.removeEventListener("pointerleave", pointerLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", syncAnimation);
      motionQuery.removeEventListener("change", onMotionChange);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", onContextRestored);

      liquidGeo.dispose();
      basePositionAttribute.dispose?.();
      innerCoreGeo.dispose();
      innerLatticeGeo.dispose();
      shieldGeo.dispose();
      halo1Geo.dispose();
      halo2Geo.dispose();
      radarGeo.dispose();
      satGeo.dispose();
      particleGeo.dispose();

      liquidMat.dispose();
      innerCoreMat.dispose();
      innerLatticeMat.dispose();
      shieldMat.dispose();
      beaconMat.dispose();
      halo1Mat.dispose();
      halo2Mat.dispose();
      radarMat.dispose();
      satMatAccent.dispose();
      satMatSecondary.dispose();
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
        position: "relative",
        width: "100%",
        height: "100%",
        userSelect: "none",
      }}
    >
      <div
        ref={hostRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: ready ? 1 : 0,
          transition: "opacity 0.6s ease",
          cursor: isGrabbing ? "grabbing" : "grab",
        }}
      />
    </div>
  );
}
