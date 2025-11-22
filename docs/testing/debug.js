// Debug Script - Open Chrome DevTools Console on WhatsApp Web and paste this

console.log('=== GEMINI WHATSAPP ENHANCER DEBUG ===');

// 1. Check if content script is loaded
console.log('1. Content script loaded:', typeof replaceSelectedText !== 'undefined');

// 2. Check active element
const activeEl = document.activeElement;
console.log('2. Active element:', activeEl?.tagName, activeEl?.className);
console.log('   Is contenteditable:', activeEl?.isContentEditable);

// 3. Check selection
const sel = window.getSelection();
console.log('3. Selection:', sel?.toString());
console.log('   Range count:', sel?.rangeCount);

// 4. Check API key
chrome.storage.local.get('geminiApiKey', (result) => {
  console.log('4. API key configured:', !!result.geminiApiKey);
  if (result.geminiApiKey) {
    console.log('   Key starts with:', result.geminiApiKey.substring(0, 10) + '...');
  }
});

// 5. Test message passing
chrome.runtime.sendMessage({ action: 'PING' }, (response) => {
  console.log('5. Message passing:', chrome.runtime.lastError ? 'FAILED' : 'OK');
  if (chrome.runtime.lastError) {
    console.error('   Error:', chrome.runtime.lastError);
  }
});

console.log('=== END DEBUG ===');
