import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/Home/HomePage";
import { MaterialsPage } from "./pages/Materials/MaterialsPage";
import { ProductsPage } from "./pages/Products/ProductsPage";
import { SuggestionsPage } from "./pages/Suggestions/SuggestionsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/suggestions" element={<SuggestionsPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
