import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { getUser } from "./redux/api/userApi";
import { UserInitialReducer } from "./types/reducerTypes";
import ProtectedRoutes from "./components/ProtectedRoutes";

const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Search = lazy(() => import("./pages/Search"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Orders = lazy(() => import("./pages/Orders"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Checkout = lazy(() => import("./pages/Checkout"));

// Admin Routes
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Products = lazy(() => import("./pages/admin/Products"));
const Customers = lazy(() => import("./pages/admin/Customers"));
const Transactions = lazy(() => import("./pages/admin/Transactions"));
const TransactionManagement = lazy(
  () => import("./pages/admin/management/TransactionManagement")
);
const ProductManagement = lazy(
  () => import("./pages/admin/management/ProductManagement")
);
const NewProduct = lazy(() => import("./pages/admin/management/NewProduct"));
const BarCharts = lazy(() => import("./pages/admin/charts/BarCharts"));
const LineCharts = lazy(() => import("./pages/admin/charts/LineCharts"));
const PieCharts = lazy(() => import("./pages/admin/charts/PieCharts"));
const Coupon = lazy(() => import("./pages/admin/apps/Coupon"));
const Toss = lazy(() => import("./pages/admin/apps/Toss"));
const Stopwatch = lazy(() => import("./pages/admin/apps/Stopwatch"));

const App = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(
    (state: { userReducer: UserInitialReducer }) => state.userReducer
  );

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
        console.log("Logged in");
      } else {
        dispatch(userNotExist());
        console.log("not Logged in");
      }
    });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      {/* Header */}
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Home />} path="/"></Route>
          <Route element={<Search />} path="/search"></Route>
          <Route element={<Cart />} path="/cart"></Route>

          {/* not logged in use Route */}
          <Route
            element={
              <ProtectedRoutes isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoutes>
            }
            path="/login"
          ></Route>

          {/* Logged in as user */}
          <Route
            element={<ProtectedRoutes isAuthenticated={user ? true : false} />}
          >
            <Route element={<Shipping />} path="/shipping"></Route>
            <Route element={<Orders />} path="/orders"></Route>
            <Route element={<Checkout />} path="/pay"></Route>
          </Route>

          {/* Admin Routes */}

          <Route
            path="/"
            element={
              <ProtectedRoutes
                isAuthenticated={user ? true : false}
                adminOnly={true}
                admin={user?.role === "admin" ? true : false}
              />
            }
          >
            <Route path="admin/dashboard" element={<Dashboard />}></Route>
            <Route path="admin/products" element={<Products />}></Route>
            <Route path="admin/transactions" element={<Transactions />}></Route>
            <Route path="admin/customers" element={<Customers />}></Route>

            {/* Charts */}
            <Route path="/admin/charts/bar" element={<BarCharts />} />
            <Route path="/admin/charts/line" element={<LineCharts />} />
            <Route path="/admin/charts/pie" element={<PieCharts />} />

            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/toss" element={<Toss />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />

            {/* Management */}
            <Route path="/admin/products/new" element={<NewProduct />}></Route>
            <Route
              path="/admin/products/:id"
              element={<ProductManagement />}
            ></Route>
            <Route
              path="/admin/transactions/:id"
              element={<TransactionManagement />}
            ></Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position="bottom-center" />
    </>
  );
};

export default App;
