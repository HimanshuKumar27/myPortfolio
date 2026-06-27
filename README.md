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
│   │   └── ...
│   ├── components/                   # UI Presentation Layer (Component renderers)
│   │   ├── Projects.js
│   │   ├── Skills.js
│   │   └── ...
│   ├── styles/                       # CSS Preprocessors
│   │   └── main.css                  # Tailwinds & custom animations
│   └── app.js                        # Bootstrapper entry point
├── index.html                        # Main layout skeleton
├── tailwind.config.js                # Tailwind preprocessor configuration
└── vite.config.js                    # Vite bundler configuration
```

### Unidirectional Dependency Flow
$$\text{Domain Data} \longrightarrow \text{UI Component Renderers} \longrightarrow \text{App Bootstrapper (app.js)} \longleftarrow \text{Core Services}$$

1. **Domain Data Layer (`src/data/`)**: Contains raw, structured data. This isolates copy changes from code updates.
2. **Core Services Layer (`src/core/`)**: Event driven and state tracking managers. They handle DOM lifecycle events passively and do not contain visual layouts.
3. **UI Components Layer (`src/components/`)**: Visual presentation functions. They read domain data models and inject semantic, styled markup into skeleton placeholders.
4. **App Bootstrapper (`src/app.js` & `index.html`)**: The mounting application entry point.

---

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
