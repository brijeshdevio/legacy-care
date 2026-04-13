import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicLayout } from "./Layout";

const Home = lazy(() => import("@/pages/public/Home"));

export function Router() {
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
