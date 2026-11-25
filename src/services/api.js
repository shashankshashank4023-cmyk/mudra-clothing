// MUDRA Luxury API Client
const API_BASE = '/api';

export const api = {
  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    if (params.collection && params.collection !== 'all') query.append('collection', params.collection);
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.maxPrice) query.append('maxPrice', params.maxPrice);
    if (params.search) query.append('search', params.search);
    if (params.sort) query.append('sort', params.sort);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    const res = await fetch(`${API_BASE}/products${queryString}`);
    if (!res.ok) throw new Error('Failed to retrieve products');
    const data = await res.json();
    return data.products || [];
  },

  async getProductById(id) {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    return await res.json();
  },

  // Lookbooks
  async getLookbooks() {
    const res = await fetch(`${API_BASE}/lookbooks`);
    if (!res.ok) throw new Error('Failed to retrieve lookbooks');
    return await res.json();
  },

  // Advanced Payment Gateway & COD
  async getPaymentMethods() {
    const res = await fetch(`${API_BASE}/payments/methods`);
    if (!res.ok) throw new Error('Failed to load payment methods');
    return await res.json();
  },

  async validateCodEligibility(orderTotal, postalCode) {
    const res = await fetch(`${API_BASE}/payments/cod/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderTotal, postalCode })
    });
    if (!res.ok) throw new Error('COD eligibility check failed');
    return await res.json();
  },

  async recordCashCollection(orderId, notes) {
    const res = await fetch(`${API_BASE}/orders/${orderId}/collect-cash`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes })
    });
    if (!res.ok) throw new Error('Cash settlement failed');
    return await res.json();
  },

  // Checkout / Orders
  async createOrder(orderPayload) {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Order processing failed');
    }
    return await res.json();
  },

  // Bespoke Studio
  async submitBespokeInquiry(inquiryPayload) {
    const res = await fetch(`${API_BASE}/bespoke`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryPayload)
    });
    if (!res.ok) throw new Error('Failed to submit bespoke inquiry');
    return await res.json();
  },

  // Newsletter
  async subscribeNewsletter(email) {
    const res = await fetch(`${API_BASE}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) throw new Error('Subscription failed');
    return await res.json();
  },

  // Admin Portal API
  async getAdminAnalytics() {
    const res = await fetch(`${API_BASE}/admin/analytics`);
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return await res.json();
  },

  async getAdminOrders() {
    const res = await fetch(`${API_BASE}/orders`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return await res.json();
  },

  async updateOrderStatus(orderId, status) {
    const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update status');
    return await res.json();
  }
};
