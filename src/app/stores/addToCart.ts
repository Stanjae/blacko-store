// src/stores/counter-store.ts
import { CartProductType } from '@/utils/definitions'
import { createStore } from 'zustand/vanilla'



export type CounterState = {
  newCart: CartProductType[]
}

export type CounterActions = {
  addToMyCart: (item:CartProductType) => void
  removeFromCart: (productId: string | undefined) => void;
  updateQuantity: (productId: string | undefined, quantity: number) => void;
  getExistingCart:()=> void;
  clearCart: () => void;
  totalPrice: () => number;
  totalCount: () => number;
  totalShippingPrice: () => number;
  finalTotalPrice:() => number;
}

export type CounterStore = CounterState & CounterActions

export const initCounterStore = (): CounterState => {
  return { newCart: [] }
}

export const defaultInitState: CounterState = {
  newCart: []
}

export const createCounterStore = (
  initState: CounterState = defaultInitState,
) => {
  return createStore<CounterStore>()((set, get) => ({
    ...initState,
    addToMyCart: (product) => {
      set((state) => {
        const existingItem = state.newCart.find((item) => item._id === product._id);

        if (existingItem) {
          const newItem = state.newCart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          );
          sessionStorage.setItem("newCart", JSON.stringify(newItem))
          return {newCart: newItem};
        } else {
          const newArray = [...state.newCart, { ...product, quantity: 1 }]
          sessionStorage.setItem("newCart", JSON.stringify(newArray))
          return { newCart: newArray };
        }
      });
    },

    removeFromCart: (productId) => {
      set((state) => {
        const removeCart = state.newCart.filter((item) => item._id !== productId);
        sessionStorage.setItem("newCart", JSON.stringify(removeCart))
        return{
          newCart: removeCart,
      }});
    },
    getExistingCart: () => {
      const existingCart = JSON.parse(sessionStorage.getItem("newCart") || "[]");
      set({ newCart: existingCart });
    },

    updateQuantity: (productId, quantity) => {
      set((state) => {
        const newUpdate = state.newCart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        );
        sessionStorage.setItem("newCart", JSON.stringify(newUpdate));
        return{
        newCart: newUpdate
      }});
    },

    clearCart: () => set(()=>{
      sessionStorage.removeItem("newCart");
      return { newCart: [] }
    }),

    totalPrice: () => {
      return get().newCart.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
      );
    },

    finalTotalPrice: () => {
      return get().newCart.reduce(
        (total, item) => total + item.price * (item.quantity || 1) + item.shippingStatus,
        0
      );
    },

    totalShippingPrice:() => {
      return get().newCart.reduce(
        (total, item) => total + item.shippingStatus,
        0
      );
    },

    totalCount: () => {
      return get().newCart.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },

  }))
}
