// Content Script for Gemini WhatsApp Enhancer
// This script runs on WhatsApp Web to handle text replacement

console.log('Gemini WhatsApp Enhancer content script loaded');

// Store the selected text and range globally
let lastSelectionText = '';
let lastSelectionRange = null;

// Capture selection when context menu is opened
document.addEventListener('selectionchange', () => {
  const selection = window.getSelection();
  if (selection && selection.toString().trim()) {
    lastSelectionText = selection.toString();
    if (selection.rangeCount > 0) {
      lastSelectionRange = selection.getRangeAt(0).cloneRange();
    }
  }
});

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Content script received message:', request.action);
  
  if (request.action === 'REPLACE_SELECTION') {
    replaceSelectedText(request.replacementText);
    sendResponse({ success: true });
  } else if (request.action === 'SHOW_LOADING') {
    showLoadingCursor();
    sendResponse({ success: true });
  } else if (request.action === 'SHOW_ERROR') {
    hideLoadingCursor();
    showError(request.error);
    sendResponse({ success: true });
  }
  return true; // Keep message channel open for async response
});

// Replace selected text using execCommand to preserve WhatsApp's React state
function replaceSelectedText(replacementText) {
  console.log('Attempting to replace text with:', replacementText);
  
  try {
    // Find the WhatsApp input box
    const inputBox = findWhatsAppInputBox();
    
    if (!inputBox) {
      console.error('WhatsApp input box not found');
      showError('Could not find WhatsApp input box');
      hideLoadingCursor();
      return;
    }
    
    console.log('Found input box:', inputBox);
    
    // Focus the input box
    inputBox.focus();
    
    // Get current selection
    const selection = window.getSelection();
    
    // If we have a stored range, use it
    if (lastSelectionRange) {
      selection.removeAllRanges();
      selection.addRange(lastSelectionRange);
    }
    
    if (!selection || selection.rangeCount === 0) {
      console.error('No selection found');
      showError('No text selected. Please select text first.');
      hideLoadingCursor();
      return;
    }
    
    console.log('Current selection:', selection.toString());
    
    // Delete the current selection and insert new text
    // This method works better with WhatsApp's React state
    const range = selection.getRangeAt(0);
    range.deleteContents();
    
    // Create a text node with the replacement text
    const textNode = document.createTextNode(replacementText);
    range.insertNode(textNode);
    
    // Move cursor to end of inserted text
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Trigger input events to notify WhatsApp's React
    const inputEvent = new InputEvent('input', {
      bubbles: true,
      cancelable: true,
      inputType: 'insertText',
      data: replacementText
    });
    inputBox.dispatchEvent(inputEvent);
    
    // Also trigger textInput for better compatibility
    const textInputEvent = new Event('textInput', { bubbles: true });
    inputBox.dispatchEvent(textInputEvent);
    
    console.log('Text replaced successfully');
    hideLoadingCursor();
    showSuccess();
    
  } catch (error) {
    console.error('Error replacing text:', error);
    showError('Failed to replace text: ' + error.message);
    hideLoadingCursor();
  }
}

// Find the WhatsApp message input box
function findWhatsAppInputBox() {
  // Try multiple selectors for WhatsApp's input box
  const selectors = [
    'div[contenteditable="true"][data-tab="10"]', // Main chat input
    'div[contenteditable="true"][role="textbox"]', // Alternative
    'div[contenteditable="true"].selectable-text', // Older WhatsApp
    'div[contenteditable="true"]._ak1l' // Class-based fallback
  ];
  
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element && element.isContentEditable) {
      return element;
    }
  }
  
  // Last resort: find any contenteditable div that's visible
  const allEditable = document.querySelectorAll('div[contenteditable="true"]');
  for (const element of allEditable) {
    if (element.offsetParent !== null) { // Check if visible
      return element;
    }
  }
  
  return null;
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
