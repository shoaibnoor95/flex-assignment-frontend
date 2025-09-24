import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PropertyPublic from "./pages/PropertyPublic";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/property/:idOrSlug" element={<PropertyPublic />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
