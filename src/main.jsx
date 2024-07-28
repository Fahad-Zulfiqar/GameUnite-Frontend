import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import store from "./store.js";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App.jsx";

import Home from "./Pages/HomePage/Home";
import ProductPage from "./Pages/ProductPage/ProductPage";
import ProductDetailPage from "./Pages/ProductDetailPage/ProductDetailPage";
import BlogPage from "./Pages/BlogPage/BlogPage";
import BlogDetailPage from "./Pages/BlogDetailPage";

import AboutPage from "./Pages/AboutPage/AboutPage";
import ContactPage from "./Pages/ContactPage/ContactPage";

import CartScreen from "./Pages/CartScreen/index.jsx";
import LoginScreen from "./Pages/LoginScreen/index.jsx";
import RegisterScreen from "./Pages/RegisterScreen/index.jsx";

import PrivateRoute from "./components/PrivateRoute/index.jsx";
import ShippingScreen from "./Pages/ShippingScreen/index.jsx";
import PaymentScreen from "./Pages/PaymentScreen/index.jsx";
import PlaceOrderScreen from "./Pages/PlaceOrderScreen/index.jsx";
import OrderScreen from "./Pages/OrderScreen/index.jsx";
import ProfileScreen from "./Pages/ProfileScreen/index.jsx";
import SettingPage from "./Pages/SettingPage/index.jsx";

import AdminRoute from "./components/AdminRoute/index.jsx";
import ProductListScreen from "./Pages/Admin/ProductListScreen/index.jsx";
import BlogEditScreen from "./Pages/Admin/BlogEditScreen/index.jsx";
import BlogListScreen from "./Pages/Admin/BlogListScreen/index.jsx";
import ProductEditScreen from "./Pages/Admin/ProductEditScreen/index.jsx";
import OrderListScreen from "./Pages/Admin/OrderListScreen/index.jsx";
import UserListScreen from "./Pages/Admin/UserListScreen/index.jsx";

import SellerRoute from "./components/SellerRoute/index.jsx";
import SproductListScreen from "./Pages/Seller/SproductListScreen/index.jsx";
import SproductEditScreen from "./Pages/Seller/SproductEditScreen/index.jsx";
import SorderListScreen from "./Pages/Seller/SorderListScreen/index.jsx";
import UserProfilePage from "./Pages/UserProfilePage/index.jsx";

// import { loadStripe } from "@stripe/stripe-js";

// import Homepg from "./Pages/BlogShow/Homepg.jsx";
// import FullBlogPage from "./Pages/Blogpag/FullBlogPage.jsx";
// import CreateForm from "./components/BlogsCommponets/CreateForm.jsx";
// import UpdateForm from "./components/BlogsCommponets/UpdateForm.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contactUs" element={<ContactPage />} />

      <Route path="/profile/:id" element={<UserProfilePage />} />

      <Route path="/search/:keyword" element={<ProductPage />} />
      <Route path="/page/:pageNumber" element={<ProductPage />} />
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<ProductPage />}
      />

      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogDetailPage />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/Setting" element={<SettingPage />} />
      </Route>

      <Route path="/" element={<AdminRoute />}>
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route path="/admin/bloglist" element={<BlogListScreen />} />

        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductListScreen />}
        />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/blog/:id/edit" element={<BlogEditScreen />} />

        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />
      </Route>

      <Route path="/" element={<SellerRoute />}>
        <Route path="/seller/productlist" element={<SproductListScreen />} />
        <Route
          path="/seller/productlist/:pageNumber"
          element={<SproductListScreen />}
        />
        <Route
          path="/seller/product/:id/edit"
          element={<SproductEditScreen />}
        />
        <Route path="/seller/orderlist" element={<SorderListScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        {/* <Elements stripe={stripePromise}> */}
        <RouterProvider router={router} />
        {/* </Elements> */}
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
