# Task Management System

A full-stack task management application built with modern technologies.

## Project Structure

```
task-management/
├── backend/       # Node.js + TypeScript + Express + Prisma
├── frontend/      # Next.js 14 App Router + TypeScript + Tailwind CSS
└── README.md
```

## Backend

### Tech Stack
- Node.js with TypeScript
- Express.js
- Prisma ORM
- JWT Authentication
- Bcrypt for password hashing
- Zod for validation

### Setup
```bash
cd backend
npm install
npm run dev
```

### Folder Structure
```
backend/
├── src/
│   ├── routes/       # API routes
│   ├── controllers/  # Request handlers
│   ├── middleware/   # Custom middleware
│   ├── services/     # Business logic
│   ├── prisma/       # Prisma schema and client
│   ├── utils/        # Utility functions
│   └── index.ts      # Entry point
├── .env
├── tsconfig.json
└── package.json
```

## Frontend

### Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios for API calls
- Zustand for state management
- React Hook Form + Zod for form validation
- React Hot Toast for notifications
- Lucide React for icons

### Setup
```bash
cd frontend
npm install
npm run dev
```

### Folder Structure
```
frontend/
├── src/
│   ├── app/         # Next.js App Router pages
│   ├── components/  # React components
│   ├── lib/         # Utilities and configurations
│   ├── store/       # Zustand stores
│   └── types/       # TypeScript types
├── tsconfig.json
└── package.json
```

## Getting Started

1. Clone the repository
2. Set up the backend:
   - Navigate to `backend/`
   - Copy `.env.example` to `.env` and configure
   - Run `npm install`
   - Run `npx prisma generate`
   - Run `npm run dev`

3. Set up the frontend:
   - Navigate to `frontend/`
   - Run `npm install`
   - Run `npm run dev`

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## Development

- Backend runs on port 5000
- Frontend runs on port 3000
- Make sure to configure your database connection in the backend `.env` file

## License

ISC
