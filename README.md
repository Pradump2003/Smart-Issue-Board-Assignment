# Smart Issue Board

A full-stack authentication and issue management application built with React, Node.js, Express, and MongoDB.

## 📋 Project Overview

Smart Issue Board is a comprehensive web application that enables users to:
- Create and manage secure user accounts with authentication
- Create, view, and manage issues/tasks efficiently
- Track issue details with an intuitive and modern interface
- Access protected routes with role-based authentication
- Receive real-time feedback through toast notifications

### 🌐 Live Demo

Check out the live application here: [https://smart-issue-board-assignment-utbs.vercel.app/](https://smart-issue-board-assignment-utbs.vercel.app/)

## 🛠️ Tech Stack

### Frontend
- **React 18** – Modern UI library with hooks  
- **Vite** – Lightning-fast build tool and dev server  
- **Tailwind CSS** – Utility-first CSS framework for styling  
- **React Context API** – Global state management  
- **Custom Hooks** – Reusable logic (useAuth, useFetchApi, useUser)  
- **Fetch API** – HTTP client for API calls  
- **React Toastify** – Beautiful toast notifications for success & error messages  


### Backend
- **Node.js** – JavaScript runtime  
- **Express.js** – Minimalist web framework  
- **MongoDB** – NoSQL database  
- **JWT (JSON Web Tokens)** – Secure authentication  
- **Bcrypt** – Password hashing and validation  
- **Express Async Handler** – Simplified error handling for async routes  
- **Validator** – Used for email validation and input sanitization  


## 📁 Project Structure

```
Assignment-auth/
├── client/                         # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/            # Reusable components
│   │   │   ├── CreateIssue.jsx
│   │   │   ├── IssueCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ToastProvider.jsx
│   │   ├── context/               # Context providers
│   │   │   └── UserContext.jsx
│   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── useAuth.jsx
│   │   │   ├── useFetchApi.jsx
│   │   │   └── useUser.jsx
│   │   ├── page/                  # Page components
│   │   │   ├── IssueList.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── routes/                # Route wrappers
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── PublicRoute.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── public/                    # Static assets
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vercel.json
│
└── server/                         # Backend (Node.js + Express)
    ├── controllers/               # Request handlers
    │   ├── user.controllers.js    # User auth logic
    │   └── issue.controllers.js   # Issue CRUD logic
    ├── models/                    # MongoDB schemas
    │   ├── user.model.js
    │   └── issue.model.js
    ├── routes/                    # API route definitions
    │   ├── user.routes.js
    │   └── issue.routes.js
    ├── middleware/                # Express middleware
    │   └── auth.middlewares.js
    ├── utils/                     # Utility functions
    │   ├── ApiResponse.utils.js   # Response formatting
    │   ├── ErrorHandler.js        # Error handling
    │   └── jwt.utils.js           # JWT operations
    ├── config/                    # Configuration files
    │   └── db.config.js           # Database connection
    ├── server.js                  # Entry point
    └── package.json
```

## ✨ Key Features

### Authentication System
- User registration with email validation
- Secure login with JWT tokens
- Password hashing using bcrypt
- Protected endpoints requiring valid tokens
- Automatic token refresh and validation

### Issue Management
- Create new issues with title and description
- View all issues in a paginated list
- Display issue creator information
- Delete issues (by owner or admin)
- Real-time issue status updates

### User Experience
- Clean and responsive UI with Tailwind CSS
- Toast notifications for feedback
- Protected routes for authenticated users
- Automatic redirects based on auth status
- Loading states and error handling
- User profile information display

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** v14+ installed
- **npm** or **yarn** package manager
- **MongoDB** (local or MongoDB Atlas cloud)
- **Git** for version control

### Backend Configuration

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/smart-issue-board
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   
   Server will run on `http://localhost:9000`

### Frontend Configuration

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory:
   ```env
   VITE_API_URL=http://localhost:9000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:5173`

## 📡 API Documentation

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/api/v1/user/register` | Register new user | No |
| POST | `/api/v1/user/login` | User login | No |
| GET | `/api/v1/user/logout` | Logout User | Yes |
| GET | `/api/v1/user/me` | Get Current User | Yes |

### Issue Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/api/v1/issue/create-issue` | Create new issue | Yes |
| GET | `/api/v1/issue/my-issues` | Get all issues | Yes |
| PATCH | `/api/v1/issue/update-status/:issueId` | Update issue | Yes |

## 🎯 Available Scripts

### Frontend Scripts
```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Scripts
```bash
npm start        # Start the server
npm run dev      # Start with nodemon (auto-restart)
```

## 🧩 Component Architecture

### Frontend Components
- **Navbar** - Navigation header with user info and logout
- **CreateIssue** - Form component for creating new issues
- **IssueCard** - Displays individual issue information
- **IssueList** - Container displaying all issues
- **Login** - Authentication form for existing users
- **Signup** - Registration form for new users
- **ToastProvider** - Global notification system
- **ProtectedRoute** - HOC wrapper for authenticated routes
- **PublicRoute** - HOC wrapper for public routes

### Custom Hooks
- **useAuth** - Manages authentication state and login/logout logic
- **useFetchApi** - Handles API calls with loading and error states
- **useUser** - Provides user context throughout the application

## 🔐 Security Features

- **JWT Authentication** - Token-based authentication system
- **Password Hashing** - Bcrypt for secure password storage
- **Protected Routes** - Frontend route protection
- **Middleware Validation** - Backend route protection
- **Error Handling** - Consistent error responses
- **CORS** - Cross-origin resource sharing configuration

## 📝 Environment Variables

### Server (.env)
```
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>
PORT=5000
NODE_ENV=development
```

### Client (.env)
```
VITE_API_URL=http://localhost:9000
```

## 🐛 Troubleshooting

### Connection Issues
- Ensure MongoDB is running and connection string is correct
- Check if ports 9000 (server) and 5173 (client) are available

### Authentication Errors
- Verify JWT_SECRET is set correctly
- Check token expiration
- Clear browser cookies and try again

### API Errors
- Check network tab in browser dev tools
- Verify CORS configuration
- Ensure backend is running

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [JWT Introduction](https://jwt.io)

## 👤 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is open source and available under the MIT License.

## 📧 Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

**Happy Coding!** 🚀
