import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductTableV1Page } from "./pages/product-table-v1";
import NotFoundPage from "./pages/NotFoundPage";
import { ProductTableV2Page } from "./pages/product-table-v2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductTableV1Page />} />
        <Route path="/product-table-v1" element={<ProductTableV1Page />} />
        <Route path="/product-table-v2" element={<ProductTableV2Page />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
