# 🌟 VirtuSpace - Enterprise AR Furniture Visualization Platform

![VirtuSpace Banner](https://img.shields.io/badge/VirtuSpace-AR%20Platform-purple?style=for-the-badge&logo=react)

**VirtuSpace** is a cutting-edge Augmented Reality (AR) platform that revolutionizes furniture shopping and interior design. Experience photorealistic 3D furniture models in your real space using advanced AR technology, voice commands, and collaborative features.

## ✨ Features

### 🎯 Core AR Experience
- **Real-time AR Visualization** - Place furniture in your actual space
- **Surface Detection** - Automatic floor and wall detection
- **Voice Commands** - Control AR with natural language (18+ commands)
- **Gesture Controls** - Intuitive touch and drag interactions
- **High-Quality 3D Models** - Photorealistic furniture rendering

### 🚀 Advanced Features
- **Real-time Collaboration** - Multi-user AR sessions
- **AI-Powered Recommendations** - Personalized furniture suggestions
- **Advanced Analytics** - Comprehensive engagement metrics
- **Cloud Synchronization** - Cross-device data sync
- **Performance Monitoring** - Real-time optimization
- **Export & Sharing** - Multiple formats (PNG, MP4, GLTF, USDZ)

### 💼 Enterprise Features
- **Marketplace Integration** - Creator economy platform
- **Advanced Search** - AI-powered content discovery
- **Notification System** - Real-time engagement alerts
- **Tutorial System** - Interactive onboarding
- **Shopping Integration** - AR-enabled e-commerce

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern component library

### 3D & AR
- **React Three Fiber** - React renderer for Three.js
- **Three.js** - 3D graphics library
- **@react-three/drei** - Useful helpers for R3F
- **WebXR** - Web-based AR/VR experiences

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern browser with camera support
- HTTPS (required for camera access)

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/Chaitanyahoon/virtuspace.git
cd virtuspace

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
open http://localhost:3000
\`\`\`

### Required Dependencies

\`\`\`bash
# Core dependencies
npm install @radix-ui/react-accordion @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dropdown-menu @radix-ui/react-progress @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs

# 3D and AR libraries
npm install @react-three/fiber @react-three/drei @react-three/xr three

# UI and styling
npm install class-variance-authority clsx lucide-react tailwind-merge tailwindcss-animate

# Development dependencies
npm install -D @types/three
\`\`\`

## 📱 Usage

### AR Experience
1. **Navigate to AR**: Click "Try AR" or visit `/ar`
2. **Allow Camera**: Grant camera permissions when prompted
3. **Detect Surface**: Point camera at flat surface
4. **Place Furniture**: Select models from the library
5. **Interact**: Use voice commands or touch gestures

### Voice Commands
- "Place chair" - Add furniture
- "Rotate left/right" - Rotate objects
- "Make it bigger/smaller" - Scale objects
- "Move up/down" - Adjust position
- "Take screenshot" - Capture AR scene
- "Delete" - Remove current object
- "Reset" - Reset scene

### Dashboard Features
- **Upload Models** - Add custom 3D furniture
- **View Analytics** - Track engagement metrics
- **Manage Sessions** - Organize AR experiences
- **Cloud Sync** - Sync across devices

## 🌐 Deployment

### Vercel (Recommended)

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

### Manual Deployment

\`\`\`bash
# Build for production
npm run build

# Start production server
npm start
\`\`\`

### Environment Variables

env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://virtuspace.vercel.app/

 

## 🎮 Key Components

### AR Scene (`components/ar-scene.tsx`)
- Renders 3D models in AR space
- Handles object transformations
- Manages lighting and shadows

### Model Library (`components/model-library.tsx`)
- Displays available 3D furniture
- Categorized browsing
- Search and filter functionality

### Voice Commands (`components/voice-commands.tsx`)
- Speech recognition integration
- Natural language processing
- 18+ voice commands

### Collaboration System (`components/collaboration-system.tsx`)
- Real-time multi-user sessions
- Role-based permissions
- Live cursor tracking

## 🔧 Configuration

### Camera Settings
javascript
// Optimal camera configuration
const cameraConfig = {
  video: {
    facingMode: "environment",
    width: { ideal: 1920 },
    height: { ideal: 1080 }
  }
}

### Performance Optimization
javascript
// next.config.js
const nextConfig = {
  images: {
    domains: ['blob.dev'],
    unoptimized: true
  },
  experimental: {
    optimizeCss: true
  }
}

## 🐛 Troubleshooting

### Camera Issues
- **HTTPS Required**: Camera only works on HTTPS
- **Permissions**: Check browser camera permissions
- **Mobile Safari**: May require user gesture to start

### Performance Issues
- **Memory Usage**: Monitor with browser dev tools
- **3D Rendering**: Reduce model complexity if needed
- **Network**: Optimize asset loading

### Build Errors
\`\`\`bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
\`\`\`

## 📊 Analytics & Monitoring

### Built-in Analytics
- User engagement metrics
- AR session duration
- Model interaction data
- Performance monitoring

### Vercel Analytics
- Core Web Vitals
- Page load times
- User demographics
- Error tracking

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit changes (\`git commit -m 'Add amazing feature'\`)
4. Push to branch (\`git push origin feature/amazing-feature\`)
5. Open Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier
- Write meaningful commit messages
- Test on multiple devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **shadcn/ui** - Beautiful component library
- **Vercel** - Hosting and deployment platform
- **Radix UI** - Accessible component primitives

## 📞 Support

- **Documentation**: [docs.virtuspace.com](https://docs.virtuspace.com)
- **Issues**: [GitHub Issues](https://github.com/Chaitanyahoon/virtuspace/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Chaitanyahoon/virtuspace/discussions)
- **Email**: support@virtuspace.com

## 🚀 Roadmap

### Q1 2024
- [ ] WebXR support for VR headsets
- [ ] Advanced physics simulation
- [ ] Multi-room scene management

### Q2 2024
- [ ] Mobile app (React Native)
- [ ] AI-powered interior design
- [ ] Social sharing features

### Q3 2024
- [ ] Enterprise dashboard
- [ ] API for third-party integrations
- [ ] Advanced analytics

---

**Made with ❤️ by the VirtuSpace Team**

![GitHub stars](https://img.shields.io/github/stars/Chaitanyhoon/virtuspace?style=social)
![GitHub forks](https://img.shields.io/github/forks/Chaitanyahoon/virtuspace?style=social)
![GitHub issues](https://img.shields.io/github/issues/Chaitanyahoon/virtuspace)
![GitHub license](https://img.shields.io/github/license/Chaitanyahoon/virtuspace)


Now let me fix the camera issues for the hosted version:

