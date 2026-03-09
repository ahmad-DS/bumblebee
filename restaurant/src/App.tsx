// import { useEffect, useState } from 'react';
import "./App.css";
// import { supabase } from './lib/supabase';
import { Routes, Route, Navigate } from "react-router";
import MenuPage from "./pages/menu/menu";
import { BillingLayout, Billing } from "./pages/billing/billing";

function App() {
  return (
    <div className="App">
      <h1>AAYAT FAMILY RESTAURANT</h1>
      <Routes>
        {/* replace=true here means you can use browser button to go to '/' page */}
        <Route  path="/" element={<Navigate to="/menu" replace />}/> 
        <Route path="admin-dashboard"></Route>
        <Route path="menu">
          <Route index element={<MenuPage />} />
          <Route path="cart" element={<MenuPage/>} />
        </Route>
        <Route path="billing" element={<BillingLayout />}>
          <Route index element={<Billing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
