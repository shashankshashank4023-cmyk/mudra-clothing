import React, { useState, useEffect } from 'react';
import { 
  X, Shield, DollarSign, ShoppingBag, Users, Package, 
  CheckCircle2, Clock, Truck, ChevronRight, RefreshCw, Lock, ArrowUpRight, Banknote 
} from 'lucide-react';
import { api } from '../services/api';
import { useShop } from '../context/ShopContext';

export default function AdminModal({ isOpen, onClose }) {
  const { showToast } = useShop();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'analytics' | 'bespoke' | 'subscribers'
  const [analytics, setAnalytics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [bespokeInquiries, setBespokeInquiries] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const correctPin = '2026';

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminPin === correctPin || adminPin === 'admin' || adminPin === 'mudra') {
      setIsAuthenticated(true);
      fetchDashboardData();
      showToast('Atelier Admin Credentials Verified');
    } else {
      showToast('Invalid Access Code. (Default code: 2026)');
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [analyticsData, ordersData] = await Promise.all([
        api.getAdminAnalytics(),
        api.getAdminOrders()
      ]);
      setAnalytics(analyticsData);
      setOrders(ordersData);

      // Fetch bespoke & subscribers
      const [bespokeRes, subRes] = await Promise.all([
        fetch('/api/bespoke').then(r => r.json()).catch(() => []),
        fetch('/api/newsletter').then(r => r.json()).catch(() => [])
      ]);
      setBespokeInquiries(bespokeRes);
      setSubscribers(subRes);
    } catch (err) {
      console.error('Failed to load admin data:', err);
      showToast('Connected to local storage fallback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchDashboardData();
    }
  }, [isOpen, isAuthenticated]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      showToast(`Order ${orderId} status updated to: ${newStatus}`);
      fetchDashboardData();
    } catch {
      showToast('Status update failed');
    }
  };

  const handleSettleCash = async (orderId) => {
    try {
      await api.recordCashCollection(orderId, 'Cash verified and settled at Atelier Desk');
      showToast(`Order #${orderId} marked as PAID via Cash on Delivery!`);
      fetchDashboardData();
    } catch (err) {
      showToast(`Cash settlement failed: ${err.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="admin-modal-container" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="admin-header">
          <div className="admin-header-left">
            <div className="admin-crest">M</div>
            <div>
              <div className="admin-kicker">MUDRA HAUTE SARTORIAL ATELIER</div>
              <h2 className="admin-title">Client Commerce & Executive Suite</h2>
            </div>
          </div>
          <button className="admin-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* PIN LOGIN SCREEN */}
        {!isAuthenticated ? (
          <div className="admin-login-box">
            <div className="lock-icon-wrap">
              <Lock size={32} className="gold-accent" />
            </div>
            <h3 className="login-heading">Atelier Executive Portal</h3>
            <p className="login-desc">
              Enter your privileged boutique administrator key to inspect live customer orders, revenue analytics, and bespoke inquiries.
            </p>
            <form onSubmit={handleLogin} className="login-form">
              <input
                type="password"
                placeholder="Enter Access Key (Default: 2026)"
                value={adminPin}
                onChange={e => setAdminPin(e.target.value)}
                className="admin-pin-input"
                autoFocus
              />
              <button type="submit" className="btn-mudra-gold login-btn">
                AUTHENTICATE ACCESS
              </button>
            </form>
            <div className="demo-credentials-hint">
              <span>Demo Passkey: </span>
              <strong>2026</strong>
              <span> (or click Authenticate)</span>
            </div>
          </div>
        ) : (
          /* DASHBOARD VIEW */
          <div className="admin-dashboard-body">
            {/* Top KPI Cards */}
            <div className="admin-kpi-grid">
              <div className="kpi-card">
                <div className="kpi-icon-row">
                  <span className="kpi-label">GROSS REVENUE</span>
                  <DollarSign size={18} className="gold-accent" />
                </div>
                <div className="kpi-value">
                  ₹{(analytics?.totalRevenue || 0).toLocaleString('en-IN')}
                </div>
                <span className="kpi-sub">Across all atelier orders</span>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon-row">
                  <span className="kpi-label">TOTAL ORDERS</span>
                  <ShoppingBag size={18} className="gold-accent" />
                </div>
                <div className="kpi-value">{analytics?.totalOrders || orders.length}</div>
                <span className="kpi-sub">Active boutique checkouts</span>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon-row">
                  <span className="kpi-label">ACTIVE SILHOUETTES</span>
                  <Package size={18} className="gold-accent" />
                </div>
                <div className="kpi-value">{analytics?.totalProducts || 12}</div>
                <span className="kpi-sub">Curated luxury menswear</span>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon-row">
                  <span className="kpi-label">VIP CLIENTS</span>
                  <Users size={18} className="gold-accent" />
                </div>
                <div className="kpi-value">{analytics?.totalSubscribers || subscribers.length}</div>
                <span className="kpi-sub">Private registry club</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="admin-tabs-bar">
              <div className="tabs-left">
                <button
                  className={`admin-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  Live Orders ({orders.length})
                </button>
                <button
                  className={`admin-tab-btn ${activeTab === 'bespoke' ? 'active' : ''}`}
                  onClick={() => setActiveTab('bespoke')}
                >
                  Bespoke Inquiries ({bespokeInquiries.length})
                </button>
                <button
                  className={`admin-tab-btn ${activeTab === 'subscribers' ? 'active' : ''}`}
                  onClick={() => setActiveTab('subscribers')}
                >
                  VIP Registry ({subscribers.length})
                </button>
              </div>

              <button className="admin-refresh-btn" onClick={fetchDashboardData} title="Refresh data">
                <RefreshCw size={15} className={loading ? 'spin' : ''} />
                <span>Sync Live Data</span>
              </button>
            </div>

            {/* TAB CONTENT: ORDERS */}
            {activeTab === 'orders' && (
              <div className="orders-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Client Name & City</th>
                      <th>Items & Customization</th>
                      <th>Fitting Service</th>
                      <th>Total Amount</th>
                      <th>Status & Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="empty-cell">No customer orders placed yet.</td>
                      </tr>
                    ) : (
                      orders.map(order => (
                        <tr key={order.id} className="order-row">
                          <td className="order-id-cell">
                            <strong>{order.id}</strong>
                            <span className="pay-method-badge">{order.paymentMethod}</span>
                            {order.cashOnDeliveryDetails?.verificationToken && (
                              <span className="token-tag">Token: {order.cashOnDeliveryDetails.verificationToken}</span>
                            )}
                          </td>
                          <td className="date-cell">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="client-cell">
                            <div className="client-name">{order.customer?.fullName}</div>
                            <div className="client-contact">{order.customer?.phone}</div>
                            <div className="client-city">{order.customer?.city}, {order.customer?.state}</div>
                          </td>
                          <td className="items-cell">
                            {order.items?.map((it, idx) => (
                              <div key={idx} className="item-pill">
                                <span>{it.quantity}x {it.name} ({it.selectedSize})</span>
                                {it.bespokeOptions && (
                                  <span className="mono-tag">Initials: {it.bespokeOptions.monogramInitials}</span>
                                )}
                              </div>
                            ))}
                          </td>
                          <td className="fitting-cell">
                            <span className="fitting-badge">
                              {order.fittingPreference || 'Standard Luxury Courier'}
                            </span>
                          </td>
                          <td className="total-cell">
                            <strong>₹{(order.pricing?.total || 0).toLocaleString('en-IN')}</strong>
                            <span className="tax-subtext">Incl. 12% GST</span>
                            {order.paymentStatus?.includes('Cash') && (
                              <span className={`payment-status-pill ${order.cashOnDeliveryDetails?.collected ? 'paid' : 'pending'}`}>
                                {order.cashOnDeliveryDetails?.collected ? '✓ Cash Settled' : '⏳ COD Due at Delivery'}
                              </span>
                            )}
                          </td>
                          <td className="status-cell">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                              className={`status-select status-${order.status?.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Processing Atelier">Processing Atelier</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>

                            {order.paymentMethod?.includes('COD') && !order.cashOnDeliveryDetails?.collected && (
                              <button
                                className="btn-settle-cash"
                                onClick={() => handleSettleCash(order.id)}
                                title="Mark Cash Collected & Settled"
                              >
                                <Banknote size={13} />
                                <span>Settle Cash Received</span>
                              </button>
                            )}

                            {order.cashOnDeliveryDetails?.collected && (
                              <div className="settled-voucher-stamp">
                                <span>✓ Settled by Atelier</span>
                                <span className="settled-date">
                                  {new Date(order.cashOnDeliveryDetails.collectedAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB CONTENT: BESPOKE */}
            {activeTab === 'bespoke' && (
              <div className="orders-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Inquiry ID</th>
                      <th>Date</th>
                      <th>Garment</th>
                      <th>Monogram Initials</th>
                      <th>Thread Color</th>
                      <th>Cupro Lining</th>
                      <th>Collar Cut</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bespokeInquiries.map(inq => (
                      <tr key={inq.id}>
                        <td><strong>{inq.id}</strong></td>
                        <td>{new Date(inq.createdAt).toLocaleDateString('en-IN')}</td>
                        <td>{inq.garmentName}</td>
                        <td><span className="initials-badge">{inq.initials}</span></td>
                        <td>{inq.threadColor}</td>
                        <td>{inq.liningOption}</td>
                        <td>{inq.collarStyle}</td>
                        <td><span className="status-confirmed-badge">{inq.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB CONTENT: SUBSCRIBERS */}
            {activeTab === 'subscribers' && (
              <div className="orders-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>VIP Client Email</th>
                      <th>Joined Date</th>
                      <th>Tier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((s, idx) => (
                      <tr key={idx}>
                        <td><strong>{s.email}</strong></td>
                        <td>{new Date(s.subscribedAt).toLocaleDateString('en-IN')}</td>
                        <td><span className="gold-tier-badge">Private Client Club</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .admin-modal-container {
          background: #FFFFFF;
          width: 95%;
          max-width: 1200px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .admin-header {
          background-color: var(--color-obsidian);
          color: var(--color-cream);
          padding: 1.6rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid var(--color-gold);
        }

        .admin-header-left {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }

        .admin-crest {
          width: 44px;
          height: 44px;
          border: 1px solid var(--color-gold);
          color: var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif-title);
          font-size: 1.5rem;
          font-weight: 700;
        }

        .admin-kicker {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: var(--color-gold);
        }

        .admin-title {
          font-family: var(--font-serif-title);
          font-size: 1.4rem;
          font-weight: 600;
          margin: 0;
          color: #FFF;
        }

        .admin-close-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFF;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .admin-close-btn:hover {
          border-color: var(--color-gold);
          color: var(--color-gold);
        }

        /* LOGIN SCREEN */
        .admin-login-box {
          padding: 4rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 500px;
          margin: 0 auto;
        }

        .lock-icon-wrap {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: var(--color-sand);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(197, 160, 89, 0.4);
        }

        .login-heading {
          font-family: var(--font-serif-title);
          font-size: 1.6rem;
          margin-bottom: 0.6rem;
        }

        .login-desc {
          font-size: 0.85rem;
          color: var(--color-muted);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .login-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .admin-pin-input {
          padding: 1rem;
          text-align: center;
          font-size: 1.1rem;
          letter-spacing: 0.2em;
          border: 1px solid var(--color-stone);
          outline: none;
        }

        .admin-pin-input:focus {
          border-color: var(--color-gold);
        }

        .login-btn {
          width: 100%;
          padding: 1rem;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.15em;
        }

        .demo-credentials-hint {
          margin-top: 1.5rem;
          font-size: 0.8rem;
          color: var(--color-muted);
        }

        /* DASHBOARD BODY */
        .admin-dashboard-body {
          padding: 2rem;
          background-color: #F8F9FA;
        }

        .admin-kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.2rem;
          margin-bottom: 2rem;
        }

        .kpi-card {
          background: #FFF;
          padding: 1.4rem;
          border: 1px solid var(--color-stone);
          box-shadow: var(--shadow-sm);
        }

        .kpi-icon-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.6rem;
        }

        .kpi-label {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: var(--color-muted);
        }

        .kpi-value {
          font-family: var(--font-serif-title);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--color-obsidian);
          margin-bottom: 0.3rem;
        }

        .kpi-sub {
          font-size: 0.75rem;
          color: var(--color-muted);
        }

        .admin-tabs-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-stone);
          padding-bottom: 0.8rem;
        }

        .tabs-left {
          display: flex;
          gap: 0.5rem;
        }

        .admin-tab-btn {
          background: transparent;
          border: none;
          padding: 0.6rem 1.2rem;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--color-muted);
          cursor: pointer;
          transition: var(--transition-smooth);
          border-bottom: 2px solid transparent;
        }

        .admin-tab-btn.active {
          color: var(--color-obsidian);
          border-color: var(--color-gold);
        }

        .admin-refresh-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #FFF;
          border: 1px solid var(--color-stone);
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .admin-refresh-btn:hover {
          border-color: var(--color-gold);
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        /* TABLE */
        .orders-table-wrapper {
          background: #FFF;
          border: 1px solid var(--color-stone);
          overflow-x: auto;
          box-shadow: var(--shadow-sm);
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.82rem;
        }

        .admin-table th {
          background-color: #F1EFEA;
          padding: 1rem;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--color-obsidian);
          border-bottom: 1px solid var(--color-stone);
        }

        .admin-table td {
          padding: 1.1rem 1rem;
          border-bottom: 1px solid #ECEAE4;
          vertical-align: top;
        }

        .order-id-cell strong {
          display: block;
          font-size: 0.85rem;
          margin-bottom: 0.3rem;
        }

        .pay-method-badge {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 700;
          background: var(--color-sand);
          padding: 0.15rem 0.4rem;
          border: 1px solid rgba(197, 160, 89, 0.4);
        }

        .client-name {
          font-weight: 700;
        }

        .client-contact, .client-city {
          font-size: 0.75rem;
          color: var(--color-muted);
        }

        .item-pill {
          font-size: 0.78rem;
          margin-bottom: 0.3rem;
        }

        .mono-tag {
          display: block;
          font-size: 0.7rem;
          color: var(--color-terracotta);
          font-weight: 600;
        }

        .fitting-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          background: #F4F1EA;
          border: 1px solid var(--color-stone);
        }

        .tax-subtext {
          display: block;
          font-size: 0.65rem;
          color: var(--color-muted);
        }

        .status-select {
          padding: 0.4rem 0.6rem;
          font-size: 0.75rem;
          font-weight: 700;
          border: 1px solid var(--color-stone);
          background: #FFF;
          cursor: pointer;
        }

        .initials-badge {
          font-weight: 800;
          background: var(--color-sand);
          padding: 0.2rem 0.5rem;
          border: 1px solid var(--color-gold);
          color: var(--color-obsidian);
        }

        .status-confirmed-badge, .gold-tier-badge {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          background: var(--color-sand);
          color: var(--color-gold);
          border: 1px solid var(--color-gold);
        }

        .token-tag {
          display: block;
          font-size: 0.65rem;
          font-family: monospace;
          background: #FAF9F6;
          border: 1px dashed var(--color-gold);
          padding: 0.15rem 0.35rem;
          margin-top: 0.3rem;
          color: var(--color-gold);
          font-weight: 700;
        }

        .payment-status-pill {
          display: block;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.2rem 0.4rem;
          margin-top: 0.4rem;
          border-radius: 2px;
          text-align: center;
        }

        .payment-status-pill.pending {
          background: #FEF3C7;
          color: #92400E;
          border: 1px solid #FCD34D;
        }

        .payment-status-pill.paid {
          background: #DCFCE7;
          color: #166534;
          border: 1px solid #86EFAC;
        }

        .btn-settle-cash {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          margin-top: 0.5rem;
          width: 100%;
          background: var(--color-gold);
          color: var(--color-obsidian);
          border: none;
          padding: 0.45rem 0.6rem;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .btn-settle-cash:hover {
          background: #B38F36;
          color: #FFF;
        }

        .settled-voucher-stamp {
          display: flex;
          flex-direction: column;
          font-size: 0.65rem;
          color: #166534;
          font-weight: 700;
          margin-top: 0.4rem;
          padding: 0.2rem 0.4rem;
          background: #F0FDF4;
          border: 1px solid #BBF7D0;
        }

        .settled-voucher-stamp .settled-date {
          font-size: 0.6rem;
          color: var(--color-muted);
          font-weight: normal;
        }

        @media (max-width: 900px) {
          .admin-kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
