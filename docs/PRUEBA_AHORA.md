# ⚡ PRUEBA ESTO AHORA - Pasos Rápidos

## 🔴 IMPORTANTE: Hice cambios críticos en el código

Los archivos `background.js` y `content.js` fueron completamente reescritos con:
- Mejor búsqueda del input de WhatsApp
- Logs detallados para debugging
- Mejor manejo de la selección de texto
- Eventos de React correctos

---

## ✅ PASO 1: Recargar Extensión (OBLIGATORIO)

```
1. Abre: chrome://extensions/
2. Busca "Gemini WhatsApp Enhancer"
3. Click en el botón RELOAD (↻)
```

**¿Ves errores en rojo?** Si sí, copia el error y pégamelo.

---

## ✅ PASO 2: Abrir 3 Ventanas

### Ventana 1: Service Worker Console
```
1. chrome://extensions/
2. Busca la extensión
3. Click en "service worker" (link azul)
4. Aparece ventana de DevTools
```
**Déjala abierta**

### Ventana 2: WhatsApp Web
```
1. Abre: https://web.whatsapp.com
2. Espera a que cargue completamente
3. Abre un chat cualquiera
```

### Ventana 3: WhatsApp DevTools
```
1. En la pestaña de WhatsApp presiona F12
2. Ve a la pestaña "Console"
```
**Déjala abierta**

---

## ✅ PASO 3: Hacer la Prueba

En WhatsApp Web:

```
1. Click en el cuadro de mensaje (donde escribes)
2. Escribe exactamente esto: i going to the cinma
3. Selecciona TODO el texto (arrastra con el mouse)
4. El texto debe quedar RESALTADO/AZUL
5. Mientras está resaltado, click DERECHO
6. Elige "Gemini: Fix Grammar"
```

---

## 📊 PASO 4: Ver los Logs

### En la Ventana 1 (Service Worker) debes ver:

```
=== GEMINI ENHANCER TRIGGERED ===
Selected text: i going to the cinma
Tab ID: [número]
API key found, length: [número]
```

**Si NO ves esto:** La extensión no se disparó. Posibles causas:
- No está recargada
- El menú contextual no apareció
- No hay API key

### En la Ventana 3 (WhatsApp Console) debes ver:

```
Gemini WhatsApp Enhancer content script loaded
Content script received message: SHOW_LOADING
Content script received message: REPLACE_SELECTION
Attempting to replace text with: [texto corregido]
Found input box: [objeto]
Text replaced successfully
```

**Si NO ves "content script loaded":**
- Recarga WhatsApp Web (F5)
- Verifica que la extensión tiene permisos

---

## 🎯 Tres Escenarios Posibles

### ✅ ESCENARIO A: Todo Funciona
```
- Ves logs en ambas consolas
- El texto se reemplaza
- Aparece notificación verde "✓ Text improved by Gemini"
```
**Acción:** ¡Listo! Funciona. Prueba con más textos.

---

### ❌ ESCENARIO B: No pasa nada
```
- NO ves logs en ninguna consola
- El menú contextual no aparece o aparece pero no pasa nada
```

**Copia y pégame:**
1. Screenshot de chrome://extensions/ mostrando la extensión
2. ¿Aparece el menú "Gemini: Fix Grammar"? (sí/no)
3. ¿Configuraste API key? (sí/no)

---

### ❌ ESCENARIO C: Aparece un error
```
- Ves logs PERO hay un error en rojo
- Puede ser error de API o error de JavaScript
```

**Copia y pégame:**
1. El error COMPLETO de la consola del Service Worker
2. El error COMPLETO de la consola de WhatsApp
3. Cuéntame exactamente qué pasó

---

## 🧪 PRUEBA ALTERNATIVA: Test Page

Si WhatsApp no funciona, prueba con la página de test:

```
1. Abre este archivo en Chrome:
   file:///[RUTA_COMPLETA]/Gemini WhatsApp Enhancer/test.html

2. Click "Check Extension Status"
   Debe mostrar:
   ✓ Chrome runtime available
   ✓ API key configured
   ✓ Message passing works

3. Click "Test API Key"
   Debe mostrar:
   ✓ API key is VALID!

4. Selecciona texto en el cuadro editable
5. Click derecho → "Gemini: Fix Grammar"
```

**Si funciona aquí pero no en WhatsApp:**
- El problema es específico de WhatsApp
- Necesito ver los logs de WhatsApp

**Si NO funciona ni aquí:**
- El problema es la extensión o API key
- Revisa la configuración

---

## 📸 Lo que necesito si falla

Hazme un screenshot que muestre:

1. **Service Worker Console:** Toda la consola con los logs
2. **WhatsApp Console:** Toda la consola con los logs (o mensaje de error)
3. **chrome://extensions/:** La extensión cargada sin errores

Y responde:
- ¿Qué ves exactamente cuando usas el menú?
- ¿El texto desaparece? ¿Se queda igual? ¿Aparece error?
- ¿Ves el cursor de "wait" (relojito)?

---

## 💡 Tips Importantes

1. **Selecciona con el MOUSE** - No uses Ctrl+A, arrastra con el mouse
2. **Espera unos segundos** - La API tarda 2-5 segundos
3. **Mantén las consolas abiertas** - Necesitamos ver los logs
4. **Un chat a la vez** - Haz la prueba en UN solo chat

---

**¿Listo? Sigue los pasos y cuéntame QUÉ VES en cada consola.**
