# 🌐 Himanshu Kumar – Portfolio

This repository contains my personal portfolio website, refactored using **Clean Architecture** principles and built with **Vite**, **Tailwind CSS**, and **ES6 Modules**. 

---

## 🎨 Architectural Design

The project is structured to enforce a strict separation of concerns, ensuring high modularity, scalability, and performance:

```
Portfolio/
├── public/                           # Static assets served at the root (Favicons, images, PDF)
│   ├── assets/
│   │   ├── profile_image.webp
│   │   └── Himanshu_Kumar_Resume.pdf
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── data/                         # Domain Data Layer (Pure content modules)
│   │   ├── projects.js
│   │   ├── skills.js
│   │   └── ...
│   ├── core/                         # Core Services Layer (Behavior & State managers)
│   │   ├── theme.js                  # Light/Dark mode controller
│   │   ├── navigation.js             # Mobile menu & scroll spy
│   │   ├── modal.js                  # ESC & lazy iframe PDF loader
│   │   ├── animations.js             # Scroll reveal, spotlight hover & text scramble
│   │   └── three-bg.js               # Three.js interactive 3D hero background
│   ├── components/                   # UI Presentation Layer (Component renderers)
│   │   ├── Projects.js
│   │   ├── Skills.js
│   │   └── ...
│   ├── styles/                       # CSS Preprocessors
│   │   └── main.css                  # Tailwind & custom animations
│   └── app.js                        # Bootstrapper entry point
├── index.html                        # Main layout skeleton
├── tailwind.config.js                # Tailwind preprocessor configuration
└── vite.config.js                    # Vite bundler configuration (with Three.js code-split)
```

### Unidirectional Dependency Flow
$$\text{Domain Data} \longrightarrow \text{UI Component Renderers} \longrightarrow \text{App Bootstrapper (app.js)} \longleftarrow \text{Core Services}$$

1. **Domain Data Layer (`src/data/`)**: Contains raw, structured data. This isolates copy changes from code updates.
2. **Core Services Layer (`src/core/`)**: Event driven and state tracking managers. They handle DOM lifecycle events passively and do not contain visual layouts.
3. **UI Components Layer (`src/components/`)**: Visual presentation functions. They read domain data models and inject semantic, styled markup into skeleton placeholders.
4. **App Bootstrapper (`src/app.js` & `index.html`)**: The mounting application entry point.

---

## ✨ Modern Redesign Features (UI/UX Pro Max & 21st.dev)

The portfolio has been redesigned using premium design tokens and animations:
* **Glassmorphism Panels (`.card-glass`)**: All component containers render as glassmorphic card elements with `backdrop-filter: blur(16px)`, low-opacity borders, and smooth zoom easing.
* **Interactive Spotlight Cards (`.spotlight-card`)**: Integrated delegated cursor tracking (`initSpotlightHover`). Hovering over cards highlights them with a dynamic radial gradient trail centered exactly under the mouse pointer.
* **Text Scramble Decode (`.scramble-text`)**: Hovering over section headings and the hero title triggers a custom symbol-scrambling decode effect that resolves smoothly.
* **Hardware-Accelerated Floating Blobs (`.bg-blob`)**: Fluid, slow-moving blurred background radial gradient shapes float slowly across the viewport (`@keyframes float-blob`) on a background layer, maintaining high FPS and keeping performance clean.

---

## 🧊 Three.js Interactive 3D Background

The hero section features a fully self-contained, interactive 3D scene powered by [Three.js](https://threejs.org/), rendered on a transparent WebGL canvas layered behind all page content.

### Scene Composition
* **900-Particle Starfield**: Teal/cyan/indigo coloured particles distributed across a spherical volume, each drifting with an independent sinusoidal animation for an organic, living starfield feel.
* **Torus Knot** *(centrepiece)*: A `(2,3)` wireframe torus knot sculpture floats behind the profile image, slowly auto-rotating on two axes.
* **Icosahedron** *(lower-right)*: A subdivided wireframe icosahedron provides a lower-right depth anchor.
* **Octahedron** *(upper-left)*: A crystal-like wireframe octahedron accents the upper-left viewport corner.
* **Dodecahedron** *(lower-left)*: A pentagonal wireframe dodecahedron adds geometric variety in the lower-left region.

### Interactivity
* **Mouse Parallax**: Moving the cursor across the hero smoothly lerps the entire particle field and geometry group in 3D space, giving a convincing depth-of-field parallax illusion.
* **Click Burst**: Clicking anywhere on the hero unprojected NDC → world-space coordinates and spawns two concentric torus rings that expand outward with an additive-blend glow and fade — a ripple effect in 3D.
* **Theme Sync**: The scene reacts in real-time to dark/light mode toggles — particle colours, geometry colours, and opacity values all update instantly.

### Performance
* `pointer-events: none` on the canvas ensures all hero CTAs and links remain fully interactive.
* The render loop is paused via `IntersectionObserver` when the hero section scrolls off-screen.
* The canvas is not initialised at all on mobile (`max-width: 768px`), saving GPU resources entirely.
* `powerPreference: 'low-power'` is set on the WebGL context.
* Pixel ratio is capped at `1.5×` to prevent excessive GPU load on HiDPI displays.
* **Vite code-splitting**: Three.js is bundled into a separate lazy chunk (`three-vendor.js`), keeping the main app JS at **~8 kB gzip** while Three.js loads in parallel at **~129 kB gzip**.

## ⚡ Local Development

To run or build this project locally, ensure you have [Node.js](https://nodejs.org/) installed, and then run the following commands:

### 1. Install dependencies
```bash
npm install
```

### 2. Start the local development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application with Hot Module Replacement (HMR).

### 3. Build for production
```bash
npm run build
```
Vite will compile and package the assets into an optimized `/dist` folder. The production CSS is purged, leaving only the styles that are actively rendered in the project.

---

## 🚀 Deployment

The project is configured for seamless deployment on platforms like **Vercel** or **Netlify**:
* **Framework Preset**: `Vite`
* **Build Command**: `npm run build`
* **Output Directory**: `dist`
* **Auto-deploy**: Pushing to the `main` branch triggers an automatic production build.
