import { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, AlertCircle, Save, Trash2, Download, Upload, Clock, CheckCircle } from 'lucide-react';
import apiKeyManager from '../services/apiKeyManager';

export default function ApiKeyInput({ apiKey, onApiKeyChange, selectedModel, onModelChange }) {
  const [showKey, setShowKey] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  // State for both API keys
  const [geminiKey, setGeminiKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');

  // Load saved API keys on component mount
  useEffect(() => {
    const savedGeminiKey = apiKeyManager.getAPIKey('gemini');
    const savedOpenAIKey = apiKeyManager.getAPIKey('openai');

    if (savedGeminiKey) {
      setGeminiKey(savedGeminiKey);
    }
    if (savedOpenAIKey) {
      setOpenaiKey(savedOpenAIKey);
    }

    // Set the current API key based on selected model
    const currentKey = selectedModel === 'openai' ? savedOpenAIKey : savedGeminiKey;
    if (currentKey && currentKey !== apiKey) {
      onApiKeyChange(currentKey);
    }
  }, [selectedModel]);

  // Check if current API key is saved
  useEffect(() => {
    const savedKey = apiKeyManager.getAPIKey(selectedModel === 'openai' ? 'openai' : 'gemini');
    setIsSaved(savedKey === apiKey);
  }, [apiKey, selectedModel]);

  const validateApiKey = (key) => {
    if (!key) {
      setIsValid(true);
      setValidationMessage('');
      return true;
    }

    const validation = apiKeyManager.validateAPIKey(key, selectedModel === 'openai' ? 'openai' : 'gemini');
    setIsValid(validation.valid);
    setValidationMessage(validation.error || '');
    return validation.valid;
  };

  const handleApiKeyChange = (e) => {
    const key = e.target.value;
    onApiKeyChange(key);

    // Update the specific key state
    if (selectedModel === 'openai') {
      setOpenaiKey(key);
    } else {
      setGeminiKey(key);
    }

    const isValidKey = validateApiKey(key);

    // Auto-save after validation
    if (isValidKey) {
      apiKeyManager.autoSaveAPIKey(key, selectedModel === 'openai' ? 'openai' : 'gemini');
    }
  };

  const saveApiKey = () => {
    if (apiKey && validateApiKey(apiKey)) {
      const success = apiKeyManager.storeAPIKey(apiKey, selectedModel === 'openai' ? 'openai' : 'gemini');
      if (success) {
        setIsSaved(true);
        setShowSavedMessage(true);
        setTimeout(() => setShowSavedMessage(false), 3000);
      }
    }
  };

  const removeApiKey = () => {
    apiKeyManager.removeAPIKey(selectedModel === 'openai' ? 'openai' : 'gemini');
    onApiKeyChange('');
    if (selectedModel === 'openai') {
      setOpenaiKey('');
    } else {
      setGeminiKey('');
    }
    setIsSaved(false);
    setShowSavedMessage(false);
  };

  const getApiKeyMetadata = () => {
    return apiKeyManager.getAPIKeyMetadata(selectedModel === 'openai' ? 'openai' : 'gemini');
  };

  const exportApiKeys = () => {
    const exportData = apiKeyManager.exportAPIKeys();
    if (exportData) {
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `openhero-ai-api-keys-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const importApiKeys = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const success = apiKeyManager.importAPIKeys(e.target.result);
          if (success) {
            // Reload current API key
            const savedKey = apiKeyManager.getAPIKey();
            if (savedKey) {
              onApiKeyChange(savedKey);
            }
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const testApiKey = async () => {
    if (!apiKey || apiKey.trim() === '') {
      setTestResult({ success: false, message: 'API key is empty.' });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const result = await apiKeyManager.testAPIKey(apiKey, selectedModel === 'openai' ? 'openai' : 'gemini');
      setTestResult({ success: result.success, message: result.message });
    } catch (error) {
      setTestResult({ success: false, message: `Error testing API key: ${error.message}` });
    } finally {
      setIsTesting(false);
    }
  };

  const metadata = getApiKeyMetadata();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          API Configuration
        </h3>
        <p className="text-sm sm:text-base text-slate-400">Configure your AI API keys for image transformation</p>
      </div>

      {/* Model Selection */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-sm font-semibold text-white">
            AI Model
          </label>
        </div>

        <div className="relative">
          <select
            value={selectedModel}
            onChange={(e) => {
              const newModel = e.target.value;
              onModelChange(newModel);
              // Update the current API key based on the new model
              const newKey = newModel === 'openai' ? openaiKey : geminiKey;
              onApiKeyChange(newKey);
            }}
            className="block w-full px-4 py-3 border-2 rounded-lg text-white placeholder-slate-400 transition-colors bg-slate-800 border-slate-600 focus:border-blue-500"
          >
            <option value="gemini">Google Gemini 2.5 Flash</option>
            <option value="openai">OpenAI GPT-Image-1</option>
          </select>
        </div>

        <div className="text-sm text-slate-400 bg-slate-500/5 border border-slate-500/10 rounded-lg p-3">
          <p>
            <strong>Gemini:</strong> Best for image generation and transformation
            <br />
            <strong>GPT-Image-1:</strong> Advanced image editing and transformation
          </p>
        </div>
      </div>

      {/* API Key Input */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-sm font-semibold text-white">
            {selectedModel === 'openai' ? 'OpenAI' : 'Gemini'} API Key
          </label>
          <div className="flex items-center gap-2">
            {isSaved && (
              <span className="flex items-center text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                <CheckCircle className="w-3 h-3 mr-1" />
                Saved
              </span>
            )}
          </div>
        </div>

        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={handleApiKeyChange}
            className={`block w-full px-4 py-3 pr-16 border-2 rounded-lg text-white placeholder-slate-400 transition-colors ${
              isValid
                ? 'border-slate-600 focus:border-blue-500 bg-slate-800'
                : 'border-red-500 focus:border-red-400 bg-slate-800'
            }`}
            placeholder="Enter your Gemini API key"
          />

          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="p-2 text-slate-400 hover:text-slate-300 transition-colors"
            >
              {showKey ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        
        {/* Validation Message */}
        {!isValid && validationMessage && (
          <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            {validationMessage}
          </div>
        )}

        {/* Saved Message */}
        {showSavedMessage && (
          <div className="text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            API key saved successfully!
          </div>
        )}

        {/* Help Text */}
        <div className="text-sm text-slate-400 bg-slate-500/5 border border-slate-500/10 rounded-lg p-3">
          {selectedModel === 'openai' ? (
            <p>Get your OpenAI API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">OpenAI Platform</a></p>
          ) : (
            <p>Get your Gemini API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Google AI Studio</a></p>
          )}
        </div>
      </div>


    </div>
  );
}
