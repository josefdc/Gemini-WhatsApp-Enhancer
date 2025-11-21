// Content Script for Gemini WhatsApp Enhancer
// This script runs on WhatsApp Web to handle text replacement

console.log('Gemini WhatsApp Enhancer content script loaded');

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Content script received message:', request.action);
  
  if (request.action === 'REPLACE_SELECTION') {
    replaceSelectedText(request.replacementText);
  } else if (request.action === 'SHOW_LOADING') {
    showLoadingCursor();
  } else if (request.action === 'SHOW_ERROR') {
    hideLoadingCursor();
    showError(request.error);
  }
});

// Replace selected text using execCommand to preserve WhatsApp's React state
function replaceSelectedText(replacementText) {
  try {
    const activeElement = document.activeElement;
    
    // Ensure we are in a contenteditable div (WhatsApp input)
    if (!activeElement || !activeElement.isContentEditable) {
      console.error('Active element is not contenteditable');
      showError('Please click in the WhatsApp message input box first');
      hideLoadingCursor();
      return;
    }
    
    // Get the current selection
    const selection = window.getSelection();
    
    if (!selection || selection.rangeCount === 0) {
      console.error('No selection found');
      showError('No text selected');
      hideLoadingCursor();
      return;
    }
    
    // Store the range before we modify anything
    const range = selection.getRangeAt(0);
    
    // Delete the current selection
    range.deleteContents();
    
    // Use execCommand to insert the new text
    // This triggers the input events that WhatsApp's React needs
    document.execCommand('insertText', false, replacementText);
    
    console.log('Text replaced successfully');
    hideLoadingCursor();
    
    // Optional: Show brief success indicator
    showSuccess();
    
  } catch (error) {
    console.error('Error replacing text:', error);
    showError('Failed to replace text: ' + error.message);
    hideLoadingCursor();
  }
}

// Show loading cursor
function showLoadingCursor() {
  document.body.style.cursor = 'wait';
  const activeElement = document.activeElement;
  if (activeElement) {
    activeElement.style.cursor = 'wait';
  }
}

// Hide loading cursor
function hideLoadingCursor() {
  document.body.style.cursor = '';
  const activeElement = document.activeElement;
  if (activeElement) {
    activeElement.style.cursor = '';
  }
}

// Show error notification
function showError(message) {
  // Create a temporary notification element
  const notification = document.createElement('div');
  notification.textContent = `Gemini Error: ${message}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #f44336;
    color: white;
    padding: 16px 24px;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    z-index: 10000;
    font-family: Arial, sans-serif;
    font-size: 14px;
    max-width: 300px;
  `;
  
  document.body.appendChild(notification);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transition = 'opacity 0.3s';
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Show success notification
function showSuccess() {
  // Create a temporary notification element
  const notification = document.createElement('div');
  notification.textContent = '✓ Text improved by Gemini';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    z-index: 10000;
    font-family: Arial, sans-serif;
    font-size: 14px;
    max-width: 300px;
  `;
  
  document.body.appendChild(notification);
  
  // Remove after 2 seconds
  setTimeout(() => {
    notification.style.transition = 'opacity 0.3s';
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}
