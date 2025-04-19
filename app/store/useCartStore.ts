import { create } from 'zustand';

interface cartState {
  cartCount: number;
  increaseCartCount: (by: number) => void;
}

export const useCartStore = create<cartState>()((set) => ({
  cartCount: 0,
  increaseCartCount: () => set((state) => ({ cartCount: state.cartCount + 1 })),
}));
