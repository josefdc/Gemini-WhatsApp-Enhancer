# Gemini WhatsApp Enhancer - Technical Design Doc

**Author:** [User]  
**Status:** Approved / Implementation Phase  
**Last Updated:** November 21, 2025  
**Selected Architecture:** Direct DOM Injection (Manifest V3)

---

## 1. Overview

### 1.1 Summary

This extension integrates Google's Gemini API directly into WhatsApp Web. It allows users to select text within the chat input, right-click to choose an improvement option (e.g., "Fix Grammar"), and instantly replace the original text with the improved version.

### 1.2 The Core Problem

Messaging web apps like WhatsApp use `contenteditable` divs rather than standard inputs. This makes external text manipulation difficult. Standard direct assignment (`element.innerText = ...`) often breaks the internal React state of the app, causing the "Send" button to remain disabled.

### 1.3 The Solution

We will use a **Background Service Worker** to handle API communication and a **Content Script** that utilizes `document.execCommand('insertText')`. This specific command mimics a user typing event, ensuring WhatsApp's internal state recognizes the text change.

---

## 2. User Flow

1. **Selection:** User types a draft in WhatsApp Web (e.g., "i going to the cinma tomorow") and selects it.
2. **Trigger:** User right-clicks the selection.
3. **Action:** Selects "Gemini: Fix Grammar" from the context menu.
4. **Feedback:** (Optional) The cursor turns to a "wait" spinner.
5. **Result:** The selected text is deleted and immediately replaced by "I am going to the cinema tomorrow."

---

## 3. Technical Architecture

### 3.1 Components

| Component       | Type                | Responsibility                                                                                                   |
|-----------------|---------------------|------------------------------------------------------------------------------------------------------------------|
| `manifest.json` | Configuration       | Defines permissions (`contextMenus`, `activeTab`, `scripting`) and host permissions (`web.whatsapp.com`).       |
| `background.js` | Service Worker      | 1. Creates Context Menu items.<br>2. Listens for clicks.<br>3. Calls Gemini API.<br>4. Sends result to tab.    |
| `content.js`    | Content Script      | 1. Listens for messages from Background.<br>2. Identifies active contenteditable.<br>3. Executes replacement.  |

### 3.2 Data Flow Diagram

```
[User] -> (Selects Text) -> [WhatsApp DOM]
   |
   +-> (Right Click) -> [Chrome Context Menu]
                             |
                             v
                    [Background Script]
                             |
                             +-> (POST Request) -> [Gemini API]
                             |                          |
                             |                          v
                    [Background Script] <---- (JSON Response)
                             |
                             +-> (Message: 'REPLACE_TEXT') -> [Content Script]
                                                                    |
                                                                    v
                                                            [DOM Manipulation]
                                                            (execCommand)
```

---

## 4. Implementation Details

### 4.1 Gemini API Strategy

- **Model:** `gemini-2.5-flash-preview` (Optimized for speed/latency)
- **System Instruction:** *"You are a text correction assistant. You must ONLY output the corrected text. Do not add conversational filler like 'Here is the fixed text'."*

**Prompt Template:**

```json
{
  "contents": [{
    "parts": [{
      "text": "Fix grammar and spelling for the following text (keep same language): \"{USER_SELECTION}\""
    }]
  }]
}
```

### 4.2 The Injection Mechanic (Crucial)

The `content.js` must handle the replacement carefully to avoid breaking WhatsApp's undo history.

```javascript
// Pseudo-code for content.js handling
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "REPLACE_SELECTION") {
    const activeElement = document.activeElement;
    
    // Ensure we are in a contenteditable div (WhatsApp input)
    if (activeElement.isContentEditable) {
        // This command replaces the current selection with the new text
        // AND triggers the input events that React needs to see.
        document.execCommand('insertText', false, request.replacementText);
    }
  }
});
```

---

## 5. Requirements

### 5.1 Permissions (Manifest V3)

```json
"permissions": [
  "contextMenus",
  "activeTab",
  "scripting", 
  "storage"
],
"host_permissions": [
  "https://generativelanguage.googleapis.com/*",
  "https://web.whatsapp.com/*"
]
```

### 5.2 Security

- **API Key Storage:** The API key should not be hardcoded in the repository.
- **Implementation:** Use `chrome.storage.local` to save the user's key. On first run, if no key is found, prompt the user or open the options page.

---

## 6. Testing Plan

### Basic Smoke Test
Select text → Click Menu → Verify Console Log in Background → Verify Replacement.

### WhatsApp Specifics
- Verify the "Send" button (paper plane icon) turns blue/active after replacement.
- Verify `Ctrl+Z` (Undo) works to revert the Gemini change.

### Edge Cases
- **Empty Response:** Handle cases where Gemini returns nothing or an error.
- **Code Blocks:** Ensure formatting isn't stripped if the user is fixing a code snippet.
- **Multiline:** Ensure line breaks (`\n`) are preserved correctly in the div.

---

## 7. Future Roadmap (Post-MVP)

- **Tone Selection:** Sub-menus for "Formal", "Casual", "Concise".
- **Floating Button:** Add a subtle icon near the text cursor to trigger without right-clicking.
- **Language Detection:** Auto-detect if the user is typing in English or Spanish and adjust the prompt accordingly.