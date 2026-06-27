type CloudinaryCrop = 'fill' | 'fit' | 'limit' | 'scale' | 'thumb';

interface CloudinaryImageOptions {
  width?: number;
  height?: number;
  crop?: CloudinaryCrop;
  quality?: 'auto' | number;
  format?: 'auto' | string;
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const USE_CLOUDINARY_PRODUCTS = process.env.NEXT_PUBLIC_PRODUCT_IMAGE_SOURCE === 'cloudinary';

function cloudinaryTransform(options: CloudinaryImageOptions = {}): string {
  const parts = [
    `f_${options.format ?? 'auto'}`,
    `q_${options.quality ?? 'auto'}`,
    options.width ? `w_${options.width}` : null,
    options.height ? `h_${options.height}` : null,
    options.crop ? `c_${options.crop}` : null,
  ];

  return parts.filter(Boolean).join(',');
}

export function cloudinaryUrl(publicId: string, options: CloudinaryImageOptions = {}): string {
  const normalizedPublicId = publicId.replace(/^\/+/, '');

  if (!CLOUD_NAME) {
    return `/${normalizedPublicId}.jpg`;
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${cloudinaryTransform(
    options
  )}/${normalizedPublicId}`;
}

export function productImageUrl(slug: string, options: CloudinaryImageOptions = {}): string {
  if (!USE_CLOUDINARY_PRODUCTS) {
    return `/products/${slug}.jpg`;
  }

  return cloudinaryUrl(`products/${slug}`, options);
}
