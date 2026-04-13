import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Spinner } from "@/components/ui/spinner";

export function PublicLayout() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Spinner className="h-screen" />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}
