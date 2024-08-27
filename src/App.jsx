import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MarketingForm from "./components/MarketingForm";
import { Toaster } from "react-hot-toast";
import PenjualanForm from "./components/PenjualanForm";
import LayoutList from "./components/LayoutList";

const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<LayoutList />} />
          <Route path="/edit-marketing/:id" element={<MarketingForm />} />
          <Route path="/add-marketing" element={<MarketingForm />} />
          <Route path="/penjualan" element={<PenjualanForm />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
