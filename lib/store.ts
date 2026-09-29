import { useState, useEffect } from 'react';
import { Product, Category, CartItem, UserProfile, Order, Quote, Coupon, HSNConfig, FreightZoneRule, OrderStatus, PaymentStatus, QuoteStatus } from './types';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_USER, INITIAL_ORDERS, INITIAL_QUOTES, INITIAL_COUPONS, INITIAL_HSN_CONFIGS, INITIAL_FREIGHT_ZONES } from './sampleData';

const STORE_KEY = 'pandayji_iron_works_store_v2';

interface AppState {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  user: UserProfile;
  orders: Order[];
  quotes: Quote[];
  coupons: Coupon[];
  hsnConfigs: HSNConfig[];
  freightZones: FreightZoneRule[];
  currentRole: 'customer' | 'admin';
  wishlist: string[];
  activeCoupon: Coupon | null;
}

function getInitialState(): AppState {
  if (typeof window === 'undefined') {
    return {
      products: INITIAL_PRODUCTS,
      categories: INITIAL_CATEGORIES,
      cart: [],
      user: INITIAL_USER,
      orders: INITIAL_ORDERS,
      quotes: INITIAL_QUOTES,
      coupons: INITIAL_COUPONS,
      hsnConfigs: INITIAL_HSN_CONFIGS,
      freightZones: INITIAL_FREIGHT_ZONES,
      currentRole: 'customer',
      wishlist: [],
      activeCoupon: null
    };
  }

  try {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        products: parsed.products || INITIAL_PRODUCTS,
        categories: parsed.categories || INITIAL_CATEGORIES,
        cart: parsed.cart || [],
        user: parsed.user || INITIAL_USER,
        orders: parsed.orders || INITIAL_ORDERS,
        quotes: parsed.quotes || INITIAL_QUOTES,
        coupons: parsed.coupons || INITIAL_COUPONS,
        hsnConfigs: parsed.hsnConfigs || INITIAL_HSN_CONFIGS,
        freightZones: parsed.freightZones || INITIAL_FREIGHT_ZONES,
        currentRole: parsed.currentRole || 'customer',
        wishlist: parsed.wishlist || [],
        activeCoupon: parsed.activeCoupon || null
      };
    }
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
  }

  return {
    products: INITIAL_PRODUCTS,
    categories: INITIAL_CATEGORIES,
    cart: [],
    user: INITIAL_USER,
    orders: INITIAL_ORDERS,
    quotes: INITIAL_QUOTES,
    coupons: INITIAL_COUPONS,
    hsnConfigs: INITIAL_HSN_CONFIGS,
    freightZones: INITIAL_FREIGHT_ZONES,
    currentRole: 'customer',
    wishlist: [],
    activeCoupon: null
  };
}

let memoryState: AppState = getInitialState();
const listeners = new Set<() => void>();

function saveState(newState: AppState) {
  memoryState = newState;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(newState));
    } catch (err) {
      console.error('Failed to persist state:', err);
    }
  }
  listeners.forEach((listener) => listener());
}

export function useAppStore() {
  const [state, setState] = useState<AppState>(memoryState);

  useEffect(() => {
    const handler = () => setState({ ...memoryState });
    listeners.add(handler);

    async function syncCatalog() {
      try {
        const res = await fetch('/api/catalog/products');
        if (res.ok) {
          const apiProducts = await res.json();
          if (Array.isArray(apiProducts) && apiProducts.length > 0) {
            const customProducts = apiProducts.map((item) => {
              const slug = item.slug || (item.name ? item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : String(item.id));
              const img = (item.images && item.images.length > 0) ? item.images[0] : (item.image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80');
              const gallery = (item.images && item.images.length > 0) ? item.images : [img];
              return {
                id: String(item.id),
                slug,
                sku: item.sku || ('PJIW-' + String(item.id).slice(-6).toUpperCase()),
                name: item.name,
                shortDescription: item.description ? item.description.slice(0, 140) + '...' : '',
                description: item.description || '',
                categoryId: item.categoryId || 'cat-steam-boilers',
                categoryName: item.categoryName || 'Industrial Steam Boilers',
                brand: item.manufacturer || 'Pandayji Iron Works',
                mode: (item.mode || 'direct') as 'direct' | 'quote',
                status: 'published' as const,
                availability: 'in_stock' as const,
                image: img,
                gallery,
                capacity: item.capacity || 'Standard',
                pressure: '6-20 PSI',
                fuelType: 'Wood Sawdust Fired',
                material: 'Stainless Steel / Mild Steel',
                specifications: item.specifications || '',
                price: Number(item.price) || 0,
                hsnCode: '84021100',
                gstRate: 18,
                freightMode: 'fixed' as const,
                show_call_now: item.show_call_now ?? true,
                show_interested: item.show_interested ?? true,
                createdAt: item.created_at || new Date().toISOString(),
              };
            });

            // Put newly added custom products first, then standard INITIAL_PRODUCTS
            const combined = [
              ...customProducts,
              ...INITIAL_PRODUCTS.filter(ip => !customProducts.some(cp => cp.name.toLowerCase() === ip.name.toLowerCase() || cp.id === ip.id))
            ];

            saveState({ ...memoryState, products: combined });
          }
        }
      } catch (err) {
        console.warn('Could not auto-fetch catalog:', err);
      }
    }

    syncCatalog();

    return () => {
      listeners.delete(handler);
    };
  }, []);

  return {
    ...state,
    
    // Role Switching
    switchRole: (role: 'customer' | 'admin') => {
      saveState({ ...memoryState, currentRole: role });
    },

    // Cart Actions
    addToCart: (product: Product, quantity: number = 1) => {
      const existing = memoryState.cart.find((i) => i.productId === product.id);
      let newCart: CartItem[];
      if (existing) {
        newCart = memoryState.cart.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        newCart = [...memoryState.cart, { productId: product.id, product, quantity }];
      }
      saveState({ ...memoryState, cart: newCart });
    },

    updateCartQuantity: (productId: string, quantity: number) => {
      if (quantity <= 0) {
        const newCart = memoryState.cart.filter((i) => i.productId !== productId);
        saveState({ ...memoryState, cart: newCart });
      } else {
        const newCart = memoryState.cart.map((i) =>
          i.productId === productId ? { ...i, quantity } : i
        );
        saveState({ ...memoryState, cart: newCart });
      }
    },

    removeFromCart: (productId: string) => {
      const newCart = memoryState.cart.filter((i) => i.productId !== productId);
      saveState({ ...memoryState, cart: newCart });
    },

    clearCart: () => {
      saveState({ ...memoryState, cart: [], activeCoupon: null });
    },

    // Coupon Actions
    applyCoupon: (code: string) => {
      const found = memoryState.coupons.find(
        (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive
      );
      if (found) {
        saveState({ ...memoryState, activeCoupon: found });
        return { success: true, coupon: found, message: `Coupon ${found.code} applied successfully!` };
      }
      return { success: false, message: 'Invalid or expired coupon code.' };
    },

    removeCoupon: () => {
      saveState({ ...memoryState, activeCoupon: null });
    },

    // Wishlist
    toggleWishlist: (productId: string) => {
      const exists = memoryState.wishlist.includes(productId);
      const newWishlist = exists
        ? memoryState.wishlist.filter((id) => id !== productId)
        : [...memoryState.wishlist, productId];
      saveState({ ...memoryState, wishlist: newWishlist });
    },

    // User Profile & Addresses
    updateUserProfile: (userData: Partial<UserProfile>) => {
      const updatedUser = { ...memoryState.user, ...userData };
      saveState({ ...memoryState, user: updatedUser });
    },

    addOrUpdateAddress: (address: Partial<typeof INITIAL_USER.addresses[0]>) => {
      const addresses = [...memoryState.user.addresses];
      const index = addresses.findIndex((a) => a.id === address.id);
      if (index >= 0) {
        addresses[index] = { ...addresses[index], ...address } as typeof INITIAL_USER.addresses[0];
      } else {
        const newAddr = {
          id: `addr-${Date.now()}`,
          companyName: address.companyName || memoryState.user.companyName,
          contactName: address.contactName || memoryState.user.fullName,
          phone: address.phone || memoryState.user.phone,
          email: address.email || memoryState.user.email,
          gstin: address.gstin || memoryState.user.gstin,
          street: address.street || '',
          city: address.city || '',
          state: address.state || 'Maharashtra',
          stateCode: address.stateCode || '27',
          pincode: address.pincode || '',
          isDefault: addresses.length === 0
        };
        addresses.push(newAddr);
      }
      saveState({
        ...memoryState,
        user: { ...memoryState.user, addresses }
      });
    },

    // Orders
    createOrder: (order: Order) => {
      const newOrders = [order, ...memoryState.orders];
      saveState({
        ...memoryState,
        orders: newOrders,
        cart: [],
        activeCoupon: null
      });
      return order;
    },

    updateOrderStatus: (
      orderId: string,
      orderStatus: OrderStatus,
      trackingDetails?: { carrierName?: string; trackingNumber?: string; lrNumber?: string; estimatedDeliveryDate?: string }
    ) => {
      const newOrders = memoryState.orders.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            orderStatus,
            carrierName: trackingDetails?.carrierName || o.carrierName,
            trackingNumber: trackingDetails?.trackingNumber || o.trackingNumber,
            lrNumber: trackingDetails?.lrNumber || o.lrNumber,
            estimatedDeliveryDate: trackingDetails?.estimatedDeliveryDate || o.estimatedDeliveryDate,
            updatedAt: new Date().toISOString()
          };
        }
        return o;
      });
      saveState({ ...memoryState, orders: newOrders });
    },

    updatePaymentStatus: (orderId: string, paymentStatus: PaymentStatus, transactionId?: string) => {
      const newOrders = memoryState.orders.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            paymentStatus,
            paymentTransactionId: transactionId || o.paymentTransactionId,
            updatedAt: new Date().toISOString()
          };
        }
        return o;
      });
      saveState({ ...memoryState, orders: newOrders });
    },

    // Quotes
    createQuote: (quoteInput: Omit<Quote, 'id' | 'quoteNumber' | 'status' | 'createdAt' | 'updatedAt'>) => {
      const id = `q-${Date.now().toString().slice(-5)}`;
      const quoteNumber = `PJIW-INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newQuote: Quote = {
        ...quoteInput,
        id,
        quoteNumber,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const newQuotes = [newQuote, ...memoryState.quotes];
      saveState({ ...memoryState, quotes: newQuotes });
      return newQuote;
    },

    updateQuoteByAdmin: (quoteId: string, adminQuoteData: Partial<Quote>) => {
      const newQuotes = memoryState.quotes.map((q) => {
        if (q.id === quoteId) {
          return {
            ...q,
            ...adminQuoteData,
            status: adminQuoteData.status || 'quoted',
            updatedAt: new Date().toISOString()
          };
        }
        return q;
      });
      saveState({ ...memoryState, quotes: newQuotes });
    },

    respondToQuoteByCustomer: (quoteId: string, action: 'accept' | 'reject' | 'revision') => {
      const targetQuote = memoryState.quotes.find((q) => q.id === quoteId);
      if (!targetQuote) return undefined;

      let newStatus: QuoteStatus = 'pending';
      if (action === 'accept') newStatus = 'accepted';
      if (action === 'reject') newStatus = 'rejected';
      if (action === 'revision') newStatus = 'revision_requested';

      const newQuotes = memoryState.quotes.map((q) => {
        if (q.id === quoteId) {
          return { ...q, status: newStatus, updatedAt: new Date().toISOString() };
        }
        return q;
      });

      // If accepted, generate order automatically!
      let createdOrder: Order | null = null;
      if (action === 'accept' && targetQuote.grandTotal) {
        const orderId = `ord-${Date.now().toString().slice(-6)}`;
        const orderNumber = `ORD-PJIW-2026-${Math.floor(10000 + Math.random() * 90000)}`;
        
        const defaultAddress = memoryState.user.addresses[0] || {
          id: 'addr-temp',
          companyName: targetQuote.companyName,
          contactName: targetQuote.contactPerson,
          phone: targetQuote.phone,
          email: targetQuote.email,
          gstin: targetQuote.gstin,
          street: `${targetQuote.deliveryCity}, ${targetQuote.deliveryState}`,
          city: targetQuote.deliveryCity,
          state: targetQuote.deliveryState,
          stateCode: targetQuote.gstin ? targetQuote.gstin.substring(0, 2) : '27',
          pincode: targetQuote.deliveryPincode,
          isDefault: true
        };

        createdOrder = {
          id: orderId,
          orderNumber,
          quoteId: targetQuote.id,
          customerId: targetQuote.customerId,
          companyName: targetQuote.companyName,
          contactPerson: targetQuote.contactPerson,
          email: targetQuote.email,
          phone: targetQuote.phone,
          gstin: targetQuote.gstin,
          billingAddress: defaultAddress,
          shippingAddress: defaultAddress,
          items: [
            {
              productId: (targetQuote.productId || "") || 'prod-custom',
              name: targetQuote.productName,
              sku: `SKU-QUOTE-${targetQuote.quoteNumber}`,
              quantity: (targetQuote.quantity || 1),
              unitPrice: (targetQuote.unitPrice || 0) || targetQuote.grandTotal,
              totalPrice: ((targetQuote.unitPrice || 0) || targetQuote.grandTotal) * (targetQuote.quantity || 1),
              hsnCode: '84021100',
              gstRate: targetQuote.gstRate || 18,
              image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'
            }
          ],
          subtotal: targetQuote.subtotal || targetQuote.grandTotal,
          discountAmount: targetQuote.discountAmount || 0,
          taxableAmount: targetQuote.taxableAmount || targetQuote.grandTotal,
          sellerStateCode: '27',
          buyerStateCode: defaultAddress.stateCode,
          isInterstate: defaultAddress.stateCode !== '27',
          cgst: defaultAddress.stateCode === '27' ? (targetQuote.gstAmount || 0) / 2 : 0,
          sgst: defaultAddress.stateCode === '27' ? (targetQuote.gstAmount || 0) / 2 : 0,
          igst: defaultAddress.stateCode !== '27' ? (targetQuote.gstAmount || 0) : 0,
          totalGst: targetQuote.gstAmount || 0,
          freightAmount: targetQuote.freightAmount || 0,
          freightMode: 'fixed',
          grandTotal: targetQuote.grandTotal,
          paymentStatus: 'pending',
          paymentMethod: 'Proforma Invoice / NEFT Wire Transfer',
          status: 'confirmed',
          orderStatus: 'confirmed',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        saveState({
          ...memoryState,
          quotes: newQuotes,
          orders: [createdOrder as Order, ...memoryState.orders]
        });
      } else {
        saveState({ ...memoryState, quotes: newQuotes });
      }

      return createdOrder;
    },

    // Admin Products & Catalog
    saveProduct: (productData: Product) => {
      const exists = memoryState.products.some((p) => p.id === productData.id);
      let newProducts: Product[];
      if (exists) {
        newProducts = memoryState.products.map((p) => (p.id === productData.id ? productData : p));
      } else {
        newProducts = [productData, ...memoryState.products];
      }
      saveState({ ...memoryState, products: newProducts });
    },

    deleteProduct: (productId: string) => {
      const newProducts = memoryState.products.filter((p) => p.id !== productId);
      saveState({ ...memoryState, products: newProducts });
    },

    saveCategory: (categoryData: Category) => {
      const exists = memoryState.categories.some((c) => c.id === categoryData.id);
      let newCats: Category[];
      if (exists) {
        newCats = memoryState.categories.map((c) => (c.id === categoryData.id ? categoryData : c));
      } else {
        newCats = [...memoryState.categories, categoryData];
      }
      saveState({ ...memoryState, categories: newCats });
    },

    saveCoupon: (couponData: Coupon) => {
      const exists = memoryState.coupons.some((c) => c.id === couponData.id);
      let newCoupons: Coupon[];
      if (exists) {
        newCoupons = memoryState.coupons.map((c) => (c.id === couponData.id ? couponData : c));
      } else {
        newCoupons = [...memoryState.coupons, couponData];
      }
      saveState({ ...memoryState, coupons: newCoupons });
    },

    // Reset Store to Factory Demo Defaults
    resetToDemoData: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORE_KEY);
      }
      saveState({
        products: INITIAL_PRODUCTS,
        categories: INITIAL_CATEGORIES,
        cart: [],
        user: INITIAL_USER,
        orders: INITIAL_ORDERS,
        quotes: INITIAL_QUOTES,
        coupons: INITIAL_COUPONS,
        hsnConfigs: INITIAL_HSN_CONFIGS,
        freightZones: INITIAL_FREIGHT_ZONES,
        currentRole: 'customer',
        wishlist: ['prod-steam-5tph-biomass'],
        activeCoupon: INITIAL_COUPONS[0]
      });
    }
  };
}
