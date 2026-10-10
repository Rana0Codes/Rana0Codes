# Juyel Rana

**Full-Stack Developer & Client-Side AI Builder**  
West Bengal, India

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-VisionOS_Desktop-6366f1?style=for-the-badge&logo=safari&logoColor=white)](https://rana0codes.github.io/Portfolio-v2/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/juyel-rana/)
[![GitHub](https://img.shields.io/badge/GitHub-Rana0Codes-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rana0Codes)

> Building privacy-first web utilities, client-side machine learning tools, and interactive digital experiences.  
> Focused on browser-native computation, responsive UI engineering, and transparent real-world performance.

---

## 📌 Featured Engineering Projects

A curated selection of production applications and systems codebases:

### 1. [ATS CV & Indian Biodata Studio](https://github.com/Rana0Codes/cv-template)
**Privacy-first, client-side resume and biodata authoring studio with native A4 vector PDF export.**
- **Problem Solved:** Generates clean, ATS-compliant resumes and Indian Biodatas without monthly subscriptions or server data harvesting.
- **Key Capabilities:** 5 modular layouts (ATS single-column, Indian Biodata, Minimalist Tech, Executive Classic, Creative Sidebar), real-time reactive editing, and zero-rasterization vector A4 printing via browser native print engine.
- **Privacy Architecture:** 100% client-side computation. All state persists exclusively in browser `localStorage`; zero external telemetry or server storage.
- **Tech Stack:** Vanilla JavaScript (ES6+), HTML5, Modular CSS3, Browser Print Engine, PWA Service Worker.
- **Links:** [🔗 Live Interactive Demo](https://rana0codes.github.io/cv-template/) • [📦 GitHub Repository](https://github.com/Rana0Codes/cv-template)

---

### 2. [Smart Image & Document Classifier](https://github.com/Rana0Codes/smart-image-document-detector)
**Edge-AI document vs. photograph classifier running client-side with MobileNetV2 and TensorFlow.js.**
- **Problem Solved:** Instant client-side classification of uploads into documents vs. photographs to automate intake workflows without sending images to external cloud APIs.
- **Model Architecture:** MobileNetV2 feature extractor fine-tuned with global average pooling, dropout (0.2), and a binary sigmoid head; UINT8 quantized (8.8 MB → 2.4 MB) for fast browser loading.
- **Performance:** 16.2 ms – 18.4 ms steady-state inference latency on modern desktop WebGL (preprocessing: ~2.1 ms, tensor inference: ~14–16 ms).
- **Documented Limitation:** Transparently documents known false-positive modes on identity cards (Aadhaar, driver licenses) containing embedded portrait photos.
- **Tech Stack:** Python, TensorFlow.js, MobileNetV2, Transfer Learning, WebGL, UINT8 Quantization.
- **Links:** [📦 GitHub Repository & Benchmarks](https://github.com/Rana0Codes/smart-image-document-detector)

---

### 3. [Anime Recommendation Studio (v2.0)](https://github.com/Rana0Codes/Anime-Recommendation-Generator)
**Interactive anime discovery engine powered by the AniList GraphQL API with high-resolution poster export.**
- **Problem Solved:** Solves discovery fatigue with fast GraphQL search autocompletion, random genre roulette, and exportable high-resolution recommendation graphics.
- **Key Capabilities:** AniList GraphQL query service, 4 switchable visual themes (Cyberpunk Neon, Dark Onyx, Sakura Night, Sunset Synthwave), weekly 3-slot showcase assembler, and 1-click 1920x1080 Full HD export via `html2canvas`.
- **CORS-Resilient Design:** Features local image drag-and-drop with automatic base64 conversion for 100% reliable canvas export without external CDN CORS blocks.
- **Tech Stack:** React 18, Material-UI (MUI v5), Emotion, AniList GraphQL, html2canvas, JavaScript ES6+.
- **Links:** [📦 GitHub Repository](https://github.com/Rana0Codes/Anime-Recommendation-Generator)

---

### 4. [Juyel.OS — Titanium VisionOS Web Desktop](https://github.com/Rana0Codes/Portfolio-v2)
**Titanium VisionOS-inspired desktop web operating system and interactive portfolio showcase.**
- **Problem Solved:** Creates an immersive, memorable developer portfolio experience showcasing pure web craftsmanship without heavy framework dependencies.
- **Key Capabilities:** Multi-window glassmorphic desktop environment, movable & resizable windows, real-time Web Audio API visualizer with `AudioContext` and `AnalyserNode`, and integrated app ecosystem.
- **Zero-Framework Architecture:** Engineered with 100% pure Vanilla JavaScript modules and modular CSS3. Zero React, zero Vue, zero UI framework dependencies.
- **Tech Stack:** Vanilla JavaScript ES6+, Glassmorphic CSS3, Web Audio API, Canvas API, Zero External Dependencies.
- **Links:** [🔗 Live Interactive Demo](https://rana0codes.github.io/Portfolio-v2/) • [📦 GitHub Repository](https://github.com/Rana0Codes/Portfolio-v2)

---

### 5. [Full-Stack Portfolio & CMS Dashboard](https://github.com/Rana0Codes/Portfolio)
**Dynamic developer portfolio featuring real-time project management via Firebase Firestore.**
- **Problem Solved:** Enables dynamic portfolio updates and case study publishing without rebuilding or redeploying static site files.
- **Key Capabilities:** Dynamic project rendering from Firestore, authenticated Admin management portal, schema-enforced database validation rules, and spam-protected Web3Forms contact pipeline.
- **Security & Data:** Granular Firestore security rules enforcing public read and authenticated write operations with schema verification helpers.
- **Tech Stack:** JavaScript ES6+, Google Firebase Firestore, Firebase Authentication, Web3Forms, Security Rules.
- **Links:** [📦 GitHub Repository](https://github.com/Rana0Codes/Portfolio)

---

## 🛠️ Core Technical Stack

```text
Frontend & UI        │ React 18, Vanilla JavaScript (ES6+), Material-UI (v5), Tailwind CSS, Glassmorphic CSS3
Backend & APIs       │ Node.js, Express, Firebase Firestore & Auth, GraphQL (AniList), RESTful APIs
Machine Learning     │ TensorFlow.js, Python, MobileNetV2, Edge AI, Transfer Learning, UINT8 Quantization
Browser APIs         │ Web Audio API, HTML5 Canvas, LocalStorage, File API, Native Print Engine
Tooling & DevOps     │ Git, GitHub Pages, npm, Vite, Postman, Chrome DevTools
```

---

## 🧭 Engineering Philosophy

- **Client-Side Privacy:** Prioritizing browser-native computation (in-browser ML, client-side vector PDF generation) to preserve user data privacy without backend dependency.
- **Craft Over Framework Bloat:** Deep appreciation for core browser primitives (Vanilla JS, Canvas, Web Audio, CSS Grid/Flexbox) alongside modern component frameworks (React 18).
- **Transparent Engineering:** Real benchmarks, documented edge cases, and reproducible evaluation suites over unverifiable hype.

---

## 📬 Connect & Next Steps

- **Live Showcase:** Explore the interactive desktop experience at [rana0codes.github.io/Portfolio-v2](https://rana0codes.github.io/Portfolio-v2/)
- **Professional Network:** Connect on LinkedIn at [linkedin.com/in/juyel-rana](https://www.linkedin.com/in/juyel-rana/)
- **Interactive Tools:** Build a resume with zero setup at [rana0codes.github.io/cv-template](https://rana0codes.github.io/cv-template/)
- **Contact:** For collaboration, contract work, or opportunities, connect via LinkedIn or reach out through the portfolio contact form.

---

<div align="center">
  <sub>Engineered for <a href="https://github.com/Rana0Codes">@Rana0Codes</a> • Juyel Rana • Updated October 2026</sub>
</div>
