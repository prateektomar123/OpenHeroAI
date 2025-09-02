import { GoogleGenAI } from "@google/genai";

class AIService {
  constructor() {
    this.geminiModel = "gemini-2.5-flash-image-preview";
    this.openaiModel = "gpt-image-1"; // Using GPT-Image-1 for image editing
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

  // OpenAI image processing method using gpt-image-1 model
  async processImageWithOpenAI(apiKey, imageFile, superheroName) {
    try {
      if (!apiKey || apiKey.trim() === '') {
        throw new Error('API key is required');
      }

      // Import OpenAI dynamically
      const { OpenAI, toFile } = await import('openai');
      const openai = new OpenAI({
        apiKey: apiKey.trim(),
        dangerouslyAllowBrowser: true
      });

      // Convert image to PNG format for OpenAI
      const pngBlob = await this.convertToPNG(imageFile);

      // Convert blob to File object for OpenAI
      const imageFileObj = new File([pngBlob], 'input.png', { type: 'image/png' });

      // Use OpenAI's gpt-image-1 model with images.edit endpoint
      const prompt = `Transform this person into ${superheroName}. Apply the ${superheroName} costume, mask, and superhero elements while maintaining the person's facial features, expression, and pose. Make it look realistic and professional.`;

      console.log('Processing image with OpenAI gpt-image-1 model...');

      const response = await openai.images.edit({
        model: this.openaiModel,
        image: imageFileObj,
        prompt: prompt,
      });

      console.log('OpenAI gpt-image-1 response:', response);

      if (response.data && response.data[0]) {
        // Check if we have base64 data directly
        if (response.data[0].b64_json) {
          return {
            success: true,
            imageData: response.data[0].b64_json,
            mimeType: 'image/png',
            description: `${superheroName} transformation by OpenAI gpt-image-1`
          };
        }

        // If we have a URL, try to fetch it
        if (response.data[0].url) {
          try {
            const imageResponse = await fetch(response.data[0].url, {
              method: 'GET',
              headers: {
                'Accept': 'image/*',
              },
              mode: 'cors'
            });

            if (!imageResponse.ok) {
              throw new Error(`HTTP error! status: ${imageResponse.status}`);
            }

            const imageBlob = await imageResponse.blob();
            const base64Data = await this.blobToBase64(imageBlob);

            return {
              success: true,
              imageData: base64Data,
              mimeType: 'image/png',
              description: `${superheroName} transformation by OpenAI gpt-image-1`
            };
          } catch (fetchError) {
            console.error('Error fetching generated image:', fetchError);

            // Fallback to direct URL
            return {
              success: true,
              imageUrl: response.data[0].url,
              mimeType: 'image/png',
              description: `${superheroName} transformation by OpenAI gpt-image-1`,
              useDirectUrl: true
            };
          }
        }
      }

      throw new Error('Failed to generate image with OpenAI gpt-image-1');

    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error(`OpenAI API Error: ${error.message}`);
    }
  }

  // OpenAI image processing with custom prompt using gpt-image-1
  async processImageWithPromptOpenAI(apiKey, imageFile, customPrompt) {
    try {
      if (!apiKey || apiKey.trim() === '') {
        throw new Error('API key is required');
      }

      // Import OpenAI dynamically
      const { OpenAI, toFile } = await import('openai');
      const openai = new OpenAI({
        apiKey: apiKey.trim(),
        dangerouslyAllowBrowser: true
      });

      // Convert image to PNG format for OpenAI
      const pngBlob = await this.convertToPNG(imageFile);

      // Convert blob to File object for OpenAI
      const imageFileObj = new File([pngBlob], 'input.png', { type: 'image/png' });

      console.log('Processing image with OpenAI gpt-image-1 using custom prompt...');

      const response = await openai.images.edit({
        model: this.openaiModel,
        image: imageFileObj,
        prompt: customPrompt,
      });

      console.log('OpenAI gpt-image-1 custom prompt response:', response);

      if (response.data && response.data[0]) {
        // Check if we have base64 data directly
        if (response.data[0].b64_json) {
          return {
            success: true,
            imageData: response.data[0].b64_json,
            mimeType: 'image/png',
            description: 'OpenAI image transformation with custom prompt'
          };
        }

        // If we have a URL, try to fetch it
        if (response.data[0].url) {
          try {
            const imageResponse = await fetch(response.data[0].url, {
              method: 'GET',
              headers: {
                'Accept': 'image/*',
              },
              mode: 'cors'
            });

            if (!imageResponse.ok) {
              throw new Error(`HTTP error! status: ${imageResponse.status}`);
            }

            const imageBlob = await imageResponse.blob();
            const base64Data = await this.blobToBase64(imageBlob);

            return {
              success: true,
              imageData: base64Data,
              mimeType: 'image/png',
              description: 'OpenAI image transformation with custom prompt'
            };
          } catch (fetchError) {
            console.error('Error fetching generated image:', fetchError);

            // Fallback to direct URL
            return {
              success: true,
              imageUrl: response.data[0].url,
              mimeType: 'image/png',
              description: 'OpenAI image transformation with custom prompt',
              useDirectUrl: true
            };
          }
        }
      }

      throw new Error('Failed to generate image with OpenAI gpt-image-1');

    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error(`OpenAI API Error: ${error.message}`);
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

  // Convert image to PNG format
  async convertToPNG(imageFile) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(imageFile);
    });
  }

  // Convert blob to base64
  async blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}

export default new AIService();
