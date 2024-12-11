# FeastFlow 🍔

A modern food ordering web application built with Next.js that allows users to browse menus, place orders, and track their order status in real-time. Featuring a powerful admin dashboard for restaurant management.

## [Live Project](https://feast-flow-project.vercel.app/)

## ✨ Features

### Menu Management
- Browse food items organized by categories
- Detailed food information with prices and descriptions
- High-quality food images and customer ratings
- Category-based filtering

### Cart Functionality
- Seamlessly add/remove items from cart
- Persistent cart data syncing between local storage and database
- Quick cart clearing option

### Order Management
- Streamlined order placement with delivery details
- Real-time order status tracking
- Comprehensive order history
- Live status updates (Processing, Out for Delivery, Delivered)

### Admin Dashboard
- Efficient food item management (add/edit/remove)
- Order status management
- Complete order overview
- Real-time order updates 

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Database Integration**: API routes with [Axios](https://axios-http.com/)
- **Authentication**: JWT-based authentication system

## 🚀 Key Features Implementation

- **Smart Caching**: Local storage caching for food items with configurable duration
- **Seamless Cart Sync**: Real-time synchronization between local storage and database
- **Live Updates**: Automatic polling for order status changes

## 💻 Local Development

1. Clone the repository:
```bash
git clone https://github.com/Ahmed-Niyaz/FeastFlow.git
cd FeastFlow
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file with the following variables:
```
DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"
STRIPE_API_SECRET="your_stripe_api_secret"
NEXT_PUBLIC_API_URL="your_api_url"
```
use http://localhost:3000 for "NEXT_PUBLIC_API_URL" for local development

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser
