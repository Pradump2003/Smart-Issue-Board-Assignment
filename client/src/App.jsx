import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./page/Login";
import Signup from "./page/Signup";
import IssueList from "./page/IssueList";
import ToastProvider from "./components/ToastProvider";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          <Route
            path="/issue"
            element={
              <ProtectedRoute>
                <Navbar />
                <IssueList />
              </ProtectedRoute>
            }
          />
        </Routes>

        <ToastProvider />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
