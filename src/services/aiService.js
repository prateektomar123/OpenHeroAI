import { GoogleGenAI } from "@google/genai";

class AIService {
  constructor() {
    this.model = "gemini-2.5-flash-image-preview";
  }

  async processImage(apiKey, imageFile, superheroName) {
    try {
      if (!apiKey || apiKey.trim() === '') {
        throw new Error('API key is required');
      }

      // Convert image file to base64
      const base64Image = await this.fileToBase64(imageFile);
      
      // Initialize Google GenAI with proper API key format
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
      
      const prompt = [
        {
          text: `Transform this person into ${superheroName}. Apply the ${superheroName} mask and superhero costume elements to their face and upper body. Make it look realistic and professional, maintaining the person's facial features while adding the superhero elements. The result should look like they are actually wearing the ${superheroName} costume.`
        },
        {
          inlineData: {
            mimeType: imageFile.type,
            data: base64Image,
          },
        },
      ];

      const response = await ai.models.generateContent({
        model: this.model,
        contents: prompt,
      });

      // Extract image data from the response
      if (response.response && response.response.candidates && response.response.candidates[0]) {
        const candidate = response.response.candidates[0];

        if (candidate.content && candidate.content.parts) {
          // Check all parts for image data
          for (let i = 0; i < candidate.content.parts.length; i++) {
            const part = candidate.content.parts[i];

            // Check for image data first, even if text is present
            if (part.inlineData && part.inlineData.data) {
              console.log(`🎉 SUCCESS: Got image data in part ${i}!`);
              console.log(`   MIME Type: ${part.inlineData.mimeType}`);
              console.log(`   Data length: ${part.inlineData.data.length}`);

              // Return the image data
              return {
                success: true,
                imageData: part.inlineData.data,
                mimeType: part.inlineData.mimeType,
                description: part.text || 'Generated superhero transformation'
              };
            }
          }
        }
      }

      // If no image data found, return the original response for debugging
      return response;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error(`Gemini API Error: ${error.message}`);
    }
  }

  async processImageWithPrompt(apiKey, imageFile, customPrompt) {
    try {
      if (!apiKey || apiKey.trim() === '') {
        throw new Error('API key is required');
      }

      // Convert image file to base64
      const base64Image = await this.fileToBase64(imageFile);
      
      // Initialize Google GenAI with proper API key format
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
      
      const prompt = [
        { text: customPrompt },
        {
          inlineData: {
            mimeType: imageFile.type,
            data: base64Image,
          },
        },
      ];

      const response = await ai.models.generateContent({
        model: this.model,
        contents: prompt,
      });

      // Extract image data from the response
      if (response.response && response.response.candidates && response.response.candidates[0]) {
        const candidate = response.response.candidates[0];

        if (candidate.content && candidate.content.parts) {
          // Check all parts for image data
          for (let i = 0; i < candidate.content.parts.length; i++) {
            const part = candidate.content.parts[i];

            // Check for image data first, even if text is present
            if (part.inlineData && part.inlineData.data) {
              console.log(`🎉 SUCCESS: Got image data in part ${i}!`);
              console.log(`   MIME Type: ${part.inlineData.mimeType}`);
              console.log(`   Data length: ${part.inlineData.data.length}`);

              // Return the image data
              return {
                success: true,
                imageData: part.inlineData.data,
                mimeType: part.inlineData.mimeType,
                description: part.text || 'Generated image with custom prompt'
              };
            }
          }
        }
      }

      // If no image data found, return the original response for debugging
      return response;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error(`Gemini API Error: ${error.message}`);
    }
  }

  async fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  }

  // Method to validate API key format
  validateAPIKey(apiKey) {
    if (!apiKey || typeof apiKey !== 'string') {
      return { valid: false, error: 'API key must be a non-empty string' };
    }
    
    const trimmedKey = apiKey.trim();
    if (trimmedKey.length === 0) {
      return { valid: false, error: 'API key cannot be empty' };
    }
    
    // Gemini API keys are typically longer
    if (trimmedKey.length < 20) {
      return { valid: false, error: 'Gemini API key must be at least 20 characters long' };
    }
    
    return { valid: true };
  }

  // Test API key connection
  async testAPIKey(apiKey) {
    try {
      if (!apiKey || apiKey.trim() === '') {
        return { valid: false, error: 'API key is required' };
      }

      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
      
      // Try to get available models to test the connection
      const models = await ai.models.list();
      // console.log("Full models object from ai.models.list():", models);
      
      return { valid: true, models: models.pageInternal };
    } catch (error) {
      console.error('API key test error:', error);
      return { valid: false, error: `API key test failed: ${error.message}` };
    }
  }
}

export default new AIService();
