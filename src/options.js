// Options page script for Gemini WhatsApp Enhancer

const form = document.getElementById('optionsForm');
const apiKeyInput = document.getElementById('apiKey');
const testBtn = document.getElementById('testBtn');
const statusMessage = document.getElementById('statusMessage');

// Load saved API key on page load
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const { geminiApiKey } = await chrome.storage.local.get('geminiApiKey');
    if (geminiApiKey) {
      apiKeyInput.value = geminiApiKey;
    }
  } catch (error) {
    console.error('Error loading API key:', error);
  }
});

// Save API key
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const apiKey = apiKeyInput.value.trim();
  
  if (!apiKey) {
    showStatus('Please enter an API key', 'error');
    return;
  }
  
  try {
    // Save to storage
    await chrome.storage.local.set({ geminiApiKey: apiKey });
    showStatus('✓ API key saved successfully!', 'success');
  } catch (error) {
    console.error('Error saving API key:', error);
    showStatus('Failed to save API key: ' + error.message, 'error');
  }
});

// Test API key
testBtn.addEventListener('click', async () => {
  const apiKey = apiKeyInput.value.trim();
  
  if (!apiKey) {
    showStatus('Please enter an API key first', 'error');
    return;
  }
  
  testBtn.disabled = true;
  testBtn.textContent = 'Testing...';
  
  try {
    // Send test request to background script
    const response = await chrome.runtime.sendMessage({
      action: 'TEST_API_KEY',
      apiKey: apiKey
    });
    
    if (response.success) {
      showStatus('✓ API key is valid!', 'success');
    } else {
      showStatus('✗ API key test failed: ' + response.error, 'error');
    }
  } catch (error) {
    console.error('Error testing API key:', error);
    showStatus('Error testing API key: ' + error.message, 'error');
  } finally {
    testBtn.disabled = false;
    testBtn.textContent = 'Test API Key';
  }
});

// Show status message
function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type} show`;
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    statusMessage.classList.remove('show');
  }, 5000);
}
