import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import CatPage from "./pages/CatPage/CatPage";
import CatDetailPage from "./pages/CatDetailPage/CatDetailPage";
import FoodPage from "./pages/FoodPage/FoodPage";
import FoodDetailPage from "./pages/FoodDetailPage/FoodDetailPage";
import CatlenderPage from "./pages/CatlenderPage/CatlenderPage";
import CatlenderDetailPage from "./pages/CatlenderDetailPage/CatlenderDetailPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [cat, setCat] = useState(null);

  const fetchCat = async (id) => {
    try {
      const { data } = await axios.get(baseUrl + `/api/cats/${id}`);
      setCat(data);
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<CatPage baseUrl={baseUrl} />} />
            <Route path="/cat" element={<CatPage baseUrl={baseUrl} />} />
            <Route
              path="/cat/:id"
              element={<CatDetailPage cat={cat} fetchCat={fetchCat} />}
            />
            <Route path="/food" element={<FoodPage baseUrl={baseUrl} />} />
            <Route
              path="/food/:id"
              element={<FoodDetailPage baseUrl={baseUrl} />}
            />
            <Route
              path="/catlender"
              element={<CatlenderPage baseUrl={baseUrl} />}
            />
            <Route
              path="/catlender/:id"
              element={<CatlenderDetailPage baseUrl={baseUrl} />}
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
