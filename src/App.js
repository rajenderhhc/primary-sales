/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from 'react-router-dom';

import './App.css';

import SignIn from './components/Authentication/Login';
import NotFound from './components/NotFound';
import Dashboard from './Pages/Dashboard';
//import Home from './Pages/Home/Home';
import { ProtectedRoute } from './ProtectedRoute';
import Profile from './components/Profile';
import ResetPawword from './components/Authentication/ResetPawword';
import LoginLogs from './Pages/Logs/LoginLogs';
import ProductSalesData from './Pages/Reports/ProductSalesData';
import CustomerSalesData from './Pages/Reports/CustomerSaleData';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<SignIn />} />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/salesdata/product'
        element={
          <ProtectedRoute>
            <ProductSalesData />
          </ProtectedRoute>
        }
      />
      <Route
        path='/salesdata/customerswise'
        element={
          <ProtectedRoute>
            <CustomerSalesData />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path='/resetPassword'
        element={
          <ProtectedRoute>
            <ResetPawword />
          </ProtectedRoute>
        }
      />
      <Route
        path='/logs'
        element={
          <ProtectedRoute>
            <LoginLogs />
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
