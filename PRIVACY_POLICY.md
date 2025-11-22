# Privacy Policy for Gemini WhatsApp Enhancer

**Last Updated:** November 22, 2025  
**Extension Version:** 1.0.0

## Overview

Gemini WhatsApp Enhancer is committed to protecting your privacy. This extension does NOT collect, store, or transmit any personal data to our servers. We have no servers - the extension runs entirely in your browser.

## What Data We Access

### Data Accessed Locally
- **Selected Text:** When you use the extension, the text you select in WhatsApp Web is temporarily accessed to send to Google's Gemini API for correction.
- **API Key:** Your Google Gemini API key is stored locally in your browser using Chrome's storage API.

### What We Do NOT Collect
- ❌ We do not collect personal information
- ❌ We do not track your browsing history
- ❌ We do not store your messages
- ❌ We do not use analytics or tracking
- ❌ We do not sell any data
- ❌ We do not have access to your WhatsApp account

## Third-Party Services

### Google Gemini API
When you use this extension to fix grammar:
1. Selected text is sent directly from your browser to Google's Gemini API
2. Google processes the text and returns the corrected version
3. The corrected text is displayed in WhatsApp

**Google's Privacy Policy applies to this data:**
- Google Gemini API: https://ai.google.dev/gemini-api/terms
- Google Privacy Policy: https://policies.google.com/privacy

**Important:** We do not control or have access to Google's processing of your data.

## Data Storage

### Local Storage Only
All data is stored locally in your browser using Chrome's storage API:

- **API Key:** Your Google Gemini API key is stored in `chrome.storage.local`
- **Location:** Only on your device
- **Encryption:** Chrome handles encryption at the browser level
- **Access:** Only this extension can access this data
- **Deletion:** You can delete your API key anytime from the extension options

### No Remote Storage
- We do not have servers
- We do not store data in the cloud
- Your data never leaves your browser except to communicate with Google's Gemini API

## Permissions Explained

This extension requests the following permissions:

### Required Permissions

**`storage`**
- **Purpose:** To save your Gemini API key locally in your browser
- **Usage:** Only stores the API key you provide
- **Data:** Never transmitted to us

**`activeTab`**
- **Purpose:** To access the current WhatsApp Web tab when you use the extension
- **Usage:** To read selected text and insert corrected text
- **Limitation:** Only when you actively use the extension

**`contextMenus`**
- **Purpose:** To add the "Gemini: Fix Grammar" option in the right-click menu
- **Usage:** Creates menu item
- **Data:** No data collected

**`scripting`**
- **Purpose:** To inject corrected text back into WhatsApp's input box
- **Usage:** To replace your selected text with the corrected version
- **Limitation:** Only on WhatsApp Web

### Host Permissions

**`https://web.whatsapp.com/*`**
- **Purpose:** Extension only works on WhatsApp Web
- **Usage:** To access and modify text in WhatsApp's message input
- **Limitation:** No access to other websites

**`https://generativelanguage.googleapis.com/*`**
- **Purpose:** To communicate with Google's Gemini API
- **Usage:** Send text for correction, receive corrected text
- **Data Flow:** Direct from your browser to Google

## How Your Data is Used

### When You Use the Extension

1. **You select text** in WhatsApp Web
2. **You trigger the extension** (Ctrl+Shift+X or right-click)
3. **Extension reads** the selected text
4. **Extension sends** text to Google Gemini API using your API key
5. **Google processes** the text and returns corrected version
6. **Extension replaces** selected text with corrected text
7. **No data is logged** or stored by us

### What Happens to Your API Key

- Stored locally in your browser
- Used only to authenticate with Google Gemini API
- Never transmitted to our servers (we don't have any)
- Never shared with third parties
- Can be deleted anytime from extension options

## Data Security

### Security Measures
- API key stored in Chrome's secure storage
- No transmission of data except to Google's API
- No logging or monitoring
- Open source code - you can audit it yourself

### Your Responsibilities
- Keep your Gemini API key secure
- Don't share your API key with others
- Use a strong Google account password
- Monitor your Gemini API usage in Google's console

## Your Rights

### Data Control
You have full control over your data:
- **Access:** View your API key in extension options
- **Modify:** Update your API key anytime
- **Delete:** Remove your API key from extension options
- **Export:** Your API key is in your browser storage (accessible via DevTools)

### Extension Removal
If you uninstall the extension:
- Your API key is automatically deleted from browser storage
- No data remains
- No account to close (we don't have accounts)

## Children's Privacy

This extension is not directed to children under 13. We do not knowingly collect information from children. If you're a parent and believe your child has used this extension, please contact us.

## Changes to This Policy

We may update this privacy policy from time to time. Changes will be posted:
- In this document
- On our GitHub repository
- In extension update notes (if significant)

**Current Version:** 1.0.0  
**Last Updated:** November 22, 2025

## Open Source

This extension is open source. You can:
- Review the code: https://github.com/josefdc/Gemini-WhatsApp-Enhancer
- Submit issues
- Contribute improvements
- Fork and modify

## Contact

For privacy concerns or questions:
- **GitHub Issues:** https://github.com/josefdc/Gemini-WhatsApp-Enhancer/issues
- **Email:** [Your Email - Optional]

## Third-Party Links

This extension connects to:
- **Google Gemini API:** https://ai.google.dev/
  - Subject to Google's Privacy Policy and Terms of Service
- **WhatsApp Web:** https://web.whatsapp.com/
  - Subject to WhatsApp's Privacy Policy

We are not responsible for the privacy practices of these third-party services.

## Compliance

This extension complies with:
- Chrome Web Store Developer Program Policies
- Chrome Extension Manifest V3 requirements
- General Data Protection Regulation (GDPR) principles
- California Consumer Privacy Act (CCPA) principles

## Data Retention

- **API Key:** Retained until you delete it or uninstall the extension
- **Message Text:** Not retained - only temporarily processed
- **Usage Data:** Not collected

## Consent

By using this extension, you consent to:
- This privacy policy
- Sending selected text to Google's Gemini API
- Google processing your text according to their privacy policy

## Limitations

We make no guarantees about:
- Google Gemini API availability
- Google's data handling practices
- Third-party service reliability

---

**Summary:** We don't collect your data. Your API key stays in your browser. Text goes directly to Google's API. That's it.

For the full terms of service for Google's Gemini API, visit: https://ai.google.dev/gemini-api/terms
