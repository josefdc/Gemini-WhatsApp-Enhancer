// Popup script for Gemini WhatsApp Enhancer

const statusDiv = document.getElementById('status');
const openOptionsBtn = document.getElementById('openOptions');

// Check if API key is configured
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const { geminiApiKey } = await chrome.storage.local.get('geminiApiKey');
    
    if (geminiApiKey) {
      statusDiv.className = 'status configured';
      statusDiv.textContent = '✓ Extension is configured and ready!';
    } else {
      statusDiv.className = 'status not-configured';
      statusDiv.textContent = '⚠ Please configure your API key to get started';
    }
  } catch (error) {
    console.error('Error checking API key:', error);
    statusDiv.className = 'status not-configured';
    statusDiv.textContent = '⚠ Error checking configuration';
  }
});

// Open options page
openOptionsBtn.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});
