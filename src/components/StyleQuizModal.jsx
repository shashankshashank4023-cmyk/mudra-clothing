import React, { useState } from 'react';
import { X, Sparkles, Compass, Check, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function StyleQuizModal() {
  const { isQuizOpen, setIsQuizOpen, products, setSelectedProduct } = useShop();

  if (!isQuizOpen) return null;

  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    occasion: 'wedding',
    climate: 'tropical',
    fit: 'structured'
  });

  const handleSelectAnswer = (category, value) => {
    setAnswers({ ...answers, [category]: value });
  };

  // Recommendation algorithm
  const getRecommendation = () => {
    if (answers.occasion === 'wedding' || answers.occasion === 'blacktie') {
      return products.find(p => p.id === 'formal-01') || products[0];
    } else if (answers.occasion === 'boardroom') {
      return products.find(p => p.id === 'formal-02') || products[1];
    } else {
      return products.find(p => p.id === 'casual-01') || products[6];
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="modal-overlay" onClick={() => setIsQuizOpen(false)}>
      <div className="quiz-modal-container" onClick={e => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={() => setIsQuizOpen(false)}>
          <X size={20} />
        </button>

        <div className="quiz-header">
          <div className="quiz-kicker">
            <Compass size={16} className="gold-accent" />
            <span>SARTORIAL CONCIERGE MATCHMAKER</span>
          </div>
          <h2 className="quiz-title">DISCOVER YOUR SIGNATURE SILHOUETTE</h2>
          <p className="quiz-desc">
            Answer 3 quick aesthetic questions and our creative directors will formulate your ideal Mudra ensemble.
          </p>
        </div>

        <div className="quiz-body">
          {currentStep === 1 && (
            <div className="quiz-step-pane">
              <span className="step-count">QUESTION 01 OF 03</span>
              <h3 className="question-text">WHAT IS THE PRIMARY OCCASION FOR YOUR GARMENT?</h3>
              
              <div className="quiz-options-grid">
                {[
                  { id: 'wedding', label: 'Royal Wedding & Gala', desc: 'Regal raw silks, rich jewel tones, and hand-embroidered bandhgalas.' },
                  { id: 'blacktie', label: 'Black Tie Evening', desc: 'Velvet dinner jackets, duchess satin lapels, and Savile Row cuts.' },
                  { id: 'boardroom', label: 'Executive Boardroom & Summits', desc: 'Super 150s Biella merino wool double-breasted suits.' },
                  { id: 'resort', label: 'Private Yacht & Resort Holiday', desc: 'Normandy washed linen shirts and Tencel drawstring chinos.' }
                ].map(opt => (
                  <div
                    key={opt.id}
                    className={`quiz-card ${answers.occasion === opt.id ? 'active' : ''}`}
                    onClick={() => handleSelectAnswer('occasion', opt.id)}
                  >
                    <div className="card-top">
                      <h4>{opt.label}</h4>
                      {answers.occasion === opt.id && <Check size={16} className="gold-accent" />}
                    </div>
                    <p>{opt.desc}</p>
                  </div>
                ))}
              </div>

              <div className="quiz-action-bar">
                <button className="btn-mudra-gold" onClick={() => setCurrentStep(2)}>
                  <span>NEXT: CLIMATE & ENVIRONMENT</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="quiz-step-pane">
              <span className="step-count">QUESTION 02 OF 03</span>
              <h3 className="question-text">WHAT IS THE PREDOMINANT CLIMATE OF YOUR DESTINATION?</h3>
              
              <div className="quiz-options-grid">
                {[
                  { id: 'tropical', label: 'Warm & Tropical (Mumbai, Dubai, Singapore)', desc: 'High breathability handloom cottons and washed flax linens.' },
                  { id: 'temperate', label: 'Temperate / All-Season (London, New York)', desc: 'All-season 260gsm Super 150s worsted wool and raw Matka silk.' },
                  { id: 'winter', label: 'Crisp Autumn / Winter Soiree', desc: 'Heavyweight Italian velvet and dense wool-cashmere blends.' }
                ].map(opt => (
                  <div
                    key={opt.id}
                    className={`quiz-card ${answers.climate === opt.id ? 'active' : ''}`}
                    onClick={() => handleSelectAnswer('climate', opt.id)}
                  >
                    <div className="card-top">
                      <h4>{opt.label}</h4>
                      {answers.climate === opt.id && <Check size={16} className="gold-accent" />}
                    </div>
                    <p>{opt.desc}</p>
                  </div>
                ))}
              </div>

              <div className="quiz-action-bar">
                <button className="btn-mudra-secondary" onClick={() => setCurrentStep(1)}>
                  BACK
                </button>
                <button className="btn-mudra-gold" onClick={() => setCurrentStep(3)}>
                  <span>NEXT: SILHOUETTE PREFERENCE</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="quiz-step-pane">
              <span className="step-count">QUESTION 03 OF 03</span>
              <h3 className="question-text">HOW DO YOU PREFER YOUR GARMENT'S DRAPE?</h3>
              
              <div className="quiz-options-grid">
                {[
                  { id: 'structured', label: 'Architectural & Structured', desc: 'Roped shoulders, floating horsehair canvas, razor waist suppression.' },
                  { id: 'fluid', label: 'Fluid & Unstructured', desc: 'Neapolitan soft shoulders, liquid drape, unrestricted natural ease.' }
                ].map(opt => (
                  <div
                    key={opt.id}
                    className={`quiz-card ${answers.fit === opt.id ? 'active' : ''}`}
                    onClick={() => handleSelectAnswer('fit', opt.id)}
                  >
                    <div className="card-top">
                      <h4>{opt.label}</h4>
                      {answers.fit === opt.id && <Check size={16} className="gold-accent" />}
                    </div>
                    <p>{opt.desc}</p>
                  </div>
                ))}
              </div>

              <div className="quiz-action-bar">
                <button className="btn-mudra-secondary" onClick={() => setCurrentStep(2)}>
                  BACK
                </button>
                <button className="btn-mudra-gold" onClick={() => setCurrentStep(4)}>
                  <span>REVEAL MY SARTORIAL MATCH</span>
                  <Sparkles size={16} />
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="quiz-result-view">
              <span className="result-kicker">CURATED SARTORIAL MATCH</span>
              <h3 className="result-title">YOUR IDEAL ATELIER PIECE</h3>

              <div className="result-card">
                <img src={recommendation.images[0]} alt={recommendation.name} className="result-img" />
                <div className="result-info">
                  <span className="res-badge">{recommendation.badge}</span>
                  <h4 className="res-name">{recommendation.name}</h4>
                  <p className="res-desc">{recommendation.shortDesc}</p>
                  <span className="res-price">₹{recommendation.price.toLocaleString('en-IN')}</span>

                  <button
                    className="btn-mudra-gold inspect-match-btn"
                    onClick={() => {
                      setIsQuizOpen(false);
                      setSelectedProduct(recommendation);
                    }}
                  >
                    INSPECT CURATED PIECE IN DETAIL
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .quiz-modal-container {
          background: #FFF;
          width: 100%;
          max-width: 760px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: var(--shadow-lg);
          position: relative;
        }

        .quiz-header {
          padding: 2.2rem 2.5rem 1.5rem 2.5rem;
          background: var(--color-sand);
          border-bottom: 1px solid var(--color-stone);
        }

        .quiz-kicker {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: var(--color-gold);
          margin-bottom: 0.4rem;
        }

        .quiz-title {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 0.4rem;
        }

        .quiz-desc {
          font-size: 0.85rem;
          color: var(--color-muted);
        }

        .quiz-body {
          padding: 2.5rem;
        }

        .step-count {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: var(--color-gold);
          display: block;
          margin-bottom: 0.5rem;
        }

        .question-text {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 1.8rem;
        }

        .quiz-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .quiz-card {
          background: var(--color-sand);
          border: 1px solid var(--color-stone);
          padding: 1.2rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .quiz-card:hover {
          border-color: var(--color-gold);
        }

        .quiz-card.active {
          background: #FFF;
          border: 2px solid var(--color-gold);
          box-shadow: var(--shadow-sm);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.4rem;
        }

        .card-top h4 {
          font-size: 0.82rem;
          font-weight: 800;
        }

        .quiz-card p {
          font-size: 0.75rem;
          color: var(--color-muted);
          line-height: 1.5;
        }

        .quiz-action-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-stone);
        }

        /* Result View */
        .quiz-result-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .result-kicker {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: var(--color-gold);
        }

        .result-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        .result-card {
          display: flex;
          gap: 1.5rem;
          background: var(--color-sand);
          border: 1px solid var(--color-stone);
          padding: 1.5rem;
          text-align: left;
          width: 100%;
        }

        .result-img {
          width: 140px;
          height: 180px;
          object-fit: cover;
          object-position: center top;
          image-rendering: -webkit-optimize-contrast;
        }

        .result-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .res-badge {
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--color-gold);
          margin-bottom: 0.3rem;
        }

        .res-name {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }

        .res-desc {
          font-size: 0.82rem;
          color: var(--color-muted);
          line-height: 1.6;
          margin-bottom: 0.8rem;
        }

        .res-price {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--color-obsidian);
          margin-bottom: 1rem;
        }

        .inspect-match-btn {
          width: fit-content;
        }

        @media (max-width: 640px) {
          .quiz-options-grid, .result-card {
            grid-template-columns: 1fr;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
