import { Product, Category, HSNConfig, FreightZoneRule, Coupon, Order, Quote, UserProfile } from './types';

export const COMPANY_DETAILS = {
  name: 'Pandayji Iron Works',
  tagline: 'Wholesaler / Distributor of Wood Fired Boilers and Khoya Making Machines',
  fullName: 'Pandayji Iron Works',
  address: 'Pratapgarh Road, opp. Jyoti School, Thanagazi, Rajasthan 301022',
  phone: '96804 29713',
  phone2: '90246 33928',
  phoneDisplay: '96804 29713 / 90246 33928',
  phoneInt: '+91 96804 29713',
  email: 'sales@pandayjiironworks.com',
  gstin: '08AAACP9876F1Z4', // 08 is Rajasthan state code
  sellerStateCode: '08',
  sellerStateName: 'Rajasthan',
  establishedYear: 2019,
  certifications: ['ISO 9001:2015 Certified', 'CIB Rajasthan Approved']
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-steam-boilers',
    slug: 'steam-boilers',
    name: 'Industrial Steam Boilers',
    description: 'High efficiency IBR & Non-IBR package steam boilers for textile, pharma, paper, and food processing plants.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    iconName: 'Flame',
    hsnCodeDefault: '84021100',
    gstRateDefault: 18,
    productCount: 0
  },
  {
    id: 'cat-thermic-fluid',
    slug: 'thermic-fluid-heaters',
    name: 'Thermic Fluid Heaters',
    description: 'High temperature liquid phase heating systems up to 340°C with solid, oil, and gas fuel options.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    iconName: 'Thermometer',
    hsnCodeDefault: '84031000',
    gstRateDefault: 18,
    productCount: 0
  },
  {
    id: 'cat-hot-water',
    slug: 'hot-water-boilers',
    name: 'Hot Water Generators',
    description: 'Pressurised and atmospheric hot water boilers for process heating, hotels, and HVAC applications.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    iconName: 'Droplets',
    hsnCodeDefault: '84031000',
    gstRateDefault: 18,
    productCount: 0
  },
  {
    id: 'cat-electric',
    slug: 'electric-boilers',
    name: 'Electric & Electrode Boilers',
    description: 'Zero emission, compact electric steam boilers designed for clean rooms, R&D labs, and urban plants.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    iconName: 'Zap',
    hsnCodeDefault: '84021990',
    gstRateDefault: 18,
    productCount: 0
  },
  {
    id: 'cat-accessories',
    slug: 'boiler-accessories',
    name: 'Boiler Accessories & Plant Auxiliaries',
    description: 'Deaerators, Economizers, Water Softeners, ID/FD Fans, Feed Water Pumps, and Chimneys.',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    iconName: 'Settings',
    hsnCodeDefault: '84041000',
    gstRateDefault: 18,
    productCount: 0
  },
  {
    id: 'cat-spares',
    slug: 'boiler-spares-valves',
    name: 'Valves, Controls & Spare Parts',
    description: 'IBR approved safety valves, blowdown valves, mobrey level controllers, gauge glasses, and burner nozzles.',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80',
    iconName: 'Wrench',
    hsnCodeDefault: '84818090',
    gstRateDefault: 18,
    productCount: 0
  }
];

export const INITIAL_PRODUCTS: Product[] = [];

export const INITIAL_HSN_CONFIGS: HSNConfig[] = [
  { hsnCode: '84021100', category: 'Steam Boilers (Water Tube / Fire Tube)', description: 'Steam or other vapour generating boilers (other than central heating hot water boilers)', gstRate: 18 },
  { hsnCode: '84021990', category: 'Electric Steam Boilers', description: 'Other steam generating boilers including electric boilers', gstRate: 18 },
  { hsnCode: '84031000', category: 'Central Heating & Hot Water / Thermic Fluid', description: 'Central heating boilers & liquid phase heating apparatus', gstRate: 18 },
  { hsnCode: '84041000', category: 'Boiler Auxiliary Plant', description: 'Auxiliary plant for use with boilers (Economizers, Deaerators, Softeners)', gstRate: 18 },
  { hsnCode: '84818090', category: 'Safety & Industrial Valves', description: 'Taps, cocks, valves for pipes, boiler shells, tanks', gstRate: 18 }
];

export const INITIAL_FREIGHT_ZONES: FreightZoneRule[] = [
  { id: 'fz-north-rj', stateName: 'Rajasthan', zone: 'North', baseFreightPerTon: 1500, flatRate: 10000, estimatedTransitDays: 1 },
  { id: 'fz-west-mh', stateName: 'Maharashtra', zone: 'West', baseFreightPerTon: 2800, flatRate: 20000, estimatedTransitDays: 3 },
  { id: 'fz-west-gj', stateName: 'Gujarat', zone: 'West', baseFreightPerTon: 2200, flatRate: 16000, estimatedTransitDays: 2 },
  { id: 'fz-north-dl', stateName: 'Delhi NCR', zone: 'North', baseFreightPerTon: 2000, flatRate: 12000, estimatedTransitDays: 2 },
  { id: 'fz-south-tn', stateName: 'Tamil Nadu', zone: 'South', baseFreightPerTon: 4500, flatRate: 35000, estimatedTransitDays: 5 },
  { id: 'fz-south-ka', stateName: 'Karnataka', zone: 'South', baseFreightPerTon: 4000, flatRate: 30000, estimatedTransitDays: 4 },
  { id: 'fz-east-wb', stateName: 'West Bengal', zone: 'East', baseFreightPerTon: 4800, flatRate: 38000, estimatedTransitDays: 5 }
];

export const INITIAL_COUPONS: Coupon[] = [];

export const INITIAL_USER: UserProfile = {
  id: '',
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  gstin: '',
  role: 'customer',
  addresses: []
};

export const INITIAL_ORDERS: Order[] = [];

export const INITIAL_QUOTES: Quote[] = [];
