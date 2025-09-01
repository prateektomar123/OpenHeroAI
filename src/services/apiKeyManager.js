class APIKeyManager {
  constructor() {
    this.storageKey = 'openhero_ai_api_keys';
    this.encryptionKey = 'openhero_ai_encryption_2024';
  }

  // Simple encryption for local storage (for basic security)
  encrypt(text) {
    try {
      const textToChars = text => text.split('').map(c => c.charCodeAt(0));
      const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
      const applySaltToChar = code => textToChars(this.encryptionKey).reduce((a, b) => a ^ b, code);
      
      return text
        .split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
    } catch (error) {
      console.error('Encryption error:', error);
      return text; // Fallback to plain text if encryption fails
    }
  }

  decrypt(encoded) {
    try {
      const textToChars = text => text.split('').map(c => c.charCodeAt(0));
      const applySaltToChar = code => textToChars(this.encryptionKey).reduce((a, b) => a ^ b, code);
      
      return encoded
        .match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applySaltToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('');
    } catch (error) {
      console.error('Decryption error:', error);
      return encoded; // Fallback to encoded text if decryption fails
    }
  }

  // Store API key securely
  storeAPIKey(apiKey) {
    try {
      if (!apiKey) {
        throw new Error('Invalid API key');
      }

      const keys = this.getAllAPIKeys();
      keys.gemini = {
        key: this.encrypt(apiKey),
        timestamp: Date.now(),
        lastUsed: Date.now()
      };

      localStorage.setItem(this.storageKey, JSON.stringify(keys));
      return true;
    } catch (error) {
      console.error('Error storing API key:', error);
      return false;
    }
  }

  // Retrieve API key
  getAPIKey() {
    try {
      const keys = this.getAllAPIKeys();
      const keyData = keys.gemini;
      
      if (!keyData || !keyData.key) {
        return null;
      }

      // Update last used timestamp
      keyData.lastUsed = Date.now();
      this.storeAPIKey(this.decrypt(keyData.key));

      return this.decrypt(keyData.key);
    } catch (error) {
      console.error('Error retrieving API key:', error);
      return null;
    }
  }

  // Get all stored API keys
  getAllAPIKeys() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error reading API keys:', error);
      return {};
    }
  }

  // Check if API key exists and is valid
  hasValidAPIKey() {
    const key = this.getAPIKey();
    return key && key.length > 0;
  }

  // Remove API key
  removeAPIKey() {
    try {
      const keys = this.getAllAPIKeys();
      delete keys.gemini;
      localStorage.setItem(this.storageKey, JSON.stringify(keys));
      return true;
    } catch (error) {
      console.error('Error removing API key:', error);
      return false;
    }
  }

  // Clear all stored API keys
  clearAllAPIKeys() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Error clearing API keys:', error);
      return false;
    }
  }

  // Get API key metadata (last used, timestamp)
  getAPIKeyMetadata() {
    try {
      const keys = this.getAllAPIKeys();
      const keyData = keys.gemini;
      
      if (!keyData) {
        return null;
      }

      return {
        timestamp: keyData.timestamp,
        lastUsed: keyData.lastUsed,
        age: Date.now() - keyData.timestamp,
        lastUsedAge: Date.now() - keyData.lastUsed
      };
    } catch (error) {
      console.error('Error getting API key metadata:', error);
      return null;
    }
  }

  // Validate API key format
  validateAPIKey(apiKey) {
    if (!apiKey || typeof apiKey !== 'string') {
      return { valid: false, error: 'API key must be a non-empty string' };
    }

    // Gemini API keys are typically longer
    if (apiKey.length < 20) {
      return { valid: false, error: 'Gemini API key must be at least 20 characters long' };
    }
    
    return { valid: true };
  }

  // Auto-save API key when user types
  autoSaveAPIKey(apiKey) {
    if (apiKey && apiKey.length > 0) {
      // Debounce the save operation
      clearTimeout(this.autoSaveTimeout);
      this.autoSaveTimeout = setTimeout(() => {
        this.storeAPIKey(apiKey);
      }, 1000); // Save after 1 second of no typing
    }
  }

  // Test API key connection
  async testAPIKey(apiKey) {
    try {
      if (!apiKey || apiKey.trim() === '') {
        return { success: false, message: 'API key is empty' };
      }

      const trimmedKey = apiKey.trim();
      console.log('Testing API key length:', trimmedKey.length);
      console.log('API key starts with:', trimmedKey.substring(0, 10) + '...');

      // Test the API key by trying to initialize Google GenAI
      console.log('Testing Google GenAI...');
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI(trimmedKey);
      console.log('Google GenAI initialized successfully');
      
      // Try to list models to test the connection
      console.log('Testing connection by listing models...');
      const models = await ai.models.list();
      console.log('Models listed successfully:', models);
      
      return { 
        success: true, 
        message: `API key is valid! Found ${models.data?.length || 0} available models.` 
      };
    } catch (error) {
      console.error('API key test error details:', {
        message: error.message,
        stack: error.stack,
        apiKeyLength: apiKey ? apiKey.length : 0,
        apiKeyStart: apiKey ? apiKey.substring(0, 10) + '...' : 'none'
      });
      return { 
        success: false, 
        message: `API key test failed: ${error.message}` 
      };
    }
  }

  // Export API keys (for backup purposes)
  exportAPIKeys() {
    try {
      const keys = this.getAllAPIKeys();
      const exportData = {
        timestamp: Date.now(),
        keys: Object.keys(keys).map(type => ({
          type,
          hasKey: !!keys[type]?.key,
          timestamp: keys[type]?.timestamp,
          lastUsed: keys[type]?.lastUsed
        }))
      };
      
      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Error exporting API keys:', error);
      return null;
    }
  }

  // Import API keys (for restore purposes)
  importAPIKeys(importData) {
    try {
      const data = JSON.parse(importData);
      if (!data.keys || !Array.isArray(data.keys)) {
        throw new Error('Invalid import data format');
      }

      // Only restore metadata, not the actual keys
      const keys = this.getAllAPIKeys();
      data.keys.forEach(keyInfo => {
        if (keys[keyInfo.type]) {
          keys[keyInfo.type].timestamp = keyInfo.timestamp || Date.now();
          keys[keyInfo.type].lastUsed = keyInfo.lastUsed || Date.now();
        }
      });

      localStorage.setItem(this.storageKey, JSON.stringify(keys));
      return true;
    } catch (error) {
      console.error('Error importing API keys:', error);
      return false;
    }
  }
}

export default new APIKeyManager();
