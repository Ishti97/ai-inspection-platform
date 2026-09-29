@echo off

echo Starting FastAPI backend...
start "FastAPI Backend" cmd /k "cd /d D:\ai-inspection-platform && .venv\Scripts\activate && cd backend && python -m fastapi dev app\main.py"

echo Starting Vite frontend...
start "Vite Frontend" cmd /k "cd /d D:\ai-inspection-platform\frontend && npm run dev"

echo.
echo Backend and frontend are starting...