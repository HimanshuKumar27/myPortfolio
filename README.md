# 🌐 Himanshu Kumar – Developer Portfolio

Welcome to my personal developer portfolio website! Built with **React 19**, **Shadcn/ui**, **Tailwind CSS v4**, **Vite**, and **Hover.dev** interactive design patterns.

---

## 📁 Project Structure

```text
Portfolio/
├── public/
│   └── assets/             # Resume, profile image, and static assets
├── src/
│   ├── components/
│   │   ├── layout/         # Slide Tabs Navbar and Footer components
│   │   ├── sections/       # Hero, About, Skills, Tools, Projects, Certifications, Education, Contact
│   │   └── ui/             # Shadcn primitives, Rounded Slide Button, SpotlightCard, ResumeDialog
│   ├── data/               # Content data files (projects, skills, tools, certs, education)
│   ├── hooks/              # Custom React hooks (theme, scroll-reveal, scroll-progress, spotlight)
│   ├── lib/                # Utility functions (cn helper for Tailwind)
│   ├── App.jsx             # Root React application component
│   ├── index.css           # Global Tailwind CSS v4 & custom keyframes
│   └── main.jsx            # React entry point
├── components.json         # Shadcn UI configuration
├── jsconfig.json           # Path alias configuration (@ -> ./src)
├── index.html              # Main HTML entry page with pre-paint theme script
├── package.json            # Dependencies and npm scripts
├── vite.config.js          # Vite build & plugin configuration
└── README.md
```

---

## ✨ Features & Component Design

* **React 19 & Shadcn/ui**: Built on modern component-driven architecture with accessible Shadcn primitives.
* **Hover.dev Slide Tabs Navbar**: Desktop header navigation with an animated sliding cursor pill that tracks active scroll sections.
* **Hover.dev Sticky Cards (Scroll)**: Education section featuring cascading stacked sticky cards that stack smoothly as you scroll.
* **Hover.dev Swap Column Features**: Projects section showcasing scroll-driven alternating feature columns paired with live screenshot previews.
* **Hover.dev Rounded Slide Buttons**: Interactive pill-shaped buttons with smooth sliding background fill overlays.
* **Hero Section & Avatar Animation**: High-impact left-aligned typography layout with continuous zoom pulse avatar animation.
* **Custom About Me Section**: Two-column bento layout featuring story & mindset spotlight cards, interest pills, and a featured quote highlight.
* **Permanent Dark Theme**: Sleek dark aesthetic enabled by default with FOUC prevention.
* **Resume Viewer**: Integrated modal to view resume lazy-loaded via iframe.

---

## 🛠️ Tech Stack

* **Frontend Framework**: React 19, React DOM
* **Styling & UI Systems**: Tailwind CSS v4, Shadcn/ui, Radix UI Primitives, Lucide React, SimpleIcons, Devicon
* **Build Tool**: Vite 6, `@tailwindcss/vite`
* **Design Patterns**: Hover.dev Animated UI Patterns (Slide Tabs, Sticky Cards, Swap Column, Rounded Slide Buttons)
* **Animations**: `react-type-animation`, CSS Keyframes, Custom IntersectionObserver Hooks

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HimanshuKumar27/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

<p align="center">
  Built with ❤️ and passion by <b>Himanshu Kumar</b>.
</p>
