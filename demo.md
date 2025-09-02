# OpenHero AI Demo Guide 🚀

## Quick Start Demo

### 1. Start the Application

```bash
npm run dev
```

Open http://localhost:5173 in your browser

### 2. Demo Workflow

#### Step 1: Choose Your Hero

- Browse through the 20 available superheroes
- Click on any hero (e.g., Batman, Spider-Man, Superman)
- Notice the visual feedback and selection indicator

#### Step 2: Upload an Image

- Drag & drop an image or click to select
- Supported formats: JPEG, PNG, GIF, WebP
- Max file size: 10MB
- Preview your selected image

#### Step 3: Configure API

- Choose between Gemini or GPT-Image-1
- Enter your API key
- Get API keys from:
  - Gemini: https://makersuite.google.com/app/apikey
  - GPT-Image-1: https://platform.openai.com/api-keys

#### Step 4: Transform Image

- Click "Transform Image" button
- Watch the progress bar
- View the AI-generated result
- Download your superhero transformation

### 3. Test Images

For testing, you can use:

- Portrait photos (works best)
- Clear facial features
- Good lighting
- Various image formats

### 4. Expected Results

- **Gemini API**: Returns generated superhero transformation image
- **GPT-Image-1 API**: Returns edited superhero transformation image
- Both provide actual transformed images (not just text descriptions)

### 5. Troubleshooting

- **API Key Issues**: Ensure valid API key is entered
- **Image Upload**: Check file size and format
- **Processing Errors**: Verify internet connection and API status
- **Browser Issues**: Use modern browsers (Chrome, Firefox, Safari, Edge)

### 6. Features to Test

- ✅ Hero selection with visual feedback
- ✅ Image upload with drag & drop
- ✅ API configuration switching
- ✅ Progress tracking during processing
- ✅ Error handling and user feedback
- ✅ Responsive design on different screen sizes
- ✅ Step-by-step navigation
- ✅ Reset functionality

## Demo Tips

1. **Start Simple**: Use a clear portrait photo for best results
2. **Test Both APIs**: Compare OpenRouter vs Gemini performance
3. **Try Different Heroes**: Each has unique characteristics
4. **Check Responsiveness**: Test on mobile and desktop
5. **Error Scenarios**: Test with invalid API keys or large files

## Next Steps

After testing:

1. Deploy to Vercel for production use
2. Customize superhero selection
3. Add more AI models
4. Implement user accounts
5. Add image gallery and sharing

---

Happy testing! 🦸‍♂️✨
