# Icon Placeholder

This directory should contain the extension icons:

- `icon16.png` - 16x16px icon for the extension toolbar
- `icon48.png` - 48x48px icon for the extension management page
- `icon128.png` - 128x128px icon for the Chrome Web Store

## Creating Icons

You can create simple placeholder icons using any of these methods:

### Option 1: Use an online icon generator
- Visit [favicon.io](https://favicon.io/favicon-generator/)
- Create icons with "GWE" text or a robot emoji
- Download and rename to the appropriate sizes

### Option 2: Use ImageMagick (command line)
```bash
# Install ImageMagick first, then run:
convert -size 16x16 -background "#667eea" -fill white -gravity center -font Arial-Bold label:"G" icon16.png
convert -size 48x48 -background "#667eea" -fill white -gravity center -font Arial-Bold label:"G" icon48.png
convert -size 128x128 -background "#667eea" -fill white -gravity center -font Arial-Bold label:"G" icon128.png
```

### Option 3: Use a design tool
- Canva, Figma, or Photoshop
- Create purple/blue gradient backgrounds (#667eea to #764ba2)
- Add a robot icon or "G" letter
- Export at 16px, 48px, and 128px

## Temporary Workaround

For testing, you can use any .png files at the correct sizes. The extension will still work without proper icons, though it will show a default placeholder in Chrome.
