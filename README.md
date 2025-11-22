# 🤖 Gemini WhatsApp Enhancer

A Chrome Extension that integrates Google's Gemini API directly into WhatsApp Web, allowing you to instantly improve your messages with AI-powered grammar fixing and text enhancement.

## ✨ Features

- **Context Menu Integration**: Right-click selected text to fix grammar instantly
- **Seamless DOM Injection**: Uses `execCommand` to preserve WhatsApp's React state
- **Real-time Feedback**: Visual loading indicators and success/error notifications
- **Secure API Key Storage**: Your Gemini API key is stored locally in your browser
- **Undo Support**: Ctrl+Z works to revert AI changes

## 🚀 Installation

### Prerequisites

1. **Google Chrome** or any Chromium-based browser (Edge, Brave, etc.)
2. **Google Gemini API Key** - Get yours at [Google AI Studio](https://aistudio.google.com/app/apikey)

### Steps

1. **Clone or download** this repository:
   ```bash
   git clone https://github.com/josefdc/Gemini-WhatsApp-Enhancer
   cd "Gemini WhatsApp Enhancer"
   ```

2. **Create placeholder icons** (or add your own):
   ```bash
   mkdir -p icons
   # Add icon16.png, icon48.png, and icon128.png to the icons/ folder
   ```

3. **Load the extension** in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the extension folder

4. **Configure your API key**:
   - Click the extension icon in your toolbar
   - Click "Configure API Key"
   - Paste your Gemini API key
   - Click "Test API Key" to verify it works
   - Click "Save Configuration"

## 📖 How to Use

1. Open [WhatsApp Web](https://web.whatsapp.com)
2. Start typing a message (e.g., "i going to the cinma tomorow")
3. Select the text you want to improve
4. Right-click and choose **"Gemini: Fix Grammar"**
5. Watch as your text is instantly corrected! ✨

## 🏗️ Architecture

### Components

| File | Purpose |
|------|---------|
| `manifest.json` | Extension configuration and permissions |
| `background.js` | Service worker that handles API calls and context menu |
| `content.js` | Injected into WhatsApp Web to handle DOM manipulation |
| `options.html/js` | Settings page for API key configuration |
| `popup.html/js` | Extension popup with quick status and instructions |

### How It Works

```
User selects text → Right-click menu → Background worker calls Gemini API
                                              ↓
                                    Response sent to Content Script
                                              ↓
                                    execCommand('insertText') replaces text
                                              ↓
                                    WhatsApp's React state updates correctly
```

## 🔒 Security & Privacy

- **API Key Storage**: Your Gemini API key is stored locally using `chrome.storage.local` and never shared
- **No Data Collection**: This extension doesn't collect or transmit any personal data
- **Direct API Communication**: Text is sent directly to Google's Gemini API over HTTPS
- **Open Source**: All code is available for review

## 🛠️ Development

### Project Structure

```
Gemini WhatsApp Enhancer/
├── manifest.json          # Extension manifest (Manifest V3)
├── background.js          # Service worker for API calls
├── content.js             # Content script for WhatsApp Web
├── options.html           # Options page HTML
├── options.js             # Options page logic
├── popup.html             # Popup HTML
├── popup.js               # Popup logic
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── DesingDoc.md          # Technical design document
└── README.md             # This file
```

### API Configuration

The extension uses:
- **Model**: `gemini-2.0-flash-exp` (optimized for speed)
- **System Instruction**: Ensures output is clean corrected text only
- **Prompt**: "Fix grammar and spelling for the following text (keep same language)"

### Testing

1. **Basic Test**: Select text → Right-click → Verify replacement works
2. **WhatsApp Specific**: 
   - Verify Send button activates after replacement
   - Test Ctrl+Z undo functionality
3. **Edge Cases**:
   - Empty selections
   - Multi-line text
   - Special characters
   - Code blocks

## 🐛 Troubleshooting

### Send Button Doesn't Activate
- Make sure you're using the latest version of the extension
- The extension uses `execCommand('insertText')` specifically to trigger WhatsApp's input events

### API Key Invalid
- Verify your API key at [Google AI Studio](https://aistudio.google.com/app/apikey)
- Use the "Test API Key" button in the options page

### Extension Not Working on WhatsApp
- Refresh WhatsApp Web after installing the extension
- Check that the extension has permission for `https://web.whatsapp.com/*`

## 🗺️ Future Roadmap

- [ ] **Tone Selection**: Sub-menus for "Formal", "Casual", "Concise"
- [ ] **Floating Button**: Inline button near text cursor
- [ ] **Language Detection**: Auto-detect language and adjust prompts
- [ ] **Custom Prompts**: Allow users to create their own improvement prompts
- [ ] **Keyboard Shortcuts**: Quick access without right-clicking
- [ ] **Statistics**: Track usage and improvements made

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [Google Gemini API](https://ai.google.dev/)
- Designed for [WhatsApp Web](https://web.whatsapp.com)
- Architecture based on Chrome Extension Manifest V3

## 📞 Support

If you encounter any issues or have suggestions:
1. Check the troubleshooting section above
2. Review the [design document](DesingDoc.md) for technical details
3. Open an issue in the repository

---

**Made with ❤️ for better WhatsApp messaging**
