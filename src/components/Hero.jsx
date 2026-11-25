import React from 'react';
import { ArrowDown, Shield, Sparkles, Award, ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Hero() {
  const { setActiveCollection } = useShop();

  const handleScrollToCatalog = (collectionType) => {
    setActiveCollection(collectionType);
    const catalogEl = document.getElementById("catalog-section");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      {/* Background with luxury editorial imagery & soft gradient overlay */}
      <div className="hero-visual-bg">
        <img 
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=85" 
          alt="Mudra Haute Menswear" 
          className="hero-img"
        />
        <div className="hero-overlay-dark"></div>
        <div className="hero-texture-overlay"></div>
      </div>

      <div className="hero-inner-container">
        {/* Editorial Subtitle Badge */}
        <div className="hero-kicker">
          <span className="kicker-line"></span>
          <span className="kicker-text">HAUTE SARTORIAL // AUTUMN / WINTER EDITION</span>
          <span className="kicker-line"></span>
        </div>

        {/* Main Serif Headline */}
        <h1 className="hero-title">
          THE ARTISANAL POETRY <br />
          <span className="hero-title-italic">OF MODERN BESPOKE</span>
        </h1>

        <p className="hero-lead">
          Mudra unites centuries of royal Indian handloom weaving with razor-sharp Italian tailoring. 
          Discover our curated collection of architectural Bandhgalas, Super 150s Merino Wool suits, 
          and effortless washed French linen casuals.
        </p>

        {/* Dual Primary Call-to-Actions for Formal and Casual */}
        <div className="hero-actions-row">
          <button 
            className="hero-btn-formal"
            onClick={() => handleScrollToCatalog('formal')}
          >
            <span>FORMAL SARTORIAL</span>
            <span className="btn-subtext">Suits, Bandhgalas & Tuxedos</span>
            <ArrowUpRight size={18} className="btn-icon" />
          </button>

          <button 
            className="hero-btn-casual"
            onClick={() => handleScrollToCatalog('casual')}
          >
            <span>CASUAL ELEGANCE</span>
            <span className="btn-subtext">Normandy Linen & Relaxed Knits</span>
            <ArrowUpRight size={18} className="btn-icon" />
          </button>
        </div>

        {/* Luxury Pillars Badges */}
        <div className="hero-pillars-grid">
          <div className="pillar-item">
            <span className="pillar-icon"><Award size={18} /></span>
            <div className="pillar-info">
              <span className="pillar-val">100% PURE MATKA SILK</span>
              <span className="pillar-desc">Hand-loomed in historic Bhagalpur</span>
            </div>
          </div>

          <div className="pillar-item">
            <span className="pillar-icon"><Sparkles size={18} /></span>
            <div className="pillar-info">
              <span className="pillar-val">SUPER 150s MERINO</span>
              <span className="pillar-desc">Milled in Biella, Northern Italy</span>
            </div>
          </div>

          <div className="pillar-item">
            <span className="pillar-icon"><Shield size={18} /></span>
            <div className="pillar-info">
              <span className="pillar-val">BESPOKE ARCHITECTURE</span>
              <span className="pillar-desc">Floating canvas hand-stitched drape</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator prompt */}
        <div className="hero-scroll-prompt" onClick={() => handleScrollToCatalog('all')}>
          <span>EXPLORE COMPLETE COLLECTION</span>
          <ArrowDown size={14} className="bounce-arrow" />
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 94vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 2rem 4rem 2rem;
          color: var(--color-cream);
          overflow: hidden;
        }

        .hero-visual-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 25%;
          transform: scale(1.02);
          filter: brightness(0.85) contrast(1.05);
          image-rendering: -webkit-optimize-contrast;
        }

        .hero-overlay-dark {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(18, 20, 23, 0.45) 0%,
            rgba(18, 20, 23, 0.35) 45%,
            rgba(18, 20, 23, 0.88) 100%
          );
        }

        .hero-texture-overlay {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(197, 160, 89, 0.08) 1px, transparent 0);
          background-size: 24px 24px;
          pointer-events: none;
        }

        .hero-inner-container {
          position: relative;
          z-index: 10;
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-kicker {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .kicker-line {
          width: 40px;
          height: 1px;
          background-color: var(--color-gold);
        }

        .kicker-text {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.3em;
          color: var(--color-gold);
          text-transform: uppercase;
        }

        .hero-title {
          font-family: var(--font-serif);
          font-size: 4.4rem;
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: 0.02em;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
        }

        .hero-title-italic {
          font-style: italic;
          font-weight: 400;
          color: var(--color-gold-light);
        }

        .hero-lead {
          font-size: 1.05rem;
          line-height: 1.8;
          max-width: 720px;
          color: rgba(249, 247, 242, 0.85);
          margin-bottom: 3rem;
          font-weight: 400;
        }

        .hero-actions-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 4rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero-btn-formal {
          background-color: var(--color-gold);
          color: var(--color-obsidian);
          border: 1px solid var(--color-gold);
          padding: 1.1rem 2.2rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          min-width: 260px;
          transition: var(--transition-smooth);
        }

        .hero-btn-formal:hover {
          background-color: #FFF;
          border-color: #FFF;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          transform: translateY(-3px);
        }

        .hero-btn-formal span:first-child {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.15em;
        }

        .hero-btn-formal .btn-subtext {
          font-size: 0.7rem;
          font-weight: 600;
          opacity: 0.8;
          margin-top: 2px;
        }

        .hero-btn-casual {
          background-color: rgba(255, 255, 255, 0.08);
          color: #FFF;
          border: 1px solid rgba(255, 255, 255, 0.35);
          backdrop-filter: blur(8px);
          padding: 1.1rem 2.2rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          min-width: 260px;
          transition: var(--transition-smooth);
        }

        .hero-btn-casual:hover {
          background-color: #FFF;
          color: var(--color-obsidian);
          border-color: #FFF;
          transform: translateY(-3px);
        }

        .hero-btn-casual span:first-child {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.15em;
        }

        .hero-btn-casual .btn-subtext {
          font-size: 0.7rem;
          font-weight: 500;
          opacity: 0.8;
          margin-top: 2px;
        }

        .btn-icon {
          position: absolute;
          top: 1.2rem;
          right: 1.4rem;
        }

        .hero-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          width: 100%;
          max-width: 960px;
          padding: 2rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          margin-bottom: 2rem;
        }

        .pillar-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          text-align: left;
        }

        .pillar-icon {
          color: var(--color-gold);
          flex-shrink: 0;
          background: rgba(197, 160, 89, 0.15);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(197, 160, 89, 0.3);
        }

        .pillar-val {
          display: block;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #FFF;
        }

        .pillar-desc {
          display: block;
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .hero-scroll-prompt {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--color-gold);
          cursor: pointer;
          margin-top: 1rem;
          transition: var(--transition-smooth);
        }

        .hero-scroll-prompt:hover {
          color: #FFF;
        }

        .bounce-arrow {
          animation: bounce 1.8s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        @media (max-width: 992px) {
          .hero-title {
            font-size: 2.8rem;
          }
          .hero-pillars-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }
          .hero-btn-formal, .hero-btn-casual {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
