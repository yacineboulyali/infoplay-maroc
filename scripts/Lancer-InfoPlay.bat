@echo off
REM Lance InfoPlay Maroc avec serveur multijoueur sur reseau local (LAN).
cd /d "%~dp0"
where node >nul 2>nul
if %errorlevel% equ 0 (
  start "" /min node "%~dp0lan-server.mjs"
) else (
  start "" /min powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
)
timeout /t 2 /nobreak >nul
start "" chrome "http://localhost:8765/" 2>nul || start "" "http://localhost:8765/"
