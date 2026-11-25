import React, { useState } from 'react';
import { X, Sparkles, Check, Scissors, Feather } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function BespokeCustomizer() {
  const { isCustomizerOpen, setIsCustomizerOpen, products, addToCart, showToast } = useShop();

  if (!isCustomizerOpen) return null;

  const customizableGarments = products.filter(p => p.collection === 'formal');
  const [selectedGarment, setSelectedGarment] = useState(customizableGarments[0]);
  const [monogramInitials, setMonogramInitials] = useState('A.S.');
  const [threadColor, setThreadColor] = useState('Burnished Gold');
  const [liningOption, setLiningOption] = useState('Imperial Royal Emerald');
  const [collarStyle, setCollarStyle] = useState('Imperial Mandarin Stand');

  const threadColors = [
    { name: 'Burnished Gold', hex: '#C5A059' },
    { name: 'Sterling Silver', hex: '#E5E7EB' },
    { name: 'Obsidian Black', hex: '#18181B' },
    { name: 'Champagne Ivory', hex: '#FEF3C7' }
  ];

  const linings = [
    { name: 'Imperial Royal Emerald', desc: 'Japanese Cupro Bemberg silk lining with breathability' },
    { name: 'Midnight Sovereign Paisley', desc: 'Jacquard woven tone-on-tone paisley pattern' },
    { name: 'Pure Charcoal Bemberg', desc: 'Minimalist stealth lining favored by Savile Row' }
  ];

  const collarStyles = [
    { name: 'Imperial Mandarin Stand', desc: 'Iconic 2-inch stiffened collar with antiqued brass eyelet' },
    { name: 'Savile Row Wide Peak Lapel', desc: 'Commanding 4.2-inch peak lapel with Milanese hand-stitch' },
    { name: 'Neapolitan Soft Notch', desc: 'Relaxed soft lapel with natural curve' }
  ];

  const handleSaveCustomization = () => {
    const bespokeOptions = {
      monogramInitials,
      threadColor,
      liningOption,
      collarStyle
    };
    addToCart(selectedGarment, selectedGarment.sizes[0], selectedGarment.colors[0], bespokeOptions);
    setIsCustomizerOpen(false);
    showToast(`Bespoke Monogrammed piece added to bag! (${monogramInitials})`);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCustomizerOpen(false)}>
      <div className="customizer-modal-container" onClick={e => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={() => setIsCustomizerOpen(false)}>
          <X size={20} />
        </button>

        <div className="customizer-header">
          <div className="customizer-kicker">
            <Scissors size={16} className="gold-accent" />
            <span>MUDRA BESPOKE MONOGRAMMING STUDIO</span>
          </div>
          <h2 className="customizer-title">PERSONALIZE YOUR BESPOKE SILHOUETTE</h2>
          <p className="customizer-sub">
            Add custom embroidered monogram initials, select your handcrafted interior silk lining, and choose your collar expression.
          </p>
        </div>

        <div className="customizer-body-grid">
          {/* Left Preview Column */}
          <div className="preview-canvas-col">
            <div className="garment-render-box">
              <img src={selectedGarment.images[0]} alt={selectedGarment.name} className="canvas-img" />
              
              {/* Simulated Monogram Embroidery Preview */}
              <div className="monogram-preview-stamp">
                <span className="mono-sub">HAND-EMBROIDERED CUFF / CHEST</span>
                <span className="mono-letters" style={{ color: threadColors.find(c => c.name === threadColor)?.hex }}>
                  {monogramInitials || "M.S."}
                </span>
                <span className="mono-thread">{threadColor.toUpperCase()} THREAD</span>
              </div>
            </div>

            <div className="garment-selector-pills">
              <span className="pill-head">SELECT BASE GARMENT:</span>
              <div className="g-list">
                {customizableGarments.map(g => (
                  <button
                    key={g.id}
                    className={`g-btn ${selectedGarment.id === g.id ? 'active' : ''}`}
                    onClick={() => setSelectedGarment(g)}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Configuration Controls */}
          <div className="controls-options-col">
            {/* 1. Monogram Initials */}
            <div className="custom-option-group">
              <label className="opt-label">1. BESPOKE MONOGRAM INITIALS (MAX 4 CHARS):</label>
              <div className="initials-input-wrap">
                <input
                  type="text"
                  maxLength={4}
                  value={monogramInitials}
                  onChange={e => setMonogramInitials(e.target.value.toUpperCase())}
                  className="initials-input"
                  placeholder="e.g. A.S."
                />
                <span className="initials-note">Embroidered with 18-karat gold or silver thread on the left cuff or interior breast pocket.</span>
              </div>
            </div>

            {/* 2. Embroidery Thread Color */}
            <div className="custom-option-group">
              <label className="opt-label">2. EMBROIDERY THREAD SHADE:</label>
              <div className="thread-options-row">
                {threadColors.map(tc => (
                  <button
                    key={tc.name}
                    className={`thread-btn ${threadColor === tc.name ? 'active' : ''}`}
                    onClick={() => setThreadColor(tc.name)}
                  >
                    <span className="t-dot" style={{ backgroundColor: tc.hex }}></span>
                    <span>{tc.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Interior Lining */}
            <div className="custom-option-group">
              <label className="opt-label">3. INTERIOR SILK BEMBERG LINING:</label>
              <div className="lining-list">
                {linings.map(l => (
                  <div
                    key={l.name}
                    className={`lining-card ${liningOption === l.name ? 'active' : ''}`}
                    onClick={() => setLiningOption(l.name)}
                  >
                    <div className="lining-header">
                      <strong>{l.name}</strong>
                      {liningOption === l.name && <Check size={14} className="gold-accent" />}
                    </div>
                    <p>{l.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Collar & Lapel Expression */}
            <div className="custom-option-group">
              <label className="opt-label">4. SARTORIAL COLLAR ARCHITECTURE:</label>
              <div className="collar-list">
                {collarStyles.map(c => (
                  <div
                    key={c.name}
                    className={`collar-card ${collarStyle === c.name ? 'active' : ''}`}
                    onClick={() => setCollarStyle(c.name)}
                  >
                    <div className="collar-header">
                      <strong>{c.name}</strong>
                      {collarStyle === c.name && <Check size={14} className="gold-accent" />}
                    </div>
                    <p>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button className="btn-mudra-gold submit-custom-btn" onClick={handleSaveCustomization}>
              <Sparkles size={16} />
              <span>CONFIRM & ADD BESPOKE CREATION TO BAG</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .customizer-modal-container {
          background: #FFF;
          width: 100%;
          max-width: 980px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: var(--shadow-lg);
          position: relative;
        }

        .customizer-header {
          padding: 2.2rem 2.5rem 1.5rem 2.5rem;
          background: var(--color-sand);
          border-bottom: 1px solid var(--color-stone);
        }

        .customizer-kicker {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: var(--color-gold);
          margin-bottom: 0.4rem;
        }

        .customizer-title {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 0.4rem;
        }

        .customizer-sub {
          font-size: 0.85rem;
          color: var(--color-muted);
        }

        .customizer-body-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
        }

        .preview-canvas-col {
          padding: 2rem;
          background: var(--color-sand);
          border-right: 1px solid var(--color-stone);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .garment-render-box {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          background: #FFF;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .canvas-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          image-rendering: -webkit-optimize-contrast;
        }

        .monogram-preview-stamp {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          right: 1rem;
          background: rgba(18, 20, 23, 0.9);
          backdrop-filter: blur(8px);
          padding: 0.8rem;
          border: 1px solid var(--color-gold);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .mono-sub {
          font-size: 0.55rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: var(--color-gold);
        }

        .mono-letters {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          line-height: 1;
          margin: 0.2rem 0;
        }

        .mono-thread {
          font-size: 0.6rem;
          color: #FFF;
          letter-spacing: 0.1em;
        }

        .garment-selector-pills {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .pill-head {
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--color-muted);
          letter-spacing: 0.1em;
        }

        .g-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .g-btn {
          background: #FFF;
          border: 1px solid var(--color-stone);
          padding: 0.5rem 0.8rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .g-btn.active {
          border-color: var(--color-gold);
          background: var(--color-obsidian);
          color: #FFF;
        }

        /* Controls Column */
        .controls-options-col {
          padding: 2.2rem;
          overflow-y: auto;
          max-height: 70vh;
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        }

        .opt-label {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--color-obsidian);
          display: block;
          margin-bottom: 0.6rem;
        }

        .initials-input {
          background: var(--color-sand);
          border: 1px solid var(--color-stone);
          padding: 0.6rem 1rem;
          font-family: var(--font-serif);
          font-size: 1.4rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--color-obsidian);
          width: 140px;
          outline: none;
        }

        .initials-note {
          display: block;
          font-size: 0.72rem;
          color: var(--color-muted);
          margin-top: 0.3rem;
        }

        .thread-options-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
        }

        .thread-btn {
          background: var(--color-sand);
          border: 1px solid var(--color-stone);
          padding: 0.5rem 0.8rem;
          font-size: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .thread-btn.active {
          background: #FFF;
          border-color: var(--color-gold);
        }

        .t-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.2);
        }

        .lining-list, .collar-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .lining-card, .collar-card {
          background: var(--color-sand);
          border: 1px solid var(--color-stone);
          padding: 0.8rem 1rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .lining-card.active, .collar-card.active {
          background: #FFF;
          border-color: var(--color-gold);
        }

        .lining-header, .collar-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          margin-bottom: 0.2rem;
        }

        .lining-card p, .collar-card p {
          font-size: 0.72rem;
          color: var(--color-muted);
        }

        .submit-custom-btn {
          width: 100%;
          padding: 1rem;
          margin-top: 1rem;
        }

        @media (max-width: 860px) {
          .customizer-body-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
