import { Product, Category, HSNConfig, FreightZoneRule, Coupon, Order, Quote, UserProfile } from './types';

export const COMPANY_DETAILS = {
  name: 'Pandayji Iron Works',
  tagline: 'Wholesaler / Distributor of Wood Fired Boilers and Khoya Making Machines',
  fullName: 'Pandayji Iron Works',
  address: 'Sariska, Rajasthan, India, 301022',
  phone: '096804 29713',
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
    productCount: 14
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
    productCount: 8
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
    productCount: 6
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
    productCount: 5
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
    productCount: 22
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
    productCount: 35
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-steam-300kg-wood',
    slug: '300kg-hr-wood-fired-non-ibr-steam-boiler',
    name: '300 Kg/Hr Wood Fired Non-IBR Steam Boiler',
    sku: 'PIW-SB-300-W',
    categoryId: 'cat-steam-boilers',
    categoryName: 'Industrial Steam Boilers',
    brand: 'Pandayji Iron Works',
    mode: 'quote',
    price: 450000,
    compareAtPrice: 500000,
    hsnCode: '84021990',
    gstRate: 18,
    availability: 'made_to_order',
    capacity: '300 kg/hr',
    fuelType: 'Wood / Biomass',
    pressure: '10 kg/cm² (g)',
    efficiency: '80% ± 2%',
    dimensions: '3200 x 2400 x 2200 mm',
    weight: '3,500 kg',
    material: 'Boiler Quality Steel',
    warranty: '12 Months Guarantee',
    shortDescription: 'Highly efficient Wood Fired 300 Kg Hr Steam Boiler (Non IBR) manufactured by Pandayji Iron Works in Sariska, Rajasthan.',
    description: 'Designed for small and medium scale industries, this non-IBR wood-fired boiler delivers 300 kg/hr of steam efficiently. Perfect for food processing, khoya making, and dairy plants.',
    features: [
      'IBR 1950 Certified Form IIIC approval included',
      'Automatic Reciprocating Grate Stoker for uniform combustion',
      'Multi-pass wetback shell design eliminating rear refractory failure',
      'Integrated cast-iron economizer for maximum thermal efficiency',
      'PLC-based SCADA automation panel with auto water level cut-off',
      'Emissions compliant with CPCB (Central Pollution Control Board) norms (<50 mg/Nm³)'
    ],
    applications: [
      'Textile Processing & Dyeing Units',
      'Paper Mills & Packaging Board Plants',
      'Chemical & Pharmaceutical Intermediates',
      'Food Processing & Starch Refineries'
    ],
    specifications: {
      'Steam Generation Capacity': '5,000 kg/hr (5.0 TPH)',
      'Design Pressure': '17.5 kg/cm² (g)',
      'Working Pressure': '14.0 kg/cm² (g)',
      'Maximum Steam Temperature': '201°C (Saturated)',
      'Fuel Consumption (Pellet @ 4000 kcal/kg)': '820 kg/hr',
      'Furnace Volume': '14.8 m³',
      'Feed Water Temperature': '85°C (with economizer)',
      'ID Fan Motor Rating': '30 HP / 22 kW',
      'FD Fan Motor Rating': '15 HP / 11 kW',
      'Feed Pump Rating': '12.5 HP (Duplex Standby Setup)'
    },
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
    ],
    documents: [
      { id: 'd1', title: '5 TPH Biomass Boiler Technical Specification Brochure (PDF)', fileType: 'PDF', fileSize: '4.2 MB', url: '#' },
      { id: 'd2', title: 'IBR Form IIIC Inspection Certificate Sample (Rajasthan CIB)', fileType: 'PDF', fileSize: '1.8 MB', url: '#' }
    ],
    freightMode: 'confirm_later',
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'prod-khoya-20lph',
    slug: '20-lph-khoya-making-machine',
    name: '20 LPH Khoya Making Machine / Sweets Making Machine',
    sku: 'PIW-KMM-20LPH',
    categoryId: 'cat-steam-boilers',
    categoryName: 'Industrial Steam Boilers',
    brand: 'Pandayji Iron Works',
    mode: 'quote',
    price: 150000,
    compareAtPrice: 165000,
    hsnCode: '84382000',
    gstRate: 18,
    availability: 'in_stock',
    capacity: '20 Liters Per Hour (LPH)',
    fuelType: 'Steam Heated',
    pressure: 'Max 3.0 kg/cm² (g)',
    efficiency: 'Highly Efficient Heat Transfer',
    dimensions: '1200 x 800 x 1400 mm',
    weight: '250 kg',
    material: 'Stainless Steel (SS 304/316) Food Grade',
    warranty: '12 Months Manufacturer Guarantee',
    shortDescription: 'Industrial grade 20 LPH Khoya Making & Sweets Making Machine by Pandayji Iron Works, Sariska.',
    description: 'Perfect for commercial sweet manufacturers, dairies, and restaurants. This SS body Khoya Making Machine is steam-jacketed and provides uniform heating to prevent milk/khoya burning. Specially designed scrapper ensures smooth texture.',
    features: [
      'Food-grade Stainless Steel construction for hygienic processing',
      'Motorized scraping stirrer to prevent milk burning',
      'Steam-jacketed bottom for uniform and efficient heating',
      'Easy tilting mechanism for product unloading'
    ],
    applications: [
      'Dairy Processing Units',
      'Sweet Manufacturers & Halwais',
      'Food & Beverages Startups'
    ],
    specifications: {
      'Steam Generation Rate': '2,000 kg/hr',
      'Working Pressure': '10.5 kg/cm²',
      'Burner Type': 'Modulating Monoblock Burner',
      'Thermal Efficiency': '91.5%',
      'Power Supply': '415V, 3 Phase, 50 Hz'
    },
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80'
    ],
    documents: [
      { id: 'd4', title: '2 TPH Oil-Gas Package Boiler Datasheet', fileType: 'PDF', fileSize: '2.9 MB', url: '#' }
    ],
    freightMode: 'fixed',
    fixedFreightAmount: 45000,
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'prod-thermic-10lac-kcal',
    slug: '10-lac-kcal-thermic-fluid-heater',
    name: '10 Lac Kcal/hr Solid Fuel Thermic Fluid Heater (300°C)',
    sku: 'PJIW-TFH-1000K',
    categoryId: 'cat-thermic-fluid',
    categoryName: 'Thermic Fluid Heaters',
    brand: 'Pandey Ji Iron Works',
    mode: 'quote',
    price: 3200000,
    compareAtPrice: 3450000,
    hsnCode: '84031000',
    gstRate: 18,
    availability: 'made_to_order',
    capacity: '10,000,000 Kcal/hr (10 Lac Kcal)',
    fuelType: 'Wood Briquettes / Coal / Agrowaste',
    pressure: 'Atmospheric / 3.0 kg/cm² (g)',
    efficiency: '80% ± 2%',
    dimensions: '5800 x 2800 x 3600 mm',
    weight: '16,000 kg',
    material: 'BS 3059 Part II Seamless Boiler Tubes',
    warranty: '24 Months Warranty',
    shortDescription: 'Liquid phase heat transfer system manufactured in Thanagazi, Rajasthan for high temperature non-pressurized operations up to 320°C.',
    description: 'Ideal for chemical reactors, stenter machines in textiles, and plywood presses where high temperatures are required without high operating steam pressures.',
    features: [
      'Operates up to 320°C at near-atmospheric pressures',
      'Helical coil design ensuring uniform thermal expansion',
      'High efficiency thermic fluid circulation pumps with mechanical seals'
    ],
    applications: [
      'Textile Stenter Machines & Polymer Coating',
      'Chemical & Petrochemical Resin Plants',
      'Plywood & Particle Board Hot Pressing'
    ],
    specifications: {
      'Thermal Output': '1,000,000 Kcal/hr',
      'Maximum Operating Temperature': '300°C / 320°C',
      'Thermic Fluid Flow Rate': '65 m³/hr'
    },
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
    ],
    documents: [
      { id: 'd5', title: '10 Lac Kcal Thermic Fluid Heater Manual', fileType: 'PDF', fileSize: '3.5 MB', url: '#' }
    ],
    freightMode: 'confirm_later',
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'prod-electric-100kw-boiler',
    slug: '100-kw-packaged-electric-steam-boiler',
    name: '100 kW Instant Packaged Electric Steam Generator (150 kg/hr)',
    sku: 'PJIW-EL-100KW',
    categoryId: 'cat-electric',
    categoryName: 'Electric & Electrode Boilers',
    brand: 'Pandey Ji Iron Works',
    mode: 'direct',
    price: 475000,
    compareAtPrice: 510000,
    hsnCode: '84021990',
    gstRate: 18,
    availability: 'in_stock',
    capacity: '150 kg/hr Steam (100 kW Electrical)',
    fuelType: 'Electricity (415V 3-Phase AC)',
    pressure: '7.0 kg/cm² (g)',
    efficiency: '98% Thermal Efficiency',
    dimensions: '1400 x 950 x 1650 mm',
    weight: '680 kg',
    material: 'SS 316L Stainless Steel Pressure Vessel',
    warranty: '12 Months Warranty',
    shortDescription: 'Zero-carbon emission compact stainless steel electric steam generator with heavy duty Incoloy 800 heating elements.',
    description: 'Precision engineered electric boiler for clean rooms, hospitals, food sterilizers, and laboratory applications.',
    features: [
      '98% electrical-to-thermal energy conversion efficiency',
      'Grade 316L SS pressure vessel and heating immersion elements'
    ],
    applications: [
      'Pharma Clean Rooms & Autoclaves',
      'Hospital Sterilization Departments (CSSD)',
      'Food Processing & Commercial Kitchen Steam Kettles'
    ],
    specifications: {
      'Electrical Capacity': '100 kW',
      'Steam Output': '150 kg/hr @ 100°C feed water'
    },
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'
    ],
    documents: [
      { id: 'd6', title: '100 kW Electric Boiler Installation Guide', fileType: 'PDF', fileSize: '1.4 MB', url: '#' }
    ],
    freightMode: 'calculated',
    isFeatured: false,
    minOrderQty: 1,
    tieredPricing: [
      { minQty: 1, price: 475000, discountPercent: 0 },
      { minQty: 2, price: 451250, discountPercent: 5 },
      { minQty: 5, price: 427500, discountPercent: 10 }
    ],
    status: 'published'
  },
  {
    id: 'prod-water-softener-10kl',
    slug: 'industrial-automatic-water-softener-plant-10kl',
    name: '10,000 LPH Automatic Industrial Water Softener Plant',
    sku: 'PJIW-WSP-10K',
    categoryId: 'cat-accessories',
    categoryName: 'Boiler Accessories & Plant Auxiliaries',
    brand: 'Pandey Ji Iron Works',
    mode: 'direct',
    price: 185000,
    compareAtPrice: 210000,
    hsnCode: '84041000',
    gstRate: 18,
    availability: 'in_stock',
    capacity: '10,000 Litres/hr (10 m³/hr)',
    fuelType: 'N/A (Water Treatment)',
    pressure: '5.0 kg/cm² operating',
    efficiency: '< 5 PPM hardness output',
    dimensions: '1800 x 900 x 2200 mm',
    weight: '450 kg (unfilled)',
    material: 'FRP (Fiberglass Reinforced Plastic) Vessel with Cation Resin',
    warranty: '12 Months Complete Warranty',
    shortDescription: 'Multi-port automatic multiport valve soft water treatment system to protect boiler tubes from hard scale formation.',
    description: 'Essential pre-treatment plant for boiler feed water. Removes calcium and magnesium hardness down to under 5 PPM.',
    features: [
      'FRP high-pressure vessel tested up to 10 kg/cm²',
      'Automatic timer/flow-based multiport brine regeneration valve'
    ],
    applications: [
      'Boiler Feed Water Pre-treatment',
      'Cooling Tower Makeup Water'
    ],
    specifications: {
      'Flow Rate': '10 m³/hr (10,000 LPH)',
      'Output Hardness': '< 5 PPM'
    },
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80'
    ],
    documents: [
      { id: 'd7', title: 'Water Softener Spec Sheet', fileType: 'PDF', fileSize: '1.1 MB', url: '#' }
    ],
    freightMode: 'fixed',
    fixedFreightAmount: 7500,
    isFeatured: true,
    minOrderQty: 1,
    status: 'published'
  },
  {
    id: 'prod-ibr-safety-valve-DN50',
    slug: 'ibr-approved-full-lift-safety-valve-dn50',
    name: 'IBR Approved Cast Steel Full Lift Safety Valve (DN50 x DN80)',
    sku: 'PJIW-SV-DN50-175',
    categoryId: 'cat-spares',
    categoryName: 'Valves, Controls & Spare Parts',
    brand: 'Pandey Ji Iron Works',
    mode: 'direct',
    price: 34500,
    compareAtPrice: 38000,
    hsnCode: '84818090',
    gstRate: 18,
    availability: 'in_stock',
    capacity: 'Discharge Capacity: 4,800 kg/hr @ 17.5 kg/cm²',
    fuelType: 'N/A (Steam Safety)',
    pressure: 'Set Pressure Range: 1.0 to 20.0 kg/cm²',
    efficiency: 'IBR Form III-C Stamped',
    dimensions: '320 x 240 x 580 mm',
    weight: '28 kg',
    material: 'Cast Steel WCB Body with SS 316 Trim & Spring',
    warranty: '12 Months Replacement Warranty',
    shortDescription: 'Heavy-duty high discharge spring-loaded full lift safety valve with IBR test stamp for steam boilers.',
    description: 'Mandatory primary safety device for IBR steam boilers. Certified by Chief Inspector of Boilers.',
    features: [
      'Individual IBR Inspection Stamp & Test Certificate Form III-C',
      'Full lift high discharge design to prevent over-pressurization'
    ],
    applications: [
      'Boiler Shell & Steam Drum Safety',
      'Superheater Outlets'
    ],
    specifications: {
      'Inlet Flange Size': 'DN50 (2" NB) ANSI 300#',
      'Set Pressure': '17.5 kg/cm²'
    },
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1200&q=80'
    ],
    documents: [
      { id: 'd8', title: 'IBR Safety Valve Form III-C Certificate Sample', fileType: 'PDF', fileSize: '850 KB', url: '#' }
    ],
    freightMode: 'free',
    isFeatured: true,
    minOrderQty: 1,
    tieredPricing: [
      { minQty: 1, price: 34500, discountPercent: 0 },
      { minQty: 3, price: 32775, discountPercent: 5 },
      { minQty: 10, price: 31050, discountPercent: 10 }
    ],
    status: 'published'
  }
];

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

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'c-boiler10',
    code: 'BOILER10',
    description: '10% Discount on Boiler Accessories & Water Softeners',
    type: 'percentage',
    value: 10,
    minOrderValue: 50000,
    maxDiscount: 25000,
    applicableCategoryIds: ['cat-accessories', 'cat-spares', 'cat-electric'],
    validUntil: '2026-12-31',
    usageCount: 42,
    isActive: true
  },
  {
    id: 'c-heavy50k',
    code: 'HEAVY50K',
    description: 'Flat ₹50,000 Off on Capital Equipment orders above ₹10 Lakhs',
    type: 'fixed',
    value: 50000,
    minOrderValue: 1000000,
    validUntil: '2026-12-31',
    usageCount: 18,
    isActive: true
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-client-001',
  fullName: 'Rajesh Sharma',
  companyName: 'Apex Textile Processors Pvt. Ltd.',
  email: 'rajesh.sharma@apextextiles.co.in',
  phone: '+91 98220 14589',
  gstin: '27AAACA1234F1Z5',
  role: 'customer',
  addresses: [
    {
      id: 'addr-1',
      companyName: 'Apex Textile Processors Pvt. Ltd.',
      contactName: 'Rajesh Sharma (Plant Head)',
      phone: '+91 98220 14589',
      email: 'rajesh.sharma@apextextiles.co.in',
      gstin: '27AAACA1234F1Z5',
      street: 'Plot No. C-42, MIDC Industrial Area, Tarapur',
      city: 'Palghar',
      state: 'Maharashtra',
      stateCode: '27',
      pincode: '401506',
      isDefault: true
    },
    {
      id: 'addr-2',
      companyName: 'Apex Textile Dyeing Unit II',
      contactName: 'Sanjay Verma (Purchase Manager)',
      phone: '+91 98901 22334',
      email: 'purchase@apextextiles.co.in',
      gstin: '24AAACA1234F1Z9',
      street: 'GIDC Industrial Estate, Phase 3, Naroda',
      city: 'Ahmedabad',
      state: 'Gujarat',
      stateCode: '24',
      pincode: '382330',
      isDefault: false
    }
  ]
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-100491',
    orderNumber: 'ORD-PJIW-2026-10491',
    customerId: 'usr-client-001',
    companyName: 'Apex Textile Processors Pvt. Ltd.',
    contactPerson: 'Rajesh Sharma',
    email: 'rajesh.sharma@apextextiles.co.in',
    phone: '+91 98220 14589',
    gstin: '27AAACA1234F1Z5',
    billingAddress: INITIAL_USER.addresses[0],
    shippingAddress: INITIAL_USER.addresses[0],
    items: [
      {
        productId: 'prod-electric-100kw-boiler',
        name: '100 kW Instant Packaged Electric Steam Generator (150 kg/hr)',
        sku: 'PJIW-EL-100KW',
        quantity: 1,
        unitPrice: 475000,
        totalPrice: 475000,
        hsnCode: '84021990',
        gstRate: 18,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80'
      },
      {
        productId: 'prod-ibr-safety-valve-DN50',
        name: 'IBR Approved Cast Steel Full Lift Safety Valve (DN50 x DN80)',
        sku: 'PJIW-SV-DN50-175',
        quantity: 2,
        unitPrice: 34500,
        totalPrice: 69000,
        hsnCode: '84818090',
        gstRate: 18,
        image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=400&q=80'
      }
    ],
    subtotal: 544000,
    discountAmount: 25000,
    couponCode: 'BOILER10',
    taxableAmount: 519000,
    sellerStateCode: '08', // Rajasthan
    buyerStateCode: '27',  // Maharashtra (Interstate IGST)
    isInterstate: true,
    cgst: 0,
    sgst: 0,
    igst: 93420,
    totalGst: 93420,
    freightAmount: 16500,
    freightMode: 'calculated',
    grandTotal: 628920,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Razorpay NetBanking (HDFC Corporate)',
    paymentTransactionId: 'pay_RZP_9918239012',
    orderStatus: 'dispatched',
    carrierName: 'VRL Logistics Heavy Trailer',
    trackingNumber: 'VRL-RJ-9948120',
    lrNumber: 'LR-PJIW-98124',
    estimatedDeliveryDate: '2026-10-02',
    createdAt: '2026-09-24T10:15:00Z',
    updatedAt: '2026-09-27T16:30:00Z'
  }
];

export const INITIAL_QUOTES: Quote[] = [
  {
    id: 'q-9021',
    quoteNumber: 'RFQ-PJIW-2026-9021',
    productId: 'prod-steam-5tph-biomass',
    productName: '5.0 TPH Biomass Pellet / Wood Fired IBR Steam Boiler',
    quantity: 1,
    customerId: 'usr-client-001',
    companyName: 'Apex Textile Processors Pvt. Ltd.',
    contactPerson: 'Rajesh Sharma',
    phone: '+91 98220 14589',
    email: 'rajesh.sharma@apextextiles.co.in',
    gstin: '27AAACA1234F1Z5',
    deliveryState: 'Maharashtra',
    deliveryCity: 'Palghar',
    deliveryPincode: '401506',
    requiredDeliveryDate: '2026-11-15',
    specsRequired: {
      'Operating Pressure': '14.0 kg/cm² (g)',
      'Fuel Preference': 'Agro-briquettes / Sawdust pellets',
      'Auxiliaries Needed': 'Economizer + MDC Dust Collector + PLC Panel'
    },
    items: [],
    notes: 'Please quote with turn-key erection, civil foundation layout, and IBR Form IIIC registration support.',
    status: 'quoted',
    unitPrice: 4650000,
    subtotal: 4650000,
    discountAmount: 150000,
    taxableAmount: 4500000,
    gstRate: 18,
    gstAmount: 810000,
    freightAmount: 85000,
    grandTotal: 5395000,
    paymentTerms: '30% Advance along with Purchase Order, 60% against Proforma Invoice prior to dispatch from Thanagazi Works, 10% post commissioning.',
    validityDays: 30,
    adminNotes: 'Special discount approved for Pandey Ji Iron Works direct client. Hydraulic low-bed trailer transport to Tarapur MIDC.',
    createdAt: '2026-09-20T11:00:00Z',
    updatedAt: '2026-09-22T14:45:00Z'
  }
];
