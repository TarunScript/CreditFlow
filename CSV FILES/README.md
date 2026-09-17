# 📁 DEMO CSV FILES — Credit Underwriting Benchmark Datasets

This directory contains **12 complete, empirical 24-month financial record datasets** across diverse informal and micro-enterprise sectors in India, specifically designed for live hackathon demos and jury evaluation.

---

## 📋 Comprehensive Dataset Directory (12 Domains)

| # | File Name | Domain / Industry | Borrower Persona | Financial Profile | Suggested Loan Inputs | Expected System Strategy |
|:---|:---|:---|:---|:---|:---|:---|
| **01** | `01_seasonal_spice_farmer.csv` | **Agriculture & Cash Crops** | Ramesh K. (Kerala) | Strong harvest spikes (Oct–Feb) & lean monsoon spells (May–Aug). | Principal: `100,000`<br>EMI: `4,800` | **Seasonal Step Schedule** |
| **02** | `02_temporary_shock_boutique.csv` | **Apparel & Handloom Boutique** | Priya M. (Jaipur) | Stable year 1, acute 3-month external crisis (months 13–15), strong rebound. | Principal: `100,000`<br>EMI: `4,800` | **Moratorium & Reamortize** |
| **03** | `03_growing_cloud_kitchen.csv` | **Food & Beverage / Cloud Kitchen** | Vikram R. (Bengaluru) | Steady month-on-month compounding expansion (Rs.18k to Rs.42k). | Principal: `150,000`<br>EMI: `6,200` | **Accelerated / Step-Up** |
| **04** | `04_gig_delivery_driver.csv` | **Platform Logistics & Gig Economy** | Arjun D. (Delhi NCR) | High month-to-month income volatility without fixed seasonality. | Principal: `80,000`<br>EMI: `3,800` | **Income-Proportional Buffer** |
| **05** | `05_structural_decline_retail.csv` | **Neighborhood Kirana Store** | Sunita P. (Pune) | Disrupted by quick-commerce; progressive margin compression. | Principal: `100,000`<br>EMI: `4,800` | **High Severity Warning / Review** |
| **06** | `06_solar_installation_technician.csv` | **Clean Energy & Rural Solar Tech** | Harish N. (Nashik) | High installation margin during dry months, slower during monsoons. | Principal: `140,000`<br>EMI: `5,500` | **Stable Underwriting Plan** |
| **07** | `07_coastal_fisheries_aquaculture.csv` | **Marine Fisheries & Aquaculture** | Anthony P. (Kochi) | Zero income during 61-day monsoon trawling ban, bumper post-monsoon catch. | Principal: `130,000`<br>EMI: `5,800` | **Seasonal Step Schedule** |
| **08** | `08_handicraft_brassware_artisan.csv` | **Traditional Handicrafts & Export** | Zaheer A. (Moradabad) | Festive & wedding seasonal export surge (Aug–Nov), high metal raw costs. | Principal: `120,000`<br>EMI: `5,200` | **Accelerated Optional** |
| **09** | `09_rural_healthcare_diagnostic_lab.csv` | **Healthcare & Diagnostic Clinic** | Dr. Swati D. (Hubballi) | Highly recession-resistant, steady demand, seasonal monsoon infection surge. | Principal: `160,000`<br>EMI: `6,500` | **Prime Credit Facility** |
| **10** | `10_eco_friendly_jute_packaging.csv` | **Sustainable Packaging / Circular Economy** | Subhash B. (Kolkata) | Rapid green growth replacing single-use plastics (Rs.19k to Rs.59k). | Principal: `150,000`<br>EMI: `6,000` | **Accelerated Expansion Plan** |
| **11** | `11_auto_garage_machining_works.csv` | **Automotive Repair & Precision Lathe** | Jagdish T. (Indore) | Healthy baseline, 2-month power grid shock (months 14–15), sharp recovery. | Principal: `110,000`<br>EMI: `4,900` | **Post-Shock Recovery Monitor** |
| **12** | `12_dairy_cooperative_livestock.csv` | **Dairy Livestock & Milk Chilling** | Manpreet S. (Ludhiana) | Reliable bi-weekly milk union payouts, cyclical silage feed cost inflation. | Principal: `125,000`<br>EMI: `5,300` | **Stable Agricultural Credit** |

---

## 🚀 How to Use During Live Hackathon Demos

1. Select **Upload Borrower CSV** from the left sidebar.
2. Click **Browse files** or drag and drop any of the 12 files from `CSV FILES/`.
3. The application automatically normalizes columns, computes all risk/health scores, and renders the 7-tab credit decision dossier immediately.
