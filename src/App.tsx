import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/Home";
import TemplatesPage from "./pages/Templates";
import MembershipPage from "./pages/Membership";
import TemplateDetail from "./pages/Templates/Detail";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="templates/:id" element={<TemplateDetail />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="membership" element={<MembershipPage />} />
      </Route>
    </Routes>
  );
};

export default App;
