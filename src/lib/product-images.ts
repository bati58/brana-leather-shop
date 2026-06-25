import { cloudinaryUrl, isCloudinaryConfigured } from '@/lib/cloudinary';
import type { Product } from '@/types';

const IMAGE_SETS = {
  footwear: [
    ['samples/ecommerce/shoes', 'samples/shoe', 'cld-sample-5', 'cld-sample-3'],
    ['samples/shoe', 'cld-sample-2', 'samples/ecommerce/shoes', 'cld-sample-4'],
    ['cld-sample-5', 'samples/ecommerce/shoes', 'cld-sample', 'samples/shoe'],
    ['cld-sample-3', 'samples/shoe', 'cld-sample-2', 'samples/ecommerce/shoes'],
    ['samples/ecommerce/shoes', 'cld-sample-4', 'samples/shoe', 'cld-sample-5'],
    ['cld-sample-2', 'cld-sample-5', 'samples/shoe', 'cld-sample-3'],
  ],
  clothing: [
    ['samples/man-on-a-street', 'samples/people/smiling-man', 'samples/man-portrait', 'samples/outdoor-woman'],
    ['samples/people/smiling-man', 'samples/man-portrait', 'samples/outdoor-woman', 'samples/landscapes/girl-urban-view'],
    ['samples/man-portrait', 'samples/outdoor-woman', 'samples/man-on-a-street', 'cld-sample-5'],
    ['samples/outdoor-woman', 'samples/man-on-a-street', 'samples/landscapes/girl-urban-view', 'samples/people/smiling-man'],
    ['samples/landscapes/girl-urban-view', 'samples/man-portrait', 'cld-sample-4', 'samples/people/smiling-man'],
  ],
  smallGoods: [
    ['samples/ecommerce/accessories-bag', 'samples/ecommerce/analog-classic', 'cld-sample-3', 'cld-sample-2'],
    ['samples/ecommerce/analog-classic', 'samples/ecommerce/accessories-bag', 'cld-sample', 'cld-sample-5'],
    ['samples/ecommerce/accessories-bag', 'cld-sample-2', 'samples/ecommerce/analog-classic', 'cld-sample-4'],
    ['cld-sample-3', 'samples/ecommerce/accessories-bag', 'samples/ecommerce/analog-classic', 'cld-sample'],
    ['samples/ecommerce/analog-classic', 'cld-sample-5', 'samples/ecommerce/accessories-bag', 'cld-sample-2'],
    ['cld-sample-4', 'samples/ecommerce/analog-classic', 'cld-sample-3', 'samples/ecommerce/accessories-bag'],
  ],
  bags: [
    ['samples/ecommerce/leather-bag-gray', 'samples/ecommerce/accessories-bag', 'cld-sample-5', 'cld-sample-3'],
    ['samples/ecommerce/accessories-bag', 'samples/ecommerce/leather-bag-gray', 'cld-sample-2', 'cld-sample-4'],
    ['samples/ecommerce/leather-bag-gray', 'cld-sample', 'samples/ecommerce/accessories-bag', 'cld-sample-5'],
    ['cld-sample-3', 'samples/ecommerce/leather-bag-gray', 'cld-sample-2', 'samples/ecommerce/accessories-bag'],
    ['samples/ecommerce/accessories-bag', 'cld-sample-5', 'cld-sample-3', 'samples/ecommerce/leather-bag-gray'],
    ['cld-sample-2', 'samples/ecommerce/leather-bag-gray', 'cld-sample-4', 'samples/ecommerce/accessories-bag'],
  ],
  belts: [
    ['samples/ecommerce/analog-classic', 'samples/ecommerce/accessories-bag', 'cld-sample-2', 'cld-sample-3'],
    ['samples/ecommerce/accessories-bag', 'cld-sample-4', 'samples/ecommerce/analog-classic', 'cld-sample-5'],
    ['cld-sample-5', 'samples/ecommerce/analog-classic', 'cld-sample', 'samples/ecommerce/accessories-bag'],
    ['cld-sample-3', 'samples/ecommerce/accessories-bag', 'samples/ecommerce/analog-classic', 'cld-sample-2'],
  ],
  home: [
    ['samples/ecommerce/analog-classic', 'cld-sample-3', 'samples/ecommerce/accessories-bag', 'cld-sample-2'],
    ['cld-sample-5', 'samples/ecommerce/analog-classic', 'cld-sample-4', 'samples/ecommerce/accessories-bag'],
    ['cld-sample-2', 'samples/ecommerce/accessories-bag', 'cld-sample', 'samples/ecommerce/analog-classic'],
    ['samples/ecommerce/accessories-bag', 'cld-sample-3', 'cld-sample-5', 'cld-sample-4'],
    ['cld-sample-4', 'cld-sample-2', 'samples/ecommerce/analog-classic', 'cld-sample-3'],
  ],
} as const;

type ImagePool = keyof typeof IMAGE_SETS;

function IMG(src: string, w = 800): string {
  if (isCloudinaryConfigured()) return cloudinaryUrl(src, { width: w });
  return src.startsWith('http') ? src : `/images/products/placeholder.jpg`;
}

export function productImages(pool: ImagePool, setIndex: number): string[] {
  const sets = IMAGE_SETS[pool];
  return sets[setIndex % sets.length].map((id) => IMG(id));
}
