import { getAuthContext } from "@/context/authContext";
import { auth } from "@/config/auth.config";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { useEffect, useState } from "react";

import App from "../App";
import Home from "../pages/Home/Home";
import Checkout from "../pages/Checkout/Checkout";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import ProductPage from "../pages/ProductPage/ProductPage";
import SearchResults from "../pages/SearchResults/SearchResults";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../pages/MyAccount/DashboardLayout";
import DashboardLayout from "../pages/MyAccount/DashboardLayout";
import Overview from "../pages/MyAccount/Overview";
import Orders from "../pages/MyAccount/Orders";
import Confirmation from "../pages/Confirmation/Confirmation";
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";

const RouteGuard = ({ children }) => {
  const { user, loading } = getAuthContext();
  const [checkingVerification, setCheckingVerification] = useState(true);
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const checkEmailVerification = async () => {
      if (user) {
        auth.currentUser.reload();
        setIsVerified(auth.currentUser.emailVerified);
      }
      setCheckingVerification(false);
    };

    checkEmailVerification();
  }, [user]);

  if (!user) return <Navigate to="/signin" />;

  if (checkingVerification) return null;

  if (!isVerified) return <Navigate to="/verify-email" />;

  if (loading) return;

  return children;
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public routes */}
      <Route index element={<Home />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/products/:productId" element={<ProductPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      {/* Private routes */}
      <Route
        path="/dashboard"
        element={
          <RouteGuard>
            <Dashboard />
          </RouteGuard>
        }
      />
      <Route
        path="/checkout"
        element={
          <RouteGuard>
            <Checkout />
          </RouteGuard>
        }
      />
      <Route
        path="/checkout/confirmation/:orderNumber"
        element={
          <RouteGuard>
            <Confirmation />
          </RouteGuard>
        }
      />
      <Route
        path="/myaccount"
        element={
          <RouteGuard>
            <DashboardLayout />
          </RouteGuard>
        }
      >
        <Route
          index
          element={
            <RouteGuard>
              <Overview />
            </RouteGuard>
          }
        />
        <Route
          path="orders"
          element={
            <RouteGuard>
              <Orders />
            </RouteGuard>
          }
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);
