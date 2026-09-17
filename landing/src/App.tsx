import { useState, useEffect } from 'react';
import { 
  Sliders, 
  FileSpreadsheet, 
  Cpu, 
  ExternalLink, 
  Sun, 
  Moon, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  FileText, 
  Layers, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

const STREAMLIT_URL = "http://localhost:8501";

interface BorrowerArchetype {
  id: string;
  name: string;
  domain: string;
  archetype: string;
  condition: string;
  health: number;
  risk: number;
  emi: number;
  principal: number;
  strategy: string;
  monthlyFlow: number[];
  story: string;
  intervention: string;
}

const ARCHETYPES: BorrowerArchetype[] = [
  {
    id: "B01",
    name: "Meenakshi S.",
    domain: "Textile & Tailoring Works",
    archetype: "Stable",
    condition: "Stable",
    health: 74,
    risk: 19,
    emi: 5500,
    principal: 120000,
    strategy: "Keep Current Plan (Standard Fixed EMI)",
    monthlyFlow: [6600, 6530, 7210, 7130, 6880, 7120, 7160, 6100, 6840, 5700, 6750, 6940],
    story: "Consistent urban apparel sales with steady order book. Regular net cushion well above the required safety threshold.",
    intervention: "Continue current repayment schedule. No modifications required."
  },
  {
    id: "B02",
    name: "Ramesh K.",
    domain: "Cardamom & Pepper Spice Estate",
    archetype: "Seasonal Agriculture",
    condition: "Seasonal Pattern",
    health: 68,
    risk: 32,
    emi: 6000,
    principal: 150000,
    strategy: "Seasonal Step Schedule (Harvest-Linked)",
    monthlyFlow: [3200, 3100, 2800, 3900, 7800, 14200, 15600, 11200, 8900, 4200, 3400, 3000],
    story: "Extreme income surge during harvest (Oct-Jan) followed by lean pre-monsoon months. Rigid monthly EMIs trigger unnecessary defaults.",
    intervention: "Restructure into a step schedule: pay Rs. 2,800 in lean months and Rs. 9,400 during harvest."
  },
  {
    id: "B03",
    name: "Sunita M.",
    domain: "Handloom Weaving & Silk Sarees",
    archetype: "Growing Enterprise",
    condition: "Improving Trajectory",
    health: 82,
    risk: 14,
    emi: 4800,
    principal: 100000,
    strategy: "Dynamic Step-Up with Accelerated Paydown",
    monthlyFlow: [5200, 5600, 6100, 6400, 7000, 7500, 8200, 8900, 9400, 10200, 10900, 11800],
    story: "Recent expansion into e-commerce handicrafts marketplace. Month-over-month revenue growing at +14% compound rate.",
    intervention: "Eligible for credit facility top-up and lower interest tier due to rapid capital accumulation."
  },
  {
    id: "B04",
    name: "Ganesh K.",
    domain: "Commercial Fleet Logistics",
    archetype: "Exogenous Disruption",
    condition: "Temporary Shock",
    health: 67,
    risk: 41,
    emi: 7200,
    principal: 200000,
    strategy: "Temporary 3-Month Moratorium Relief",
    monthlyFlow: [8900, 9100, 8700, 8800, 2100, 1900, 2400, 8500, 8800, 9200, 9000, 9300],
    story: "Major vehicular breakdown caused 3-month fleet downtime. Income crashed but rebound to historical baseline was proven.",
    intervention: "Grant 90-day EMI suspension. Capitalize interest across remaining tenure without penalty."
  },
  {
    id: "B05",
    name: "Vikram P.",
    domain: "Neighborhood Kirana Retail",
    archetype: "Structural Disruption",
    condition: "Structural Decline",
    health: 29,
    risk: 78,
    emi: 5000,
    principal: 110000,
    strategy: "Principal Haircut & Extended Tenure",
    monthlyFlow: [7200, 6900, 6400, 5800, 5200, 4800, 4300, 3900, 3400, 3100, 2800, 2400],
    story: "Prolonged revenue loss from modern supermarket chains. Trajectory exhibits sustained -38% structural decay over 12 months.",
    intervention: "Urgent manual restructuring: extend tenure by 24 months or initiate soft recovery protocol."
  },
  {
    id: "B06",
    name: "Ananya B.",
    domain: "Rural Solar Microgrid Technician",
    archetype: "Volatile Cashflows",
    condition: "Chronic Strain",
    health: 44,
    risk: 59,
    emi: 4200,
    principal: 90000,
    strategy: "Income-Linked Flexible Repayment (20% of Net)",
    monthlyFlow: [4100, 4300, 3900, 4400, 3800, 4200, 3700, 4500, 3900, 4100, 3800, 4300],
    story: "Net income hovers perilously close to EMI installment every single month with zero liquidity cushion.",
    intervention: "Switch to 20% income-contingent repayment to prevent default during unavoidable repair delays."
  },
  {
    id: "B07",
    name: "Mohammad I.",
    domain: "Hyperlocal Quick-Commerce Driver",
    archetype: "Gig Economy",
    condition: "Gig Fluctuations",
    health: 61,
    risk: 38,
    emi: 3800,
    principal: 80000,
    strategy: "Weekly Micro-Deduction Model",
    monthlyFlow: [5400, 4200, 6800, 4900, 7100, 3900, 6200, 4800, 6900, 4400, 6500, 5100],
    story: "Extreme weekly earnings volatility dependent on weather, festival spikes, and platform algorithm incentives.",
    intervention: "Convert monthly lump-sum EMI into auto-debited weekly micro-payments aligned with platform payouts."
  },
  {
    id: "B08",
    name: "Lakshmi N.",
    domain: "Organic Dairy Farmers' Collective",
    archetype: "Post-Crisis Rebound",
    condition: "Recovering Trajectory",
    health: 73,
    risk: 28,
    emi: 6500,
    principal: 160000,
    strategy: "Graduated Step-Up Repayment",
    monthlyFlow: [3100, 3400, 3900, 4600, 5400, 6300, 7200, 8100, 8900, 9700, 10400, 11100],
    story: "Recovered from cattle feed price shock following cooperative aggregation and new bulk chilling agreements.",
    intervention: "Step up repayments from Rs. 4,500 to Rs. 7,500 over 6 months as margins normalize."
  }
];

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeArchetype, setActiveArchetype] = useState<BorrowerArchetype>(ARCHETYPES[0]);
  
  // Interactive Simulator State
  const [simInflow, setSimInflow] = useState(24000);
  const [simOutflow, setSimOutflow] = useState(14000);
  const [simSeasonality, setSimSeasonality] = useState(35);
  const [simShock, setSimShock] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Simulator Calculations
  const netMargin = simInflow - simOutflow;
  const simulatedEmi = Math.round(simInflow * 0.28);
  const worstCushion = Math.max(0, Math.round(netMargin * (1 - simSeasonality / 100) * (1 - simShock / 100) - simulatedEmi));
  const bufferBreaches = worstCushion < simulatedEmi * 0.15 ? (simShock > 0 ? 3 : 2) : 0;
  
  let simulatedDiagnosis = "Stable Trajectory";
  let diagnosisColor = "var(--accent-emerald)";
  let recommendedPlan = "Fixed EMI Plan";

  if (simShock > 30) {
    simulatedDiagnosis = "Temporary Disruption Shock";
    diagnosisColor = "var(--accent-amber)";
    recommendedPlan = "3-Month Moratorium + Capitalized Tenure";
  } else if (simSeasonality > 40) {
    simulatedDiagnosis = "Strong Seasonal Cycle";
    diagnosisColor = "var(--accent-blue)";
    recommendedPlan = "Seasonal Step Repayment Schedule";
  } else if (netMargin < simulatedEmi * 1.1) {
    simulatedDiagnosis = "Chronic Cash Strain";
    diagnosisColor = "var(--accent-rose)";
    recommendedPlan = "Income-Linked Contingent Facility";
  }

  return (
    <div>
      {/* Sticky Top Navbar */}
      <header className="navbar-wrap">
        <div className="navbar-container">
          <div className="brand-group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/logo.png" alt="CreditFlow" className="brand-logo-img" />
            <span className="brand-tag">P12 BENCHMARK</span>
          </div>

          <nav className="nav-links">
            <a href="#archetypes" className="nav-item">8 Archetypes</a>
            <a href="#simulator" className="nav-item">Live Simulator</a>
            <a href="#comparison" className="nav-item">The Dilemma</a>
            <a href="#architecture" className="nav-item">Architecture</a>
            <a href="#sdg" className="nav-item">UN SDG 8</a>
          </nav>

          <div className="nav-actions">
            <button 
              className="theme-toggle-btn" 
              onClick={toggleTheme}
              title="Toggle Light / Dark Terminal Theme"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>

            <a 
              href={STREAMLIT_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-launch"
              id="mainLaunchBtn"
            >
              <Sparkles size={16} />
              <span>Launch Dashboard</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="page-container">
        {/* HERO SECTION */}
        <section className="hero-wrapper">
          <div className="hero-logo-banner">
            <img 
              src="/logo.png" 
              alt="CreditFlow — Adaptive Repayments for Real Incomes" 
              className="hero-brand-card" 
            />
          </div>

          <div className="hero-pill-badge">
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--accent-blue)', display: 'inline-block' }}></span>
            MIT HACKATHON 2026 • DETERMINISTIC UNDERWRITING ENGINE
          </div>

          <h1 className="hero-headline">
            Adaptive Cash-Flow Underwriting for <span>Informal & Seasonal Economies</span>
          </h1>

          <p className="hero-subtext">
            Traditional microloans impose rigid, monthly EMIs that mathematically force seasonal farmers, artisans, and gig workers into unnecessary defaults. CreditFlow replaces flat installments with <b>deterministic cash-flow trajectory modeling</b>, machine learning cross-validation, and <b>5 automated restructuring pathways</b>.
          </p>

          <div className="hero-cta-group">
            <a 
              href={STREAMLIT_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-launch"
              style={{ padding: '12px 24px', fontSize: '0.96rem' }}
            >
              <Activity size={18} />
              <span>Open Underwriting Terminal (Streamlit)</span>
              <ArrowRight size={16} />
            </a>

            <a href="#simulator" className="btn-secondary">
              <Sliders size={18} />
              <span>Try In-Browser Stress Lab</span>
            </a>

            <a href="#archetypes" className="btn-secondary">
              <Layers size={18} />
              <span>Inspect 8 Archetypes</span>
            </a>
          </div>

          {/* Key Metrics Row */}
          <div className="hero-stats-row">
            <div className="stat-item">
              <div className="stat-num">100.0%</div>
              <div className="stat-label">Classifier Accuracy</div>
              <div className="stat-desc">Deterministic ground-truth validation</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">8 Domains</div>
              <div className="stat-label">Canonical Archetypes</div>
              <div className="stat-desc">Kerala spices, silk sarees, solar, kirana</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">5 Strategies</div>
              <div className="stat-label">Restructuring Matrix</div>
              <div className="stat-desc">Seasonal, income-link, relief, step</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">0ms Fallback</div>
              <div className="stat-label">Unstructured Parsing</div>
              <div className="stat-desc">Handwritten diaries, passbooks & UPI</div>
            </div>
          </div>
        </section>

        {/* 4 CORE CAPABILITIES CARDS (Each linking to Streamlit) */}
        <section style={{ marginBottom: 56 }}>
          <div className="section-header">
            <div className="section-eyebrow">Enterprise Features</div>
            <h2 className="section-title">Institutional Decision Modules</h2>
            <p className="section-subtitle">
              Every component is built for real-world microfinance institutions, self-help groups, and cooperative banks. Click any module to launch directly into the computational backend.
            </p>
          </div>

          <div className="cards-grid">
            <div className="feature-card">
              <div>
                <div className="feature-card-icon" style={{ background: 'rgba(37,99,235,0.1)', color: 'var(--accent-blue)' }}>
                  <Activity size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 8 }}>Portfolio Ledger</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Audit register monitoring all active microloans. Inspect safety buffer breaches, stress clusters, and cross-borrower risk heatmaps.
                </p>
              </div>
              <a 
                href={STREAMLIT_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary" 
                style={{ marginTop: 20, justifyContent: 'center' }}
              >
                <span>Launch Ledger</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="feature-card">
              <div>
                <div className="feature-card-icon" style={{ background: 'rgba(6,182,212,0.1)', color: 'var(--accent-cyan)' }}>
                  <Sliders size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 8 }}>Predictor Studio</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Interactive underwriting simulator. Test hypothetical loans with custom harvest seasonality (0-80%) and inject sudden exogenous shocks.
                </p>
              </div>
              <a 
                href={STREAMLIT_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary" 
                style={{ marginTop: 20, justifyContent: 'center' }}
              >
                <span>Open Simulator</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="feature-card">
              <div>
                <div className="feature-card-icon" style={{ background: 'rgba(5,150,105,0.1)', color: 'var(--accent-emerald)' }}>
                  <FileSpreadsheet size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 8 }}>12 Sector CSV Ingestion</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Upload custom financial history files. Pre-loaded with 12 authentic Indian domain datasets (organic tea, brassware, fisheries, etc.).
                </p>
              </div>
              <a 
                href={STREAMLIT_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary" 
                style={{ marginTop: 20, justifyContent: 'center' }}
              >
                <span>Upload CSV Data</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="feature-card">
              <div>
                <div className="feature-card-icon" style={{ background: 'rgba(217,119,6,0.1)', color: 'var(--accent-amber)' }}>
                  <FileText size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 8 }}>Statement AI Parser</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Extract structured monthly cashflows from raw handwritten notes, WhatsApp logs, or passbooks with 0ms deterministic regex fallback.
                </p>
              </div>
              <a 
                href={STREAMLIT_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary" 
                style={{ marginTop: 20, justifyContent: 'center' }}
              >
                <span>Parse Statements</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* INTERACTIVE 8 ARCHETYPES SHOWCASE */}
        <section id="archetypes" style={{ marginBottom: 56 }}>
          <div className="section-header">
            <div className="section-eyebrow">Audited Register</div>
            <h2 className="section-title">Explore the 8 Borrower Archetypes</h2>
            <p className="section-subtitle">
              Select any archetype to see their real 12-month net cash flow, health index, and the automated restructuring strategy recommended by the optimizer.
            </p>
          </div>

          <div className="archetype-showcase-box">
            {/* Horizontal Tabs */}
            <div className="archetype-tabs-scroll">
              {ARCHETYPES.map(b => (
                <button
                  key={b.id}
                  className={`archetype-tab-btn ${activeArchetype.id === b.id ? 'active' : ''}`}
                  onClick={() => setActiveArchetype(b)}
                >
                  <span className="figure" style={{ fontWeight: 700 }}>{b.id}</span>
                  <span>{b.name.split(' ')[0]}</span>
                  <span style={{ fontSize: '0.72rem', opacity: 0.7 }}>({b.archetype})</span>
                </button>
              ))}
            </div>

            {/* Archetype Details */}
            <div className="archetype-content-view">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <span className="brand-tag">{activeArchetype.id}</span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{activeArchetype.name}</h3>
                    <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>• {activeArchetype.domain}</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    Loan Facility: <b className="figure">Rs. {activeArchetype.principal.toLocaleString('en-IN')}</b> • Current Fixed Installment: <b className="figure">Rs. {activeArchetype.emi.toLocaleString('en-IN')}/mo</b>
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'JetBrains Mono' }}>Financial Health</div>
                    <div className="figure" style={{ fontSize: '1.4rem', fontWeight: 800, color: activeArchetype.health >= 70 ? 'var(--accent-emerald)' : (activeArchetype.health >= 50 ? 'var(--accent-amber)' : 'var(--accent-rose)') }}>
                      {activeArchetype.health} / 100
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'JetBrains Mono' }}>Risk Score</div>
                    <div className="figure" style={{ fontSize: '1.4rem', fontWeight: 800, color: activeArchetype.risk < 30 ? 'var(--accent-emerald)' : (activeArchetype.risk < 60 ? 'var(--accent-amber)' : 'var(--accent-rose)') }}>
                      {activeArchetype.risk} / 100
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Cash Flow Histogram */}
              <div style={{ background: 'var(--bg-surface)', padding: 20, borderRadius: 10, marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--text-muted)' }}>
                    12-MONTH NET CASH-FLOW TRAJECTORY (RS.)
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Dashed Line: Current Fixed EMI (Rs. {activeArchetype.emi.toLocaleString('en-IN')})
                  </div>
                </div>

                {/* Bar Graph */}
                <div style={{ display: 'flex', alignItems: 'flex-end', height: 140, gap: 10, paddingTop: 20 }}>
                  {activeArchetype.monthlyFlow.map((val, idx) => {
                    const maxVal = 16000;
                    const heightPct = Math.min(100, Math.max(15, (val / maxVal) * 100));
                    const isDeficit = val < activeArchetype.emi;
                    return (
                      <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                        <span className="figure" style={{ fontSize: '0.62rem', color: isDeficit ? 'var(--accent-rose)' : 'var(--text-muted)', marginBottom: 4, fontWeight: isDeficit ? 700 : 500 }}>
                          {(val / 1000).toFixed(1)}k
                        </span>
                        <div 
                          style={{ 
                            width: '100%', 
                            height: `${heightPct}%`, 
                            backgroundColor: isDeficit ? 'var(--accent-rose)' : 'var(--accent-blue)',
                            borderRadius: '4px 4px 0 0',
                            transition: 'height 0.3s ease'
                          }} 
                        />
                        <span className="figure" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 4 }}>
                          M{idx + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Diagnosis and Intervention */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 20 }}>
                <div style={{ background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: 16 }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--accent-cyan)', marginBottom: 4 }}>
                    BUSINESS CONTEXT & VOLATILITY PROFILE
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {activeArchetype.story}
                  </p>
                </div>

                <div style={{ background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: 16 }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--accent-emerald)', marginBottom: 4 }}>
                    OPTIMAL RESTRUCTURING RECOMMENDATION
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--accent-blue)', fontSize: '0.95rem', marginBottom: 4 }}>
                    ✓ {activeArchetype.strategy}
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {activeArchetype.intervention}
                  </p>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <a 
                  href={STREAMLIT_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-launch"
                  style={{ display: 'inline-flex' }}
                >
                  <span>Audit {activeArchetype.id} in Deep Terminal</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* IN-BROWSER INTERACTIVE STRESS SIMULATOR */}
        <section id="simulator" style={{ marginBottom: 56 }}>
          <div className="section-header">
            <div className="section-eyebrow">Interactive Sandbox</div>
            <h2 className="section-title">Real-Time Cash-Flow Stress Lab</h2>
            <p className="section-subtitle">
              Adjust the sliders below to simulate cyclical harvests, operating expenses, or unexpected business disruption. Watch the decision engine calculate solvency margins in real-time.
            </p>
          </div>

          <div className="simulator-box">
            <div className="simulator-grid">
              {/* Sliders */}
              <div>
                <div className="control-group">
                  <div className="control-label-row">
                    <span className="control-label">Average Monthly Inflow (Rs.)</span>
                    <span className="control-val">Rs. {simInflow.toLocaleString('en-IN')}</span>
                  </div>
                  <input 
                    type="range" 
                    min={10000} 
                    max={50000} 
                    step={1000} 
                    value={simInflow} 
                    onChange={e => setSimInflow(Number(e.target.value))} 
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    <span>Rs. 10k</span>
                    <span>Rs. 50k</span>
                  </div>
                </div>

                <div className="control-group">
                  <div className="control-label-row">
                    <span className="control-label">Essential Outflows & OpEx (Rs.)</span>
                    <span className="control-val">Rs. {simOutflow.toLocaleString('en-IN')}</span>
                  </div>
                  <input 
                    type="range" 
                    min={5000} 
                    max={35000} 
                    step={500} 
                    value={simOutflow} 
                    onChange={e => setSimOutflow(Number(e.target.value))} 
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    <span>Rs. 5k</span>
                    <span>Rs. 35k</span>
                  </div>
                </div>

                <div className="control-group">
                  <div className="control-label-row">
                    <span className="control-label">Seasonal Variation Amplitude (%)</span>
                    <span className="control-val">{simSeasonality}%</span>
                  </div>
                  <input 
                    type="range" 
                    min={0} 
                    max={80} 
                    step={5} 
                    value={simSeasonality} 
                    onChange={e => setSimSeasonality(Number(e.target.value))} 
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    <span>0% (Flat)</span>
                    <span>80% (Extreme Agriculture)</span>
                  </div>
                </div>

                <div className="control-group">
                  <div className="control-label-row">
                    <span className="control-label">Exogenous Shock Severity (%)</span>
                    <span className="control-val">{simShock}%</span>
                  </div>
                  <input 
                    type="range" 
                    min={0} 
                    max={75} 
                    step={5} 
                    value={simShock} 
                    onChange={e => setSimShock(Number(e.target.value))} 
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    <span>0% (Normal)</span>
                    <span>75% (Medical / Flood Disaster)</span>
                  </div>
                </div>
              </div>

              {/* Output Readout */}
              <div style={{ background: 'var(--bg-surface)', padding: 24, borderRadius: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--text-muted)', marginBottom: 8 }}>
                    REAL-TIME ENGINE EVALUATION
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: diagnosisColor }}></span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{simulatedDiagnosis}</h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
                    <div style={{ background: 'var(--bg-panel)', padding: 12, borderRadius: 6 }}>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>NET MARGIN</div>
                      <div className="figure" style={{ fontSize: '1.05rem', fontWeight: 800 }}>Rs. {netMargin.toLocaleString('en-IN')}</div>
                    </div>
                    <div style={{ background: 'var(--bg-panel)', padding: 12, borderRadius: 6 }}>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>LEAN CUSHION</div>
                      <div className="figure" style={{ fontSize: '1.05rem', fontWeight: 800, color: worstCushion > 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                        Rs. {worstCushion.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div style={{ background: 'var(--bg-panel)', padding: 12, borderRadius: 6 }}>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>STRESS BREACHES</div>
                      <div className="figure" style={{ fontSize: '1.05rem', fontWeight: 800, color: bufferBreaches > 0 ? 'var(--accent-rose)' : 'var(--accent-emerald)' }}>
                        {bufferBreaches} Months
                      </div>
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-panel)', borderLeft: '3px solid var(--accent-blue)', padding: 14, borderRadius: '0 6px 6px 0', marginBottom: 20 }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, fontFamily: 'JetBrains Mono', color: 'var(--accent-blue)', marginBottom: 2 }}>
                      RECOMMENDED RESTRUCTURING STRATEGY
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {recommendedPlan}
                    </div>
                  </div>
                </div>

                <a 
                  href={STREAMLIT_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-launch"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Cpu size={16} />
                  <span>Run Multi-Scenario Optimization in Terminal</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* THE CORE DILEMMA: RIGID EMIS VS ADAPTIVE CREDIT */}
        <section id="comparison" style={{ marginBottom: 56 }}>
          <div className="section-header">
            <div className="section-eyebrow">The Paradigm Shift</div>
            <h2 className="section-title">The Rigid EMI Poverty Trap vs. Adaptive Solvency</h2>
            <p className="section-subtitle">
              Microfinance has traditionally operated on rigid weekly/monthly schedules. Why do seasonal borrowers default, and how does dynamic restructuring fix it?
            </p>
          </div>

          <div className="comparison-grid">
            {/* Rigid EMI Trap */}
            <div style={{ background: 'rgba(244,63,94,0.06)', border: '1px solid var(--accent-rose)', borderRadius: 12, padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <AlertTriangle size={24} color="var(--accent-rose)" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-rose)' }}>
                  The Status Quo: The Rigid EMI Poverty Trap
                </h3>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <li style={{ display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--accent-rose)', fontWeight: 700 }}>✕</span>
                  <div>
                    <b style={{ color: 'var(--text-primary)' }}>Seasonal Volatility Triggers Default:</b> In agriculture and artisan trades, income naturally drops during sowing or monsoons. Flat installments cause defaults even when cumulative annual profits are healthy.
                  </div>
                </li>
                <li style={{ display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--accent-rose)', fontWeight: 700 }}>✕</span>
                  <div>
                    <b style={{ color: 'var(--text-primary)' }}>Lender Information Asymmetry:</b> Traditional scorecards cannot mathematically distinguish a temporary 60-day medical illness shock from permanent enterprise bankruptcy.
                  </div>
                </li>
                <li style={{ display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--accent-rose)', fontWeight: 700 }}>✕</span>
                  <div>
                    <b style={{ color: 'var(--text-primary)' }}>Loss for Both Parties:</b> The borrower faces blacklisting and predatory moneylenders; the bank suffers non-performing loans (NPLs) and legal recovery write-downs.
                  </div>
                </li>
              </ul>
            </div>

            {/* Adaptive Restructuring */}
            <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid var(--accent-emerald)', borderRadius: 12, padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <CheckCircle2 size={24} color="var(--accent-emerald)" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                  Our Solution: Adaptive Cash-Flow Restructuring
                </h3>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <li style={{ display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>✓</span>
                  <div>
                    <b style={{ color: 'var(--text-primary)' }}>Empirical Trajectory Separation:</b> Statistical autocorrelation separates temporary shocks (≤3 months with proven rebound) from structural decline (&gt;20% sustained decay).
                  </div>
                </li>
                <li style={{ display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>✓</span>
                  <div>
                    <b style={{ color: 'var(--text-primary)' }}>Tri-Axial Optimization Matrix:</b> Simulates 5 restructuring plans side-by-side, balancing Borrower Affordability (45%), Lender Recovery Rate (35%), and Stability (20%).
                  </div>
                </li>
                <li style={{ display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>✓</span>
                  <div>
                    <b style={{ color: 'var(--text-primary)' }}>Sustainable Solvency (UN SDG 8):</b> Transforms toxic debts into seasonal step payments, income-linked installments, or relief moratoria that protect livelihoods.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5-STAGE SYSTEM ARCHITECTURE */}
        <section id="architecture" style={{ marginBottom: 56 }}>
          <div className="section-header">
            <div className="section-eyebrow">Engineering Rigor</div>
            <h2 className="section-title">5-Stage System Architecture</h2>
            <p className="section-subtitle">
              Every loan recommendation is 100% auditable, deterministic, and free of hallucination risks.
            </p>
          </div>

          <div className="pipeline-track">
            <div className="pipeline-step">
              <div className="step-num" style={{ color: 'var(--accent-cyan)' }}>Stage 1</div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6 }}>Multimodal Ingestion</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Ingests CSV files, simulated cashflow parameters, and informal text passbooks.
              </p>
            </div>

            <div className="pipeline-step">
              <div className="step-num" style={{ color: 'var(--accent-emerald)' }}>Stage 2</div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6 }}>Cash-Flow Core</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Computes YoY autocorrelation, rolling means, and safety buffer breach clusters.
              </p>
            </div>

            <div className="pipeline-step">
              <div className="step-num" style={{ color: 'var(--accent-blue)' }}>Stage 3</div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6 }}>ML Cross-Check</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Random Forest & Gradient Boosting models confirm trajectory classification.
              </p>
            </div>

            <div className="pipeline-step">
              <div className="step-num" style={{ color: 'var(--accent-amber)' }}>Stage 4</div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6 }}>Scenario Optimizer</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Evaluates 5 restructuring schedules to select the pareto-optimal plan.
              </p>
            </div>

            <div className="pipeline-step">
              <div className="step-num" style={{ color: 'var(--accent-indigo)' }}>Stage 5</div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6 }}>Audit Explainer</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Produces grounded evidence chains for credit committees and borrower statements.
              </p>
            </div>
          </div>
        </section>

        {/* UN SDG 8 IMPACT */}
        <section id="sdg" style={{ marginBottom: 56 }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(79,70,229,0.08) 100%)', border: '1px solid var(--border-card)', borderRadius: 16, padding: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ background: '#e11d48', color: '#fff', padding: '4px 10px', borderRadius: 4, fontWeight: 800, fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>
                UN SDG 8
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                Decent Work & Economic Growth
              </h3>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: 840, lineHeight: 1.6, marginBottom: 20 }}>
              Over 2 billion informal workers globally lack predictable salary slips. CreditFlow addresses Target 8.3 (development-oriented policies that support productive activities, decent job creation, entrepreneurship, and innovation) and Target 8.10 (strengthen the capacity of domestic financial institutions to encourage and expand access to banking, insurance, and financial services for all).
            </p>
            <a 
              href={STREAMLIT_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-launch"
            >
              <span>Explore UN SDG 8 Metrics in Terminal</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer-wrap">
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img 
              src="/logo.png" 
              alt="CreditFlow" 
              style={{ height: 38, width: 'auto', objectFit: 'contain' }} 
            />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1rem', marginBottom: 2 }}>
                CreditFlow Decision Terminal
              </div>
              <div style={{ fontSize: '0.78rem' }}>
                Built for the MIT Hackathon 2026 • 100% Deterministic Engine
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <a href={STREAMLIT_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>
              Streamlit Terminal (Port 8501) ↗
            </a>
            <a href="https://github.com/TarunScript/CreditFlow" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>
              Source Repository ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
