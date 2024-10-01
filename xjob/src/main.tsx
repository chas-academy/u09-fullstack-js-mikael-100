import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Dish from "./pages/Dish/Dish.tsx";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart.tsx";
import AdminLogin from "./pages/AdminLogin/AdminLogin.tsx";
import AdminMenu from "./pages/AdminMenu/AdminMenu.tsx";
import AdminUpdateDish from "./pages/AdminUpdateDish/AdminUpdateDish.tsx";
import AdminUploadDish from "./pages/AdminUploadDish/AdminUploadDish.tsx";
import AdminStatestics from "./pages/AdminStatistics/AdminStatistics.tsx";
import Payment from "./pages/Payment/Payment.tsx";
import Menu from "./pages/Menu/Menu.tsx";
import { Logout } from "./components/Navbar/Logout/Logout.tsx";
import AuthProvider from "./context/AuthContext.tsx";
import AdminAdd from "./pages/AdminAdd/AdminAdd.tsx";
import AdminList from "./pages/AdminList/AdminList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "dish/:id", element: <Dish /> },
      { path: "menu", element: <Menu /> },
      { path: "shoppingCart", element: <ShoppingCart /> },
      { path: "payment", element: <Payment /> },
      { path: "adminLogin", element: <AdminLogin /> },
      { path: "adminMenu", element: <AdminMenu /> },
      { path: "adminUpdateDish/:id", element: <AdminUpdateDish /> },
      { path: "adminUploadDish", element: <AdminUploadDish /> },
      { path: "adminStatistics", element: <AdminStatestics /> },
      { path: "logout", element: <Logout /> },
      { path: "adminAdd", element: <AdminAdd /> },
      { path: "adminList", element: <AdminList /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
