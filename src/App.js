import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import SalesList from "./pages/SalesPage";
import ManajemenList from "./pages/ManagementPage";
import AdminList from "./pages/AdminPage";
import StoreList from "./pages/ListToko";
import SettingProgram from "./pages/ProgramSettingPage";
import RetailScreen from "./pages/RetailScreen";
import WholesaleScreen from "./pages/WholesaleScreen";
import AgenScreen from "./pages/AgenScreen";
import DiskonPage from "./pages/DiskonPage";
import BonusPage from "./pages/BonusPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import theme from "./theme";
import { AuthProvider } from "./context/AuthContext";

function Layout() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";

  return (
    <>
      {!hideSidebar && <Sidebar />}
      <Box ml={!hideSidebar ? "240px" : "0"} p="4">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/produk"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales"
            element={
              <ProtectedRoute>
                <SalesList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manajemen"
            element={
              <ProtectedRoute>
                <ManajemenList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/toko"
            element={
              <ProtectedRoute>
                <StoreList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/toko/retail"
            element={
              <ProtectedRoute>
                <RetailScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/toko/wholesale"
            element={
              <ProtectedRoute>
                <WholesaleScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/toko/agen"
            element={
              <ProtectedRoute>
                <AgenScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/setting-program"
            element={
              <ProtectedRoute>
                <SettingProgram />
              </ProtectedRoute>
            }
          />
          <Route
            path="/program/diskon"
            element={
              <ProtectedRoute>
                <DiskonPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/program/bonus"
            element={
              <ProtectedRoute>
                <BonusPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
