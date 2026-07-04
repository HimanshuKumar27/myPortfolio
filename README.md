# 🌐 Himanshu Kumar – Portfolio

My personal portfolio website, built with **Vite**, **Tailwind CSS**, and **ES6 Modules**, following **Clean Architecture** principles for high modularity and scalability.

---

## 🎨 Architectural Design

The project enforces a strict separation of concerns across four distinct layers:

```
Portfolio/
├── public/                           # Static assets served at the root
│   ├── assets/
│   │   ├── profile_image.webp
│   │   └── Himanshu_Kumar_Resume.pdf
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── data/                         # Domain Data Layer (Pure content modules)
│   │   ├── projects.js               # Project entries with screenshot URLs
│   │   ├── skills.js
│   │   └── ...
│   ├── core/                         # Core Services Layer (Behavior & State managers)
│   │   ├── theme.js                  # Light/Dark mode controller
│   │   ├── navigation.js             # Mobile menu & scroll spy
│   │   ├── modal.js                  # ESC & lazy iframe PDF loader
│   │   ├── animations.js             # Scroll reveal, spotlight hover & text scramble
│   │   └── icons.js                  # Lucide icon manager
│   ├── components/                   # UI Presentation Layer (Component renderers)
│   │   ├── Projects.js               # Renders project cards with screenshot previews
│   │   ├── Skills.js
│   │   └── ...
│   ├── styles/                       # CSS Preprocessors
│   │   └── main.css                  # Tailwind & custom animations
│   └── app.js                        # Bootstrapper entry point
├── index.html                        # Main layout skeleton
├── tailwind.config.js                # Tailwind preprocessor configuration
└── vite.config.js                    # Vite bundler configuration
```

### Unidirectional Dependency Flow
$$\text{Domain Data} \longrightarrow \text{UI Component Renderers} \longrightarrow \text{App Bootstrapper (app.js)} \longleftarrow \text{Core Services}$$

1. **Domain Data Layer (`src/data/`)**: Contains raw, structured data. Isolates copy changes from code updates.
2. **Core Services Layer (`src/core/`)**: Event-driven and state-tracking managers. Handle DOM lifecycle events passively with no visual layout logic.
3. **UI Components Layer (`src/components/`)**: Visual presentation functions. Read domain data and inject styled markup into skeleton placeholders.
4. **App Bootstrapper (`src/app.js` & `index.html`)**: The mounting application entry point.

---

## ✨ Design & UI Features

The portfolio uses premium design tokens and micro-animations for a polished experience:

* **Glassmorphism Panels (`.card-glass`)**: All containers render as glassmorphic cards with `backdrop-filter: blur(16px)`, low-opacity borders, and smooth zoom easing.
* **Interactive Spotlight Cards (`.spotlight-card`)**: Delegated cursor tracking (`initSpotlightHover`) highlights cards with a dynamic radial gradient trail centered under the mouse pointer.
* **Text Scramble Decode (`.scramble-text`)**: Hovering over section headings triggers a custom symbol-scrambling decode animation that resolves smoothly.
* **Hardware-Accelerated Floating Blobs (`.bg-blob`)**: Slow-moving blurred radial gradient shapes float across the viewport (`@keyframes float-blob`), keeping performance clean at high FPS.
* **Scroll Reveal Animations (`.reveal`)**: Elements animate into view as they enter the viewport via `IntersectionObserver`.
* **Typed.js Hero Title**: An animated typing effect cycles through the hero heading.
* **Project Screenshot Previews**: Each project card displays a live site screenshot at the top (via microlink.io), with a shimmer loading skeleton and a smooth zoom-on-hover effect.
* **Circular Browser Tab Favicon**: A canvas-based script clips the profile photo into a perfect circle at runtime and injects it as the tab favicon.

---

## ⚡ Local Development

Ensure [Node.js](https://nodejs.org/) is installed, then:

### 1. Install dependencies
```bash
npm install
```

### 2. Start the local development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app with Hot Module Replacement (HMR).

### 3. Build for production
```bash
npm run build
```
Vite compiles and packages assets into an optimized `/dist` folder. Production CSS is purged to only include actively rendered styles.

---

## 🚀 Deployment

Configured for seamless deployment on **Vercel** or **Netlify**:

* **Framework Preset**: `Vite`
* **Build Command**: `npm run build`
* **Output Directory**: `dist`
* **Auto-deploy**: Pushing to `main` triggers an automatic production build.
