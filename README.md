# 🌐 Himanshu Kumar – Developer Portfolio

Welcome to my personal developer portfolio website! Built with **React 19**, **Shadcn/ui**, **Tailwind CSS v4**, and **Vite**.

---

## 📁 Project Structure

```text
Portfolio/
├── public/
│   └── assets/             # Resume, profile image, and static assets
├── src/
│   ├── components/
│   │   ├── layout/         # Navbar and Footer components
│   │   ├── sections/       # Section components (Hero, About, Skills, Projects, etc.)
│   │   └── ui/             # Shadcn UI primitives & custom UI components
│   ├── data/               # Content data files (projects, skills, certs, education)
│   ├── hooks/              # Custom React hooks (theme, scroll-reveal, scroll-progress, spotlight)
│   ├── lib/                # Utility functions (cn helper for Tailwind)
│   ├── App.jsx             # Root React application component
│   ├── index.css           # Global Tailwind CSS v4 & custom styles
│   └── main.jsx            # React entry point
├── components.json         # Shadcn UI configuration
├── jsconfig.json           # Path alias configuration (@ -> ./src)
├── index.html              # Main HTML entry page
├── package.json            # Dependencies and npm scripts
├── vite.config.js          # Vite build & plugin configuration
└── README.md
```

---

## ✨ Features

* **React 19 & Shadcn/ui**: Built on modern component-driven architecture with accessible Shadcn primitives.
* **Responsive Layout**: Fully optimized for mobile, tablet, and desktop screens with mobile drawer navigation.
* **Light / Dark Mode**: Theme switcher with preference persistence and FOUC prevention.
* **Projects Showcase**: Interactive project cards with lazy-loaded live site previews, fallback states, and GitHub links.
* **Skills & Tools**: Grid display of developer skills and tech stack using Devicon and custom SVG/image icons.
* **Resume Viewer**: Integrated modal to view resume lazy-loaded via iframe.
* **Smooth Animations**: Animated typing effect in hero section, scroll progress bar, scroll reveal, spotlight cursor glow, and text-scramble heading effects.

---

## 🛠️ Tech Stack

* **Frontend Framework**: React 19, React DOM
* **UI Components & Styling**: Shadcn/ui, Tailwind CSS v4, Radix UI Primitives, Lucide React
* **Build Tool**: Vite 6, `@tailwindcss/vite`
* **Animations**: `react-type-animation`, Custom IntersectionObserver Hooks

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

## 📝 Contact & Socials

* **GitHub**: [@HimanshuKumar27](https://github.com/HimanshuKumar27)
* **LinkedIn**: [365himanshukumar](https://www.linkedin.com/in/365himanshukumar/)
* **Email**: 365himanshukumar@gmail.com
