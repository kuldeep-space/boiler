// ============================================================
// PANDEY JI IRON WORKS — Core Type Definitions
// Derived from actual runtime data in sampleData.ts & store.ts
// ============================================================

export type PurchaseMode = 'direct' | 'quote';
export type AvailabilityStatus = 'in_stock' | 'made_to_order' | 'out_of_stock';
export type FreightMode = 'calculated' | 'fixed' | 'free' | 'confirm_later';
export type ProductStatus = 'published' | 'draft' | 'archived';
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'dispatched'
  | 'delivered'
  | 'cancelled'
  | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type QuoteStatus =
  | 'pending'
  | 'reviewing'
  | 'quoted'
  | 'accepted'
  | 'rejected'
  | 'expired'
  | 'revision_requested';
export type UserRole = 'customer' | 'admin';

// ── Documents ──────────────────────────────────────────────

export interface DocumentResource {
  id: string;
  title?: string;
  name?: string;
  type?: 'pdf' | 'dwg' | 'excel' | string;
  fileType?: string;
  fileSize?: string;
  url: string;
}

// ── Tiered Pricing ────────────────────────────────────────

export interface TieredPrice {
  minQty: number;
  price: number;
  label?: string;
  discountPercent?: number;
}

// ── Product ────────────────────────────────────────────────

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  categoryName: string;
  brand: string;
  mode: PurchaseMode;
  status: ProductStatus;
  availability: AvailabilityStatus;
  isFeatured?: boolean;
  image: string;
  gallery: string[];

  // Technical specs
  capacity: string;
  pressure: string;
  fuelType: string;
  efficiency?: string;
  designCode?: string;
  evaporationRate?: string;
  steamTemperature?: string;
  feedWaterTemp?: string;
  dimensions?: string;
  dryWeight?: string;
  weight?: string;
  material?: string;
  warranty?: string;
  features?: string[];
  applications?: string[];
  keyFeatures?: string[];

  // Pricing & Tax
  price: number;
  compareAtPrice?: number;
  hsnCode: string;
  gstRate: number;
  tieredPricing?: TieredPrice[];

  // Freight
  freightMode: FreightMode;
  fixedFreightAmount?: number;

  // Resources
  documents?: DocumentResource[];

  // Timestamps
  createdAt?: string;
  updatedAt?: string;

  // Extra fields from store/pages
  [key: string]: unknown;
}

// ── Category ───────────────────────────────────────────────

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  iconName: string;
  hsnCodeDefault: string;
  gstRateDefault: number;
  productCount: number;
}

// ── Address ────────────────────────────────────────────────
// Matches INITIAL_USER.addresses shape in sampleData.ts

export interface Address {
  id: string;
  label?: string;
  fullName?: string;
  contactName?: string;
  email?: string;
  companyName: string;
  addressLine1?: string;
  addressLine2?: string;
  street?: string;
  city: string;
  state: string;
  stateCode: string;
  pincode: string;
  phone: string;
  gstin: string;
  isDefault: boolean;
}

// ── User / Customer ────────────────────────────────────────

export interface UserProfile {
  id: string;
  role: UserRole;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  gstin: string;
  addresses: Address[];
}

// ── Cart ───────────────────────────────────────────────────

export interface CartItem {
  productId?: string;
  product: Product;
  quantity: number;
}

// ── Coupon ─────────────────────────────────────────────────

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  maxDiscount?: number;
  minOrderValue: number;
  isActive: boolean;
  description: string;
  expiryDate?: string;
  validUntil?: string;
  usageLimit?: number;
  usedCount?: number;
  usageCount?: number;
  applicableCategoryIds?: string[];
}

// ── Order Item ─────────────────────────────────────────────
// Matches the actual object shape in INITIAL_ORDERS

export interface OrderItem {
  productId: string;
  productName?: string;
  name?: string;
  sku: string;
  hsnCode?: string;
  image?: string;
  quantity: number;
  unitPrice: number;
  gstRate: number;
  lineTotal?: number;
  totalPrice?: number;
}

// ── Order ──────────────────────────────────────────────────

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerId?: string;
  companyName: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  gstin: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;

  // Financials
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  taxableAmount: number;
  sellerStateCode?: string;
  buyerStateCode?: string;
  isInterstate?: boolean;
  cgst?: number;
  sgst?: number;
  igst?: number;
  totalGst?: number;
  freightAmount?: number;
  grandTotal: number;

  // Status
  status: OrderStatus;
  orderStatus?: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  paymentTransactionId?: string;
  trackingNumber?: string;
  carrierName?: string;
  lrNumber?: string;
  estimatedDeliveryDate?: string;
  notes?: string;
  quoteId?: string;
  freightMode?: FreightMode | string;

  createdAt: string;
  updatedAt?: string;
}

// ── Quote Item ─────────────────────────────────────────────

export interface QuoteItem {
  productId: string;
  productName?: string;
  name?: string;
  sku: string;
  quantity: number;
  unitPrice?: number;
  gstRate?: number;
  notes?: string;
}

// ── Quote / RFQ ────────────────────────────────────────────

export interface Quote {
  id: string;
  quoteNumber: string;
  userId?: string;
  customerId?: string;
  companyName: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  gstin: string;
  items: QuoteItem[];
  requirements?: string;
  status: QuoteStatus;
  productName?: string;
  deliveryCity?: string;
  deliveryState?: string;
  deliveryPincode?: string;
  productId?: string;
  specsRequired?: Record<string, string> | string | any;
  unitPrice?: number;
  discountAmount?: number;
  gstRate?: number;
  quantity?: number;
  subtotal?: number;
  notes?: string;
  requiredDeliveryDate?: string;
  attachmentName?: string;

  // Admin filled
  quotedAmount?: number;
  grandTotal?: number;
  totalGst?: number;
  gstAmount?: number;
  taxableAmount?: number;
  freightAmount?: number;
  validUntil?: string;
  validityDays?: number;
  paymentTerms?: string;
  adminNotes?: string;

  createdAt: string;
  updatedAt?: string;
}

export interface Vehicle {
  [key: string]: any;
}

// ── Tax & Freight ──────────────────────────────────────────

export interface HSNConfig {
  hsnCode: string;
  category: string;
  description: string;
  gstRate: number;
}

export type FreightZone = 'A' | 'B' | 'C' | 'D' | 'North' | 'South' | 'East' | 'West';

export interface FreightZoneRule {
  id: string;
  stateName: string;
  stateCode?: string;
  zone: FreightZone;
  baseFreightPerTon: number;
  flatRate: number;
  estimatedTransitDays: number;
}
