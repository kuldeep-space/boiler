import { CartItem, Coupon, Address, FreightZoneRule } from './types';
import { INITIAL_FREIGHT_ZONES } from './sampleData';

export const SELLER_STATE_CODE = '08'; // Rajasthan (Thanagazi Works)
export const SELLER_STATE_NAME = 'Rajasthan';

export function extractStateCodeFromGSTIN(gstin: string): string {
  if (!gstin || gstin.length < 2) return SELLER_STATE_CODE;
  const prefix = gstin.substring(0, 2);
  return /^\d{2}$/.test(prefix) ? prefix : SELLER_STATE_CODE;
}

export function getStateNameFromCode(code: string): string {
  const map: Record<string, string> = {
    '08': 'Rajasthan',
    '27': 'Maharashtra',
    '24': 'Gujarat',
    '07': 'Delhi',
    '33': 'Tamil Nadu',
    '29': 'Karnataka',
    '19': 'West Bengal',
    '09': 'Uttar Pradesh',
    '06': 'Haryana',
    '36': 'Telangana',
    '02': 'Himachal Pradesh',
    '03': 'Punjab',
    '04': 'Chandigarh',
    '05': 'Uttarakhand',
    '10': 'Bihar',
    '11': 'Sikkim',
    '12': 'Arunachal Pradesh',
    '13': 'Nagaland',
    '14': 'Manipur',
    '15': 'Mizoram',
    '16': 'Tripura',
    '17': 'Meghalaya',
    '18': 'Assam',
    '20': 'Jharkhand',
    '21': 'Odisha',
    '22': 'Chhattisgarh',
    '23': 'Madhya Pradesh',
    '25': 'Dadra and Nagar Haveli',
    '26': 'Dadra and Nagar Haveli and Daman and Diu',
    '28': 'Andhra Pradesh',
    '30': 'Goa',
    '31': 'Lakshadweep',
    '32': 'Kerala',
    '34': 'Puducherry',
    '35': 'Andaman and Nicobar Islands',
    '37': 'Andhra Pradesh (New)',
    '38': 'Ladakh'
  };
  return map[code] || 'Rajasthan';
}

export interface TaxCalculationResult {
  subtotal: number;
  tieredDiscountTotal: number;
  couponDiscountTotal: number;
  totalDiscount: number;
  taxableAmount: number;
  isInterstate: boolean;
  gstRateAvg: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalGst: number;
  freightAmount: number;
  freightBreakdownNote: string;
  grandTotal: number;
}

export function calculateCartTotals(
  items: CartItem[],
  shippingAddress?: Address,
  coupon?: Coupon | null
): TaxCalculationResult {
  let subtotal = 0;
  let tieredDiscountTotal = 0;

  // 1. Calculate item subtotals with Tiered Quantity Discounts
  items.forEach((item) => {
    let effectiveUnitPrice = item.product.price;
    if (item.product.tieredPricing && item.product.tieredPricing.length > 0) {
      // Find highest matching tier
      const sortedTiers = [...item.product.tieredPricing].sort((a, b) => b.minQty - a.minQty);
      const matchedTier = sortedTiers.find((t) => item.quantity >= t.minQty);
      if (matchedTier) {
        effectiveUnitPrice = matchedTier.price;
      }
    }
    const lineStandardTotal = item.product.price * item.quantity;
    const lineEffectiveTotal = effectiveUnitPrice * item.quantity;

    subtotal += lineStandardTotal;
    tieredDiscountTotal += lineStandardTotal - lineEffectiveTotal;
  });

  const subtotalAfterTiered = subtotal - tieredDiscountTotal;

  // 2. Apply Coupon Discount
  let couponDiscountTotal = 0;
  if (coupon && coupon.isActive) {
    if (subtotalAfterTiered >= coupon.minOrderValue) {
      if (coupon.type === 'percentage') {
        let disc = (subtotalAfterTiered * coupon.value) / 100;
        if (coupon.maxDiscount && disc > coupon.maxDiscount) {
          disc = coupon.maxDiscount;
        }
        couponDiscountTotal = disc;
      } else if (coupon.type === 'fixed') {
        couponDiscountTotal = coupon.value;
      }
    }
  }

  const totalDiscount = tieredDiscountTotal + couponDiscountTotal;
  const taxableAmount = Math.max(0, subtotal - totalDiscount);

  // 3. GST Calculation (Intra-state vs Inter-state)
  const buyerStateCode = shippingAddress ? (shippingAddress.stateCode || extractStateCodeFromGSTIN(shippingAddress.gstin)) : SELLER_STATE_CODE;
  const isInterstate = buyerStateCode !== SELLER_STATE_CODE;

  // Standard B2B Industrial Boiler GST Rate = 18%
  const defaultGstRate = 18;
  const totalGst = (taxableAmount * defaultGstRate) / 100;

  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (isInterstate) {
    igst = totalGst;
  } else {
    cgst = totalGst / 2;
    sgst = totalGst / 2;
  }

  // 4. Freight Calculation
  let freightAmount = 0;
  let freightNotes: string[] = [];

  const buyerStateName = shippingAddress ? shippingAddress.state : 'Rajasthan';

  items.forEach((item) => {
    const mode = item.product.freightMode;
    if (mode === 'free') {
      freightNotes.push(`${item.product.name}: Free Transport`);
    } else if (mode === 'fixed') {
      const lineFreight = (item.product.fixedFreightAmount || 0) * item.quantity;
      freightAmount += lineFreight;
      freightNotes.push(`${item.product.name}: Flat Freight ₹${lineFreight.toLocaleString('en-IN')}`);
    } else if (mode === 'calculated') {
      // Find freight zone
      const zoneRule = INITIAL_FREIGHT_ZONES.find((z) => z.stateName.toLowerCase() === buyerStateName.toLowerCase()) || INITIAL_FREIGHT_ZONES[0];
      const lineFreight = zoneRule.flatRate * item.quantity;
      freightAmount += lineFreight;
      freightNotes.push(`${item.product.name}: Zone (${zoneRule.zone}) Freight ₹${lineFreight.toLocaleString('en-IN')}`);
    } else if (mode === 'confirm_later') {
      freightNotes.push(`${item.product.name}: Heavy Freight to be quoted by Pandey Ji Iron Works Logistics`);
    }
  });

  const freightBreakdownNote = freightNotes.join(' | ');
  const grandTotal = Math.round(taxableAmount + totalGst + freightAmount);

  return {
    subtotal,
    tieredDiscountTotal,
    couponDiscountTotal,
    totalDiscount,
    taxableAmount,
    isInterstate,
    gstRateAvg: defaultGstRate,
    cgst: Math.round(cgst),
    sgst: Math.round(sgst),
    igst: Math.round(igst),
    totalGst: Math.round(totalGst),
    freightAmount: Math.round(freightAmount),
    freightBreakdownNote,
    grandTotal
  };
}
