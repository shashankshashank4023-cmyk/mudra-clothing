import React from 'react';
import { Award, Compass, Feather, Scissors } from 'lucide-react';

export default function HeritageCraftSection() {
  const craftPillars = [
    {
      icon: <Feather size={24} />,
      title: "Bhagalpuri Handloom Matka Silk",
      subtitle: "Centuries of Indigenous Weaving",
      desc: "Our ceremonial raw silks are hand-reeled by generational craftspeople along the Ganges. Retaining its organic slub texture and breathable warmth."
    },
    {
      icon: <Compass size={24} />,
      title: "Italian Biella Super 150s Merino",
      subtitle: "Piedmont Sartorial Precision",
      desc: "Milled in Biella, Italy using alpine glacier waters to treat virgin Australian merino fleece. Featherlight 260gsm all-season drape with natural memory."
    },
    {
      icon: <Scissors size={24} />,
      title: "Savile Row Floating Canvas",
      subtitle: "Anatomy of Bespoke Tailoring",
      desc: "Rather than glued heat-fused interlinings, every Mudra formal jacket features natural horsehair canvas that molds intimately to your chest contour."
    },
    {
      icon: <Award size={24} />,
      title: "French Normandy Flax Linen",
      subtitle: "Casual Coastal Luxury",
      desc: "Harvested in Western Europe and stonewashed with volcanic pumice for liquid drape and broken-in softness from your very first soiree."
    }
  ];

  return (
    <section className="heritage-section">
      <div className="heritage-inner">
        <div className="heritage-header">
          <span className="heritage-badge">ATELIER ETHOS</span>
          <h2 className="heritage-title">THE ARCHITECTURE OF LUXURY</h2>
          <p className="heritage-lead">
            Every thread woven into Mudra garments carries the soul of artisanal pedigree. We reject fleeting fast fashion in pursuit of timeless sartorial sovereignty.
          </p>
        </div>

        <div className="craft-pillars-grid">
          {craftPillars.map((p, idx) => (
            <div key={idx} className="craft-card">
              <div className="craft-icon-circle">{p.icon}</div>
              <span className="craft-card-sub">{p.subtitle}</span>
              <h3 className="craft-card-title">{p.title}</h3>
              <p className="craft-card-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .heritage-section {
          background-color: var(--color-sand);
          padding: 6rem 2rem;
          border-bottom: 1px solid var(--color-stone);
        }

        .heritage-inner {
          max-width: 1400px;
          margin: 0 auto;
        }

        .heritage-header {
          text-align: center;
          margin-bottom: 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .heritage-badge {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          color: var(--color-gold);
          margin-bottom: 0.6rem;
        }

        .heritage-title {
          font-family: var(--font-serif);
          font-size: 3rem;
          font-weight: 600;
          color: var(--color-obsidian);
          margin-bottom: 1rem;
        }

        .heritage-lead {
          font-size: 0.95rem;
          color: var(--color-muted);
          max-width: 680px;
          line-height: 1.8;
        }

        .craft-pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .craft-card {
          background: #FFF;
          border: 1px solid var(--color-stone);
          padding: 2.2rem 1.8rem;
          display: flex;
          flex-direction: column;
          transition: var(--transition-smooth);
        }

        .craft-card:hover {
          border-color: var(--color-gold);
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .craft-icon-circle {
          width: 54px;
          height: 54px;
          background: var(--color-sand);
          color: var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--color-stone);
          margin-bottom: 1.5rem;
        }

        .craft-card-sub {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: var(--color-gold);
          margin-bottom: 0.3rem;
          text-transform: uppercase;
        }

        .craft-card-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 600;
          line-height: 1.25;
          color: var(--color-obsidian);
          margin-bottom: 0.8rem;
        }

        .craft-card-desc {
          font-size: 0.82rem;
          line-height: 1.7;
          color: var(--color-muted);
        }

        @media (max-width: 992px) {
          .craft-pillars-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .heritage-title {
            font-size: 2.2rem;
          }
        }

        @media (max-width: 640px) {
          .craft-pillars-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
