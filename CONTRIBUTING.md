# Contributing to Gemini WhatsApp Enhancer

Thank you for your interest in contributing! 🎉

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Gemini-WhatsApp-Enhancer.git
   cd Gemini-WhatsApp-Enhancer
   ```
3. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📁 Project Structure

```
Gemini-WhatsApp-Enhancer/
├── src/                    # Source code
│   ├── background.js       # Service worker (API calls)
│   ├── content.js          # Content script (DOM manipulation)
│   ├── options.html/js     # Options page
│   └── popup.html/js       # Extension popup
├── icons/                  # Extension icons
├── docs/                   # Documentation
│   ├── testing/            # Test files
│   ├── TROUBLESHOOTING.md  # Debug guide
│   └── ...                 # Other docs
├── manifest.json           # Extension manifest
├── README.md               # Main documentation
└── LICENSE                 # MIT License
```

## 🔧 Development Workflow

### 1. Making Changes

- **Code Style:**
  - Use 2 spaces for indentation
  - Add comments for complex logic
  - Use descriptive variable names
  - Follow existing code patterns

- **Commit Messages:**
  ```
  feat: Add new feature
  fix: Fix bug in content script
  docs: Update README
  refactor: Improve code structure
  test: Add test cases
  ```

### 2. Testing

Before submitting:

1. **Load the extension:**
   ```bash
   chrome://extensions/ → Load unpacked → Select folder
   ```

2. **Test on WhatsApp Web:**
   - Context menu works
   - Keyboard shortcut works (`Ctrl+Shift+X`)
   - Text replacement preserves Send button state
   - Undo works (`Ctrl+Z`)

3. **Check console for errors:**
   - Service Worker console
   - WhatsApp Web console

### 3. Submitting Changes

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

2. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request:**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

## 📋 Pull Request Checklist

- [ ] Code follows project style
- [ ] Tested on WhatsApp Web
- [ ] No console errors
- [ ] Documentation updated (if needed)
- [ ] Commit messages are clear
- [ ] No API keys or secrets in code

## 🐛 Reporting Bugs

Use GitHub Issues with:

1. **Description:** What happened?
2. **Expected:** What should happen?
3. **Steps to reproduce:**
   - Step 1
   - Step 2
   - etc.
4. **Browser:** Chrome version
5. **Logs:** Console errors (if any)

## 💡 Feature Requests

We welcome suggestions! Open an issue with:

- **Title:** Clear feature name
- **Description:** What and why
- **Use case:** When would you use it?

## 🎯 Areas for Contribution

- **New Features:**
  - Tone selection (Formal, Casual, Concise)
  - Multiple language support
  - Custom prompts
  - Statistics/usage tracking

- **Improvements:**
  - Better error handling
  - Performance optimization
  - UI/UX enhancements

- **Documentation:**
  - Translations
  - Video tutorials
  - More examples

## 📖 Code of Conduct

- Be respectful and constructive
- Help others learn
- Focus on the code, not the person
- Keep discussions on-topic

## 🙏 Thank You!

Every contribution helps make this project better!

---

**Questions?** Open an issue or start a discussion.
