import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MaterialsPage } from "./pages/Materials/MaterialsPage";
import { ProductsPage } from "./pages/Products/ProductsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/materials" />} />
          <Route path="/materials" element={<MaterialsPage />} />

          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/suggestion"
            element={<div className="p-8">Sugestão de Produção (Em breve)</div>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
