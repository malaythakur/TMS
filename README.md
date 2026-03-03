# Task Management System

A production-ready full-stack task management application demonstrating modern web development best practices with a scalable architecture, robust authentication, and intuitive user interface.

## 🎯 Overview

This project showcases a complete implementation of a task management platform built with industry-standard technologies. It features JWT-based authentication, real-time state management, comprehensive form validation, and a responsive design optimized for all devices.

## 🏗️ Architecture

```
task-management/
├── backend/       # Node.js + TypeScript + Express + Prisma
├── frontend/      # Next.js 14 App Router + TypeScript + Tailwind CSS
└── README.md
```

## 🔧 Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database ORM**: Prisma
- **Authentication**: JWT with Bcrypt password hashing
- **Validation**: Zod schema validation
- **Architecture**: MVC pattern with service layer

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod
- **UI Components**: Lucide React icons
- **Notifications**: React Hot Toast

## 📁 Project Structure

### Backend
```
backend/
├── src/
│   ├── routes/       # API endpoint definitions
│   ├── controllers/  # Request handlers & business logic
│   ├── middleware/   # Authentication & error handling
│   ├── services/     # Core business logic layer
│   ├── prisma/       # Database schema & client
│   ├── utils/        # Helper functions & constants
│   └── index.ts      # Application entry point
├── .env              # Environment variables
├── tsconfig.json     # TypeScript configuration
└── package.json      # Dependencies & scripts
```

### Frontend
```
frontend/
├── src/
│   ├── app/         # Next.js App Router pages & layouts
│   ├── components/  # Reusable React components
│   ├── lib/         # Utilities, API clients & configurations
│   ├── store/       # Zustand state management stores
│   └── types/       # TypeScript type definitions
├── tsconfig.json    # TypeScript configuration
└── package.json     # Dependencies & scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure your database connection in .env
   npx prisma generate
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## ✨ Key Features

- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Type-Safe**: Full TypeScript implementation across frontend and backend
- **Form Validation**: Zod schema validation on both client and server
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: Efficient client-side state with Zustand
- **Error Handling**: Comprehensive error handling and user feedback
- **Database**: Prisma ORM for type-safe database operations

## 🔌 API Endpoints

The backend provides RESTful API endpoints for:
- User authentication (register, login)
- Task CRUD operations
- User profile management

All endpoints are protected with JWT authentication middleware.

## 📦 Environment Configuration

### Backend `.env`
```
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

### Frontend `.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🛠️ Development

- **Backend Development Server**: Runs on port 5000 with hot reload
- **Frontend Development Server**: Runs on port 3000 with Next.js fast refresh
- **Database**: Configure connection string in backend `.env`

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### How to Contribute

1. **Fork the repository** and create your feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes** following the existing code style and patterns

3. **Test your changes** thoroughly before submitting

4. **Commit with clear messages**
   ```bash
   git commit -m 'Add amazing feature'
   ```

5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request** with a clear description of your changes

### Contribution Guidelines

- Follow the existing code structure and naming conventions
- Ensure TypeScript types are properly defined
- Add appropriate error handling
- Test your changes before submitting
- Update documentation if needed
- Keep commits atomic and well-documented

### Areas for Contribution

- Bug fixes and performance improvements
- New features and enhancements
- Documentation improvements
- UI/UX enhancements
- Testing and test coverage
- Accessibility improvements

## 📄 License

ISC

---

**Built with ❤️ for developers who care about code quality**
