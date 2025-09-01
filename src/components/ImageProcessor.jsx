import { useState } from 'react';
import { Wand2, Download, RefreshCw, CheckCircle, AlertCircle, Eye, Info } from 'lucide-react';
import aiService from '../services/aiService';
import { superheroMasks } from '../data/superheroMasks';

export default function ImageProcessor({ 
  selectedImage, 
  selectedHero, 
  apiKey,
  onProcessingComplete 
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showMaskDetails, setShowMaskDetails] = useState(false);

  const canProcess = selectedImage && selectedHero && apiKey && !isProcessing;
  const heroMask = superheroMasks[selectedHero];

  // Utility function to clean up old images from localStorage
  const cleanupOldImages = () => {
    try {
      const keys = Object.keys(localStorage);
      const imageKeys = keys.filter(key => key.startsWith('generated_image_'));

      if (imageKeys.length > 5) { // Keep only the 5 most recent images
        // Sort by timestamp (newest first)
        const sortedKeys = imageKeys.sort((a, b) => {
          const timeA = parseInt(a.replace('generated_image_', ''));
          const timeB = parseInt(b.replace('generated_image_', ''));
          return timeB - timeA;
        });

        // Remove older images
        const keysToRemove = sortedKeys.slice(5);
        keysToRemove.forEach(key => {
          localStorage.removeItem(key);
          localStorage.removeItem(`${key}_mime`);
        });

        console.log(`Cleaned up ${keysToRemove.length} old images from localStorage`);
      }
    } catch (error) {
      console.warn('Error cleaning up localStorage:', error);
    }
  };

  const processImage = async () => {
    if (!canProcess || !heroMask) return;

    // Validate API key before processing
    if (!apiKey || apiKey.trim() === '') {
      setError('Please enter a valid Gemini API key');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProgress(0);
    setProcessedImage(null);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // Use the detailed transformation prompt from the mask data
      const transformationPrompt = heroMask.transformationPrompt;
      console.log('Processing image with prompt:', transformationPrompt);
      console.log('API key length:', apiKey.length);
      
      const result = await aiService.processImageWithPrompt(apiKey, selectedImage, transformationPrompt);
      
      clearInterval(progressInterval);
      setProgress(100);

      // Handle the Gemini result
      console.log('Full Gemini response:', result);
      console.log('Response candidates:', result.candidates);
      console.log('First candidate content:', result.candidates[0].content);
      console.log('Content parts:', result.candidates[0].content.parts);
      
      if (result.candidates && result.candidates[0].content.parts) {
        const parts = result.candidates[0].content.parts;
        let imageFound = false;
        
        for (const part of parts) {
          console.log('Processing part:', part);
          
          // Check for inlineData (base64 image) - this is what Gemini returns
          if (part.inlineData) {
            console.log('Found inlineData:', part.inlineData);
            // Convert base64 to blob URL for display
            const byteCharacters = atob(part.inlineData.data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: part.inlineData.mimeType });
            const imageUrl = URL.createObjectURL(blob);
            
            // Clean up old images first to free up space
            cleanupOldImages();

            // Try to store image in local storage for download (with error handling for large images)
            const imageKey = `generated_image_${Date.now()}`;
            let storageKey = null;

            try {
              // Check if the data is too large before attempting to store
              const dataSize = part.inlineData.data.length * 0.75; // Base64 is ~33% larger than binary
              if (dataSize < 4 * 1024 * 1024) { // Less than 4MB to be safe
                localStorage.setItem(imageKey, part.inlineData.data);
                localStorage.setItem(`${imageKey}_mime`, part.inlineData.mimeType);
                storageKey = imageKey;
              } else {
                console.warn('Image too large for localStorage, skipping storage but keeping blob URL for download');
              }
            } catch (storageError) {
              if (storageError.name === 'QuotaExceededError') {
                console.warn('localStorage quota exceeded, image will not be cached for download but download will still work');
              } else {
                console.error('Error storing image:', storageError);
              }
            }

            setProcessedImage({
              type: 'image',
              url: imageUrl,
              superheroName: heroMask.name,
              maskDetails: heroMask,
              storageKey: storageKey,
              base64Data: storageKey ? null : part.inlineData.data, // Keep base64 data if not stored
              mimeType: part.inlineData.mimeType,
              largeImageWarning: !storageKey // Flag to show warning about large image
            });
            imageFound = true;
            break;
          }
          
          // Check for text content
          if (part.text) {
            console.log('Found text part:', part.text);
          }
        }
        
        // If no image was found, show text response
        if (!imageFound) {
          console.log('No image found, showing text response');
          setProcessedImage({
            type: 'text',
            content: result.candidates[0].content.parts[0].text || 'Image processing completed',
            superheroName: heroMask.name,
            maskDetails: heroMask
          });
        }
      } else {
        // Fallback for unexpected response structure
        console.log('Unexpected response structure, showing raw response');
        setProcessedImage({
          type: 'text',
          content: `Processing completed. Response: ${JSON.stringify(result, null, 2)}`,
          superheroName: heroMask.name,
          maskDetails: heroMask
        });
      }

      if (onProcessingComplete) {
        onProcessingComplete(result);
      }

    } catch (err) {
      console.error('Image processing error:', err);
      setError(err.message);
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (processedImage && processedImage.type === 'image') {
      try {
        let blob;

        // First, try to get the stored image data from local storage
        const imageKey = processedImage.storageKey;
        if (imageKey && localStorage.getItem(imageKey)) {
          const base64Data = localStorage.getItem(imageKey);
          const mimeType = localStorage.getItem(`${imageKey}_mime`) || processedImage.mimeType || 'image/png';

          // Convert base64 to blob
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          blob = new Blob([byteArray], { type: mimeType });
        }
        // If not in localStorage, check if we have base64 data directly
        else if (processedImage.base64Data) {
          const mimeType = processedImage.mimeType || 'image/png';

          // Convert base64 to blob
          const byteCharacters = atob(processedImage.base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          blob = new Blob([byteArray], { type: mimeType });
        }
        // Fallback: try to fetch the blob from the displayed image URL
        else {
          console.log('No stored data, using blob URL for download');
          const link = document.createElement('a');
          link.href = processedImage.url;
          link.download = `openhero-${selectedHero}-${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return;
        }

        // Create download link from blob
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `openhero-${selectedHero}-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the object URL
        URL.revokeObjectURL(link.href);

      } catch (error) {
        console.error('Download error:', error);
        // Final fallback to simple download
        const link = document.createElement('a');
        link.href = processedImage.url;
        link.download = `openhero-${selectedHero}-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const resetProcessor = () => {
    setProcessedImage(null);
    setError(null);
    setProgress(0);
  };

  if (!heroMask) {
    return (
      <div className="text-center text-gray-500">
        <p>No superhero selected. Please choose a hero first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">Transform Your Image</h3>
        <p className="text-gray-600 dark:text-gray-400">Apply the {heroMask.name} transformation</p>
      </div>

      {/* Mask Reference Section */}
      <div className="bg-gray-50 rounded-lg p-4 dark:bg-gray-800">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900 dark:text-gray-50">Mask Reference</h4>
          <button
            onClick={() => setShowMaskDetails(!showMaskDetails)}
            className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <Eye className="w-4 h-4" />
            <span>{showMaskDetails ? 'Hide' : 'Show'} Details</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mask Image */}
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${heroMask.color} rounded-lg flex items-center justify-center dark:bg-opacity-20 dark:bg-gray-600`}>
              {heroMask.maskImage ? (
                <img 
                  src={heroMask.maskImage} 
                  alt={`${heroMask.name} mask`}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <Eye className="w-6 h-6 text-white dark:text-gray-300" />
              )}
            </div>
            <div>
              <h5 className="font-medium text-gray-900 dark:text-gray-50">{heroMask.name}</h5>
            </div>
          </div>
        </div>

        {/* Detailed Mask Information */}
        {showMaskDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <h5 className="font-medium text-gray-900 dark:text-gray-50 mb-2">Transformation Details</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {heroMask.transformationPrompt}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Processing Controls */}
      {!processedImage && !error && (
        <div className="text-center">
          <button
            onClick={processImage}
            disabled={!canProcess}
            className={`hero-button-primary ${
              !canProcess ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Wand2 className="w-5 h-5 mr-2" />
            Transform Image
          </button>
        </div>
      )}

      {/* Processing Progress */}
      {isProcessing && (
        <div className="space-y-4">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 text-primary-500 animate-spin mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">Processing your image...</p>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">{progress}% complete</p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 dark:bg-red-900 dark:border-red-700">
          <div className="flex items-center space-x-2 text-red-600 dark:text-red-100">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Error</span>
          </div>
          <p className="text-red-600 dark:text-red-200 mt-2">{error}</p>
          <button
            onClick={resetProcessor}
            className="mt-3 hero-button-secondary"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Results Display */}
      {processedImage && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 dark:bg-green-900 dark:border-green-700">
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-100">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Transformation Complete!</span>
            </div>
            <p className="text-green-600 dark:text-green-200 mt-1">
              Your image has been transformed into {processedImage.superheroName}!
            </p>
          </div>

          {processedImage.type === 'image' ? (
            <div className="space-y-4">
              <img
                src={processedImage.url}
                alt={`${processedImage.superheroName} transformation`}
                className="w-full rounded-xl shadow-lg dark:bg-gray-700"
              />

              {/* Large image warning */}
              {processedImage.largeImageWarning && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 dark:bg-amber-900 dark:border-amber-700">
                  <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-100">
                    <Info className="w-5 h-5" />
                    <span className="font-medium">Large Image Notice</span>
                  </div>
                  <p className="text-amber-600 dark:text-amber-200 mt-1 text-sm">
                    This image is quite large and won't be cached for future downloads, but you can still download it now using the button below.
                  </p>
                </div>
              )}

              <div className="flex justify-center space-x-4">
                <button
                  onClick={downloadImage}
                  className="hero-button-primary"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Image
                </button>
                <button
                  onClick={resetProcessor}
                  className="hero-button-secondary"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Process Another
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-2">AI Response:</h4>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{processedImage.content}</p>
              </div>
              <div className="text-center">
                <button
                  onClick={resetProcessor}
                  className="hero-button-secondary"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Process Another
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
