# Quick Start Guide

## The Issue
Registration is failing because the **backend server is not running**.

## Solution: Start the Backend Server

### Step 1: Open a new terminal in the `server` folder
```bash
cd server
```

### Step 2: Install dependencies (if not already done)
```bash
npm install
```

### Step 3: Start the server
```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected
```

### Step 4: Test the backend
Open browser and go to: http://localhost:5000/api/health

You should see: `{"status":"OK"}`

---

## Now Try Registration Again

1. Go to http://localhost:3000/register
2. Fill in the form
3. Click "Create Account"
4. You should see "Registration successful!" ✅

---

## Troubleshooting

### If MongoDB connection fails:
- Check your internet connection
- Verify MongoDB Atlas credentials in `server/.env`

### If port 5000 is already in use:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in server/.env to 5001
```

### Check console for errors:
- Backend terminal: Shows API errors
- Frontend browser console (F12): Shows network errors
