# Saniya Mehndi Designs

A modern, high-conversion web platform for mehndi design browsing, AR preview, and online booking.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Storage**: Cloudinary
- **Payments**: Razorpay
- **Auth**: JWT

## Project Structure

```
saniya-mehndi-designs/
├── client/        # Next.js Frontend
├── server/        # Node.js Backend
├── docs/          # API docs
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- Razorpay account

### Backend Setup
```bash
cd server
npm install
cp .env.example .env   # fill in your values
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

## Environment Variables

### Backend (`server/.env`)
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:3000
```

### Frontend (`client/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
```

## Deployment
- Frontend → Vercel
- Backend → Render / Railway
- DB → MongoDB Atlas
- Images → Cloudinary
