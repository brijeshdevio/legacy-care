import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { Navbar } from "@/components/layout/Navbar";

export function PublicLayout() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Spinner className="h-screen" />}>
        <Outlet />
      </Suspense>
    </>
  );
}
