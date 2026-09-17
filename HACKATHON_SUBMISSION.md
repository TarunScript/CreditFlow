# 💳 CreditFlow | Dynamic Microloan Repayment & Cash-Flow Planning (P12)
## MIT Hackathon Submission Brief

**United Nations Sustainable Development Goal (SDG) 8:** _Decent Work and Economic Growth_

---

## 1. Executive Summary & Problem Fit

In microfinance, borrowers (farmers, artisans, gig drivers, street vendors) operate on volatile, non-linear cash flows. Rigid, fixed monthly installments (EMIs) trigger artificial defaults during lean seasons or brief shocks—even when the borrower is fundamentally creditworthy. Conversely, lenders risk severe loss if they mistake permanent structural decay for a temporary dip.

**Our Solution:** A dual-layer, evidence-based decision engine and interactive lender portal that:

1. **Analyzes 24-month empirical cash flows** across income volatility, expenses, and safety buffers.
2. **Distinguishes Temporary Downturn from Permanent Deterioration** using statistically grounded trajectory classification (100% accuracy on synthetic ground truth).
3. **Evaluates 5 Alternative Repayment Structures** using an optimization matrix balancing **Borrower Affordability (Sustainability)** against **Lender Recovery Rate**.
4. **Delivers 100% Grounded Explainability** with an empirical evidence chain down to specific months, rupee amounts, and ML feature importances.
5. **Provides Predictive Multi-Method Ensemble Forecasting** with holdout backtesting on each borrower's own history.

---

## 2. Direct Problem Statement Alignment (P12)

| Problem Statement Requirement                         | How Our System Implements It                                                                                                                               | Where to Inspect                                                                  |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Irregular & Seasonal Income Modeling**              | Autocorrelation & Year-over-Year (YoY) correlation index; isolates recurring cyclical dips from random noise.                                              | `cashflow_engine.py`<br>Streamlit Tab: _Evidence & Diagnostics_                   |
| **Periods of Repayment Stress**                       | Safety buffer breach detection (default: 10% average monthly income cushion). Contiguous stress clustering.                                                | `cashflow_engine.py`<br>Streamlit Tab: _Cash Flow & ML Forecast_                  |
| **Temporary Downturn vs. Permanent Deterioration**    | Mathematically separates short shock clusters (≤3 months with post-shock recovery rebound) from persistent structural trends (>20% drop without recovery). | `cashflow_engine.py` (`temporary_stress` vs `structural_decline` vs `recovering`) |
| **Alternative Repayment Structures**                  | Models 5 distinct structures: **Fixed**, **Seasonal Step**, **Income-Linked**, **Temporary Relief**, **Grace / Moratorium**.                               | `scenario_engine.py`<br>`repayment_engine.py`                                     |
| **Balancing Affordability with Sustainable Recovery** | Tri-axial scoring engine: **Sustainability Score** (affordability) + **Recovery Score** (lender loan completion % & tenure penalty) + **Stability Score**. | `scenario_engine.py`<br>Streamlit Tab: _Multi-Strategy Scenarios_                 |
| **Explainability & Grounded Evidence**                | Complete evidence trail showing exact months, rupee buffer breaches, and feature attribution. Gemma LLM output is strictly verified against computed math. | `risk_engine.py`<br>`gemma_engine.py`                                             |
| **Simulated and Real Data Support**                   | 8 realistic microfinance archetypes + custom CSV file upload + Interactive Predictor Studio + unstructured text parsing.                                   | `data_generator.py`<br>`sample_data/` directory                                   |

---

## 3. Empirical Accuracy & Verification Metrics

Tested and verified via `evaluate.py` and `ml_evaluate.py`:

- **Rule-Based Archetype Classifier:** **100.0% accuracy** (8/8) against synthetic ground truth.
- **ML Double-Check Layer (Month-level Risk):** **96.4% leave-one-borrower-out cross-validation accuracy** (Precision: 0.90, Recall: 0.957, F1: 0.928).
- **ML Condition Model:** **87.5% leave-one-out CV accuracy** across held-out borrower trajectories.
- **Predictive Ensemble Forecast:** **-16.7% income MAE reduction** and **-16.3% net cash-flow MAE reduction** compared to single-heuristic baseline.

---

## 4. System Architecture

```
[Borrower Financial Data] ──> (24-Month Income, Expenses, Fixed Loan EMI)
         │
         ▼
[Deterministic Cash-Flow Engine] ──> Net Cash Flow, YoY Seasonality, Stress Clusters
         │
         ├───> [ML Double-Check Layer] ──> Random Forest / Gradient Boosting Validation
         │
         ├───> [Predictive Ensemble Forecast] ──> Holdout-Backtested Weighted Corridor
         │
         ├───> [Scenario Optimizer Engine] ──> Evaluates 5 Alternative Repayment Plans
         │                                     (Sustainability vs Recovery vs Stability)
         │
         ├───> [Risk & Health Engine] ──> 6 Health Pillars, Early Warning Triggers
         │
         ▼
[Presentation & Decision Layer]
   ├── Streamlit Decision Studio (Port 8501) [Interactive Sliders, Gemma Copilot, CSV Upload]
   └── Static Dashboard (Port 8000 / Vercel) [Zero-dependency client-side visualization]
```

---

## 5. Live Demonstration Script for Judges (2-Minute Walkthrough)

### Minute 1: The Core Dilemma (Temporary Shock vs. Structural Decline)

1. Open **Streamlit Decision Studio** at `http://localhost:8501`.
2. Look at **B04 (Ganesh K. - Commercial Fleet Operator)**:
   - Point out months 13–15 where net cash flow crashed due to an accident.
   - Show that the system classified him as `Temporary Stress` (not structural decline) because month 16 immediately rebounded to positive cash buffer.
   - Show the recommended strategy: **Grace / Moratorium** followed by term extension, avoiding default.
3. Switch to **B05 (Rajeshwar G. - General Provision Store)**:
   - Contrast with Rajeshwar, whose cash flow shows continuous 12-month decay.
   - Show that the system accurately flags him as `Structural Decline` with an early warning trigger recommending manual restructuring.

### Minute 2: The Multi-Strategy Optimizer & Custom Data

1. Navigate to **Tab 4 (Multi-Strategy Scenarios)**:
   - Show the side-by-side comparison matrix of all 5 strategies.
   - Highlight how the **Optimizer Pick** balances borrower sustainability against lender recovery.
2. Navigate to **Tab 5 (Live What-If Simulator)**:
   - Move the **Repayment % slider** and show real-time changes to the lender recovery rate and stress months.
3. Show Flexibility:
   - In the sidebar, switch to **Upload CSV** and drag in `sample_data/seasonal_farmer.csv`.
   - The entire pipeline re-computes dynamically in under 1 second.

---

## 6. How to Run Locally

```bash
# 1. Clone repository and navigate inside:
cd MIT_HACKATHON-main

# 2. Run the one-command launcher:
./run_project.sh
```

- **Streamlit App:** [http://localhost:8501](http://localhost:8501)
- **Static Dashboard:** [http://localhost:8000/dashboard/index.html](http://localhost:8000/dashboard/index.html)

---

## 7. Cloud Deployment Options

- **Static Dashboard:** Ready for instant 1-click deployment on **Vercel** (`vercel.json` included in repository root) or GitHub Pages.
- **Streamlit Studio:** Ready for 1-click deployment to **Streamlit Community Cloud** (connect GitHub repo and point to `streamlit_app.py`).
