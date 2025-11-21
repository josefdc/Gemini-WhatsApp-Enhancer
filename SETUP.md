# Quick Setup Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Get Your Gemini API Key
1. Visit https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API key"
4. Copy the key (starts with "AIza...")

### Step 2: Load the Extension
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select this folder: `Gemini WhatsApp Enhancer`

### Step 3: Configure API Key
1. Click the extension icon (purple "G") in your toolbar
2. Click "Configure API Key"
3. Paste your API key
4. Click "Test API Key" to verify
5. Click "Save Configuration"

### Step 4: Test It!

#### Option A: Context Menu
1. Open https://web.whatsapp.com
2. Click on any chat
3. Type: "i going to the cinma tomorow"
4. Select the text
5. Right-click → "Gemini: Fix Grammar"
6. See it change to: "I am going to the cinema tomorrow"

#### Option B: Keyboard Shortcut (Faster!) ⚡
1. Open https://web.whatsapp.com
2. Click on any chat
3. Type: "i going to the cinma tomorow"
4. Press **Ctrl+A** (select all)
5. Press **Ctrl+Shift+F** (fix grammar)
6. See it change instantly!

> Mac users: Use `Command+Shift+F` instead

## ✅ Verification Checklist

- [ ] Extension appears in Chrome toolbar
- [ ] No errors in `chrome://extensions/`
- [ ] API key test passes
- [ ] Context menu appears on WhatsApp Web
- [ ] Text replacement works
- [ ] Send button activates after replacement
- [ ] Ctrl+Z undo works

## 🐛 Common Issues

**"No API key found" error**
- Go to extension options and configure your API key

**Context menu doesn't appear**
- Refresh WhatsApp Web after installing the extension

**Send button stays disabled**
- This is fixed by using `execCommand('insertText')` - make sure you're using the latest code

**API test fails**
- Verify your API key is correct
- Check your internet connection
- Ensure the Gemini API is accessible in your region

## 📝 Notes

- The extension only works on https://web.whatsapp.com
- Your API key is stored locally and never shared
- Each API call to Gemini counts toward your quota
- The free tier is generous for personal use

---

**Ready to enhance your WhatsApp messages! 🎉**
