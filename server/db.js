import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { products as initialProducts, lookbooks as initialLookbooks } from '../src/data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DATA_DIR = isServerless ? '/tmp' : path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In serverless, seed /tmp/database.json from bundled database if available
if (isServerless && !fs.existsSync(DB_FILE)) {
  const bundledPath = path.join(__dirname, 'data', 'database.json');
  if (fs.existsSync(bundledPath)) {
    try {
      fs.copyFileSync(bundledPath, DB_FILE);
    } catch {
      // fallback to initial seed
    }
  }
}

function loadDatabase() {
  if (!fs.existsSync(DB_FILE)) {
    // Seed database with default state
    const initialDb = {
      products: initialProducts.map(p => ({
        ...p,
        stockCount: p.inStock ? 15 : 0,
        sku: `MDR-${p.id.toUpperCase()}`
      })),
      lookbooks: initialLookbooks,
      orders: [
        {
          id: "MUDRA-ORD-9021",
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          status: "Processing Atelier",
          customer: {
            fullName: "Vikramaditya Singhania",
            email: "vikram.singhania@heritage.in",
            phone: "+91 98200 44123",
            address: "42 Altamount Road, Penthouse B",
            city: "Mumbai",
            state: "Maharashtra",
            postalCode: "400026"
          },
          fittingPreference: "Concierge Home Master-Tailor Fitting",
          items: [
            {
              id: "formal-01",
              name: "The Royal Midnight Raw Silk Bandhgala",
              price: 18500,
              quantity: 1,
              selectedSize: "40 (M)",
              selectedColor: { name: "Midnight Navy", hex: "#0f172a" },
              bespokeOptions: {
                monogramInitials: "V.S.",
                threadColor: "Burnished Gold",
                liningOption: "Imperial Royal Emerald",
                collarStyle: "Imperial Mandarin Stand"
              }
            }
          ],
          pricing: {
            subtotal: 18500,
            discount: 1850,
            promoCode: "MUDRA10",
            shippingFee: 0,
            tax: 2081,
            total: 18731
          },
          paymentMethod: "UPI",
          paymentStatus: "Paid"
        },
        {
          id: "MUDRA-ORD-9020",
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          status: "Shipped",
          customer: {
            fullName: "Aryaman Shroff",
            email: "aryaman.s@atelier.com",
            phone: "+91 98110 99882",
            address: "14 Aurangzeb Road, Suite 3",
            city: "New Delhi",
            state: "Delhi",
            postalCode: "110011"
          },
          fittingPreference: "Standard Luxury Courier",
          items: [
            {
              id: "formal-02",
              name: "Super 150s Merino Wool Double-Breasted Suit",
              price: 32000,
              quantity: 1,
              selectedSize: "42 (L)",
              selectedColor: { name: "Charcoal Melange", hex: "#334155" }
            },
            {
              id: "formal-03",
              name: "Giza 87 Egyptian Cotton Pleated Tuxedo Shirt",
              price: 6800,
              quantity: 1,
              selectedSize: "42 (L)",
              selectedColor: { name: "Pure Chalk White", hex: "#f8fafc" }
            }
          ],
          pricing: {
            subtotal: 38800,
            discount: 3880,
            promoCode: "MUDRA10",
            shippingFee: 0,
            tax: 4365,
            total: 39285
          },
          paymentMethod: "Credit Card",
          paymentStatus: "Paid"
        }
      ],
      bespokeInquiries: [
        {
          id: "INQ-101",
          createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
          garmentId: "formal-01",
          garmentName: "The Royal Midnight Raw Silk Bandhgala",
          initials: "K.R.",
          threadColor: "Burnished Gold",
          liningOption: "Imperial Royal Emerald",
          collarStyle: "Imperial Mandarin Stand",
          customerName: "Kabir Roy",
          customerPhone: "+91 99201 55678",
          status: "Under Master-Tailor Review"
        }
      ],
      subscribers: [
        { email: "collector@sartorial.co", subscribedAt: new Date(Date.now() - 86400000 * 3).toISOString() },
        { email: "privateclient@mudra.luxury", subscribedAt: new Date(Date.now() - 86400000 * 7).toISOString() }
      ],
      quizLeads: []
    };
    saveDatabase(initialDb);
    return initialDb;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database file, returning defaults', err);
    return { products: [], lookbooks: [], orders: [], bespokeInquiries: [], subscribers: [], quizLeads: [] };
  }
}

function saveDatabase(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export const db = {
  // Products
  getProducts: () => loadDatabase().products,
  getProductById: (id) => loadDatabase().products.find(p => p.id === id),
  createProduct: (productData) => {
    const current = loadDatabase();
    const id = productData.id || `custom-${Date.now()}`;
    const newProduct = {
      ...productData,
      id,
      sku: `MDR-${id.toUpperCase()}`,
      stockCount: productData.stockCount ?? 10,
      inStock: true
    };
    current.products.push(newProduct);
    saveDatabase(current);
    return newProduct;
  },
  updateProduct: (id, updates) => {
    const current = loadDatabase();
    const idx = current.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    current.products[idx] = { ...current.products[idx], ...updates };
    saveDatabase(current);
    return current.products[idx];
  },
  deleteProduct: (id) => {
    const current = loadDatabase();
    const initialLen = current.products.length;
    current.products = current.products.filter(p => p.id !== id);
    saveDatabase(current);
    return current.products.length < initialLen;
  },

  // Lookbooks
  getLookbooks: () => loadDatabase().lookbooks,

  // Orders & Payment Gateway Engine
  getOrders: () => loadDatabase().orders,
  getOrderById: (id) => loadDatabase().orders.find(o => o.id === id),
  
  // Advanced Cash on Delivery Eligibility Engine
  validateCodEligibility: (orderTotal, postalCode) => {
    const total = Number(orderTotal) || 0;
    const cleanPin = String(postalCode || '').trim();

    // Max COD order cap for luxury haute couture
    const MAX_COD_LIMIT = 50000;
    const MIN_COD_LIMIT = 1000;

    if (total > MAX_COD_LIMIT) {
      return {
        isEligible: false,
        eligible: false,
        reason: `Orders exceeding ₹${MAX_COD_LIMIT.toLocaleString('en-IN')} require secure pre-payment via Card or UPI for master-tailor insurance.`
      };
    }

    if (total < MIN_COD_LIMIT) {
      return {
        isEligible: false,
        eligible: false,
        reason: `Minimum order value for Cash on Delivery is ₹${MIN_COD_LIMIT.toLocaleString('en-IN')}.`
      };
    }

    // Check pincode format
    const isValidPin = /^[1-9][0-9]{5}$/.test(cleanPin);
    if (!isValidPin) {
      return {
        isEligible: false,
        eligible: false,
        reason: "Please enter a valid 6-digit postal code to verify COD delivery coverage."
      };
    }

    // Tier-1 Metro White-Glove Concierge Fitting Hubs
    const metroPrefixes = ['11', '12', '40', '41', '56', '50', '60', '70', '30', '38'];
    const isWhiteGloveTier = metroPrefixes.some(pref => cleanPin.startsWith(pref));
    const tierName = isWhiteGloveTier 
      ? "White-Glove Master-Tailor COD Concierge" 
      : "Secured Insured Express COD Courier";

    return {
      isEligible: true,
      eligible: true,
      maxLimit: MAX_COD_LIMIT,
      cashHandlingFee: 0, // Complimentary luxury service
      handlingFee: 0,
      serviceType: tierName,
      tier: tierName,
      guarantee: "Inspect & Fit upon arrival before handing cash or scanning courier QR code.",
      verifiedPostalCode: cleanPin,
      postalCode: cleanPin
    };
  },

  createOrder: (orderPayload) => {
    const current = loadDatabase();
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const orderId = `MUDRA-ORD-${orderNumber}`;
    const paymentMethodKey = (orderPayload.paymentMethod || 'UPI').toUpperCase();

    let paymentMethod = "UPI Instant Transfer";
    let paymentStatus = "Paid";
    let codDetails = null;

    if (paymentMethodKey.includes('COD') || paymentMethodKey.includes('CASH')) {
      paymentMethod = "Cash on Delivery (COD)";
      paymentStatus = "Pending Cash Collection on Delivery";
      codDetails = {
        amountDue: orderPayload.pricing?.total || 0,
        cashToCollect: orderPayload.pricing?.total || 0,
        codHandlingFee: 0,
        handlingFee: 0,
        verificationToken: `COD-ATELIER-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        cashCollected: false,
        collected: false,
        serviceTier: "White-Glove Master-Tailor COD Concierge",
        collectedAt: null,
        collectorNotes: null
      };
    } else if (paymentMethodKey.includes('CARD')) {
      paymentMethod = "Credit / Debit Card (Stripe Vault)";
      paymentStatus = "Paid";
    }

    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
      customer: orderPayload.customer,
      fittingPreference: orderPayload.fittingPreference || "Standard Luxury Courier",
      items: orderPayload.items || [],
      pricing: orderPayload.pricing || {},
      paymentMethod,
      paymentStatus,
      codDetails,
      cashOnDeliveryDetails: codDetails
    };

    current.orders.unshift(newOrder);

    // Decrement stock for purchased items
    orderPayload.items?.forEach(item => {
      const prod = current.products.find(p => p.id === item.id);
      if (prod && typeof prod.stockCount === 'number') {
        prod.stockCount = Math.max(0, prod.stockCount - (item.quantity || 1));
        if (prod.stockCount === 0) prod.inStock = false;
      }
    });

    saveDatabase(current);
    return newOrder;
  },

  recordCashCollection: (orderId, collectorNotes = "Cash received by Concierge Delivery Executive") => {
    const current = loadDatabase();
    const order = current.orders.find(o => o.id === orderId);
    if (!order) return null;

    order.paymentStatus = "Paid (Cash Collected on Delivery)";
    if (order.codDetails) {
      order.codDetails.cashCollected = true;
      order.codDetails.collected = true;
      order.codDetails.collectedAt = new Date().toISOString();
      order.codDetails.collectorNotes = collectorNotes;
      order.codDetails.receiptVoucher = `RCP-CASH-${Math.floor(10000 + Math.random() * 90000)}`;
      order.cashOnDeliveryDetails = order.codDetails;
    }
    order.status = "Delivered";

    saveDatabase(current);
    return order;
  },
  updateOrderStatus: (orderId, status) => {
    const current = loadDatabase();
    const order = current.orders.find(o => o.id === orderId);
    if (!order) return null;
    order.status = status;
    saveDatabase(current);
    return order;
  },

  // Bespoke Inquiries
  getBespokeInquiries: () => loadDatabase().bespokeInquiries,
  createBespokeInquiry: (inquiry) => {
    const current = loadDatabase();
    const newInquiry = {
      id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: "Under Master-Tailor Review",
      ...inquiry
    };
    current.bespokeInquiries.unshift(newInquiry);
    saveDatabase(current);
    return newInquiry;
  },

  // Subscribers
  getSubscribers: () => loadDatabase().subscribers,
  addSubscriber: (email) => {
    const current = loadDatabase();
    if (!current.subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) {
      current.subscribers.push({
        email,
        subscribedAt: new Date().toISOString()
      });
      saveDatabase(current);
      return { success: true, email };
    }
    return { success: true, message: "Already in exclusive private circle" };
  },

  // Analytics
  getAnalytics: () => {
    const current = loadDatabase();
    const totalRevenue = current.orders.reduce((sum, o) => sum + (o.pricing?.total || 0), 0);
    const totalOrders = current.orders.length;
    const totalProducts = current.products.length;
    const totalSubscribers = current.subscribers.length;
    const pendingBespoke = current.bespokeInquiries.length;

    return {
      totalRevenue,
      totalOrders,
      totalProducts,
      totalSubscribers,
      pendingBespoke,
      recentOrders: current.orders.slice(0, 5)
    };
  }
};
