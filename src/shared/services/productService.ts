import { Product, ProductFormData } from '@/shared/types/product';

// Simulated database with sample data
let products: Product[] = [
  {
    id: 'PRD/2024/BRK/001',
    name: 'Shimano Hydraulic Disc Brake Set',
    category: 'brakes',
    price: 149.99,
    stock: 25,
    min_stock: 5,
    size: 'Universal',
    type: 'Hydraulic',
    compatible_models: ['Mountain Bike', 'Hybrid Bike', 'Electric Bike'],
    repair_time: 45,
    repair_cost: 35.00,
    description: 'High-performance hydraulic disc brake set with excellent stopping power and modulation. Includes front and rear brakes, rotors, and mounting hardware.'
  },
  {
    id: 'PRD/2024/TIR/001',
    name: 'Continental Grand Prix 5000 Tire',
    category: 'tires',
    price: 69.99,
    stock: 40,
    min_stock: 10,
    size: '700x25c',
    type: 'Road',
    compatible_models: ['Road Bike', 'Racing Bike'],
    repair_time: 20,
    repair_cost: 15.00,
    description: 'Premium road bike tire with excellent grip and low rolling resistance. Features BlackChili compound and Active Comfort Technology.'
  },
  {
    id: 'PRD/2024/DRT/001',
    name: 'SRAM Eagle X01 Derailleur',
    category: 'drivetrain',
    price: 289.99,
    stock: 15,
    min_stock: 3,
    size: '12-speed',
    type: 'Rear Derailleur',
    compatible_models: ['Mountain Bike', 'Trail Bike'],
    repair_time: 60,
    repair_cost: 45.00,
    description: 'High-end 12-speed rear derailleur with Type-3 roller bearing clutch. Provides precise shifting and chain retention.'
  },
  {
    id: 'PRD/2024/SUS/001',
    name: 'RockShox Pike Ultimate Fork',
    category: 'suspension',
    price: 899.99,
    stock: 8,
    min_stock: 2,
    size: '29-inch',
    type: 'Front Suspension',
    compatible_models: ['Mountain Bike', 'Enduro Bike'],
    repair_time: 120,
    repair_cost: 150.00,
    description: 'Premium trail fork with Charger 2.1 RC2 damper. Features 140mm travel and Debonair spring.'
  },
  {
    id: 'PRD/2024/SAD/001',
    name: 'Brooks B17 Leather Saddle',
    category: 'saddles',
    price: 159.99,
    stock: 20,
    min_stock: 4,
    size: 'Standard',
    type: 'Leather',
    compatible_models: ['Touring Bike', 'City Bike', 'Commuter Bike'],
    repair_time: 30,
    repair_cost: 25.00,
    description: 'Classic leather saddle with steel rails. Provides excellent comfort for long-distance riding.'
  },
  {
    id: 'PRD/2024/TIR/002',
    name: 'Maxxis Minion DHF Tire',
    category: 'tires',
    price: 79.99,
    stock: 35,
    min_stock: 8,
    size: '27.5x2.5',
    type: 'Mountain',
    compatible_models: ['Mountain Bike', 'Downhill Bike', 'Enduro Bike'],
    repair_time: 25,
    repair_cost: 20.00,
    description: 'Aggressive trail and downhill tire with excellent cornering grip. Features 3C MaxxTerra compound.'
  },
  {
    id: 'PRD/2024/PED/001',
    name: 'Shimano XTR Pedals',
    category: 'pedals',
    price: 179.99,
    stock: 12,
    min_stock: 3,
    size: 'Standard',
    type: 'SPD',
    compatible_models: ['Mountain Bike', 'Cross Country Bike', 'Trail Bike'],
    repair_time: 30,
    repair_cost: 25.00,
    description: 'Professional-grade SPD pedals with excellent mud-shedding and engagement.'
  },
  {
    id: 'PRD/2024/HBR/001',
    name: 'FSA Carbon Handlebar',
    category: 'handlebars',
    price: 169.99,
    stock: 10,
    min_stock: 2,
    size: '740mm',
    type: 'Carbon Fiber',
    compatible_models: ['Mountain Bike', 'Trail Bike', 'Enduro Bike'],
    repair_time: 45,
    repair_cost: 35.00,
    description: 'Lightweight carbon fiber handlebar with 20mm rise. Optimized for trail and enduro riding.'
  }
];

// Generate unique ID based on category and sequential number
const generateId = (category: string): string => {
  const categoryPrefix = category.substring(0, 3).toUpperCase();
  const year = new Date().getFullYear();
  
  // Find the highest number for this category
  const existingIds = products
    .filter(p => p.id.includes(`/${categoryPrefix}/`))
    .map(p => parseInt(p.id.split('/')[3]));
  
  const nextNumber = existingIds.length > 0 
    ? Math.max(...existingIds) + 1 
    : 1;

  return `PRD/${year}/${categoryPrefix}/${nextNumber.toString().padStart(3, '0')}`;
};

// Create new product
export const createProduct = (productData: ProductFormData): Product => {
  const newProduct: Product = {
    id: generateId(productData.category),
    ...productData
  };
  products.push(newProduct);
  return newProduct;
};

// Get all products
export const getAllProducts = (): Product[] => {
  return products;
};

// Get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Update product
export const updateProduct = (id: string, productData: ProductFormData): Product | null => {
  const index = products.findIndex(product => product.id === id);
  if (index === -1) return null;
  
  const updatedProduct: Product = {
    id,
    ...productData
  };
  products[index] = updatedProduct;
  return updatedProduct;
};

// Delete product
export const deleteProduct = (id: string): boolean => {
  const initialLength = products.length;
  products = products.filter(product => product.id !== id);
  return products.length < initialLength;
};

// Search products
export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};
