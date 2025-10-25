// scripts/create-missing-icons.js
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

console.log('🎨 Creating missing icons...\n');

const publicDir = path.join(process.cwd(), 'public');
console.log(`📁 Public directory: ${publicDir}\n`);

// Ensure public exists
if (!fs.existsSync(publicDir)) {
  console.log('Creating public directory...');
  fs.mkdirSync(publicDir, { recursive: true });
}

async function createIcons() {
  // Create 192x192
  const svg192 = `
    <svg width="192" height="192" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="192" height="192" fill="url(#grad)" rx="30"/>
      <text x="50%" y="50%" font-family="Arial Black, sans-serif" font-size="86" 
            font-weight="900" fill="white" text-anchor="middle" dy=".35em">EM</text>
    </svg>
  `;

  try {
    // 192x192
    await sharp(Buffer.from(svg192))
      .png()
      .toFile(path.join(publicDir, 'android-chrome-192x192.png'));
    console.log('✅ android-chrome-192x192.png');

    // 512x512
    const svg512 = `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="512" height="512" fill="url(#grad)" rx="80"/>
        <text x="50%" y="50%" font-family="Arial Black, sans-serif" font-size="230" 
              font-weight="900" fill="white" text-anchor="middle" dy=".35em">EM</text>
      </svg>
    `;
    
    await sharp(Buffer.from(svg512))
      .png()
      .toFile(path.join(publicDir, 'android-chrome-512x512.png'));
    console.log('✅ android-chrome-512x512.png');

    // apple-touch-icon 180x180
    const svg180 = `
      <svg width="180" height="180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="180" height="180" fill="url(#grad)" rx="27"/>
        <text x="50%" y="50%" font-family="Arial Black, sans-serif" font-size="81" 
              font-weight="900" fill="white" text-anchor="middle" dy=".35em">EM</text>
      </svg>
    `;
    
    await sharp(Buffer.from(svg180))
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('✅ apple-touch-icon.png');

    console.log('\n🎉 All icons created successfully!\n');
    console.log('📁 Files created in:', publicDir);
    console.log('\n✅ Now restart your server: npm run dev\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nFull error:', error);
  }
}

createIcons();