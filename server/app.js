import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.startsWith('/api')) {
      console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// ==========================================
// REST API ROUTES
// ==========================================

// 1. Health & Server Info
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'MUDRA Haute Sartorial Atelier',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// 2. Products API
app.get('/api/products', (req, res) => {
  let products = db.getProducts();
  const { collection, category, search, maxPrice, sort } = req.query;

  if (collection && collection !== 'all') {
    products = products.filter(p => p.collection === collection);
  }

  if (category && category !== 'All') {
    products = products.filter(p => p.subCategory.toLowerCase() === category.toLowerCase());
  }

  if (maxPrice) {
    const priceNum = Number(maxPrice);
    if (!isNaN(priceNum)) {
      products = products.filter(p => p.price <= priceNum);
    }
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.subCategory.toLowerCase().includes(q) ||
      p.fabricDetails.toLowerCase().includes(q)
    );
  }

  if (sort === 'price-asc') {
    products = [...products].sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    products = [...products].sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    products = [...products].sort((a, b) => b.rating - a.rating);
  }

  res.json({
    count: products.length,
    products
  });
});

app.get('/api/products/:id', (req, res) => {
  const product = db.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Atelier piece not found' });
  }
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const newProduct = db.createProduct(req.body);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const updated = db.updateProduct(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(updated);
});

app.delete('/api/products/:id', (req, res) => {
  const success = db.deleteProduct(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json({ message: 'Product archived successfully' });
});

// 3. Lookbooks API
app.get('/api/lookbooks', (req, res) => {
  res.json(db.getLookbooks());
});

// 4. Advanced Payment Gateway & COD API
app.get('/api/payments/methods', (req, res) => {
  const methods = [
    {
      id: "cod",
      name: "Concierge Cash on Delivery",
      badge: "Pay on Fitting",
      description: "Hand cash or scan courier UPI QR code after trying on your garments at home.",
      maxLimit: 50000,
      handlingFee: 0,
      isAvailable: true
    },
    {
      id: "upi",
      name: "Instant UPI Transfer",
      badge: "Zero Surcharge",
      description: "Scan instant dynamic QR code via Google Pay, PhonePe, Paytm, or BHIM.",
      maxLimit: 200000,
      handlingFee: 0,
      isAvailable: true
    },
    {
      id: "card",
      name: "Credit / Debit Card",
      badge: "3D Secure Vault",
      description: "Visa, MasterCard, American Express, and Diners Club with full insurance.",
      maxLimit: 500000,
      handlingFee: 0,
      isAvailable: true
    }
  ];

  res.json({
    brand: "Mudra Haute Sartorial Payments",
    currency: "INR",
    supportedMethods: methods,
    paymentMethods: methods
  });
});

app.post('/api/payments/cod/validate', (req, res) => {
  const { orderTotal, postalCode } = req.body;
  const result = db.validateCodEligibility(orderTotal, postalCode);
  res.json(result);
});

app.post('/api/orders/:id/collect-cash', (req, res) => {
  const { notes } = req.body || {};
  const updatedOrder = db.recordCashCollection(req.params.id, notes);
  if (!updatedOrder) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json({
    success: true,
    message: 'Cash payment settled and voucher issued',
    order: updatedOrder
  });
});

// 5. Orders & Checkout API
app.post('/api/orders', (req, res) => {
  const { customer, items, pricing, paymentMethod, fittingPreference } = req.body;

  if (!customer?.fullName || !customer?.email || !customer?.phone || !customer?.address) {
    return res.status(400).json({ error: 'Incomplete delivery and contact credentials' });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Order bag cannot be empty' });
  }

  const order = db.createOrder({
    customer,
    items,
    pricing,
    paymentMethod,
    fittingPreference
  });

  res.status(201).json({
    success: true,
    message: 'Luxury bespoke order registered in Mudra Atelier',
    order
  });
});

app.get('/api/orders', (req, res) => {
  res.json(db.getOrders());
});

app.get('/api/orders/:id', (req, res) => {
  const order = db.getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  const updated = db.updateOrderStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(updated);
});

// 6. Bespoke Monogramming Studio Submissions
app.post('/api/bespoke', (req, res) => {
  const inquiry = db.createBespokeInquiry(req.body);
  res.status(201).json({
    success: true,
    message: 'Bespoke atelier monogram order reserved',
    inquiry
  });
});

app.get('/api/bespoke', (req, res) => {
  res.json(db.getBespokeInquiries());
});

// 7. Newsletter / Client Club API
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  const result = db.addSubscriber(email);
  res.json(result);
});

app.get('/api/newsletter', (req, res) => {
  res.json(db.getSubscribers());
});

// 8. Executive Admin Analytics API
app.get('/api/admin/analytics', (req, res) => {
  res.json(db.getAnalytics());
});

app.get('/api/admin/orders', (req, res) => {
  res.json(db.getOrders());
});

// ==========================================
// STATIC FRONTEND SERVING (STANDALONE)
// ==========================================
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback all other client routes to SPA index.html
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

export default app;
