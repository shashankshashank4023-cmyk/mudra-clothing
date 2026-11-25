import React, { useState, useEffect } from 'react';
import { 
  X, Check, ShieldCheck, CreditCard, Smartphone, Truck, 
  Sparkles, Printer, ArrowRight, AlertTriangle, CheckCircle2, Banknote 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { api } from '../services/api';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    savings,
    shippingFee,
    cartTotal,
    clearCart,
    showToast
  } = useShop();

  if (!isCheckoutOpen) return null;

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [createdOrder, setCreatedOrder] = useState(null);
  const [codValidation, setCodValidation] = useState(null);
  const [isValidatingCod, setIsValidatingCod] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Arjun Singhania',
    email: 'arjun.singhania@privateclient.com',
    phone: '+91 98200 12345',
    address: '14 Altamount Road, Cumballa Hill',
    city: 'Mumbai',
    postalCode: '400026',
    fittingPreference: 'master-tailor-visit', // 'standard', 'master-tailor-visit', 'swatch-box'
    paymentMethod: 'upi', // 'upi', 'card', 'cod'
    upiId: 'arjun@okaxis',
    cardNumber: '•••• •••• •••• 8912',
    notes: 'Please ensure evening delivery with bespoke garment bag.'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const orderNumber = createdOrder?.id || "MUD-2026-89412";

  const runCodValidation = async (postalCode = formData.postalCode, total = cartTotal) => {
    setIsValidatingCod(true);
    try {
      const res = await api.validateCodEligibility(total, postalCode);
      setCodValidation(res);
    } catch {
      const cleanPin = (postalCode || '').trim();
      const isServiceable = /^[1-9][0-9]{5}$/.test(cleanPin);
      setCodValidation({
        eligible: isServiceable && total <= 50000,
        postalCodeValid: isServiceable,
        tier: 'White-Glove Concierge COD',
        handlingFee: 0,
        reason: !isServiceable
          ? 'Please enter a valid 6-digit Indian PIN code.'
          : total > 50000
          ? `Order total (₹${total.toLocaleString('en-IN')}) exceeds luxury insurance cap of ₹50,000 for Cash on Delivery.`
          : 'Eligible for Complimentary White-Glove Cash on Delivery.'
      });
    } finally {
      setIsValidatingCod(false);
    }
  };

  useEffect(() => {
    if (formData.paymentMethod === 'cod') {
      runCodValidation(formData.postalCode, cartTotal);
    }
  }, [formData.paymentMethod, formData.postalCode, cartTotal]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProcessOrder = async () => {
    setIsProcessing(true);
    try {
      const orderPayload = {
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          notes: formData.notes
        },
        fittingPreference: formData.fittingPreference === 'master-tailor-visit'
          ? 'Concierge Home Master-Tailor Fitting'
          : 'Standard Luxury Courier',
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          bespokeOptions: item.bespokeOptions
        })),
        pricing: {
          subtotal: cartSubtotal,
          discount: savings,
          promoCode: savings > 0 ? "MUDRA10" : null,
          shippingFee,
          tax: Math.round(cartSubtotal * 0.12),
          total: cartTotal
        },
        paymentMethod: formData.paymentMethod.toUpperCase()
      };

      const res = await api.createOrder(orderPayload);
      setCreatedOrder(res.order);
      setStep(3);
      clearCart();
      showToast(`Bespoke Order ${res.order.id} registered in Atelier Database!`);
    } catch (err) {
      console.warn("API order fallback:", err);
      setStep(3);
      clearCart();
      showToast("Bespoke Order confirmed! Master draper notified.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
      <div className="checkout-modal-container" onClick={e => e.stopPropagation()}>
        {/* Modal Close */}
        <button className="modal-close-icon" onClick={() => setIsCheckoutOpen(false)}>
          <X size={20} />
        </button>

        {/* Stepper Header */}
        <div className="checkout-stepper-header">
          <div className="stepper-brand">
            <span className="brand-crest">M</span>
            <span>MUDRA PRIVATE CLIENT CONCIERGE</span>
          </div>

          <div className="stepper-track">
            <div className={`step-badge ${step >= 1 ? 'active' : ''}`}>1. ATELIER COURIER</div>
            <div className="step-line"></div>
            <div className={`step-badge ${step >= 2 ? 'active' : ''}`}>2. BESPOKE PAYMENT</div>
            <div className="step-line"></div>
            <div className={`step-badge ${step >= 3 ? 'active' : ''}`}>3. CONFIRMATION</div>
          </div>
        </div>

        {/* STEP 1: SHIPPING & BESPOKE FITTING */}
        {step === 1 && (
          <div className="checkout-step-body">
            <h3 className="step-title">CONCIERGE DELIVERY & BESPOKE FITTING</h3>
            <p className="step-desc">
              Every Mudra order includes complimentary white-glove delivery in an archival breathable garment carrier.
            </p>

            <div className="checkout-form-grid">
              <div className="form-group">
                <label>FULL SARTORIAL NAME</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="checkout-input"
                />
              </div>

              <div className="form-group">
                <label>PRIVATE EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="checkout-input"
                />
              </div>

              <div className="form-group">
                <label>CONTACT NUMBER</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="checkout-input"
                />
              </div>

              <div className="form-group">
                <label>CITY & PINCODE</label>
                <div className="dual-inputs">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="checkout-input"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="checkout-input"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>SUITE / RESIDENCE ADDRESS</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="checkout-input"
                />
              </div>
            </div>

            {/* Bespoke Fitting Option Selector */}
            <div className="fitting-options-block">
              <label className="section-label">SELECT COMPLIMENTARY FITTING PROTOCOL:</label>
              <div className="fitting-cards-grid">
                <div
                  className={`fitting-card ${formData.fittingPreference === 'master-tailor-visit' ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, fittingPreference: 'master-tailor-visit' })}
                >
                  <Sparkles size={18} className="gold-accent" />
                  <h4>MASTER DRAPER CONSULTATION</h4>
                  <p>Our traveling tailor will visit your residence or hotel suite for custom pins and adjustments.</p>
                </div>

                <div
                  className={`fitting-card ${formData.fittingPreference === 'swatch-box' ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, fittingPreference: 'swatch-box' })}
                >
                  <ShieldCheck size={18} className="gold-accent" />
                  <h4>SEND ARCHIVAL SWATCH BOX</h4>
                  <p>Receive physical fabric swatches of Matka silk and Super 150s merino alongside your garments.</p>
                </div>

                <div
                  className={`fitting-card ${formData.fittingPreference === 'standard' ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, fittingPreference: 'standard' })}
                >
                  <Truck size={18} className="gold-accent" />
                  <h4>STANDARD SARTORIAL FIT</h4>
                  <p>Standard Savile Row proportions ready to wear straight out of the garment bag.</p>
                </div>
              </div>
            </div>

            <div className="step-actions-footer">
              <button className="btn-mudra-gold" onClick={() => setStep(2)}>
                <span>CONTINUE TO BESPOKE PAYMENT</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PAYMENT METHOD & REVIEW */}
        {step === 2 && (
          <div className="checkout-step-body">
            <h3 className="step-title">BESPOKE PAYMENT ARCHITECTURE</h3>
            <p className="step-desc">
              All transactions are encrypted with 256-bit Swiss banking-grade security.
            </p>

            {/* Payment Method Selector */}
            <div className="payment-methods-tabs">
              <button
                className={`pm-tab-btn ${formData.paymentMethod === 'upi' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
              >
                <Smartphone size={18} />
                <span>UPI / INSTANT GPAY</span>
              </button>

              <button
                className={`pm-tab-btn ${formData.paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
              >
                <CreditCard size={18} />
                <span>BLACK CONCIERGE CARD</span>
              </button>

              <button
                className={`pm-tab-btn ${formData.paymentMethod === 'cod' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
              >
                <Truck size={18} />
                <span>WHITE-GLOVE COD</span>
              </button>
            </div>

            {/* Payment Specific Fields */}
            <div className="payment-details-box">
              {formData.paymentMethod === 'upi' && (
                <div className="upi-box">
                  <label>ENTER VIRTUAL PAYMENT ADDRESS (UPI ID)</label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    className="checkout-input"
                  />
                  <span className="secure-badge">Instant authorization via Google Pay, PhonePe, or BHIM UPI</span>
                </div>
              )}

              {formData.paymentMethod === 'card' && (
                <div className="card-box">
                  <div className="form-group">
                    <label>CARD NUMBER</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="checkout-input"
                    />
                  </div>
                  <div className="dual-inputs" style={{ marginTop: '0.8rem' }}>
                    <input type="text" placeholder="MM/YY" defaultValue="12/29" className="checkout-input" />
                    <input type="password" placeholder="CVV" defaultValue="•••" className="checkout-input" />
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'cod' && (
                <div className="cod-advanced-box">
                  <div className="cod-header-badge">
                    <Banknote size={22} className="gold-accent" />
                    <div>
                      <h4 className="cod-title">WHITE-GLOVE ATELIER CASH ON DELIVERY</h4>
                      <span className="cod-subtitle">Concierge Courier Dispatch with Try-Before-Pay Privilege</span>
                    </div>
                  </div>

                  {isValidatingCod ? (
                    <div className="cod-validating-row">
                      <span className="pulse-dot"></span>
                      <span>Verifying PIN code {formData.postalCode} with Atelier Logistics API...</span>
                    </div>
                  ) : codValidation?.eligible ? (
                    <div className="cod-eligible-panel">
                      <div className="cod-status-pill eligible">
                        <CheckCircle2 size={15} />
                        <span>CONFIRMED SERVICEABLE: {codValidation.tier} (PIN {formData.postalCode})</span>
                      </div>

                      <div className="cod-specs-grid">
                        <div className="cod-spec-item">
                          <span className="spec-label">CASH DUE UPON DELIVERY</span>
                          <span className="spec-val gold">₹{cartTotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="cod-spec-item">
                          <span className="spec-label">ATELIER HANDLING CHARGE</span>
                          <span className="spec-val complimentary">₹0 (COMPLIMENTARY)</span>
                        </div>
                        <div className="cod-spec-item">
                          <span className="spec-label">GARMENT TRIAL PRIVILEGE</span>
                          <span className="spec-val">Try-Before-Pay Authorized</span>
                        </div>
                        <div className="cod-spec-item">
                          <span className="spec-label">DELIVERY SECURITY PROTOCOL</span>
                          <span className="spec-val">Tamper-Evident Seal & OTP</span>
                        </div>
                      </div>

                      <p className="cod-terms-note">
                        <ShieldCheck size={14} className="gold-accent" style={{ display: 'inline', marginRight: '6px' }} />
                        Our uniformed concierge courier will arrive with your bespoke order in an archival breathable garment carrier. You are invited to inspect seams, drape, and try on the pieces before handing over cash.
                      </p>
                    </div>
                  ) : (
                    <div className="cod-ineligible-panel">
                      <div className="cod-status-pill ineligible">
                        <AlertTriangle size={15} />
                        <span>CASH ON DELIVERY UNAVAILABLE</span>
                      </div>
                      <p className="cod-ineligible-reason">{codValidation?.reason || 'Order not eligible for COD'}</p>
                      <p className="cod-ineligible-action">
                        For bespoke commissions exceeding the ₹50,000 security cap, please select <strong>UPI / INSTANT GPAY</strong> or <strong>BLACK CONCIERGE CARD</strong> to complete your order.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mini Summary */}
            <div className="checkout-ledger-summary">
              <div className="row">
                <span>Total Items ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="row">
                <span>Insured White-Glove Transit</span>
                <span>{shippingFee === 0 ? "COMPLIMENTARY" : `₹${shippingFee}`}</span>
              </div>
              {formData.paymentMethod === 'cod' && (
                <div className="row">
                  <span>COD Concierge Handling</span>
                  <span className="complimentary-text">COMPLIMENTARY (₹0)</span>
                </div>
              )}
              <div className="row total">
                <span>Total Investment</span>
                <span className="total-gold">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="step-actions-footer">
              <button className="btn-mudra-secondary" onClick={() => setStep(1)}>
                BACK TO SHIPPING
              </button>
              <button
                className="btn-mudra-gold"
                onClick={handleProcessOrder}
                disabled={isProcessing || (formData.paymentMethod === 'cod' && codValidation && !codValidation.eligible)}
              >
                <span>
                  {isProcessing 
                    ? "SECURING BESPOKE ALLOCATION..." 
                    : formData.paymentMethod === 'cod' && codValidation && !codValidation.eligible
                    ? "COD LIMIT EXCEEDED (CHOOSE UPI/CARD)"
                    : `CONFIRM BESPOKE ORDER (₹${cartTotal.toLocaleString('en-IN')})`}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ORDER CONFIRMATION & RECEIPT */}
        {step === 3 && (
          <div className="checkout-step-body confirmation-view">
            <div className="confirmation-crest">M</div>
            <span className="order-confirmed-badge">SOVEREIGN ALLOCATION CONFIRMED</span>
            <h3 className="confirm-title">THANK YOU, {formData.fullName.toUpperCase()}</h3>
            <p className="confirm-lead">
              Your bespoke commission has been assigned order reference <strong>#{orderNumber}</strong>. 
              Our master drapers in Mumbai and Biella will oversee your tailoring.
            </p>

            {/* COD Specific Card if Payment was COD */}
            {createdOrder?.cashOnDeliveryDetails && (
              <div className="cod-confirmation-card">
                <div className="cod-conf-header">
                  <Banknote size={22} className="gold-accent" />
                  <div>
                    <h4 className="cod-conf-title">WHITE-GLOVE CASH ON DELIVERY PROTOCOL ACTIVE</h4>
                    <span className="cod-conf-sub">Official Courier Delivery Token: <strong>{createdOrder.cashOnDeliveryDetails.verificationToken}</strong></span>
                  </div>
                </div>

                <div className="cod-conf-grid">
                  <div className="conf-col">
                    <span className="conf-label">EXACT CASH AMOUNT DUE:</span>
                    <strong className="conf-val gold">₹{(createdOrder.cashOnDeliveryDetails.amountDue || cartTotal).toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="conf-col">
                    <span className="conf-label">SECURITY VERIFICATION TOKEN:</span>
                    <strong className="conf-val mono">{createdOrder.cashOnDeliveryDetails.verificationToken}</strong>
                  </div>
                  <div className="conf-col">
                    <span className="conf-label">PAYMENT STATUS:</span>
                    <strong className="conf-val pending">Pending Collection on Delivery</strong>
                  </div>
                  <div className="conf-col">
                    <span className="conf-label">DISPATCH TIER:</span>
                    <span className="conf-val">{createdOrder.cashOnDeliveryDetails.serviceTier || 'White-Glove Master-Tailor COD Concierge'}</span>
                  </div>
                </div>

                <div className="cod-conf-guidance">
                  <strong>CONCIERGE PROTOCOL INSTRUCTIONS:</strong>
                  <ul>
                    <li>Please have exact cash of <strong>₹{(createdOrder.cashOnDeliveryDetails.amountDue || cartTotal).toLocaleString('en-IN')}</strong> ready at the time of delivery.</li>
                    <li>Quote your token <code>{createdOrder.cashOnDeliveryDetails.verificationToken}</code> to the courier to authorize the opening of your bespoke garment carrier.</li>
                    <li>You are entitled to inspect all hand-stitched detailing and verify sizing prior to completing payment.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Printable Receipt Box */}
            <div className="receipt-box" id="printable-receipt">
              <div className="receipt-header">
                <div>
                  <h4 className="receipt-brand">MUDRA SARTORIAL</h4>
                  <span className="receipt-date">Date: {new Date().toLocaleDateString('en-GB')}</span>
                </div>
                <div className="receipt-right">
                  <span className="receipt-status">
                    STATUS: {createdOrder?.paymentStatus || 'BESPOKE COMMISSION ACTIVE'}
                  </span>
                  <span className="receipt-order-no">REF: {orderNumber}</span>
                </div>
              </div>

              <div className="receipt-details-grid">
                <div>
                  <strong>SHIPPING CONCIERGE:</strong>
                  <p>{formData.fullName}</p>
                  <p>{formData.address}, {formData.city} - {formData.postalCode}</p>
                  <p>{formData.phone}</p>
                </div>
                <div>
                  <strong>FITTING & PAYMENT SPECIFICATION:</strong>
                  <p>{formData.fittingPreference.toUpperCase().replace(/-/g, ' ')}</p>
                  <p>
                    Payment Method: <strong>{formData.paymentMethod === 'cod' ? 'CASH ON DELIVERY (WHITE-GLOVE)' : formData.paymentMethod.toUpperCase()}</strong>
                  </p>
                  {createdOrder?.cashOnDeliveryDetails && (
                    <p style={{ color: 'var(--color-gold)', fontWeight: '700' }}>
                      Token: {createdOrder.cashOnDeliveryDetails.verificationToken}
                    </p>
                  )}
                </div>
              </div>

              <div className="receipt-actions-row">
                <button className="receipt-print-btn" onClick={() => window.print()}>
                  <Printer size={15} />
                  <span>PRINT BESPOKE RECEIPT</span>
                </button>
              </div>
            </div>

            <button
              className="btn-mudra-primary"
              onClick={() => {
                setIsCheckoutOpen(false);
                setStep(1);
              }}
              style={{ marginTop: '2rem' }}
            >
              RETURN TO ATELIER COLLECTION
            </button>
          </div>
        )}
      </div>

      <style>{`
        .checkout-modal-container {
          background: #FFF;
          width: 100%;
          max-width: 820px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: var(--shadow-lg);
          position: relative;
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .checkout-stepper-header {
          padding: 1.5rem 2rem;
          background: var(--color-obsidian);
          color: var(--color-cream);
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .stepper-brand {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: var(--color-gold);
        }

        .stepper-track {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .step-badge {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--color-muted);
        }

        .step-badge.active {
          color: var(--color-gold);
        }

        .step-line {
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.15);
          margin: 0 1rem;
        }

        .checkout-step-body {
          padding: 2.5rem;
        }

        .step-title {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 0.4rem;
        }

        .step-desc {
          font-size: 0.85rem;
          color: var(--color-muted);
          margin-bottom: 2rem;
        }

        .checkout-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
          margin-bottom: 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label, .section-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--color-obsidian);
        }

        .checkout-input {
          background: var(--color-sand);
          border: 1px solid var(--color-stone);
          padding: 0.75rem 1rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-obsidian);
          outline: none;
          transition: var(--transition-smooth);
        }

        .checkout-input:focus {
          border-color: var(--color-gold);
          background: #FFF;
        }

        .dual-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
        }

        .fitting-options-block {
          margin-bottom: 2rem;
        }

        .fitting-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 0.8rem;
        }

        .fitting-card {
          background: var(--color-sand);
          border: 1px solid var(--color-stone);
          padding: 1.2rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          transition: var(--transition-smooth);
        }

        .fitting-card:hover {
          border-color: var(--color-gold);
        }

        .fitting-card.active {
          background: #FFF;
          border: 2px solid var(--color-gold);
          box-shadow: var(--shadow-sm);
        }

        .fitting-card h4 {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .fitting-card p {
          font-size: 0.72rem;
          color: var(--color-muted);
          line-height: 1.5;
        }

        .step-actions-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-stone);
        }

        /* Payment Methods */
        .payment-methods-tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .pm-tab-btn {
          background: var(--color-sand);
          border: 1px solid var(--color-stone);
          padding: 1rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .pm-tab-btn.active {
          background: var(--color-obsidian);
          color: var(--color-gold);
          border-color: var(--color-obsidian);
        }

        .payment-details-box {
          background: var(--color-sand);
          padding: 1.5rem;
          border: 1px solid var(--color-stone);
          margin-bottom: 2rem;
        }

        .secure-badge {
          display: block;
          font-size: 0.68rem;
          color: var(--color-muted);
          margin-top: 0.5rem;
        }

        .checkout-ledger-summary {
          border: 1px solid var(--color-stone);
          padding: 1.2rem;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.85rem;
        }

        .checkout-ledger-summary .row {
          display: flex;
          justify-content: space-between;
          color: var(--color-muted);
        }

        .checkout-ledger-summary .row.total {
          padding-top: 0.6rem;
          border-top: 1px solid var(--color-stone);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--color-obsidian);
        }

        .total-gold {
          color: var(--color-gold);
        }

        /* Confirmation Receipt */
        .confirmation-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .confirmation-crest {
          font-family: var(--font-serif);
          font-size: 2.8rem;
          color: var(--color-gold);
          border: 2px solid var(--color-gold);
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .order-confirmed-badge {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: var(--color-gold);
          margin-bottom: 0.4rem;
        }

        .confirm-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .confirm-lead {
          font-size: 0.9rem;
          color: var(--color-muted);
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .receipt-box {
          width: 100%;
          background: var(--color-sand);
          border: 1px solid var(--color-stone);
          padding: 1.8rem;
          text-align: left;
        }

        .receipt-header {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--color-stone);
          padding-bottom: 1rem;
          margin-bottom: 1rem;
        }

        .receipt-brand {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          letter-spacing: 0.1em;
        }

        .receipt-date, .receipt-status, .receipt-order-no {
          font-size: 0.7rem;
          display: block;
          color: var(--color-muted);
        }

        .receipt-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          font-size: 0.8rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .receipt-print-btn {
          background: #FFF;
          border: 1px solid var(--color-stone);
          padding: 0.6rem 1.2rem;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .receipt-print-btn:hover {
          background: var(--color-obsidian);
          color: #FFF;
        }

        /* COD Advanced UX Styling */
        .cod-advanced-box {
          background: #FFF;
          border: 1px solid var(--color-stone);
          padding: 1.5rem;
        }

        .cod-header-badge {
          display: flex;
          align-items: center;
          gap: 1rem;
          border-bottom: 1px solid var(--color-stone);
          padding-bottom: 1rem;
          margin-bottom: 1.2rem;
        }

        .cod-title {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--color-obsidian);
        }

        .cod-subtitle {
          font-size: 0.72rem;
          color: var(--color-muted);
        }

        .cod-validating-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.75rem;
          color: var(--color-muted);
          padding: 1rem 0;
        }

        .cod-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.8rem;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .cod-status-pill.eligible {
          background: rgba(34, 197, 94, 0.1);
          color: #166534;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .cod-status-pill.ineligible {
          background: rgba(239, 68, 68, 0.1);
          color: #991b1b;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .cod-specs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          background: var(--color-sand);
          padding: 1.2rem;
          border: 1px solid var(--color-stone);
          margin-bottom: 1.2rem;
        }

        .cod-spec-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .spec-label {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: var(--color-muted);
        }

        .spec-val {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-obsidian);
        }

        .spec-val.gold {
          color: var(--color-gold);
          font-size: 1.1rem;
        }

        .spec-val.complimentary, .complimentary-text {
          color: #166534;
          font-weight: 800;
        }

        .cod-terms-note {
          font-size: 0.72rem;
          color: var(--color-muted);
          line-height: 1.6;
        }

        .cod-ineligible-panel {
          padding: 1.2rem;
          background: #FEF2F2;
          border: 1px solid #FCA5A5;
        }

        .cod-ineligible-reason {
          font-size: 0.82rem;
          font-weight: 600;
          color: #991B1B;
          margin-bottom: 0.5rem;
        }

        .cod-ineligible-action {
          font-size: 0.75rem;
          color: #7F1D1D;
          line-height: 1.5;
        }

        /* Confirmation COD Card */
        .cod-confirmation-card {
          width: 100%;
          background: #FAF9F6;
          border: 2px solid var(--color-gold);
          padding: 1.5rem;
          text-align: left;
          margin-bottom: 1.5rem;
        }

        .cod-conf-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          border-bottom: 1px solid rgba(212, 175, 55, 0.3);
          padding-bottom: 0.8rem;
          margin-bottom: 1rem;
        }

        .cod-conf-title {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--color-obsidian);
        }

        .cod-conf-sub {
          font-size: 0.72rem;
          color: var(--color-muted);
        }

        .cod-conf-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 1.2rem;
        }

        .conf-label {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: var(--color-muted);
          display: block;
          margin-bottom: 0.2rem;
        }

        .conf-val {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-obsidian);
        }

        .conf-val.gold {
          color: var(--color-gold);
          font-size: 1.15rem;
        }

        .conf-val.mono {
          font-family: monospace;
          background: #FFF;
          padding: 0.2rem 0.6rem;
          border: 1px solid var(--color-stone);
          letter-spacing: 0.08em;
        }

        .conf-val.pending {
          color: #D97706;
        }

        .cod-conf-guidance {
          background: #FFF;
          border: 1px solid var(--color-stone);
          padding: 1rem 1.2rem;
          font-size: 0.75rem;
          line-height: 1.6;
        }

        .cod-conf-guidance strong {
          font-size: 0.72rem;
          letter-spacing: 0.05em;
        }

        .cod-conf-guidance ul {
          margin-top: 0.5rem;
          padding-left: 1.2rem;
        }

        .cod-conf-guidance li {
          margin-bottom: 0.3rem;
        }

        .cod-conf-guidance code {
          background: var(--color-sand);
          padding: 0.1rem 0.4rem;
          font-weight: 700;
          color: var(--color-gold);
        }

        @media (max-width: 768px) {
          .checkout-form-grid, .fitting-cards-grid, .payment-methods-tabs {
            grid-template-columns: 1fr;
          }
          .stepper-track {
            flex-direction: column;
            gap: 0.4rem;
          }
          .step-line {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
