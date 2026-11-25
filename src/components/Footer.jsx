import React, { useState } from 'react';
import { ArrowUp, MapPin, Mail, Phone, ShieldCheck, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { api } from '../services/api';

export default function Footer() {
  const { showToast, setIsAdminOpen } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email.trim()) {
      try {
        await api.subscribeNewsletter(email);
        setIsSubscribed(true);
        showToast("Welcome to the exclusive Mudra Private Client Registry.");
        setEmail('');
      } catch {
        showToast("Registered in Mudra Atelier registry.");
        setIsSubscribed(true);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mudra-footer">
      {/* Newsletter Atelier Club */}
      <div className="footer-newsletter-banner">
        <div className="newsletter-inner">
          <div className="newsletter-text-col">
            <span className="newsletter-kicker">MUDRA PRIVATE CLIENT REGISTRY</span>
            <h3 className="newsletter-heading">JOIN OUR SARTORIAL ATELIER</h3>
            <p className="newsletter-sub">
              Receive confidential invites to private trunk shows, limited fabric releases, and bespoke styling sessions.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="newsletter-form-col">
            <div className="newsletter-input-box">
              <Mail size={16} className="mail-icon" />
              <input
                type="email"
                placeholder="Enter your private email address..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                {isSubscribed ? <Check size={16} /> : "SUBSCRIBE"}
              </button>
            </div>
            <span className="newsletter-privacy">We respect your discretion. Zero spam, purely artisanal updates.</span>
          </form>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="footer-directory-inner">
        <div className="footer-top-row">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <div className="footer-brand-title">
              <span className="f-crest">M</span>
              <h2 className="f-title">MUDRA</h2>
              <span className="f-sub">HAUTE SARTORIAL MENSWEAR</span>
            </div>
            <p className="f-about">
              Dedicated to the preservation of Indian royal weaving heritage and contemporary European bespoke tailoring. Handcrafted for men of sovereign distinction.
            </p>
            <div className="f-contacts">
              <div className="contact-line">
                <MapPin size={15} className="gold-accent" />
                <span>Flagship Atelier: Apollo Bunder, Colaba, Mumbai 400001</span>
              </div>
              <div className="contact-line">
                <Phone size={15} className="gold-accent" />
                <span>Bespoke Concierge: +91 (022) 8400-MUDRA</span>
              </div>
            </div>
          </div>

          {/* Formal Collection Links */}
          <div className="footer-col">
            <h4 className="col-heading">FORMAL WEAR</h4>
            <ul className="footer-links">
              <li><a href="#catalog-section">Royal Silk Bandhgalas</a></li>
              <li><a href="#catalog-section">Biella Super 150s Merino Suits</a></li>
              <li><a href="#catalog-section">Velvet Shawl Collar Tuxedos</a></li>
              <li><a href="#catalog-section">Giza Egyptian Tuxedo Shirts</a></li>
              <li><a href="#catalog-section">Savile Row Cut Trousers</a></li>
              <li><a href="#catalog-section">Wedding Sherwanis & Achkans</a></li>
            </ul>
          </div>

          {/* Casual Collection Links */}
          <div className="footer-col">
            <h4 className="col-heading">CASUAL WEAR</h4>
            <ul className="footer-links">
              <li><a href="#catalog-section">Normandy Washed Linen Shirts</a></li>
              <li><a href="#catalog-section">Handspun Amber Khadi Kurtas</a></li>
              <li><a href="#catalog-section">Mulberry Silk Camp Collar Polos</a></li>
              <li><a href="#catalog-section">Japanese Selvedge Denim Jackets</a></li>
              <li><a href="#catalog-section">Tailored Tencel Drawstring Chinos</a></li>
              <li><a href="#catalog-section">Supima Cotton Heavy Overshirts</a></li>
            </ul>
          </div>

          {/* Global Flagships */}
          <div className="footer-col">
            <h4 className="col-heading">GLOBAL ATELIERS</h4>
            <ul className="flagship-list">
              <li><strong>MUMBAI</strong> - The Taj Heritage Wing, Colaba</li>
              <li><strong>NEW DELHI</strong> - The Manor, Mehrauli</li>
              <li><strong>LONDON</strong> - 14 Savile Row, Mayfair</li>
              <li><strong>NEW YORK</strong> - 720 Madison Avenue, Manhattan</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© 2026 MUDRA SARTORIAL CLOTHING PRIVATE LIMITED. ALL RIGHTS RESERVED.</p>
          <div className="legal-links">
            <span>Client Privacy Protocol</span>
            <span>Bespoke Terms of Service</span>
            <span>Worldwide Transit & Insurance</span>
            <span 
              onClick={() => setIsAdminOpen(true)} 
              style={{ cursor: 'pointer', color: 'var(--color-gold)', fontWeight: '700' }}
            >
              🔒 ATELIER ADMIN SUITE
            </span>
          </div>
          <button className="back-top-btn" onClick={scrollToTop}>
            <span>BACK TO TOP</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>

      <style>{`
        .mudra-footer {
          background-color: var(--color-obsidian);
          color: var(--color-cream);
          border-top: 1px solid var(--color-dark-border);
        }

        .footer-newsletter-banner {
          background-color: var(--color-dark-panel);
          border-bottom: 1px solid var(--color-dark-border);
          padding: 3.5rem 2rem;
        }

        .newsletter-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .newsletter-text-col {
          max-width: 520px;
        }

        .newsletter-kicker {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: var(--color-gold);
          display: block;
          margin-bottom: 0.3rem;
        }

        .newsletter-heading {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 0.4rem;
        }

        .newsletter-sub {
          font-size: 0.82rem;
          color: var(--color-muted);
          line-height: 1.6;
        }

        .newsletter-form-col {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 380px;
        }

        .newsletter-input-box {
          display: flex;
          align-items: center;
          background: #FFF;
          border: 1px solid var(--color-stone);
          padding: 0.2rem 0.4rem 0.2rem 1rem;
        }

        .mail-icon {
          color: var(--color-gold);
          margin-right: 0.6rem;
        }

        .newsletter-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 0.8rem;
          color: var(--color-obsidian);
        }

        .newsletter-btn {
          background: var(--color-obsidian);
          color: var(--color-gold);
          border: none;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          padding: 0.75rem 1.4rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .newsletter-btn:hover {
          background: var(--color-gold);
          color: var(--color-obsidian);
        }

        .newsletter-privacy {
          font-size: 0.68rem;
          color: var(--color-muted);
        }

        /* Directory Grid */
        .footer-directory-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 5rem 2rem 2rem 2rem;
        }

        .footer-top-row {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .brand-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-brand-title {
          display: flex;
          flex-direction: column;
        }

        .f-crest {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: var(--color-gold);
        }

        .f-title {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          letter-spacing: 0.2em;
          line-height: 1;
        }

        .f-sub {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          color: var(--color-gold);
        }

        .f-about {
          font-size: 0.82rem;
          color: var(--color-muted);
          line-height: 1.7;
          max-width: 360px;
        }

        .f-contacts {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .contact-line {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .col-heading {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: var(--color-gold);
          margin-bottom: 1.5rem;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .footer-links a {
          color: var(--color-muted);
          text-decoration: none;
          font-size: 0.82rem;
          transition: var(--transition-smooth);
        }

        .footer-links a:hover {
          color: var(--color-gold);
          padding-left: 4px;
        }

        .flagship-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          font-size: 0.82rem;
          color: var(--color-muted);
        }

        .flagship-list strong {
          color: #FFF;
          font-weight: 700;
        }

        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          border-top: 1px solid var(--color-dark-border);
          font-size: 0.72rem;
          color: var(--color-muted);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .legal-links {
          display: flex;
          gap: 1.5rem;
        }

        .back-top-btn {
          background: transparent;
          border: 1px solid var(--color-dark-border);
          color: var(--color-cream);
          padding: 0.4rem 0.9rem;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .back-top-btn:hover {
          border-color: var(--color-gold);
          color: var(--color-gold);
        }

        @media (max-width: 992px) {
          .footer-top-row {
            grid-template-columns: 1fr 1fr;
          }
          .newsletter-form-col {
            min-width: 100%;
          }
        }

        @media (max-width: 600px) {
          .footer-top-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
