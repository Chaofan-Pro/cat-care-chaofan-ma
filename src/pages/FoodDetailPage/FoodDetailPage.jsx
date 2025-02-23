import "./FoodDetailPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function FoodDetailPage({ baseUrl, food, fetchFood }) {
  const [ratings, setRatings] = useState([]);

  const { id } = useParams();

  const fetchRating = async (id) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/food/${id}/rating`);
      setRatings(data);
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  useEffect(() => {
    fetchFood(id);
  }, [id]);

  useEffect(() => {
    if (food) {
      fetchRating(food.id);
    }
  }, [food]);

  if (!food) return <p>No Food Found</p>;

  return (
    <>
      <article className="fooddetail" key={food.id}>
        <img className="fooddetail__photo" src={food.food_photo} alt="" />
        <div className="food__info">
          <p className="food__brand">{food.food_brand}</p>
          <p className="food__name">{food.food_name}</p>
          <p className="fooddetail__description">{food.food_description}</p>
          {ratings &&
            ratings.map((rating) => (
              <div className="food__rating" key={rating.id}>
                <p className="food__rating-name">{rating.cat_name}</p>
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
                <p className="food__rating-name">{rating.comment}</p>
              </div>
            ))}
        </div>
      </article>
    </>
  );
}

export default FoodDetailPage;
