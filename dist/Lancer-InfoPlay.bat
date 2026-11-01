@echo off
REM Lance InfoPlay Maroc sur http://localhost:8765 (serveur local, sans Internet, sans installation).
cd /d "%~dp0"
start "" /min powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
timeout /t 2 /nobreak >nul
start "" chrome "http://localhost:8765/" 2>nul || start "" "http://localhost:8765/"
