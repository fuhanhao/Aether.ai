/**
 * Generate Aether.ai sci-fi holographic geometric icon (1024x1024)
 * and internal brand icon (128x128).
 *
 * Style: Dark geometric + holographic — pure black base, cyan/indigo glowing
 * thin-line hexagons, diamonds, intersecting rings. No text. Sci-fi HUD feel.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const DESKTOP_ROOT = path.resolve(
  import.meta.dirname,
  '..',
  'packages',
  'desktop',
);
const BUILD_DIR = path.join(DESKTOP_ROOT, 'build');
const ASSETS_DIR = path.join(DESKTOP_ROOT, 'src', 'renderer', 'assets');
const DOCS_IMAGES = path.resolve(import.meta.dirname, '..', 'docs', 'images');

await mkdir(BUILD_DIR, { recursive: true });
await mkdir(ASSETS_DIR, { recursive: true });
await mkdir(DOCS_IMAGES, { recursive: true });

const SIZE = 1024;
const C = SIZE / 2; // center

// ── SVG: holographic geometric abstract icon ──
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <!-- Background gradient: deep space black -->
    <radialGradient id="bgGrad" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#0d0f1a" />
      <stop offset="60%" stop-color="#060810" />
      <stop offset="100%" stop-color="#020308" />
    </radialGradient>

    <!-- Primary glow: cyan holographic -->
    <linearGradient id="cyanGrad" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#00e5ff" />
      <stop offset="50%" stop-color="#00b8d4" />
      <stop offset="100%" stop-color="#0091ea" />
    </linearGradient>

    <!-- Secondary glow: indigo/violet -->
    <linearGradient id="indigoGrad" x1="80%" y1="0%" x2="20%" y2="100%">
      <stop offset="0%" stop-color="#7c4dff" />
      <stop offset="50%" stop-color="#651fff" />
      <stop offset="100%" stop-color="#304ffe" />
    </linearGradient>

    <!-- Core glow -->
    <radialGradient id="coreGlow" cx="50%" cy="50%" r="35%">
      <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.25" />
      <stop offset="50%" stop-color="#00b8d4" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#000" stop-opacity="0" />
    </radialGradient>

    <!-- Outer ring glow -->
    <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
      <stop offset="70%" stop-color="#000" stop-opacity="0" />
      <stop offset="85%" stop-color="#7c4dff" stop-opacity="0.06" />
      <stop offset="100%" stop-color="#651fff" stop-opacity="0.15" />
    </radialGradient>

    <!-- Glow filter for lines -->
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
      <feMerge>
        <feMergeNode in="blur2" />
        <feMergeNode in="blur1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Subtle glow for thin lines -->
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Hex grid pattern -->
    <pattern id="hexGrid" x="0" y="0" width="80" height="69.28" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
      <path d="M40 0 L80 23.09 L80 46.19 L40 69.28 L0 46.19 L0 23.09 Z"
            fill="none" stroke="#00e5ff" stroke-width="0.4" opacity="0.08" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="${SIZE}" height="${SIZE}" rx="206" fill="url(#bgGrad)" />

  <!-- Subtle hex grid overlay -->
  <rect width="${SIZE}" height="${SIZE}" rx="206" fill="url(#hexGrid)" />

  <!-- Core glow orb -->
  <circle cx="${C}" cy="${C}" r="180" fill="url(#coreGlow)" />
  <circle cx="${C}" cy="${C}" r="350" fill="url(#ringGlow)" />

  <!-- ═══ MAIN GEOMETRIC STRUCTURE ═══ -->

  <!-- Outer hexagon (large, thin, cyan) -->
  <polygon points="${C},${C - 340} ${C + 294},${C - 170} ${C + 294},${C + 170} ${C},${C + 340} ${C - 294},${C + 170} ${C - 294},${C - 170}"
           fill="none" stroke="url(#cyanGrad)" stroke-width="2.5" filter="url(#glow)" opacity="0.7" />

  <!-- Middle hexagon (rotated 30°, slightly smaller, indigo) -->
  <polygon points="${C},${C - 260} ${C + 225},${C - 130} ${C + 225},${C + 130} ${C},${C + 260} ${C - 225},${C + 130} ${C - 225},${C - 130}"
           fill="none" stroke="url(#indigoGrad)" stroke-width="1.8" filter="url(#softGlow)" opacity="0.5"
           transform="rotate(30 ${C} ${C})" />

  <!-- Inner diamond (rotated 45°) -->
  <rect x="${C - 140}" y="${C - 140}" width="280" height="280" rx="2"
        fill="none" stroke="url(#cyanGrad)" stroke-width="2" filter="url(#glow)" opacity="0.6"
        transform="rotate(45 ${C} ${C})" />

  <!-- Inner hexagon (small) -->
  <polygon points="${C},${C - 160} ${C + 139},${C - 80} ${C + 139},${C + 80} ${C},${C + 160} ${C - 139},${C + 80} ${C - 139},${C - 80}"
           fill="none" stroke="url(#indigoGrad)" stroke-width="2.2" filter="url(#glow)" opacity="0.8" />

  <!-- Core diamond (small, bright cyan) -->
  <rect x="${C - 60}" y="${C - 60}" width="120" height="120" rx="1"
        fill="none" stroke="url(#cyanGrad)" stroke-width="2.5" filter="url(#glow)" opacity="0.9"
        transform="rotate(45 ${C} ${C})" />

  <!-- Center dot (bright core) -->
  <circle cx="${C}" cy="${C}" r="10" fill="#00e5ff" filter="url(#glow)" opacity="0.9" />
  <circle cx="${C}" cy="${C}" r="4" fill="#fff" opacity="0.8" />

  <!-- ═══ CORNER ACCENT LINES (thin holographic) ═══ -->

  <!-- Top-left accent -->
  <line x1="${C - 340}" y1="${C - 280}" x2="${C - 340}" y2="${C - 200}"
        stroke="#00e5ff" stroke-width="1.5" filter="url(#softGlow)" opacity="0.35" />
  <line x1="${C - 280}" y1="${C - 340}" x2="${C - 200}" y2="${C - 340}"
        stroke="#00e5ff" stroke-width="1.5" filter="url(#softGlow)" opacity="0.35" />

  <!-- Top-right accent -->
  <line x1="${C + 340}" y1="${C - 280}" x2="${C + 340}" y2="${C - 200}"
        stroke="#7c4dff" stroke-width="1.5" filter="url(#softGlow)" opacity="0.35" />
  <line x1="${C + 280}" y1="${C - 340}" x2="${C + 200}" y2="${C - 340}"
        stroke="#7c4dff" stroke-width="1.5" filter="url(#softGlow)" opacity="0.35" />

  <!-- Bottom-left accent -->
  <line x1="${C - 340}" y1="${C + 280}" x2="${C - 340}" y2="${C + 200}"
        stroke="#7c4dff" stroke-width="1.5" filter="url(#softGlow)" opacity="0.35" />

  <!-- Bottom-right accent -->
  <line x1="${C + 340}" y1="${C + 280}" x2="${C + 340}" y2="${C + 200}"
        stroke="#00e5ff" stroke-width="1.5" filter="url(#softGlow)" opacity="0.35" />

  <!-- ═══ ORBIT RING ACCENTS ═══ -->
  <!-- Small orbit dots on outer hexagon vertices -->
  <circle cx="${C}" cy="${C - 340}" r="5" fill="#00e5ff" filter="url(#glow)" opacity="0.7" />
  <circle cx="${C + 294}" cy="${C - 170}" r="4" fill="#00b8d4" filter="url(#glow)" opacity="0.5" />
  <circle cx="${C + 294}" cy="${C + 170}" r="4" fill="#0091ea" filter="url(#glow)" opacity="0.5" />
  <circle cx="${C}" cy="${C + 340}" r="5" fill="#7c4dff" filter="url(#glow)" opacity="0.7" />
  <circle cx="${C - 294}" cy="${C + 170}" r="4" fill="#651fff" filter="url(#glow)" opacity="0.5" />
  <circle cx="${C - 294}" cy="${C - 170}" r="4" fill="#304ffe" filter="url(#glow)" opacity="0.5" />

  <!-- ═══ CONNECTING LINES (cross-hexagon) ═══ -->
  <line x1="${C}" y1="${C - 160}" x2="${C + 139}" y2="${C + 80}"
        stroke="#00e5ff" stroke-width="0.8" opacity="0.2" />
  <line x1="${C + 139}" y1="${C + 80}" x2="${C - 139}" y2="${C + 80}"
        stroke="#7c4dff" stroke-width="0.8" opacity="0.2" />
  <line x1="${C - 139}" y1="${C + 80}" x2="${C}" y2="${C - 160}"
        stroke="#00b8d4" stroke-width="0.8" opacity="0.2" />
</svg>`;

// ── Render 1024x1024 icon ──
const icon1024 = await sharp(Buffer.from(svg), { density: 144 })
  .resize(SIZE, SIZE)
  .png({ compressionLevel: 9 })
  .toBuffer();

// Save source and generated files
const sourcePath = path.join(BUILD_DIR, 'aether-icon-source.png');
const iconPngPath = path.join(BUILD_DIR, 'icon.png');
const uiIconPath = path.join(BUILD_DIR, 'gameagent-mascot-ui.png');
const rendererUiIconPath = path.join(ASSETS_DIR, 'gameagent-mascot-ui.png');
const readmeIconPath = path.join(DOCS_IMAGES, 'aether-ai-app-icon.png');

// Apply macOS-style rounded mask (same as original build-icon.mjs)
const maskInset = 4;
const maskRadius = 216;
const roundedMask = Buffer.from(`
  <svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
    <rect x="${maskInset}" y="${maskInset}"
          width="${SIZE - maskInset * 2}" height="${SIZE - maskInset * 2}"
          rx="${maskRadius}" fill="white" />
  </svg>
`);

const roundedIcon = await sharp(icon1024)
  .composite([{ input: roundedMask, blend: 'dest-in' }])
  .png()
  .toBuffer();

// Save all files
await sharp(roundedIcon).toFile(iconPngPath);
await sharp(icon1024).toFile(sourcePath);

// 128x128 for UI
const icon128 = await sharp(roundedIcon)
  .resize(128, 128)
  .png({ compressionLevel: 9, palette: true })
  .toBuffer();
await sharp(icon128).toFile(uiIconPath);
await sharp(icon128).toFile(rendererUiIconPath);

// 512x512 for README
await sharp(roundedIcon)
  .resize(512, 512)
  .png({ compressionLevel: 9 })
  .toFile(readmeIconPath);

console.log('✅ Generated Aether.ai holographic icons:');
console.log('  Source:', sourcePath);
console.log('  Desktop icon (1024):', iconPngPath);
console.log('  UI icon (128):', uiIconPath);
console.log('  Renderer icon (128):', rendererUiIconPath);
console.log('  README icon (512):', readmeIconPath);
