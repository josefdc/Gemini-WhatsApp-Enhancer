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

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === CONTEXT_MENU_ID && info.selectionText) {
    const selectedText = info.selectionText;
    
    console.log('Context menu clicked with selection:', selectedText);
    
    try {
      // Get API key from storage
      const { geminiApiKey } = await chrome.storage.local.get('geminiApiKey');
      
      if (!geminiApiKey) {
        console.error('No API key found');
        // Open options page to configure API key
        chrome.runtime.openOptionsPage();
        return;
      }
      
      // Show loading indicator
      chrome.tabs.sendMessage(tab.id, { 
        action: 'SHOW_LOADING' 
      });
      
      // Call Gemini API
      const correctedText = await callGeminiAPI(selectedText, geminiApiKey);
      
      // Send corrected text to content script
      chrome.tabs.sendMessage(tab.id, {
        action: 'REPLACE_SELECTION',
        replacementText: correctedText
      });
      
    } catch (error) {
      console.error('Error processing text:', error);
      
      // Send error message to content script
      chrome.tabs.sendMessage(tab.id, {
        action: 'SHOW_ERROR',
        error: error.message
      });
    }
  }
});

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
  
  console.log('Calling Gemini API...');
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
  }
  
  const data = await response.json();
  
  // Extract the corrected text from the response
  const correctedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!correctedText) {
    throw new Error('No text returned from API');
  }
  
  console.log('Original:', text);
  console.log('Corrected:', correctedText);
  
  return correctedText.trim();
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
