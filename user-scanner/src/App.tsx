import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RootLayout } from "./layouts/RootLayout";
import { TableLayout } from "./layouts/TableLayout";

import { MenuPage } from "./pages/MenuPage";
import { CartPage } from "./pages/CartPage";
import { CouponsPage } from "./pages/CouponsPage";

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-foreground">Menu not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Please scan the QR code on your table to view the menu.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/:tableId" element={<TableLayout />}>
              <Route index element={<MenuPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="coupons" element={<CouponsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
