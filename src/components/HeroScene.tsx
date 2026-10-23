import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/** A self-contained, asset-free sculpture. The HTML rings remain when WebGL is unavailable. */
export default function HeroScene({ className = '', paused = false }: { className?: string; paused?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const syncRef = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
    syncRef.current?.();
  }, [paused]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x111211, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 60);
    camera.position.set(0, 0, 7.8);
    const environment = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environmentTarget = pmrem.fromScene(environment, 0.04);
    scene.environment = environmentTarget.texture;
    environment.dispose();
    pmrem.dispose();

    const sculpture = new THREE.Group();
    scene.add(sculpture);
    const chrome = new THREE.MeshPhysicalMaterial({
      color: 0xd5d7d3, metalness: 0.97, roughness: 0.16,
      clearcoat: 1, clearcoatRoughness: 0.12, envMapIntensity: 1.45,
    });
    const silver = new THREE.MeshPhysicalMaterial({
      color: 0xd94b27, metalness: 0.45, roughness: 0.22, clearcoat: 1,
    });
    const knotGeometry = new THREE.TorusKnotGeometry(1.12, 0.36, 192, 32, 2, 3);
    const knot = new THREE.Mesh(knotGeometry, chrome);
    knot.rotation.set(0.45, 0.3, -0.25);
    sculpture.add(knot);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x60695b, transparent: true, opacity: 0.23 });
    const ringGeometry = new THREE.TorusGeometry(2.15, 0.006, 6, 140);
    const orbit = new THREE.Mesh(ringGeometry, ringMaterial);
    orbit.rotation.set(1.04, -0.4, -0.3);
    sculpture.add(orbit);
    const sphereGeometry = new THREE.SphereGeometry(0.14, 28, 20);
    const satellite = new THREE.Mesh(sphereGeometry, silver);
    const satelliteSmall = new THREE.Mesh(sphereGeometry, chrome);
    satelliteSmall.scale.setScalar(0.52);
    sculpture.add(satellite, satelliteSmall);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x343a3f, 2));
    const key = new THREE.DirectionalLight(0xffffff, 5);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffc5a9, 2);
    rim.position.set(-4, -1, 2);
    scene.add(rim);
    const back = new THREE.DirectionalLight(0xffffff, 3);
    back.position.set(0, 3, -4);
    scene.add(back);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = motionQuery.matches;
    let visible = true;
    let disposed = false;
    let elapsed = 0;
    let lastTime = 0;
    let pointerX = 0;
    let pointerY = 0;
    let scroll = window.scrollY;
    const frame = (time: number) => {
      if (disposed) return;
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
      lastTime = time;
      if (!reduced && !pausedRef.current) elapsed += delta;
      const ease = reduced ? 1 : 1 - Math.exp(-delta * 3);
      sculpture.rotation.x += ((reduced ? 0 : pointerY * 0.13 + scroll * 0.00016) - sculpture.rotation.x) * ease;
      sculpture.rotation.y += ((reduced ? 0 : pointerX * 0.22 + scroll * 0.0002) - sculpture.rotation.y) * ease;
      sculpture.rotation.z = -0.14;
      knot.rotation.y = 0.3 + elapsed * 0.12;
      knot.rotation.z = -0.25 + Math.sin(elapsed * 0.18) * 0.15;
      sculpture.position.y = Math.sin(elapsed * 0.7) * 0.085;
      const orbitPosition = elapsed * 0.22 + 0.6;
      satellite.position.set(Math.cos(orbitPosition) * 2.13, Math.sin(orbitPosition) * 0.95, Math.sin(orbitPosition) * 1.55);
      satelliteSmall.position.set(Math.cos(orbitPosition + Math.PI) * 2.13, Math.sin(orbitPosition + Math.PI) * 0.95, Math.sin(orbitPosition + Math.PI) * 1.55);
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
      // Keep the complete sculpture in frame on narrow screens.
      camera.position.z = camera.aspect < 0.9 ? 8.2 / camera.aspect : 7.8;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      if (visible && !document.hidden) frame(performance.now());
    };
    const pointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointerX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
      pointerY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1));
    };
    const pointerLeave = () => { pointerX = 0; pointerY = 0; };
    const onScroll = () => { scroll = window.scrollY; };
    const onMotionChange = () => { reduced = motionQuery.matches; syncAnimation(); };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      renderer.setAnimationLoop(null);
      setReady(false);
    };
    const onContextRestored = () => { setReady(true); syncAnimation(); };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncAnimation();
    }, { rootMargin: '80px' });
    intersectionObserver.observe(host);
    host.addEventListener('pointermove', pointerMove);
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
      host.removeEventListener('pointerleave', pointerLeave);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', syncAnimation);
      motionQuery.removeEventListener('change', onMotionChange);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);
      knotGeometry.dispose();
      ringGeometry.dispose();
      sphereGeometry.dispose();
      chrome.dispose();
      silver.dispose();
      ringMaterial.dispose();
      environmentTarget.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className={className || undefined} aria-hidden="true" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!ready && <div style={{ position: 'absolute', inset: '17%', border: 'clamp(28px, 6vw, 72px) solid #c6c9c2', borderRadius: '46% 54% 55% 45%', transform: 'rotate(-28deg)', boxShadow: 'inset 12px 12px 22px #707a78, 10px 18px 35px #0002' }} />}
      <div ref={hostRef} style={{ position: 'absolute', inset: 0, opacity: ready ? 1 : 0 }} />
    </div>
  );
}
