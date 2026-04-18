# UBL Digital Bank Clone - React Native

A pixel-perfect mobile banking app clone inspired by UBL Digital Bank, built with React Native, Expo, and NativeWind (Tailwind CSS).

## 🚀 Features

- **Home Screen**: Dashboard with card carousel, quick actions, and recent transactions
- **Virtual Card Screen**: Apply for virtual WIZ card with form validation
- **Basic Information Screen**: User details form with date picker and success modal
- **Bottom Tab Navigation**: Smooth navigation between screens
- **NativeWind Styling**: Tailwind CSS for React Native

## 📱 Tech Stack

- React Native (Expo)
- NativeWind v4 (Tailwind CSS)
- React Navigation (Stack + Bottom Tabs)
- Expo Linear Gradient
- Expo Vector Icons (Ionicons)
- React Native Safe Area Context

## 🛠️ Installation & Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Development Server
```bash
npx expo start
```

### Step 3: Run on Your Device

**Option A: Using Expo Go App (Recommended for Testing)**
1. Install "Expo Go" app from Play Store (Android) or App Store (iOS)
2. Scan the QR code shown in terminal with Expo Go app
3. App will load on your device

**Option B: Run on Android Emulator**
```bash
npx expo start --android
```

**Option C: Run on iOS Simulator (Mac only)**
```bash
npx expo start --ios
```

## 📂 Project Structure

```
UBL_BANK_CLONE_UI/
├── screens/
│   ├── HomeScreen.js          # Dashboard with cards & transactions
│   ├── VirtualCardScreen.js   # Virtual card application
│   └── BasicInfoScreen.js     # User information form
├── App.js                     # Navigation setup
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind configuration
├── babel.config.js            # Babel with NativeWind plugin
└── app.json                   # Expo configuration
```

## 🎨 Screens Overview

### 1. Home Screen
- Gradient header with user greeting
- Horizontal scrollable card carousel (WIZ Debit Card)
- Quick action buttons (Send Money, Mobile Topup, Pay Bills, Accounts)
- Recent transactions list
- Bottom tab navigation

### 2. Virtual Card Screen
- Account selector
- Toggle for existing card status
- Card number input field
- Amount input
- Continue button navigates to Basic Info

### 3. Basic Information Screen
- Relationship and account dropdowns
- Marital status toggle
- Date of birth picker (month, date, year)
- Gender selection
- Success modal on completion

## 🎯 Commands Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npx expo start` | Start development server |
| `npx expo start --android` | Run on Android |
| `npx expo start --ios` | Run on iOS |
| `npx expo start --clear` | Clear cache and start |

## 🔧 Troubleshooting

**Issue: "Open Up App.js to start working on your app" message**
- This is the default Expo template message
- After running `npm install`, use `npx expo start` to launch the app
- Make sure all files are created properly

**Issue: NativeWind styles not working**
- Clear cache: `npx expo start --clear`
- Ensure babel.config.js includes nativewind/babel plugin

**Issue: Navigation not working**
- Ensure all navigation dependencies are installed
- Check that screen names match in navigation

## 👤 Dummy Data

- User: Faraz Khan
- Email: farazkhanaa2555@gmail.com
- Phone: 0301-3309056
- Card: **** **** **** 9288
- Balance: PKR 73,893.00

## 📄 License

MIT License - Feel free to use this project for learning purposes.
