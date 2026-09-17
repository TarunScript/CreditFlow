#!/bin/bash
# ==============================================================================
# CreditFlow | Dynamic Microloan Repayment & Cash-Flow Planning (P12)
# One-Command Launch Script (TypeScript Landing + Streamlit Decision Engine)
# ==============================================================================

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "===================================================================="
echo "⚖️ CREDITFLOW: DYNAMIC MICROLOAN UNDERWRITING TERMINAL"
echo "   Framework: UN SDG 8 (Decent Work & Economic Growth)"
echo "===================================================================="
echo ""

echo "Step 1/3: Compiling analysis pipeline and ground-truth data..."
python3 generate_report.py
echo "✓ Pipeline synchronized."
echo ""

echo "Step 2/3: Starting Modern React + TypeScript Landing Page..."
if [ -d "landing" ]; then
    (cd landing && npm run dev -- --port 5173 --host) &
    LANDING_PID=$!
    echo "✓ Modern Landing Page: http://localhost:5173"
fi

echo ""
echo "Step 3/3: Launching Streamlit Computational Decision Terminal..."
echo "👉 Streamlit Dashboard: http://localhost:8501"
echo "👉 Standalone HTML Report: http://localhost:8000/dashboard/index.html"
echo ""
echo "Press Ctrl+C to stop all servers."
echo "===================================================================="

trap "kill $LANDING_PID 2>/dev/null || true; exit" INT TERM EXIT

python3 -m streamlit run streamlit_app.py --server.port 8501
