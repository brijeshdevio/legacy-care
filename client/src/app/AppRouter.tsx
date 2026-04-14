import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicLayout } from "./layout/Layout";

const Home = lazy(() => import("@/pages/public/Home"));

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
