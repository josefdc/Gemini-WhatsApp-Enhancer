// Background Service Worker for Gemini WhatsApp Enhancer

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';
const CONTEXT_MENU_ID = 'gemini-fix-grammar';

// Create context menu on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: 'Gemini: Fix Grammar',
    contexts: ['selection']
  });
  
  console.log('Gemini WhatsApp Enhancer installed successfully');
});

// Listen for keyboard command
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'fix-grammar') {
    console.log('=== KEYBOARD SHORTCUT TRIGGERED ===');
    
    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab || !tab.url?.includes('web.whatsapp.com')) {
      console.log('Not on WhatsApp Web, ignoring command');
      return;
    }
    
    console.log('On WhatsApp, requesting selected text from tab:', tab.id);
    
    // Request the selected text from the content script
    try {
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: 'GET_SELECTION'
      });
      
      if (response && response.selectedText) {
        console.log('Received selected text:', response.selectedText);
        await processTextCorrection(response.selectedText, tab.id);
      } else {
        console.log('No text selected');
        chrome.tabs.sendMessage(tab.id, {
          action: 'SHOW_ERROR',
          error: 'Please select text first (Ctrl+A or drag to select)'
        });
      }
    } catch (error) {
      console.error('Error getting selection:', error);
    }
  }
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === CONTEXT_MENU_ID && info.selectionText) {
    const selectedText = info.selectionText;
    console.log('=== CONTEXT MENU TRIGGERED ===');
    console.log('Selected text:', selectedText);
    await processTextCorrection(selectedText, tab.id);
  }
});

// Process text correction (shared function for both context menu and keyboard shortcut)
async function processTextCorrection(selectedText, tabId) {
  console.log('Processing text correction...');
  console.log('Tab ID:', tabId);
  
  try {
    // Get API key from storage
    const { geminiApiKey } = await chrome.storage.local.get('geminiApiKey');
    
    if (!geminiApiKey) {
      console.error('No API key found');
      alert('Please configure your Gemini API key in the extension options.');
      chrome.runtime.openOptionsPage();
      return;
    }
    
    console.log('API key found, length:', geminiApiKey.length);
    
    // Show loading indicator
    try {
      await chrome.tabs.sendMessage(tabId, { 
        action: 'SHOW_LOADING' 
      });
      console.log('Loading indicator sent');
    } catch (msgError) {
      console.warn('Could not send loading message:', msgError);
    }
    
    // Call Gemini API
    console.log('Calling Gemini API...');
    const correctedText = await callGeminiAPI(selectedText, geminiApiKey);
    console.log('API call successful, corrected text:', correctedText);
    
    // Send corrected text to content script
    const response = await chrome.tabs.sendMessage(tabId, {
      action: 'REPLACE_SELECTION',
      replacementText: correctedText
    });
    console.log('Replacement message sent, response:', response);
    
  } catch (error) {
    console.error('Error processing text:', error);
    console.error('Error stack:', error.stack);
    
    // Send error message to content script
    try {
      await chrome.tabs.sendMessage(tabId, {
        action: 'SHOW_ERROR',
        error: error.message
      });
    } catch (msgError) {
      console.error('Could not send error message:', msgError);
      alert('Error: ' + error.message);
    }
  }
}

// Call Gemini API to fix grammar and spelling
async function callGeminiAPI(text, apiKey) {
  const url = `${GEMINI_API_ENDPOINT}?key=${apiKey}`;
  
  const requestBody = {
    system_instruction: {
      parts: [{
        text: "You are a text correction assistant. You must ONLY output the corrected text. Do not add conversational filler like 'Here is the fixed text'."
      }]
    },
    contents: [{
      parts: [{
        text: `Fix grammar and spelling for the following text (keep same language): "${text}"`
      }]
    }]
  };
  
  console.log('Calling Gemini API with endpoint:', GEMINI_API_ENDPOINT);
  console.log('Request body:', JSON.stringify(requestBody, null, 2));
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    console.log('API Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error response:', errorText);
      
      let errorMessage;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error?.message || response.statusText;
      } catch (e) {
        errorMessage = response.statusText;
      }
      
      throw new Error(`API Error (${response.status}): ${errorMessage}`);
    }
    
    const data = await response.json();
    console.log('API Response data:', JSON.stringify(data, null, 2));
    
    // Extract the corrected text from the response
    const correctedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!correctedText) {
      console.error('No text in response. Full response:', data);
      throw new Error('No text returned from API. Check console for details.');
    }
    
    console.log('Original:', text);
    console.log('Corrected:', correctedText);
    
    return correctedText.trim();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'TEST_API_KEY') {
    // Test API key validity
    callGeminiAPI('test', request.apiKey)
      .then(() => sendResponse({ success: true }))
      .catch((error) => sendResponse({ success: false, error: error.message }));
    return true; // Required for async response
  }
});
