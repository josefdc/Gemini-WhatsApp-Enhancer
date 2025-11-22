# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-22

### Added
- Initial release of Gemini WhatsApp Enhancer
- Context menu integration for grammar fixing
- Keyboard shortcut (`Ctrl+Shift+X`) for quick corrections
- Google Gemini API integration
- Secure API key storage using `chrome.storage.local`
- Options page for API key configuration
- Extension popup with usage instructions
- Real-time text replacement preserving WhatsApp's React state
- Loading indicators and success/error notifications
- Support for both Windows/Linux (`Ctrl+Shift+X`) and Mac (`Command+Shift+X`)

### Features
- **Context Menu:** Right-click selected text → "Gemini: Fix Grammar"
- **Keyboard Shortcut:** Fast correction with `Ctrl+Shift+X`
- **Smart DOM Manipulation:** Preserves WhatsApp's Send button state
- **Undo Support:** `Ctrl+Z` works to revert changes
- **Visual Feedback:** Loading cursor and notification toasts

### Documentation
- Comprehensive README with installation and usage
- Quick setup guide (SETUP.md)
- Troubleshooting guide
- Usage guide in Spanish (USO_RAPIDO.md)
- Security checklist
- Contributing guidelines

### Technical
- Manifest V3 compliance
- Service Worker architecture
- Content Script with multiple WhatsApp input selectors
- Proper error handling and logging
- No hardcoded secrets

---

## [Unreleased]

### Planned Features
- Tone selection (Formal, Casual, Concise)
- Multiple language detection
- Custom user prompts
- Statistics and usage tracking
- Floating button UI

---

## Version History

- **1.0.0** - Initial release (November 22, 2025)

---

For detailed changes, see the [commit history](https://github.com/josefdc/Gemini-WhatsApp-Enhancer/commits/master).
