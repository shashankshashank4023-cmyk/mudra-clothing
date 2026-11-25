import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { lookbooks } from '../data/products';
import { useShop } from '../context/ShopContext';

export default function LookbookSection() {
  const { setSelectedProduct, products } = useShop();

  const handleInspectLookPiece = (productId) => {
    const item = products.find(p => p.id === productId);
    if (item) {
      setSelectedProduct(item);
    }
  };

  return (
    <section className="lookbook-section" id="lookbook-section">
      <div className="lookbook-inner">
        {/* Section Header */}
        <div className="lookbook-header">
          <div className="lookbook-kicker">
            <span className="kicker-line"></span>
            <span>CURATED ENSEMBLES // AUTUMN ATELIER</span>
            <span className="kicker-line"></span>
          </div>
          <h2 className="lookbook-title">THE SARTORIAL LOOKBOOK</h2>
          <p className="lookbook-subtitle">
            Study how our creative directors pair raw silk bandhgalas, double-breasted suits, and relaxed French linens into sovereign looks.
          </p>
        </div>

        {/* Lookbooks Grid */}
        <div className="lookbooks-grid">
          {lookbooks.map((look) => (
            <div key={look.id} className="look-card">
              <div className="look-img-wrapper">
                <img src={look.image} alt={look.title} className="look-img" />
                <div className="look-overlay">
                  <div className="look-overlay-content">
                    <span className="look-tag">{look.subtitle}</span>
                    <h3 className="look-heading">{look.title}</h3>
                    <p className="look-desc">{look.description}</p>

                    {/* Pieces In This Look */}
                    <div className="look-pieces-box">
                      <span className="pieces-label">GARMENTS IN THIS ENSEMBLE:</span>
                      <div className="pieces-list">
                        {look.productIds.map(pId => {
                          const product = products.find(p => p.id === pId);
                          if (!product) return null;
                          return (
                            <button
                              key={pId}
                              className="piece-pill-btn"
                              onClick={() => handleInspectLookPiece(pId)}
                            >
                              <span>{product.name}</span>
                              <ArrowUpRight size={13} className="gold-accent" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .lookbook-section {
          background-color: var(--color-obsidian);
          color: var(--color-cream);
          padding: 6rem 2rem;
          border-top: 1px solid var(--color-dark-border);
          border-bottom: 1px solid var(--color-dark-border);
        }

        .lookbook-inner {
          max-width: 1400px;
          margin: 0 auto;
        }

        .lookbook-header {
          text-align: center;
          margin-bottom: 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .lookbook-kicker {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.8rem;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          color: var(--color-gold);
        }

        .lookbook-title {
          font-family: var(--font-serif);
          font-size: 3.2rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .lookbook-subtitle {
          font-size: 0.95rem;
          color: var(--color-muted);
          max-width: 600px;
          line-height: 1.7;
        }

        .lookbooks-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .look-card {
          position: relative;
          background: var(--color-dark-panel);
          border: 1px solid var(--color-dark-border);
          overflow: hidden;
          transition: var(--transition-smooth);
        }

        .look-card:hover {
          border-color: var(--color-gold);
          transform: translateY(-4px);
        }

        .look-img-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4.2;
          overflow: hidden;
        }

        .look-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          image-rendering: -webkit-optimize-contrast;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .look-card:hover .look-img {
          transform: scale(1.05);
        }

        .look-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(18, 20, 23, 0.1) 0%,
            rgba(18, 20, 23, 0.7) 40%,
            rgba(18, 20, 23, 0.98) 100%
          );
          display: flex;
          align-items: flex-end;
          padding: 2rem;
        }

        .look-overlay-content {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .look-tag {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: var(--color-gold);
          text-transform: uppercase;
        }

        .look-heading {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 600;
          line-height: 1.2;
          color: #FFF;
        }

        .look-desc {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 0.8rem;
        }

        .look-pieces-box {
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          padding-top: 0.8rem;
        }

        .pieces-label {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--color-gold);
          display: block;
          margin-bottom: 0.5rem;
        }

        .pieces-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .piece-pill-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFF;
          padding: 0.45rem 0.8rem;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .piece-pill-btn:hover {
          background: var(--color-gold);
          border-color: var(--color-gold);
          color: var(--color-obsidian);
        }

        .piece-pill-btn:hover .gold-accent {
          color: var(--color-obsidian);
        }

        @media (max-width: 992px) {
          .lookbooks-grid {
            grid-template-columns: 1fr;
          }
          .lookbook-title {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
}
