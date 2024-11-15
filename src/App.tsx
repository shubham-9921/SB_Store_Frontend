import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Header from "./components/Header";


const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Search = lazy(() => import("./pages/Search"));
const Shipping = lazy(() => import("./pages/Shipping"));

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
  return (
    <>
      {/* Header */}
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Home />} path="/"></Route>
          <Route element={<Search />} path="/search"></Route>
          <Route element={<Cart />} path="/cart"></Route>

          
          <Route element={<Shipping />} path="/shipping"></Route>

          {/* Admin Routes */}

          {/* <Route
            path="/"
            element={
              <ProtectedRoutes
                isAuthenticates={true}
                adminRoute={true}
                isAdmin={true}
              />
            }
          > */}
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
          {/* </Route> */}
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
