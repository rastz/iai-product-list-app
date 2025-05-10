import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactTablePage } from "./pages/react-table";
import { CustomTablePage } from "./pages/custom-table";
import NotFoundPage from "./pages/404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReactTablePage />} />
        <Route path="/react-table" element={<ReactTablePage />} />
        <Route path="/custom-table" element={<CustomTablePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
