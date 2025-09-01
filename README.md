# OpenHero AI 🦸‍♂️

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-netlify-site-id/deploy-status)](https://app.netlify.com/sites/openheroai/deploys)

An open-source platform where users can upload their images and transform them with iconic superhero masks from a selection of the top 20 superheroes, including Batman, Spider-Man, Superman, and many more. Powered by Google's Gemini AI for stunning image transformations that preserve your original background and lighting.

## ✨ Features

- **Superhero Mask Selection**: Choose from 20 iconic superheroes (Batman, Spider-Man, Superman, Iron Man, etc.)
- **Multiple Upload Methods**: Drag & drop, file browser, or paste images (Ctrl+V/Cmd+V)
- **AI-Powered Transformation**: Powered by Google's Gemini 2.5 Flash for precise image transformations
- **Background Preservation**: AI preserves original backgrounds, lighting, and environment
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with step-by-step workflow
- **Download Ready**: Export your transformed images instantly

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** - Download from [nodejs.org](https://nodejs.org)
- **npm** (comes with Node.js) or **yarn**
- **Gemini API Key** from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/prateektomar123/OpenHeroAI.git
cd openheroai
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🔧 API Configuration

### Gemini API Setup (Required)

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key
5. Paste it in the OpenHero AI app when prompted

**Note:** The app currently uses Google's Gemini 2.5 Flash Image Preview model for optimal image transformation results.

## 🎯 How to Use

1. **Choose Your Hero**: Select from 20 iconic superheroes
2. **Upload Image**: Drag & drop, click to browse, or paste image (Ctrl+V/Cmd+V)
3. **Configure API**: Enter your Gemini API key
4. **Transform**: Click transform and watch the AI work its magic
5. **Download**: Save your superhero transformation

**Pro Tip:** You can paste images directly from your clipboard using Ctrl+V (Windows/Linux) or Cmd+V (Mac)!

## 🎮 Live Demo

Try it out live at: [https://openheroai.netlify.app/](https://openheroai.netlify.app/)

## 📸 Screenshots

_Coming soon - Add screenshots of your app in action!_

## 🏗️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Image Handling**: React Dropzone
- **AI Integration**: Google Gemini 2.5 Flash Image Preview
- **Build Tool**: Vite
- **Deployment**: Netlify (recommended)

## 📁 Project Structure

```
src/
├── components/
│   ├── SuperheroSelector.jsx    # Hero selection interface
│   ├── ImageUpload.jsx          # Image upload component
│   ├── ApiKeyInput.jsx          # API configuration
│   └── ImageProcessor.jsx       # AI processing workflow
├── services/
│   └── aiService.js             # AI API integration
├── App.jsx                      # Main application
└── index.css                    # Global styles
```

## 🚀 Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Deploy automatically with zero configuration
4. Your app will be live instantly!

### Manual Build

```bash
# Build for production
npm run build

# Preview the build locally
npm run preview
```

### Environment Variables

No environment variables are required for basic functionality. Users configure their own Gemini API keys through the app interface.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
npm install
npm run dev
```

### Areas for Contribution

- 🦸‍♂️ **New Superheroes**: Add more superhero options
- 🎨 **UI/UX Improvements**: Enhance the user interface
- ⚡ **Performance**: Optimize loading and processing times
- 📱 **Mobile Experience**: Improve mobile responsiveness
- 🌐 **Internationalization**: Add support for multiple languages
- 🧪 **Testing**: Add unit and integration tests

### Guidelines

- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 🗺️ Roadmap

### ✅ Completed Features

- [x] Core AI image transformation functionality
- [x] 20 superhero options
- [x] Responsive design for all devices
- [x] Paste image support (Ctrl+V/Cmd+V)
- [x] Background preservation in transformations
- [x] Netlify deployment ready

### 🚧 In Progress

- [ ] Add more superhero options
- [ ] Implement user accounts and image history
- [ ] Add batch processing for multiple images

### 🔮 Future Plans

- [ ] Mobile app versions (React Native)
- [ ] Advanced customization options
- [ ] Integration with other AI models
- [ ] Community superhero submissions
- [ ] Premium features for power users

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Powered by [Gemini 2.5 Flash Image Preview](https://ai.google.dev/gemini-api)
- Icons by [Lucide](https://lucide.dev)
- Built with [React](https://react.dev) and [Vite](https://vitejs.dev)

## 📞 Support & Connect

- **GitHub Issues**: [Create an issue](https://github.com/prateektomar123/OpenHeroAI/issues) for bug reports and feature requests
- **Connect on X**: [@theprateektomar](https://x.com/theprateektomar) - Let's connect and discuss AI, development, and superhero transformations!

---

Made with ❤️ by [Prateek Tomar](https://x.com/theprateektomar)
