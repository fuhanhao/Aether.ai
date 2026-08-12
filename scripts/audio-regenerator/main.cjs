const { app } = require('electron');
const os = require('node:os');
const path = require('node:path');

app.setName('@aetherai/desktop');
app.setPath(
  'userData',
  path.join(
    os.homedir(),
    'Library',
    'Application Support',
    '@aetherai',
    'desktop',
  ),
);
process.stdout.write('audio-regeneration: helper loaded\n');
app.whenReady().then(() => import('../regenerate-configured-audio.mjs'));
