# 🔧 Troubleshooting Guide

## Debugging Steps

### Step 1: Verificar que la extensión está cargada

1. Abre `chrome://extensions/`
2. Busca "Gemini WhatsApp Enhancer"
3. Verifica:
   - ✅ El toggle está ACTIVADO (azul)
   - ✅ No hay errores en rojo
   - ✅ Dice "Manifest V3"

**Si hay errores:** Haz click en "Reload" (icono de refresh)

---

### Step 2: Verificar la API Key

1. Haz click en el icono de la extensión (G púrpura)
2. Click en "Configure API Key"
3. Verifica que hay una key guardada
4. Click en "Test API Key"
5. Debe decir "✓ API key is valid!"

**Si falla el test:**
- Ve a https://aistudio.google.com/app/apikey
- Verifica que la key es correcta
- Copia y pega nuevamente
- Asegúrate de no tener espacios al inicio/final

---

### Step 3: Abrir la Consola de Desarrollador

#### En el Background Script:
1. Ve a `chrome://extensions/`
2. Busca "Gemini WhatsApp Enhancer"
3. Click en "service worker" (link azul)
4. Se abre DevTools

#### En WhatsApp Web:
1. Abre https://web.whatsapp.com
2. Presiona `F12` o `Ctrl+Shift+I`
3. Ve a la pestaña "Console"

---

### Step 4: Verificar Logs en Background Script

En la consola del Service Worker, deberías ver:
```
Gemini WhatsApp Enhancer installed successfully
```

**Prueba el menú contextual:**
1. Ve a WhatsApp Web
2. Escribe y selecciona texto: "i going to the cinma"
3. Click derecho → "Gemini: Fix Grammar"
4. En la consola del service worker deberías ver:
```
=== GEMINI ENHANCER TRIGGERED ===
Selected text: i going to the cinma
Tab ID: [número]
API key found, length: [número]
Loading indicator sent
Calling Gemini API...
```

**Si no ves logs:**
- La extensión no está activa
- Recarga la extensión

**Si ves error de API:**
- Verifica tu API key
- Revisa el mensaje de error específico

---

### Step 5: Verificar Content Script en WhatsApp

En la consola de WhatsApp Web (F12), deberías ver:
```
Gemini WhatsApp Enhancer content script loaded
```

**Si NO ves este mensaje:**
1. Recarga WhatsApp Web (F5)
2. Verifica que estás en https://web.whatsapp.com
3. Verifica permisos en chrome://extensions/

**Cuando uses el menú contextual, deberías ver:**
```
Content script received message: SHOW_LOADING
Content script received message: REPLACE_SELECTION
Attempting to replace text with: [texto corregido]
Found input box: [elemento DOM]
Current selection: i going to the cinma
Text replaced successfully
```

---

### Step 6: Problemas Comunes

#### ❌ "No API key found"
**Solución:** Configura tu API key en Options

#### ❌ "Could not find WhatsApp input box"
**Solución:** 
1. Haz click EN el cuadro de texto de WhatsApp
2. Asegúrate de estar en un chat abierto
3. Selecciona el texto DENTRO del cuadro de mensaje

#### ❌ "No text selected"
**Solución:**
1. Escribe texto en el cuadro de WhatsApp
2. **Selecciónalo con el mouse** (arrastra para resaltar)
3. Mientras está seleccionado, click derecho
4. Elige "Gemini: Fix Grammar"

#### ❌ El texto no se reemplaza
**Solución:**
1. Abre la consola de WhatsApp Web (F12)
2. Busca errores en rojo
3. Verifica que estás en un chat (no en la lista de chats)
4. Prueba escribir el texto directamente en el cuadro de mensaje

#### ❌ API Error 400/401/403
- **400:** Mal formato de request (bug en el código)
- **401/403:** API key inválida o sin permisos
- **429:** Excediste el rate limit de la API

**Solución para 401/403:**
1. Ve a https://aistudio.google.com/app/apikey
2. Elimina la key antigua
3. Crea una nueva
4. Actualiza en Options

---

### Step 7: Test Manual Completo

**Copia y pega este código en la consola de WhatsApp Web:**

```javascript
// 1. Check content script
console.log('Content script loaded:', typeof findWhatsAppInputBox !== 'undefined');

// 2. Find input box
const inputBox = findWhatsAppInputBox();
console.log('Input box found:', inputBox);

// 3. Check if we can focus it
if (inputBox) {
  inputBox.focus();
  console.log('Input box focused');
}

// 4. Test text insertion
if (inputBox) {
  const testText = 'Test from console';
  const textNode = document.createTextNode(testText);
  inputBox.appendChild(textNode);
  
  const inputEvent = new InputEvent('input', {
    bubbles: true,
    cancelable: true,
    inputType: 'insertText',
    data: testText
  });
  inputBox.dispatchEvent(inputEvent);
  
  console.log('Test text inserted');
}
```

**Si el test funciona:** El problema está en la comunicación entre background y content script

**Si el test falla:** El problema está en encontrar el input box de WhatsApp

---

### Step 8: Reinstalación Limpia

Si nada funciona:

```bash
# 1. Remueve la extensión
chrome://extensions/ → Remove

# 2. Recarga los archivos
cd "Gemini WhatsApp Enhancer"
# [Haz los cambios necesarios]

# 3. Reinstala
chrome://extensions/ → Load unpacked → Selecciona la carpeta

# 4. Reconfigura API key

# 5. Recarga WhatsApp Web
```

---

## 📊 Logs Esperados (Todo Funcionando)

### Service Worker Console:
```
Gemini WhatsApp Enhancer installed successfully
=== GEMINI ENHANCER TRIGGERED ===
Selected text: i going to the cinma
Tab ID: 123456789
API key found, length: 39
Loading indicator sent
Calling Gemini API with endpoint: https://...
API Response status: 200 OK
API Response data: {...}
Original: i going to the cinma
Corrected: I am going to the cinema.
Replacement message sent, response: {success: true}
```

### WhatsApp Web Console:
```
Gemini WhatsApp Enhancer content script loaded
Content script received message: SHOW_LOADING
Content script received message: REPLACE_SELECTION
Attempting to replace text with: I am going to the cinema.
Found input box: div.contenteditable...
Current selection: i going to the cinma
Text replaced successfully
```

---

## 🆘 Aún No Funciona?

Comparte estos logs:
1. Consola del Service Worker (completa)
2. Consola de WhatsApp Web (completa)
3. Screenshot del error
4. Versión de Chrome: `chrome://version`
5. ¿En qué paso específico falla?
