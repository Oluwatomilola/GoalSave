# PWA Icons

The PWA requires the following icons to be placed in the `public/` directory:

## Required Icons

1. **icon-192x192.png** - 192x192 pixels
   - Used for mobile app icon
   - Should be a square PNG with transparent background
   - Recommended: Your app logo/branding

2. **icon-512x512.png** - 512x512 pixels
   - Used for splash screens and larger displays
   - Should be a square PNG with transparent background
   - Same design as 192x192, just larger

## How to Create Icons

You can:
1. Use an online tool like [Favicon Generator](https://realfavicongenerator.net/)
2. Design in Figma/Photoshop and export as PNG
3. Use the existing vite.svg as a base and convert to PNG at the required sizes

## Quick Solution (Command Line)

If you have ImageMagick installed:
```bash
# Convert vite.svg to PNG icons (example)
convert -background none -resize 192x192 public/vite.svg public/icon-192x192.png
convert -background none -resize 512x512 public/vite.svg public/icon-512x512.png
```

Or use online converters to create proper app icons with your branding.
