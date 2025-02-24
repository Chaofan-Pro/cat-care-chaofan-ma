import "./FoodPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FoodPage({ baseUrl }) {
  const [foods, setFoods] = useState([]);
  const [ratings, setRatings] = useState({});
  const [cats, setCats] = useState({});

  const fetchFoods = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/food`);
      setFoods(data);
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  const fetchRating = async (id) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/food/${id}/rating`);
      setRatings((prevRatings) => ({
        ...prevRatings,
        [id]: data,
      }));
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  const fetchCats = async (id) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/cats/${id}`);
      setCats((prevCats) => ({
        ...prevCats,
        [id]: data,
      }));
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [baseUrl]);

  useEffect(() => {
    if (foods) {
      foods.forEach((food) => {
        fetchRating(food.id);
      });
    }
  }, [foods]);

  useEffect(() => {
    Object.values(ratings).forEach((ratingList) => {
      ratingList.forEach((rating) => {
        fetchCats(rating.cat_id);
      });
    });
  }, [ratings]);

  if (!foods) return <p>No Food Found</p>;

  return (
    <>
      {foods.map((food) => (
        <Link to={`/food/${food.id}`} key={food.id}>
          <article className="food">
            <img className="food__photo" src={food.food_photo} alt="" />
            <div className="food__info">
              <div className="food__title">
                <p className="food__brand">{food.food_brand}</p>
                <p
                  className={
                    food.food_type === "Dry Food"
                      ? "food__type--dry-food"
                      : food.food_type === "Wet Food"
                      ? "food__type--wet-food"
                      : "food__type--snack"
                  }
                >
                  {food.food_type}
                </p>
              </div>
              <p className="food__name">{food.food_name}</p>
              {ratings[food.id] &&
                ratings[food.id].map((rating) => (
                  <div className="food__rating" key={rating.id}>
                    {cats[rating.cat_id] && (
                      <img
                        className="food__cat-photo"
                        src={cats[rating.cat_id].photo}
                        alt={cats[rating.cat_id].name}
                      />
                    )}
                    <p className="food__score">
                      {Array.from(
                        { length: Math.round(rating.rating) },
                        (_, index) => (
                          <span key={index} role="img" aria-label="star">
                            ⭐️
                          </span>
                        )
                      )}
                    </p>
                  </div>
                ))}
            </div>
          </article>
        </Link>
      ))}
      <Link to="/food/add">
        <button className="button">Add Food</button>
      </Link>
    </>
  );
}

export default FoodPage;
