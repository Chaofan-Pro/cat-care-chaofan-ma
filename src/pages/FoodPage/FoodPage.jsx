import "./FoodPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FoodPage({ baseUrl }) {
  const [foods, setFoods] = useState(null);

  const fetchFoods = async () => {
    try {
      const { data } = await axios.get(baseUrl + `/api/food`);
      setFoods(data);
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [baseUrl]);

  if (!foods) return <p>No Food Found</p>;

  return (
    <>
      {foods.map((food) => (
        <article className="food">
          <img className="food__photo" src={food.food_photo} alt="" />
          <div className="food__info">
            <p className="food__brand">{food.food_brand}</p>
            <p className="food__name">{food.food_name}</p>
          </div>
        </article>
      ))}
      <Link to="/food/add">
        <button className="button">Add Food</button>
      </Link>
    </>
  );
}

export default FoodPage;
