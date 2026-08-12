/**
 * Generate Aether.ai hero banner (16:9, 1792x1024)
 * Dark sci-fi holographic geometric style
 */
import sharp from 'sharp';

const W = 1792;
const H = 1024;
const CX = W / 2;
const CY = H / 2;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Background -->
    <radialGradient id="bgGrad" cx="50%" cy="45%" r="70%">
      <stop offset="0%" style="stop-color:#0a0c1a;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#050610;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#02040a;stop-opacity:1" />
    </radialGradient>

    <!-- Cyan holographic -->
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00e5ff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0091ea;stop-opacity:1" />
    </linearGradient>

    <!-- Indigo secondary -->
    <linearGradient id="indigoGrad" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#7c4dff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#304ffe;stop-opacity:1" />
    </linearGradient>

    <!-- Core orb glow -->
    <radialGradient id="coreGlow" cx="50%" cy="50%" r="40%">
      <stop offset="0%" style="stop-color:#00e5ff;stop-opacity:0.15" />
      <stop offset="60%" style="stop-color:#00b8d4;stop-opacity:0.04" />
      <stop offset="100%" style="stop-color:#000;stop-opacity:0" />
    </radialGradient>

    <radialGradient id="indigoGlow" cx="30%" cy="40%" r="30%">
      <stop offset="0%" style="stop-color:#7c4dff;stop-opacity:0.10" />
      <stop offset="100%" style="stop-color:#000;stop-opacity:0" />
    </radialGradient>

    <radialGradient id="cyanGlow2" cx="70%" cy="60%" r="30%">
      <stop offset="0%" style="stop-color:#00e5ff;stop-opacity:0.08" />
      <stop offset="100%" style="stop-color:#000;stop-opacity:0" />
    </radialGradient>

    <!-- Panel card -->
    <linearGradient id="panelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0d0f1d;stop-opacity:0.92" />
      <stop offset="100%" style="stop-color:#0f1124;stop-opacity:0.85" />
    </linearGradient>

    <linearGradient id="panelBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00e5ff;stop-opacity:0.15" />
      <stop offset="50%" style="stop-color:#7c4dff;stop-opacity:0.10" />
      <stop offset="100%" style="stop-color:#00e5ff;stop-opacity:0.08" />
    </linearGradient>

    <!-- Glow filters -->
    <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur2" />
      <feMerge>
        <feMergeNode in="blur2" />
        <feMergeNode in="blur1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="20" flood-color="#000" flood-opacity="0.6" />
    </filter>

    <!-- Hex grid -->
    <pattern id="hexGrid" x="0" y="0" width="120" height="103.92" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
      <path d="M60 0 L120 34.64 L120 69.28 L60 103.92 L0 69.28 L0 34.64 Z"
            fill="none" stroke="#00e5ff" stroke-width="0.4" opacity="0.06" />
    </pattern>

    <!-- Dot grid -->
    <pattern id="dotGrid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
      <circle cx="40" cy="40" r="0.6" fill="#7c4dff" opacity="0.06" />
    </pattern>

    <!-- Line gradient horizontal -->
    <linearGradient id="lineH" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00e5ff;stop-opacity:0" />
      <stop offset="50%" style="stop-color:#00e5ff;stop-opacity:0.25" />
      <stop offset="100%" style="stop-color:#00e5ff;stop-opacity:0" />
    </linearGradient>

    <linearGradient id="lineH2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#7c4dff;stop-opacity:0" />
      <stop offset="50%" style="stop-color:#7c4dff;stop-opacity:0.2" />
      <stop offset="100%" style="stop-color:#7c4dff;stop-opacity:0" />
    </linearGradient>

    <!-- Line gradient vertical -->
    <linearGradient id="lineV" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#00e5ff;stop-opacity:0.2" />
      <stop offset="100%" style="stop-color:#00e5ff;stop-opacity:0" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bgGrad)" />
  <rect width="${W}" height="${H}" fill="url(#hexGrid)" />
  <rect width="${W}" height="${H}" fill="url(#dotGrid)" />

  <!-- Glow orbs -->
  <circle cx="${CX}" cy="${CY - 20}" r="500" fill="url(#coreGlow)" />
  <circle cx="${CX - 400}" cy="${CY - 50}" r="350" fill="url(#indigoGlow)" />
  <circle cx="${CX + 450}" cy="${CY + 50}" r="350" fill="url(#cyanGlow2)" />

  <!-- ═══ GEOMETRIC STRUCTURE ═══ -->

  <!-- Large hexagon (faint, background) -->
  <polygon points="${CX},${CY-380} ${CX+329},${CY-190} ${CX+329},${CY+190} ${CX},${CY+380} ${CX-329},${CY+190} ${CX-329},${CY-190}"
           fill="none" stroke="url(#cyanGrad)" stroke-width="1.5" opacity="0.12" />

  <!-- Medium hexagon (rotated 30°) -->
  <polygon points="${CX},${CY-280} ${CX+242},${CY-140} ${CX+242},${CY+140} ${CX},${CY+280} ${CX-242},${CY+140} ${CX-242},${CY-140}"
           fill="none" stroke="url(#indigoGrad)" stroke-width="1.2" opacity="0.15"
           transform="rotate(30 ${CX} ${CY})" />

  <!-- Main panel card -->
  <rect x="${CX - 460}" y="${CY - 240}" width="920" height="480" rx="20"
        fill="url(#panelGrad)" stroke="url(#panelBorder)" stroke-width="1.2" filter="url(#shadow)" />

  <!-- Panel corner accents -->
  <line x1="${CX - 440}" y1="${CY - 220}" x2="${CX - 440}" y2="${CY - 180}" stroke="#00e5ff" stroke-width="1.5" opacity="0.25" filter="url(#softGlow)" />
  <line x1="${CX - 440}" y1="${CY - 220}" x2="${CX - 400}" y2="${CY - 220}" stroke="#00e5ff" stroke-width="1.5" opacity="0.25" filter="url(#softGlow)" />

  <line x1="${CX + 440}" y1="${CY - 220}" x2="${CX + 440}" y2="${CY - 180}" stroke="#7c4dff" stroke-width="1.5" opacity="0.25" filter="url(#softGlow)" />
  <line x1="${CX + 440}" y1="${CY - 220}" x2="${CX + 400}" y2="${CY - 220}" stroke="#7c4dff" stroke-width="1.5" opacity="0.25" filter="url(#softGlow)" />

  <line x1="${CX - 440}" y1="${CY + 220}" x2="${CX - 440}" y2="${CY + 180}" stroke="#7c4dff" stroke-width="1.5" opacity="0.25" filter="url(#softGlow)" />
  <line x1="${CX - 440}" y1="${CY + 220}" x2="${CX - 400}" y2="${CY + 220}" stroke="#7c4dff" stroke-width="1.5" opacity="0.25" filter="url(#softGlow)" />

  <line x1="${CX + 440}" y1="${CY + 220}" x2="${CX + 440}" y2="${CY + 180}" stroke="#00e5ff" stroke-width="1.5" opacity="0.25" filter="url(#softGlow)" />
  <line x1="${CX + 440}" y1="${CY + 220}" x2="${CX + 400}" y2="${CY + 220}" stroke="#00e5ff" stroke-width="1.5" opacity="0.25" filter="url(#softGlow)" />

  <!-- Central geometric logo on panel -->
  <!-- Outer hex -->
  <polygon points="${CX},${CY-120} ${CX+104},${CY-60} ${CX+104},${CY+60} ${CX},${CY+120} ${CX-104},${CY+60} ${CX-104},${CY-60}"
           fill="none" stroke="url(#cyanGrad)" stroke-width="1.8" filter="url(#glow)" opacity="0.7" />

  <!-- Inner diamond -->
  <rect x="${CX-62}" y="${CY-62}" width="124" height="124" rx="1"
        fill="none" stroke="url(#indigoGrad)" stroke-width="1.5" filter="url(#softGlow)" opacity="0.6"
        transform="rotate(45 ${CX} ${CY})" />

  <!-- Core diamond -->
  <rect x="${CX-32}" y="${CY-32}" width="64" height="64" rx="1"
        fill="none" stroke="url(#cyanGrad)" stroke-width="2" filter="url(#glow)" opacity="0.85"
        transform="rotate(45 ${CX} ${CY})" />

  <!-- Center dot -->
  <circle cx="${CX}" cy="${CY}" r="5" fill="#00e5ff" filter="url(#glow)" opacity="0.9" />
  <circle cx="${CX}" cy="${CY}" r="2" fill="#fff" opacity="0.7" />

  <!-- Hexagon vertex orbit dots -->
  <circle cx="${CX}" cy="${CY-120}" r="3.5" fill="#00e5ff" filter="url(#glow)" opacity="0.6" />
  <circle cx="${CX+104}" cy="${CY-60}" r="2.5" fill="#00b8d4" filter="url(#softGlow)" opacity="0.45" />
  <circle cx="${CX+104}" cy="${CY+60}" r="2.5" fill="#0091ea" filter="url(#softGlow)" opacity="0.45" />
  <circle cx="${CX}" cy="${CY+120}" r="3.5" fill="#7c4dff" filter="url(#glow)" opacity="0.6" />
  <circle cx="${CX-104}" cy="${CY+60}" r="2.5" fill="#651fff" filter="url(#softGlow)" opacity="0.45" />
  <circle cx="${CX-104}" cy="${CY-60}" r="2.5" fill="#304ffe" filter="url(#softGlow)" opacity="0.45" />

  <!-- ═══ INFO LINE DECORATIONS ═══ -->

  <!-- Separator lines in panel -->
  <line x1="${CX - 300}" y1="${CY + 160}" x2="${CX + 300}" y2="${CY + 160}" stroke="url(#lineH)" stroke-width="0.6" opacity="0.15" />
  <line x1="${CX - 300}" y1="${CY - 160}" x2="${CX + 300}" y2="${CY - 160}" stroke="url(#lineH2)" stroke-width="0.6" opacity="0.15" />

  <!-- Small accent dots on separator -->
  <circle cx="${CX}" cy="${CY + 160}" r="2" fill="#7c4dff" opacity="0.3" />
  <circle cx="${CX}" cy="${CY - 160}" r="2" fill="#00e5ff" opacity="0.3" />

  <!-- Branch lines from center to hexagon vertices -->
  <line x1="${CX}" y1="${CY}" x2="${CX}" y2="${CY-120}" stroke="#00e5ff" stroke-width="0.5" opacity="0.12" />
  <line x1="${CX}" y1="${CY}" x2="${CX+104}" y2="${CY-60}" stroke="#00b8d4" stroke-width="0.5" opacity="0.12" />
  <line x1="${CX}" y1="${CY}" x2="${CX+104}" y2="${CY+60}" stroke="#0091ea" stroke-width="0.5" opacity="0.12" />
  <line x1="${CX}" y1="${CY}" x2="${CX}" y2="${CY+120}" stroke="#7c4dff" stroke-width="0.5" opacity="0.12" />
  <line x1="${CX}" y1="${CY}" x2="${CX-104}" y2="${CY+60}" stroke="#651fff" stroke-width="0.5" opacity="0.12" />
  <line x1="${CX}" y1="${CY}" x2="${CX-104}" y2="${CY-60}" stroke="#304ffe" stroke-width="0.5" opacity="0.12" />

  <!-- ═══ FLOATING GEOMETRIC ELEMENTS ═══ -->

  <!-- Left floating mini hex -->
  <polygon points="${CX-580},${CY-80} ${CX-540},${CY-60} ${CX-540},${CY-20} ${CX-580},${CY-0} ${CX-620},${CY-20} ${CX-620},${CY-60}"
           fill="none" stroke="#00e5ff" stroke-width="1" opacity="0.15" filter="url(#softGlow)" />

  <!-- Right floating mini hex -->
  <polygon points="${CX+540},${CY-30} ${CX+580},${CY-10} ${CX+580},${CY+30} ${CX+540},${CY+50} ${CX+500},${CY+30} ${CX+500},${CY-10}"
           fill="none" stroke="#7c4dff" stroke-width="1" opacity="0.15" filter="url(#softGlow)" />

  <!-- Left diamond -->
  <rect x="${CX - 610}" y="${CY + 40}" width="40" height="40" rx="1"
        fill="none" stroke="#7c4dff" stroke-width="0.8" opacity="0.12"
        transform="rotate(45 ${CX-590} ${CY+60})" />

  <!-- Right diamond -->
  <rect x="${CX + 570}" y="${CY - 90}" width="35" height="35" rx="1"
        fill="none" stroke="#00e5ff" stroke-width="0.8" opacity="0.12"
        transform="rotate(45 ${CX+587} ${CY-72})" />

  <!-- ═══ DECORATIVE FRAME LINES ═══ -->
  <line x1="100" y1="300" x2="400" y2="300" stroke="url(#lineH)" stroke-width="0.8" opacity="0.12" />
  <line x1="1400" y1="750" x2="1680" y2="750" stroke="url(#lineH2)" stroke-width="0.8" opacity="0.12" />
  <line x1="80" y1="800" x2="250" y2="800" stroke="url(#lineH)" stroke-width="0.6" opacity="0.08" />
  <line x1="1550" y1="200" x2="1720" y2="200" stroke="url(#lineH2)" stroke-width="0.6" opacity="0.08" />

  <!-- Top-left vertical accent -->
  <line x1="100" y1="100" x2="100" y2="200" stroke="url(#lineV)" stroke-width="0.8" opacity="0.1" />
  <line x1="120" y1="80" x2="120" y2="180" stroke="url(#lineV)" stroke-width="0.5" opacity="0.06" />

  <!-- Bottom-right vertical accent -->
  <line x1="1680" y1="820" x2="1680" y2="920" stroke="url(#lineV)" stroke-width="0.8" opacity="0.1" />

  <!-- Tiny scattered dots for depth -->
  <circle cx="180" cy="150" r="1.2" fill="#00e5ff" opacity="0.12" />
  <circle cx="1620" cy="180" r="1" fill="#7c4dff" opacity="0.10" />
  <circle cx="300" cy="880" r="0.8" fill="#00b8d4" opacity="0.08" />
  <circle cx="1500" cy="850" r="1" fill="#651fff" opacity="0.08" />
  <circle cx="200" cy="500" r="0.8" fill="#304ffe" opacity="0.06" />
  <circle cx="1600" cy="400" r="0.8" fill="#0091ea" opacity="0.06" />
</svg>`;

// Render to PNG
const buf = Buffer.from(svg);
await sharp(buf, { density: 144 })
  .resize(W, H)
  .png({ compressionLevel: 9 })
  .toFile('docs/images/aether-ai-hero.png');

console.log('✅ Generated docs/images/aether-ai-hero.png (%dx%d)', W, H);
