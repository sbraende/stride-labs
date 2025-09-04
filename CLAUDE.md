# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**Stride Labs** is an AI-powered shoe e-commerce application built with React, Vite, and Firebase. The app features natural language search powered by a backend AI service, user authentication with email verification, shopping cart functionality, and a complete checkout flow.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Start backend server (for full functionality)
npm run server
```

## Architecture

### Frontend Stack
- **React 19** with functional components and hooks
- **Vite** for bundling and development server
- **React Router** for client-side routing with route guards
- **Firebase** for authentication and Firestore database
- **CSS Modules** for component styling

### Key Architectural Patterns

**Context-based State Management:**
- `AuthContext` manages user authentication state
- `CartContext` manages shopping cart with localStorage persistence
- Both use React Context + useReducer pattern

**Route Protection:**
- `RouteGuard` component wraps protected routes
- Enforces authentication and email verification
- Nested routing for user account pages (`/myaccount`)

**Component Structure:**
- Components organized by feature in `src/components/`
- Pages in `src/pages/` correspond to main routes
- Shared utilities in `src/utilities/`
- Configuration files in `src/config/`

### Firebase Integration
- Authentication with email verification required
- Firestore for product data and user information
- Configuration files: `auth.config.js`, `firebase.config.js`, `firestore.config.js`

### Backend Integration
- Separate backend service for AI-powered search functionality
- Repository: https://github.com/sbraende/stride-labs-backend
- Configure backend URL in `.env` as `VITE_API_URL`

## Environment Setup

Required environment variables in `.env`:
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_URL=  # Optional: backend service URL
```

## Key Features

- **AI Search:** Natural language product search via backend integration
- **Authentication:** Firebase Auth with email verification workflow
- **Cart Management:** Persistent shopping cart with localStorage
- **Responsive Design:** Mobile-first approach with CSS modules
- **Form Validation:** Custom validation utilities for user inputs

## File Organization

- `src/pages/` - Main application pages
- `src/components/` - Reusable UI components
- `src/context/` - React contexts for global state
- `src/hooks/` - Custom React hooks
- `src/config/` - Firebase and backend configuration
- `src/utilities/` - Helper functions and validation
- `src/styles/` - Global and shared styles
- `src/router/` - Routing configuration with route guards

## Development Notes

- Uses Vite path aliases: `@` resolves to `src/`
- ESLint configured for React with hooks and refresh plugins
- No TypeScript - uses PropTypes or JSDoc for type documentation
- Cart state persists across browser sessions via localStorage
- Email verification required before accessing protected routes