import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

const itemKey = (productId: string, size?: string, color?: string) =>
  `${productId}-${size || ''}-${color || ''}`;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const { items } = get();
        const key = itemKey(item.productId, item.size, item.color);
        const existing = items.find(
          (i) => itemKey(i.productId, i.size, i.color) === key
        );

        if (existing) {
          const newQty = Math.min(existing.quantity + (item.quantity || 1), item.maxStock);
          set({
            items: items.map((i) =>
              itemKey(i.productId, i.size, i.color) === key
                ? { ...i, quantity: newQty }
                : i
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [...items, { ...item, quantity: item.quantity || 1 }],
            isOpen: true,
          });
        }
      },

      removeItem: (productId, size, color) => {
        set({
          items: get().items.filter(
            (i) => itemKey(i.productId, i.size, i.color) !== itemKey(productId, size, color)
          ),
        });
      },

      updateQuantity: (productId, quantity, size, color) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color);
          return;
        }
        const key = itemKey(productId, size, color);
        set({
          items: get().items.map((i) =>
            itemKey(i.productId, i.size, i.color) === key
              ? { ...i, quantity: Math.min(quantity, i.maxStock) }
              : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      getSubtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'brana-cart' }
  )
);
