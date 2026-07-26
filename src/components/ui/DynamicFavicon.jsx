import { useEffect } from 'react';

export function DynamicFavicon({ imageSrc = '/assets/profile_image.webp' }) {
  useEffect(() => {
    const SIZE = 64;
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = SIZE;
      canvas.height = SIZE;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.beginPath();
      ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, 0, 0, SIZE, SIZE);

      let favicon = document.getElementById('dynamicFavicon');
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.id = 'dynamicFavicon';
        favicon.rel = 'icon';
        favicon.type = 'image/png';
        document.head.appendChild(favicon);
      }
      favicon.href = canvas.toDataURL('image/png');
    };
  }, [imageSrc]);

  return null;
}
