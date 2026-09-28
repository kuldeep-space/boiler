import { Vehicle } from './types';

export const VEHICLES: Vehicle[] = [
  {
    id: 'v1',
    name: '2024 Aurora GT Line',
    make: 'Aurora',
    model: 'GT Line',
    year: 2024,
    price: 42900,
    type: 'Coupe',
    mileage: 12400,
    drivetrain: 'AWD',
    condition: 'Certified Pre-Owned',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80'
    ],
    mpg: '22 City / 30 Hwy',
    engine: '3.0L Twin-Turbo V6',
    hp: 382,
    transmission: '8-Speed Dual-Clutch Automatic',
    exteriorColor: 'Obsidian Black Metallic',
    interiorColor: 'Electric Blue Stitched Nappa Leather',
    vin: '1G4AP5ER7RF102934',
    features: [
      'Panoramic Glass Roof',
      'Head-Up Display with AR Navigation',
      'Burmester 3D Surround Audio (16 Speakers)',
      'Adaptive Air Suspension with Roll Control',
      'Wireless Apple CarPlay & Android Auto',
      'Heated & Ventilated Sport Seats'
    ],
    monthlyEstimate: 612,
    inStock: true
  },
  {
    id: 'v2',
    name: '2023 Vantage EX SUV',
    make: 'Vantage',
    model: 'EX SUV',
    year: 2023,
    price: 36500,
    type: 'SUV',
    mileage: 21800,
    drivetrain: 'AWD',
    condition: 'Certified Pre-Owned',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'
    ],
    mpg: '24 City / 31 Hwy',
    engine: '2.5L Turbocharged 4-Cylinder',
    hp: 300,
    transmission: '9-Speed Automatic',
    exteriorColor: 'Midnight Steel Blue',
    interiorColor: 'Slate Gray Perforated Leather',
    vin: '2T2VEX9K8PC481920',
    features: [
      'All-Weather Drive Select Modes',
      'Hands-Free Power Liftgate',
      '360-Degree Surround View Camera',
      'Blind Spot Warning & Lane Keep Assist'
    ],
    monthlyEstimate: 521,
    inStock: true
  },
  {
    id: 'v3',
    name: '2025 Nimbus EV Long Range',
    make: 'Nimbus',
    model: 'EV Long Range',
    year: 2025,
    price: 51200,
    type: 'EV',
    mileage: 1200,
    drivetrain: 'RWD',
    condition: 'New',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80'
    ],
    mpg: '128 MPGe (340 mi Range)',
    engine: 'Single Electric Motor (100 kWh Battery)',
    hp: 425,
    transmission: 'Direct-Drive Single-Speed',
    exteriorColor: 'Cyber Platinum Satin',
    interiorColor: 'Minimalist Charcoal Alcantara',
    vin: '5YJNEV350SF901842',
    features: [
      '340-Mile EPA Range',
      'Ultra-Fast 800V DC Charging (10-80% in 18 mins)',
      'Level 2 Highway Autopilot Assistant',
      '17.3-inch OLED Infotainment Touchscreen'
    ],
    monthlyEstimate: 731,
    inStock: true
  },
  {
    id: 'v4',
    name: '2022 Ridgeback 4x4 Crew',
    make: 'Ridgeback',
    model: '4x4 Crew',
    year: 2022,
    price: 39750,
    type: 'Truck',
    mileage: 38600,
    drivetrain: '4WD',
    condition: 'Certified Pre-Owned',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'
    ],
    mpg: '18 City / 23 Hwy',
    engine: '3.5L EcoBoost V6',
    hp: 400,
    transmission: '10-Speed Heavy Duty Automatic',
    exteriorColor: 'Matte Graphite Gray',
    interiorColor: 'Dark Rugged Leatherette',
    vin: '1FTFW1E84NK204918',
    features: [
      '7,500 lbs Towing Package with Trailer Brake Control',
      'Off-Road Fox Racing Shocks',
      'Spray-In Bedliner & Pro Power Onboard 2.0kW',
      'Skid Plates & Electronic Locking Rear Axle'
    ],
    monthlyEstimate: 567,
    inStock: true
  },
  {
    id: 'v5',
    name: '2024 Corsa Sport Coupe',
    make: 'Corsa',
    model: 'Sport Coupe',
    year: 2024,
    price: 47300,
    type: 'Coupe',
    mileage: 8900,
    drivetrain: 'RWD',
    condition: 'Certified Pre-Owned',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80'
    ],
    mpg: '20 City / 28 Hwy',
    engine: '3.0L Inline-6 Turbo',
    hp: 405,
    transmission: '6-Speed Manual / 8-Speed Paddle Shift',
    exteriorColor: 'Apex Crimson Pearl',
    interiorColor: 'Jet Black Leather with Carbon Fiber Trim',
    vin: 'WBA3CS400RF819230',
    features: [
      'Active M-Sport Differential',
      'Carbon Fiber Roof & Mirror Caps',
      'Track Telemetry Recorder',
      'Harman Kardon Premium Sound System'
    ],
    monthlyEstimate: 675,
    inStock: true
  },
  {
    id: 'v6',
    name: '2023 Meridian Touring',
    make: 'Meridian',
    model: 'Touring',
    year: 2023,
    price: 28400,
    type: 'Sedan',
    mileage: 26100,
    drivetrain: 'FWD',
    condition: 'Certified Pre-Owned',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80'
    ],
    mpg: '28 City / 38 Hwy',
    engine: '2.0L 4-Cylinder i-VTEC',
    hp: 204,
    transmission: 'CVT with Sport Mode',
    exteriorColor: 'Gunmetal Metallic',
    interiorColor: 'Ivory Premium Cloth',
    vin: '1HGCR2F81PA918234',
    features: [
      'Adaptive Cruise Control with Low-Speed Follow',
      'Power Moonroof',
      'Remote Engine Start',
      'Dual-Zone Automatic Climate Control'
    ],
    monthlyEstimate: 405,
    inStock: true
  },
  {
    id: 'v7',
    name: '2025 Vantage Hybrid',
    make: 'Vantage',
    model: 'Hybrid',
    year: 2025,
    price: 44900,
    type: 'SUV',
    mileage: 400,
    drivetrain: 'AWD',
    condition: 'New',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
    ],
    mpg: '42 Combined MPG',
    engine: '2.5L 4-Cylinder Hybrid Drive',
    hp: 302,
    transmission: 'eCVT Electronic All-Wheel Drive',
    exteriorColor: 'Frozen Arctic White',
    interiorColor: 'Ebony Perforated SofTex',
    vin: '4T1HYB350SF102983',
    features: [
      'Plugin Hybrid EV Mode (42 Miles All-Electric Range)',
      '12.3-inch Digital Gauge Cluster',
      'JBL 11-Speaker Audio System',
      'Panoramic Glass Sunroof'
    ],
    monthlyEstimate: 641,
    inStock: true
  },
  {
    id: 'v8',
    name: '2021 Aurora Base',
    make: 'Aurora',
    model: 'Base',
    year: 2021,
    price: 21900,
    type: 'Sedan',
    mileage: 52300,
    drivetrain: 'FWD',
    condition: 'Pre-Owned',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80'
    ],
    mpg: '26 City / 35 Hwy',
    engine: '2.4L 4-Cylinder',
    hp: 186,
    transmission: '6-Speed Automatic',
    exteriorColor: 'Silver Slate Metallic',
    interiorColor: 'Black Cloth',
    vin: '3N1AB8AP0ML918239',
    features: [
      'Backup Camera',
      'Bluetooth HandsFreeLink',
      'Keyless Entry & Push Button Start',
      'Clean CARFAX - 1 Owner'
    ],
    monthlyEstimate: 313,
    inStock: true
  },
  {
    id: 'v9',
    name: '2024 Ridgeback Trail Edition',
    make: 'Ridgeback',
    model: 'Trail Edition',
    year: 2024,
    price: 48600,
    type: 'Truck',
    mileage: 14700,
    drivetrain: '4WD',
    condition: 'Certified Pre-Owned',
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80'
    ],
    mpg: '17 City / 22 Hwy',
    engine: '5.7L HEMI V8 with eTorque',
    hp: 395,
    transmission: '8-Speed Heavy Duty Automatic',
    exteriorColor: 'Anvil Gray Clearcoat',
    interiorColor: 'Black & Diesel Gray Vinyl/Cloth',
    vin: '1C6SRFRT8RN819203',
    features: [
      'WARN Heavy-Duty Front Winch (12,000 lbs)',
      'Bilstein Off-Road Dampers',
      '18-inch Beadlock-Capable Wheels with 33-inch All-Terrain Tires',
      'Uconnect 5 NAV with 12.0-inch Touchscreen'
    ],
    monthlyEstimate: 694,
    inStock: true
  }
];

export const MAKES_LIST = ['All', 'Aurora', 'Vantage', 'Nimbus', 'Ridgeback', 'Corsa', 'Meridian'];
export const TYPES_LIST = ['All', 'SUV', 'Sedan', 'Truck', 'EV', 'Coupe'];
