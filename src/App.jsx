import { useState } from 'react';
import { Zap, Shield, Star, CheckCircle } from 'lucide-react';
import SuperheroSelector from './components/SuperheroSelector';
import ImageUpload from './components/ImageUpload';
import ApiKeyInput from './components/ApiKeyInput';
import ImageProcessor from './components/ImageProcessor';
import './App.css';

function App() {
  const [selectedHero, setSelectedHero] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini');
  const [currentStep, setCurrentStep] = useState(1);

  // Directly apply dark class to HTML element
  // This ensures dark mode is always on, and removes the need for a toggle.
  document.documentElement.classList.add('dark');

  const steps = [
    { id: 1, title: 'Choose Hero', icon: Shield, description: 'Select your superhero' },
    { id: 2, title: 'Upload Image', icon: Star, description: 'Upload your photo' },
    { id: 3, title: 'API Setup', icon: Zap, description: 'Configure AI API key' },
    { id: 4, title: 'Transform', icon: Zap, description: 'Process image' }
  ];

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1: return selectedHero !== null;
      case 2: return selectedImage !== null;
      case 3: return apiKey.trim() !== '';
      case 4: return true;
      default: return false;
    }
  };

  const nextStep = () => {
    if (canProceedToNext() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetApp = () => {
    setSelectedHero(null);
    setSelectedImage(null);
    setApiKey('');
    setCurrentStep(1);
  };

  const handleHeroSelect = (heroId) => {
    console.log('App - Hero selected:', heroId);
    setSelectedHero(heroId);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SuperheroSelector
            selectedHero={selectedHero}
            onHeroSelect={handleHeroSelect}
          />
        );
      case 2:
        return (
          <ImageUpload
            onImageSelect={setSelectedImage}
            selectedImage={selectedImage}
          />
        );
      case 3:
        return (
          <ApiKeyInput
            apiKey={apiKey}
            onApiKeyChange={setApiKey}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        );
      case 4:
        return (
          <ImageProcessor
            selectedImage={selectedImage}
            selectedHero={selectedHero}
            apiKey={apiKey}
            selectedModel={selectedModel}
            onProcessingComplete={(result) => {
              console.log('Processing complete:', result);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-50">

      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10">
                <img
                  src="/logo.svg"
                  alt="OpenHero AI Logo"
                  className="w-full h-full filter brightness-0 invert"
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  OpenHero AI
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">Transform into your favorite superhero</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <a
                href="https://x.com/theprateektomar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 sm:space-x-2 text-slate-400 hover:text-white transition-colors"
                title="Follow @theprateektomar"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-xs sm:text-sm hidden sm:inline">@theprateektomar</span>
              </a>
              <button
                onClick={resetApp}
                className="text-xs sm:text-sm text-slate-400 hover:text-white px-3 sm:px-4 py-2 rounded border border-slate-600 hover:border-slate-500 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Progress Steps */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm ${
                    currentStep >= step.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </div>
                <div className="ml-2 sm:ml-3">
                  <p className={`text-sm sm:text-base font-medium ${
                    currentStep >= step.id ? 'text-white' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden sm:block w-6 sm:w-8 h-0.5 bg-slate-600 ml-2 sm:ml-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-slate-800 rounded-lg p-4 sm:p-6">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        {currentStep < steps.length && (
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-4 sm:mt-6">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="w-full sm:w-auto px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
            >
              ← Previous
            </button>
            <button
              onClick={nextStep}
              disabled={!canProceedToNext()}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
            >
              {currentStep === steps.length - 1 ? 'Finish Setup' : 'Next →'}
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 mt-8 sm:mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="text-center">
            <p className="text-slate-400 text-xs sm:text-sm">
              OpenHero AI - Powered by Gemini & GPT-Image-1
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
