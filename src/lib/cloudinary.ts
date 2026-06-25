/**
 * Cloudinary image URL builder.
 * Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in .env.local
 */

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function isCloudinaryConfigured(): boolean {
  return Boolean(cloudName);
}

export function cloudinaryUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale';
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'jpg';
  } = {}
): string {
  const {
    width = 800,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = options;

  if (!cloudName) {
    return publicId.startsWith('http') ? publicId : `/images/placeholder.jpg`;
  }

  const transforms = [
    `f_${format}`,
    `q_${quality}`,
    `c_${crop}`,
    `w_${width}`,
    height ? `h_${height}` : null,
  ]
    .filter(Boolean)
    .join(',');

  const id = publicId.replace(/^\//, '');
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/${id}`;
}
