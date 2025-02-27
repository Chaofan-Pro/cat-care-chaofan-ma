import "./App.scss";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import CatPage from "./pages/CatPage/CatPage";
import CatDetailPage from "./pages/CatDetailPage/CatDetailPage";
import AddCatPage from "./pages/AddCatPage/AddCatPage";
import EditCatPage from "./pages/EditCatPage/EditCatPage";
import FoodPage from "./pages/FoodPage/FoodPage";
import AddFoodPage from "./pages/AddFoodPage/AddFoodPage";
import FoodDetailPage from "./pages/FoodDetailPage/FoodDetailPage";
import EditFoodPage from "./pages/EditFoodPage/EditFoodPage";
import CatlenderPage from "./pages/CatlenderPage/CatlenderPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [cat, setCat] = useState(null);
  const [food, setFood] = useState(null);

  const fetchCat = async (id) => {
    try {
      const { data } = await axios.get(baseUrl + `/api/cats/${id}`);
      setCat(data);
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  const fetchFood = async (id) => {
    try {
      const { data } = await axios.get(baseUrl + `/api/food/${id}`);
      setFood(data);
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  return (
    <section>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<CatPage baseUrl={baseUrl} />} />
            <Route path="/cat" element={<CatPage baseUrl={baseUrl} />} />
            <Route path="/cat/add" element={<AddCatPage baseUrl={baseUrl} />} />
            <Route
              path="/cat/:id"
              element={<CatDetailPage cat={cat} fetchCat={fetchCat} />}
            />
            <Route
              path="/cat/edit/:id"
              element={
                <EditCatPage baseUrl={baseUrl} cat={cat} fetchCat={fetchCat} />
              }
            />

            <Route path="/food" element={<FoodPage baseUrl={baseUrl} />} />
            <Route
              path="/food/add"
              element={<AddFoodPage baseUrl={baseUrl} />}
            />
            <Route
              path="/food/:id"
              element={
                <FoodDetailPage
                  baseUrl={baseUrl}
                  food={food}
                  fetchFood={fetchFood}
                />
              }
            />
            <Route
              path="/food/edit/:id"
              element={
                <EditFoodPage
                  baseUrl={baseUrl}
                  food={food}
                  fetchFood={fetchFood}
                />
              }
            />

            <Route
              path="/catlender"
              element={<CatlenderPage baseUrl={baseUrl} />}
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </section>
  );
}

export default App;
