// Image compression utility
export async function compressImage(base64String, maxWidth = 400, quality = 0.7) {
  return new Promise((resolve, reject) => {
    // Check if it's a valid base64 image
    if (!base64String || !base64String.startsWith('data:image')) {
      resolve(base64String);
      return;
    }

    // If already small, return as is
    if (base64String.length < 50000) { // < 50KB
      resolve(base64String);
      return;
    }

    try {
      // Create an image element
      const img = new window.Image();
      
      img.onload = () => {
        try {
          // Create canvas
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxWidth) {
              width = (width * maxWidth) / height;
              height = maxWidth;
            }
          }

          // Set canvas size
          canvas.width = width;
          canvas.height = height;

          // Draw image on canvas
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to compressed JPEG
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          
          console.log(`✅ Compressed: ${base64String.length} -> ${compressedBase64.length} bytes`);
          console.log(`📉 Size reduction: ${((1 - compressedBase64.length / base64String.length) * 100).toFixed(1)}%`);
          
          resolve(compressedBase64);
        } catch (error) {
          console.error('❌ Compression error:', error);
          resolve(base64String); // Return original on error
        }
      };

      img.onerror = () => {
        console.error('❌ Image load error');
        resolve(base64String); // Return original on error
      };

      img.src = base64String;
    } catch (error) {
      console.error('❌ Compression setup error:', error);
      resolve(base64String); // Return original on error
    }
  });
}