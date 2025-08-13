# 🚀 Space Web - Animated Space Theme

A beautiful, animated space-themed React application with cosmic gradients, twinkling stars, and smooth dark/light mode transitions.

## ✨ Features

- **🌌 Space Theme**: Cosmic gradients and animated starfield background
- **🌙 Dark/Light Mode**: Toggle between themes with localStorage persistence
- **✨ Smooth Animations**: Framer Motion powered transitions and hover effects
- **📱 Fully Responsive**: Looks great on all devices
- **🎨 Modern UI**: Professional design with Tailwind CSS
- **⚡ Fast**: Built with Vite for lightning-fast development

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to `http://localhost:5173` to see your space-themed app!

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **PostCSS** - CSS processing

## 📁 Project Structure

```
SpaceWeb/
├── src/
│   ├── App.tsx          # Main app component
│   ├── SpacePage.tsx    # Space-themed page component
│   └── index.css        # Global styles with Tailwind
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── README.md           # This file
```

## 🎨 Customization

### Colors
The app uses a cosmic color palette. You can customize colors in `tailwind.config.js` or modify the gradient classes in `SpacePage.tsx`.

### Animations
All animations are powered by Framer Motion. Modify the `motion` components in `SpacePage.tsx` to adjust timing, easing, and effects.

### Stars
The starfield generates 50 animated stars. You can adjust the number, size, and animation timing in the `Stars` component.

## 🌟 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

Build your app for production:
```bash
npm run build
```

The built files will be in the `dist/` folder, ready to deploy to any static hosting service like Vercel, Netlify, or GitHub Pages.

## 🤝 Contributing

Feel free to enhance this space theme! Some ideas:
- Add floating planets
- Include astronaut animations
- Create interactive star maps
- Add space sound effects

## 📄 License

This project is open source and available under the MIT License.

---

**Ready to explore the cosmos?** 🌌✨
