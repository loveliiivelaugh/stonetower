import { create } from 'zustand';


interface ProductProps {
  id: number
  name: string
  recipe: string
  image: string
  category: string
  price: number
  description: string
};

// *** APP STORE ***
interface AppStore {
  // App View
  activeView: string;
  setActiveView: (view: string) => void;

  // Customer UX
  selectedProduct: ProductProps | null;
  setSelectedProduct: (product: ProductProps) => void;

  // *** Service + Ordering ***
  // Tables View
  selectedTable: string | null;
  setSelectedTable: (table: string) => void;

  // Order View
  activeCategory: string;
  setActiveCategory: (category: string) => void;

  // Drawer
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;

  // Shopping Cart
  items: any[];
  addItem: (item: any) => void;
  removeItem: (id: number) => void;
  clearItems: () => void;

  setState: (state: any) => void;

  // Total
  getTotal: (items: any) => number;
  getTax: (total: number) => number;

  // Checkout
  check: any;
  setCheck: (check: any) => void;
};

const useAppStore = create<AppStore>((set) => ({
  selectedTable: null,
  setSelectedTable: (table: string) => set({ selectedTable: table, activeView: "order" }),

  selectedProduct: null,
  setSelectedProduct: (product: ProductProps) => set({ selectedProduct: product }),

  activeView: "admin",
  setActiveView: (view: string) => set({ activeView: view }),

  activeCategory: "drinks",
  setActiveCategory: (category: string) => set({ activeCategory: category }),

  drawerOpen: false,
  setDrawerOpen: (open: boolean) => set({ drawerOpen: open }),

  items: [],
  addItem: (item: any) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id: number) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  clearItems: () => set({ items: [] }),

  check: null,
  setCheck: (check: any) => set({ check }),

  setState: (state: any) => set((prevState) => ({ ...prevState, ...state })),
  getTotal: (items: any) => {
    return items.reduce((total: number, item: any) => total + item.price, 0);
  },
  getTax: (total: number) => parseInt((total * 0.13).toFixed(2))
}));


// *** SUPABASE STORE ***

interface SupabaseUser {
  id: string;
  email: string;
  app_metadata?: {
      provider: string;
  };
  user_metadata?: {
      name: string;
  };
}

interface SupabaseSession {
  access_token?: string;
  token_type?: string;
  user: SupabaseUser;
}

interface SupabaseStore {
  session: SupabaseSession | null;
  setSession: (session: SupabaseSession | null) => void;
}

const useSupabaseStore = create<SupabaseStore>((set) => ({
  // states
  session: null,
  // actions
  setSession: (session: any) => set({ session }),
}));


export { useSupabaseStore, useAppStore };
