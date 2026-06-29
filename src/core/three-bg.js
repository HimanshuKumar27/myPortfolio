import * as THREE from 'three';

/**
 * ThreeBgManager
 * Renders a fully interactive Three.js 3D scene behind the hero section.
 *
 * Features:
 * - 900-particle teal/cyan field with sinusoidal drift
 * - Four wireframe geometries (torus knot + icosahedron + octahedron + dodecahedron)
 * - Mouse parallax: smooth lerp of scene group toward cursor
 * - Click burst: expanding torus ring ripples at click world position
 * - Theme-aware: updates colours on dark/light toggle
 * - Performance: RAF paused via IntersectionObserver when hero is off-screen
 * - Mobile: skipped entirely (no GPU waste on small screens)
 */
export class ThreeBgManager {
  constructor({ canvasId, heroSectionId }) {
    // Skip on small / touch-only screens for performance
    if (window.matchMedia('(max-width: 768px)').matches) return;

    this.canvas = document.getElementById(canvasId);
    this.heroSection = document.getElementById(heroSectionId);
    if (!this.canvas || !this.heroSection) return;

    this.clock = new THREE.Clock();
    this.targetParallax = { x: 0, y: 0 };
    this.currentParallax = { x: 0, y: 0 };
    this.burstRings = [];
    this.rafId = null;
    this.isRunning = false;
    this.isDark = document.documentElement.classList.contains('dark');

    this._setupRenderer();
    this._setupParticles();
    this._setupGeometries();
    this._bindEvents();
    this._setupVisibilityObserver();
    this._start();
  }

  // ─── Renderer / Camera ───────────────────────────────────────────────────

  _setupRenderer() {
    const w = this.heroSection.clientWidth  || window.innerWidth;
    const h = this.heroSection.clientHeight || window.innerHeight;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setClearColor(0x000000, 0); // fully transparent
  }

  // ─── Colour Palette ───────────────────────────────────────────────────────

  _palette(dark) {
    return dark
      ? [0x14b8a6, 0x2dd4bf, 0x5eead4, 0x38bdf8, 0x818cf8, 0x6ee7b7]
      : [0x0d9488, 0x14b8a6, 0x2dd4bf, 0x0891b2, 0x6366f1, 0x059669];
  }

  // ─── Particle Field ───────────────────────────────────────────────────────

  _setupParticles() {
    const COUNT = 900;
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    this.particlePhases = new Float32Array(COUNT);

    const threeColors = this._palette(this.isDark).map(h => new THREE.Color(h));

    for (let i = 0; i < COUNT; i++) {
      // Spherical distribution, flattened on Z for a starfield feel
      const r     = 6 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) * 0.45 - 2;

      const c = threeColors[Math.floor(Math.random() * threeColors.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      this.particlePhases[i] = Math.random() * Math.PI * 2;
    }

    this.particleInitPos = pos.slice(); // base positions for sinusoidal drift

    this.particleGeo = new THREE.BufferGeometry();
    this.particleGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.particleGeo.setAttribute('color',    new THREE.BufferAttribute(col, 3));

    this.particleMat = new THREE.PointsMaterial({
      size:            0.07,
      vertexColors:    true,
      blending:        THREE.AdditiveBlending,
      transparent:     true,
      depthWrite:      false,
      opacity:         this.isDark ? 0.88 : 0.62,
      sizeAttenuation: true,
    });

    this.particles = new THREE.Points(this.particleGeo, this.particleMat);
    this.scene.add(this.particles);
  }

  // ─── Wireframe Geometries ─────────────────────────────────────────────────

  _setupGeometries() {
    const pal = this._palette(this.isDark);
    this.geoGroup = new THREE.Group();

    // Torus knot — centrepiece
    this.torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.25, 0.36, 128, 14, 2, 3),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(pal[0]), wireframe: true,
        transparent: true, opacity: this.isDark ? 0.22 : 0.14,
      })
    );
    this.torusKnot.position.set(0, 0, -3);

    // Icosahedron — lower-right accent
    this.icosahedron = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.7, 1),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(pal[2]), wireframe: true,
        transparent: true, opacity: this.isDark ? 0.38 : 0.24,
      })
    );
    this.icosahedron.position.set(3.4, -1.4, -1.5);

    // Octahedron — upper-left accent
    this.octahedron = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.52),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(pal[3]), wireframe: true,
        transparent: true, opacity: this.isDark ? 0.32 : 0.20,
      })
    );
    this.octahedron.position.set(-3.6, 1.9, -2);

    // Dodecahedron — lower-left flair
    this.dodecahedron = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.42),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(pal[4]), wireframe: true,
        transparent: true, opacity: this.isDark ? 0.28 : 0.18,
      })
    );
    this.dodecahedron.position.set(-2.6, -2.3, -1.8);

    this.geoGroup.add(this.torusKnot, this.icosahedron, this.octahedron, this.dodecahedron);
    this.scene.add(this.geoGroup);
  }

  // ─── Event Binding ────────────────────────────────────────────────────────

  _bindEvents() {
    // Mouse parallax — tracked globally; canvas is pointer-events:none
    this._onMouseMove = (e) => {
      const rect = this.heroSection.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      this.targetParallax.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      this.targetParallax.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
    };

    // Click burst — hero section receives events because canvas is pointer-events:none
    this._onClick = (e) => this._createClickBurst(e);

    // Resize
    this._onResize = () => {
      const w = this.heroSection.clientWidth;
      const h = this.heroSection.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    };

    // Dark/light mode
    this._onThemeChange = () => {
      const nowDark = document.documentElement.classList.contains('dark');
      if (nowDark !== this.isDark) {
        this.isDark = nowDark;
        this._applyThemeColors();
      }
    };

    window.addEventListener('mousemove', this._onMouseMove, { passive: true });
    this.heroSection.addEventListener('click', this._onClick);
    window.addEventListener('resize', this._onResize, { passive: true });

    this._themeObserver = new MutationObserver(this._onThemeChange);
    this._themeObserver.observe(document.documentElement, {
      attributes: true, attributeFilter: ['class'],
    });
  }

  _applyThemeColors() {
    const pal = this._palette(this.isDark);
    const threeColors = pal.map(h => new THREE.Color(h));

    // Re-colour particles
    const col = this.particleGeo.attributes.color.array;
    const count = col.length / 3;
    for (let i = 0; i < count; i++) {
      const c = threeColors[Math.floor(Math.random() * threeColors.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    this.particleGeo.attributes.color.needsUpdate = true;
    this.particleMat.opacity = this.isDark ? 0.88 : 0.62;

    // Re-colour geometries
    [
      { mesh: this.torusKnot,    idx: 0, dkOp: 0.22, ltOp: 0.14 },
      { mesh: this.icosahedron,  idx: 2, dkOp: 0.38, ltOp: 0.24 },
      { mesh: this.octahedron,   idx: 3, dkOp: 0.32, ltOp: 0.20 },
      { mesh: this.dodecahedron, idx: 4, dkOp: 0.28, ltOp: 0.18 },
    ].forEach(({ mesh, idx, dkOp, ltOp }) => {
      mesh.material.color.setHex(pal[idx]);
      mesh.material.opacity = this.isDark ? dkOp : ltOp;
    });
  }

  // ─── Click Burst ──────────────────────────────────────────────────────────

  _createClickBurst(e) {
    const rect = this.heroSection.getBoundingClientRect();
    const nx =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
    const ny = -((e.clientY - rect.top)  / rect.height) * 2 + 1;

    // Unproject NDC → world-space at Z = 0 plane
    const vec = new THREE.Vector3(nx, ny, 0.5).unproject(this.camera);
    const dir = vec.sub(this.camera.position).normalize();
    const t   = -this.camera.position.z / dir.z;
    const worldPos = this.camera.position.clone().addScaledVector(dir, t);
    worldPos.z = 0;

    const pal = this._palette(this.isDark);

    [
      { r: 0.08, tube: 0.018, color: pal[1], maxAge: 1.1, startOpacity: 0.95 },
      { r: 0.05, tube: 0.013, color: pal[2], maxAge: 0.75, startOpacity: 0.70 },
    ].forEach(({ r, tube, color, maxAge, startOpacity }) => {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(r, tube, 8, 48),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
          transparent: true, opacity: startOpacity,
          blending: THREE.AdditiveBlending, depthWrite: false,
        })
      );
      mesh.position.copy(worldPos);
      this.scene.add(mesh);
      this.burstRings.push({ mesh, age: 0, maxAge, startOpacity });
    });
  }

  _updateBursts(dt) {
    this.burstRings = this.burstRings.filter(b => {
      b.age += dt;
      const progress = b.age / b.maxAge;
      if (progress >= 1) {
        this.scene.remove(b.mesh);
        b.mesh.geometry.dispose();
        b.mesh.material.dispose();
        return false;
      }
      const eased = 1 - (1 - progress) ** 2;
      b.mesh.scale.setScalar(1 + eased * 6);
      b.mesh.material.opacity = b.startOpacity * (1 - progress);
      return true;
    });
  }

  // ─── Visibility / Pause ───────────────────────────────────────────────────

  _setupVisibilityObserver() {
    this._visObs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting ? this._start() : this._pause(),
      { threshold: 0.05 }
    );
    this._visObs.observe(this.heroSection);
  }

  _start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.clock.start();
    this._loop();
  }

  _pause() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  // ─── Render Loop ──────────────────────────────────────────────────────────

  _loop() {
    if (!this.isRunning) return;

    const dt      = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    // Smooth parallax lerp
    const lf = 0.04;
    this.currentParallax.x += (this.targetParallax.x - this.currentParallax.x) * lf;
    this.currentParallax.y += (this.targetParallax.y - this.currentParallax.y) * lf;

    const px = this.currentParallax.x;
    const py = this.currentParallax.y;

    // Geometry group parallax
    this.geoGroup.rotation.y = px * 0.5;
    this.geoGroup.rotation.x = -py * 0.3;

    // Auto-rotation per geometry
    this.torusKnot.rotation.x   += 0.0028;
    this.torusKnot.rotation.y   += 0.0046;
    this.icosahedron.rotation.x -= 0.0038;
    this.icosahedron.rotation.y += 0.0055;
    this.octahedron.rotation.x  += 0.006;
    this.octahedron.rotation.z  -= 0.004;
    this.dodecahedron.rotation.y += 0.007;
    this.dodecahedron.rotation.x -= 0.003;

    // Particle parallax (subtle)
    this.particles.rotation.y = px * 0.12;
    this.particles.rotation.x = -py * 0.08;

    // Sinusoidal particle drift
    const positions = this.particleGeo.attributes.position.array;
    const initPos   = this.particleInitPos;
    const phases    = this.particlePhases;
    const count     = phases.length;

    for (let i = 0; i < count; i++) {
      const b  = i * 3;
      const ph = phases[i];
      positions[b]     = initPos[b]     + Math.sin(elapsed * 0.25 + ph) * 0.28;
      positions[b + 1] = initPos[b + 1] + Math.cos(elapsed * 0.18 + ph) * 0.28;
      positions[b + 2] = initPos[b + 2] + Math.sin(elapsed * 0.12 + ph * 0.7) * 0.18;
    }
    this.particleGeo.attributes.position.needsUpdate = true;

    this._updateBursts(dt);

    this.renderer.render(this.scene, this.camera);
    this.rafId = requestAnimationFrame(() => this._loop());
  }

  // ─── Cleanup ─────────────────────────────────────────────────────────────

  destroy() {
    this._pause();
    this._visObs?.disconnect();
    this._themeObserver?.disconnect();
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('resize',    this._onResize);
    this.heroSection?.removeEventListener('click', this._onClick);
    this.particleGeo?.dispose();
    this.particleMat?.dispose();
    this.renderer?.dispose();
  }
}
