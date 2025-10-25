const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(process.cwd(), 'public');

// Ensure public exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

async function createIcon() {
  const svg = `
    <svg width="192" height="192" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="192" height="192" fill="url(#grad)" rx="30"/>
      <text x="50%" y="50%" font-family="Arial Black" font-size="86" 
            font-weight="900" fill="white" text-anchor="middle" dy=".35em">EM</text>
    </svg>
  `;
  
  try {
    await sharp(Buffer.from(svg))
      .png()
      .toFile(path.join(publicDir, 'android-chrome-192x192.png'));
    console.log('✅ android-chrome-192x192.png created!');
    
    // Also create 512 version
    const svg512 = svg.replace('192', '512').replace('86', '230').replace('30', '80');
    await sharp(Buffer.from(svg512))
      .png()
      .toFile(path.join(publicDir, 'android-chrome-512x512.png'));
    console.log('✅ android-chrome-512x512.png created!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createIcon();