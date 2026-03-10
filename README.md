<div align="center">

# 🔮 One-Click LinkedIn Article Image Generator
**The "Gold-Standard" $100M SaaS Experience, Fully Open Source.**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg?style=for-the-badge)](https://github.com/msk0442/One-Click-LinkedIn-Article-Image-Generator)
[![Next.js 14](https://img.shields.io/badge/Next.js%2014-Black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)

*Bring Your Own Key (BYOK) architecture. 100% Client-Side Privacy. Built by Muhammad Schees.*

---

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmsk0442%2FOne-Click-LinkedIn-Article-Image-Generator)

</div>

## 🚀 The Vision

We believe open-source tools shouldn't look like an afterthought. They should look like highly-funded, Apple-meets-Linear premium products. 

This generator completely automates creating visually striking, CTR-optimized LinkedIn article covers. No more fiddling with Canva or Photoshop—just type your topic and get a masterpiece in seconds.

## 👶 Step-by-Step for Everyone (The Non-Technical Guide)

Even if you've never used code before, you can use this like a pro! 

1. **Deploy It** ☁️ - Click that big blue `Deploy with Vercel` button above. It takes 2 minutes and is completely free!
2. **Open the Settings** ⚙️ - Click "Settings" in the top right corner of your new shiny website.
3. **Add Your Key** 🔑 - Paste your API key (from OpenAI, Replicate, etc). Don't worry! This is stored **securely on your computer only** (Bring Your Own Key style). No one else can see or use it.
4. **Generate Magic** 🪄 - Type out what your LinkedIn article is about: *"A guide to managing burnout as an entrepreneur."* 
5. **Download & Post** 📥 - Your beautiful custom 1200x627 image will pop up. Click download and upload it to LinkedIn. Boom! 🚀

## 🏗 Project Structure

A clean, modular, scalable architecture favored by Senior Engineers.

```text
📦 One-Click-LinkedIn-Article-Image-Generator
 ┣ 📂 src
 ┃ ┣ 📂 app
 ┃ ┃ ┣ 📜 globals.css      # Themed Variables & Tailwind
 ┃ ┃ ┣ 📜 layout.tsx       # Root Layout (Dark Mode Default)
 ┃ ┃ ┗ 📜 page.tsx         # Immersive Framer-Motion Landing Page
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 ui               # Shadcn/UI Atomic Reusable Components
 ┃ ┃ ┣ 📜 ImageGenerator.tsx # Core feature implementation
 ┃ ┃ ┣ 📜 Navbar.tsx         # sleek, Glassmorphic application Topbar
 ┃ ┃ ┗ 📜 SettingsPanel.tsx  # Secure BYOK Credential Manager
 ┃ ┣ 📂 hooks
 ┃ ┃ ┗ 📜 useLocalStorage.ts # Custom Stateful Client Hook
 ┃ ┗ 📂 lib
 ┃ ┃ ┗ 📜 utils.ts         # Generic TS utilities (e.g. merge classes)
 ┣ 📜 .env.example         # Template for Server/Client environment keys
 ┣ 📜 components.json      # Shadcn Config
 ┗ 📜 tailwind.config.ts   # Advanced animation + theme directives
```

## 🔐 Security by Design

This application uses the **Bring Your Own Key (BYOK)** methodology. 
All keys are managed purely via `localStorage` directly in the browser. The underlying architecture ensures no sensitive strings are hardcoded, and no intermediary servers proxy your private keys. 

## 👨‍💻 Meet the Developer

**Muhammad Schees**  
*Generative AI Professional & Technical Visionary*

I build intelligent, AI-driven solutions that marry complex reasoning capabilities with $100M-feeling front-end aesthetics. If you appreciate highly robust AI architectures and immersive user experiences:

- 💼 **Let's Connect:** [LinkedIn Profile](https://www.linkedin.com/in/muhammadschees/)
- 🐙 **More Projects:** [GitHub @msk0442](https://github.com/msk0442)

## 📄 License

This project is open-sourced under the pristine **MIT License**. Build, iterate, profit, and create magic. 
