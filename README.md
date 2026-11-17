# 💱 Currency Converter

A responsive Currency Converter web application built with **React.js, Vite, and Tailwind CSS**. It allows users to convert amounts between different currencies using real-time exchange rates fetched from an external API.

## 🚀 Features

- 💱 Convert between INR, USD, EUR, and GBP
- 🌍 Fetch latest available exchange rates from the Frankfurter API
- 🔄 Swap currencies with a single click
- ⚡ Dynamic exchange rate updates
- ⏳ Loading indicators during API requests
- ❌ Error handling for failed API requests
- ✅ Input validation for zero and negative amounts
- 🛑 API request cancellation using AbortController
- 📱 Responsive design for mobile and desktop
- 🎨 Clean and modern UI using Tailwind CSS

## 🛠️ Tech Stack

- **React.js** – Frontend UI development
- **JavaScript (ES6+)** – Application logic
- **Tailwind CSS** – Styling and responsive design
- **Vite** – Development and build tool
- **Frankfurter API** – Currency exchange rates

## 📸 Screenshots

_Add a screenshot of your application here._

<!-- Example: ![Currency Converter Screenshot](./screenshots/converter.png) -->

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/currency-converter.git
```

### 2. Navigate to the project directory

```bash
cd currency-converter
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 📖 How to Use

1. Enter the amount you want to convert.
2. Select the source currency.
3. Select the target currency.
4. Click the **Convert Currency** button.
5. View the converted amount.
6. Use the **Swap** button to exchange the selected currencies.

## 🌐 API Integration

This project uses the free [Frankfurter API](https://frankfurter.dev/) to fetch currency exchange rates.

Example endpoint:

```text
https://api.frankfurter.dev/v2/rate/INR/USD
```

The application uses `fetch()` with `async/await` to retrieve exchange rates and React's `useEffect` hook to update them when the selected currencies change.

**Note:** Frankfurter provides the latest available reference exchange rates, which may not reflect live trading prices.

## 🧠 React Concepts Used

- Functional Components
- Props and Reusable Components
