@echo off
setlocal enabledelayedexpansion

REM =========================================================
REM   TradeOxx Ai - Production Startup Script
REM   Builds the client and starts the backend server.
REM =========================================================

cd /d "%~dp0"

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║          TradeOxx Ai - Production Web App Startup          ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Install all dependencies for root, server, and client
call npm.cmd run install:all
if %errorlevel% neq 0 (
  echo [ERROR] Failed to install dependencies.
  pause
  exit /b 1
)

echo.
echo [*] Building frontend and starting the backend...
echo.
call npm.cmd run prod

if %errorlevel% neq 0 (
  echo.
  echo [ERROR] Failed to start the production app.
  pause
  exit /b 1
)
