/**
 * Generate Aether.ai workflow diagram (1774x887)
 * Dark sci-fi holographic style: 5-step pipeline from idea to playable
 */
import sharp from 'sharp';

const W = 1774;
const H = 887;

// Layout constants
const TOP_TITLE_Y = 110;
const NODE_Y = 330;
const NODE_W = 290;
const NODE_H = 330;
const GAP = 52;
const TOTAL_W = NODE_W * 5 + GAP * 4; // 1658
const START_X = (W - TOTAL_W) / 2; // 58

const steps = [
  {
    num: '01',
    name: '描述创意',
    desc: '自然语言说明\n玩法、视角与主题',
    color: '#00e5ff',
    shape: 'circle',
  },
  {
    num: '02',
    name: '形成计划',
    desc: '识别项目类型\n生成 GDD 与任务',
    color: '#00b8d4',
    shape: 'hex',
  },
  {
    num: '03',
    name: '制作工程',
    desc: '创建文件、实现玩法\n按需加载 Skill / MCP',
    color: '#7c4dff',
    shape: 'diamond',
  },
  {
    num: '04',
    name: '运行验证',
    desc: '构建与测试\n结果实时回传',
    color: '#651fff',
    shape: 'hex',
  },
  {
    num: '05',
    name: '试玩迭代',
    desc: '查看预览\n持续修改迭代',
    color: '#304ffe',
    shape: 'circle',
  },
];

// Build SVG strings
const hexPoints = (cx, cy, r) => {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
  }
  return pts.join(' ');
};

let nodesSvg = '';
let connectorsSvg = '';
let connectorsBgSvg = '';

for (let i = 0; i < steps.length; i++) {
  const s = steps[i];
  const x = START_X + i * (NODE_W + GAP);
  const cx = x + NODE_W / 2;
  const iconR = 44;
  const iconCy = NODE_Y + 95;

  // Node card
  nodesSvg += `
  <!-- Node ${s.num} -->
  <rect x="${x}" y="${NODE_Y}" width="${NODE_W}" height="${NODE_H}" rx="14"
        fill="rgba(10,12,23,0.88)" stroke="${s.color}" stroke-opacity="0.35" stroke-width="1.2" />
  <rect x="${x + 8}" y="${NODE_Y + 8}" width="${NODE_W - 16}" height="${NODE_H - 16}" rx="10"
        fill="none" stroke="${s.color}" stroke-opacity="0.08" stroke-width="0.8" />`;

  // Corner accents
  nodesSvg += `
  <line x1="${x + 22}" y1="${NODE_Y + 16}" x2="${x + 22}" y2="${NODE_Y + 34}" stroke="${s.color}" stroke-width="1.2" opacity="0.35" />
  <line x1="${x + 22}" y1="${NODE_Y + 16}" x2="${x + 40}" y2="${NODE_Y + 16}" stroke="${s.color}" stroke-width="1.2" opacity="0.35" />
  <line x1="${x + NODE_W - 22}" y1="${NODE_Y + NODE_H - 16}" x2="${x + NODE_W - 22}" y2="${NODE_Y + NODE_H - 34}" stroke="${s.color}" stroke-width="1.2" opacity="0.35" />
  <line x1="${x + NODE_W - 22}" y1="${NODE_Y + NODE_H - 16}" x2="${x + NODE_W - 40}" y2="${NODE_Y + NODE_H - 16}" stroke="${s.color}" stroke-width="1.2" opacity="0.35" />`;

  // Step number
  nodesSvg += `
  <text x="${x + 20}" y="${NODE_Y + 34}" font-family="JetBrains Mono, Consolas, monospace" font-size="14"
        fill="${s.color}" opacity="0.55">${s.num}</text>`;

  // Icon shapes (glowing geometry)
  const glow = `<filter id="glow${s.num}"><feGaussianBlur stdDeviation="3" result="b1"/><feMerge><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
  nodesSvg += glow;

  if (s.shape === 'hex') {
    nodesSvg += `
  <polygon points="${hexPoints(cx, iconCy, iconR)}" fill="none" stroke="${s.color}" stroke-width="2" filter="url(#glow${s.num})" opacity="0.85" />
  <circle cx="${cx}" cy="${iconCy}" r="7" fill="${s.color}" filter="url(#glow${s.num})" opacity="0.9" />`;
  } else if (s.shape === 'diamond') {
    nodesSvg += `
  <rect x="${cx - iconR * 0.72}" y="${iconCy - iconR * 0.72}" width="${iconR * 1.44}" height="${iconR * 1.44}" rx="1"
        fill="none" stroke="${s.color}" stroke-width="2" filter="url(#glow${s.num})" opacity="0.85"
        transform="rotate(45 ${cx} ${iconCy})" />
  <circle cx="${cx}" cy="${iconCy}" r="6" fill="${s.color}" filter="url(#glow${s.num})" opacity="0.9" />`;
  } else {
    nodesSvg += `
  <circle cx="${cx}" cy="${iconCy}" r="${iconR}" fill="none" stroke="${s.color}" stroke-width="2" filter="url(#glow${s.num})" opacity="0.85" />
  <circle cx="${cx}" cy="${iconCy}" r="13" fill="none" stroke="${s.color}" stroke-width="1" opacity="0.5" />
  <circle cx="${cx}" cy="${iconCy}" r="5" fill="${s.color}" filter="url(#glow${s.num})" opacity="0.9" />`;
  }

  // Icon orbit dots
  if (s.shape === 'hex') {
    nodesSvg += `
  <circle cx="${cx}" cy="${iconCy - iconR}" r="3" fill="${s.color}" opacity="0.7" />
  <circle cx="${cx}" cy="${iconCy + iconR}" r="3" fill="${s.color}" opacity="0.7" />`;
  } else if (s.shape === 'circle') {
    nodesSvg += `
  <circle cx="${cx - iconR}" cy="${iconCy}" r="3" fill="${s.color}" opacity="0.7" />
  <circle cx="${cx + iconR}" cy="${iconCy}" r="3" fill="${s.color}" opacity="0.7" />`;
  } else {
    nodesSvg += `
  <circle cx="${cx - iconR * 0.72}" cy="${iconCy}" r="3" fill="${s.color}" opacity="0.7" />
  <circle cx="${cx + iconR * 0.72}" cy="${iconCy}" r="3" fill="${s.color}" opacity="0.7" />`;
  }

  // Step name
  nodesSvg += `
  <text x="${cx}" y="${NODE_Y + 210}" text-anchor="middle" font-family="Microsoft YaHei, Noto Sans SC, sans-serif" font-size="30" font-weight="600"
        fill="#e0e4f5">${s.name}</text>
  <line x1="${cx - 46}" y1="${NODE_Y + 234}" x2="${cx + 46}" y2="${NODE_Y + 234}" stroke="${s.color}" stroke-width="1.4" opacity="0.45" />`;

  // Description
  const descLines = s.desc.split('\n');
  descLines.forEach((line, li) => {
    nodesSvg += `
  <text x="${cx}" y="${NODE_Y + 278 + li * 24}" text-anchor="middle" font-family="Microsoft YaHei, Noto Sans SC, sans-serif" font-size="16"
        fill="#a0a8c8">${line}</text>`;
  });

  // Connectors between nodes
  if (i < steps.length - 1) {
    const nextColor = steps[i + 1].color;
    const x1 = x + NODE_W;
    const x2 = x + NODE_W + GAP;
    const cyLine = NODE_Y + NODE_H / 2;
    // background line
    connectorsBgSvg += `
  <line x1="${x1}" y1="${cyLine}" x2="${x2}" y2="${cyLine}" stroke="${s.color}" stroke-width="1" opacity="0.2" />`;
    // arrow head
    connectorsSvg += `
  <line x1="${x1 + 8}" y1="${cyLine}" x2="${x2 - 12}" y2="${cyLine}" stroke="${s.color}" stroke-width="1.8" filter="url(#arrowGlow)" opacity="0.8" />
  <polygon points="${x2 - 14},${cyLine} ${x2 - 26},${cyLine - 7} ${x2 - 26},${cyLine + 7}" fill="${nextColor}" opacity="0.8" />
  <circle cx="${x1 + 8}" cy="${cyLine}" r="2.5" fill="${s.color}" opacity="0.8" />`;
  }
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="45%" r="70%">
      <stop offset="0%" stop-color="#0a0c1a" />
      <stop offset="55%" stop-color="#050610" />
      <stop offset="100%" stop-color="#02040a" />
    </radialGradient>
    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00e5ff" />
      <stop offset="100%" stop-color="#7c4dff" />
    </linearGradient>
    <filter id="titleGlow" x="-20%" y="-30%" width="140%" height="160%">
      <feGaussianBlur stdDeviation="4" result="b1"/>
      <feMerge>
        <feMergeNode in="b1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="arrowGlow" x="-30%" y="-200%" width="160%" height="500%">
      <feGaussianBlur stdDeviation="2" result="b1"/>
      <feMerge>
        <feMergeNode in="b1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <pattern id="hexGrid" x="0" y="0" width="120" height="103.92" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
      <path d="M60 0 L120 34.64 L120 69.28 L60 103.92 L0 69.28 L0 34.64 Z"
            fill="none" stroke="#00e5ff" stroke-width="0.4" opacity="0.05" />
    </pattern>
    <pattern id="dotGrid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
      <circle cx="40" cy="40" r="0.6" fill="#7c4dff" opacity="0.05" />
    </pattern>
    <linearGradient id="lineH" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00e5ff" stop-opacity="0" />
      <stop offset="50%" stop-color="#00e5ff" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#00e5ff" stop-opacity="0" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bgGrad)" />
  <rect width="${W}" height="${H}" fill="url(#hexGrid)" />
  <rect width="${W}" height="${H}" fill="url(#dotGrid)" />

  <!-- Corner frame accents -->
  <line x1="46" y1="52" x2="46" y2="100" stroke="#00e5ff" stroke-width="1.2" opacity="0.3" />
  <line x1="46" y1="52" x2="94" y2="52" stroke="#00e5ff" stroke-width="1.2" opacity="0.3" />
  <line x1="${W - 46}" y1="52" x2="${W - 46}" y2="100" stroke="#7c4dff" stroke-width="1.2" opacity="0.3" />
  <line x1="${W - 46}" y1="52" x2="${W - 94}" y2="52" stroke="#7c4dff" stroke-width="1.2" opacity="0.3" />
  <line x1="46" y1="${H - 52}" x2="46" y2="${H - 100}" stroke="#7c4dff" stroke-width="1.2" opacity="0.3" />
  <line x1="46" y1="${H - 52}" x2="94" y2="${H - 52}" stroke="#7c4dff" stroke-width="1.2" opacity="0.3" />
  <line x1="${W - 46}" y1="${H - 52}" x2="${W - 46}" y2="${H - 100}" stroke="#00e5ff" stroke-width="1.2" opacity="0.3" />
  <line x1="${W - 46}" y1="${H - 52}" x2="${W - 94}" y2="${H - 52}" stroke="#00e5ff" stroke-width="1.2" opacity="0.3" />

  <!-- Title -->
  <text x="${W / 2}" y="${TOP_TITLE_Y}" text-anchor="middle" font-family="Microsoft YaHei, Noto Sans SC, sans-serif"
        font-size="44" font-weight="700" fill="url(#titleGrad)" filter="url(#titleGlow)">从想法到可玩版本</text>
  <text x="${W / 2}" y="${TOP_TITLE_Y + 40}" text-anchor="middle" font-family="JetBrains Mono, Consolas, monospace"
        font-size="17" fill="#5e668c" letter-spacing="4">IDEA &#8594; PLAN &#8594; BUILD &#8594; VERIFY &#8594; PLAY</text>

  <!-- Title underline -->
  <line x1="${W / 2 - 260}" y1="${TOP_TITLE_Y + 64}" x2="${W / 2 + 260}" y2="${TOP_TITLE_Y + 64}" stroke="url(#lineH)" stroke-width="1" opacity="0.5" />
  <circle cx="${W / 2}" cy="${TOP_TITLE_Y + 64}" r="3" fill="#00e5ff" opacity="0.6" />

  ${connectorsBgSvg}
  ${nodesSvg}
  ${connectorsSvg}

  <!-- Bottom accent -->
  <line x1="${W / 2 - 200}" y1="${H - 70}" x2="${W / 2 + 200}" y2="${H - 70}" stroke="url(#lineH)" stroke-width="0.8" opacity="0.35" />
</svg>`;

// Render
const buf = Buffer.from(svg);
await sharp(buf, { density: 144 })
  .resize(W, H)
  .png({ compressionLevel: 9 })
  .toFile('docs/images/aether-ai-workflow.png');

console.log('✅ Generated docs/images/aether-ai-workflow.png (%dx%d)', W, H);
