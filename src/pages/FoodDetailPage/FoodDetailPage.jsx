import "./FoodDetailPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import RatingForm from "../../components/RatingForm/RatingForm";
import DeleteIcon from "../../components/DeleteIcon/DeleteIcon";

function FoodDetailPage({ baseUrl, food, fetchFood }) {
  const [ratings, setRatings] = useState([]);
  const [cats, setCats] = useState({});
  const [ratingFormVisible, setRatingFormVisible] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchRating = async (id) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/food/${id}/rating`);
      setRatings(data);
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
    fetchFood(id);
  }, [id]);

  useEffect(() => {
    if (food) {
      fetchRating(food.id);
    }
  }, [food]);

  useEffect(() => {
    ratings.forEach((rating) => {
      fetchCats(rating.cat_id);
    });
  }, [ratings]);

  const deleteRating = async (ratingId) => {
    try {
      await axios.delete(`${baseUrl}/api/rating/${ratingId}`);
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  if (!food) return <p>No Food Found</p>;

  return (
    <>
      <article className="fooddetail" key={food.id}>
        <img className="fooddetail__photo" src={food.food_photo} alt="" />
        <div className="fooddetail__info">
          <div className="food__title">
            <p className="fooddetail__brand">{food.food_brand}</p>
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
          <p className="fooddetail__name">{food.food_name}</p>
          <p className="fooddetail__description">{food.food_description}</p>
          {ratings &&
            ratings.map((rating) => (
              <div className="fooddetail__rating-container" key={rating.id}>
                <div className="fooddetail__rating">
                  {cats[rating.cat_id] && (
                    <img
                      className="fooddetail__cat-photo"
                      src={cats[rating.cat_id].photo}
                      alt={cats[rating.cat_id].name}
                    />
                  )}
                  <div className="fooddetail__rating-column">
                    <p className="fooddetail__score">
                      {Array.from(
                        { length: Math.round(rating.rating) },
                        (_, index) => (
                          <span key={index} role="img" aria-label="star">
                            ⭐️
                          </span>
                        )
                      )}
                    </p>
                    <p className="fooddetail__comment">{rating.comment}</p>
                  </div>
                </div>
                <div className="fooddetail__rating-right">
                  <button
                    className="fooddetail__delete-button"
                    onClick={() => deleteRating(rating.id)}
                  >
                    <DeleteIcon />
                  </button>
                  <p className="fooddetail__rating-timestamp">{rating.timestamp.split("T")[0]}</p>
                </div>
              </div>
            ))}
        </div>
        <Link to={`/food/edit/${id}`}>
          <button className="button">Edit Food</button>
        </Link>
        <button onClick={() => setRatingFormVisible(true)} className="button">
          Add Rating
        </button>
        {ratingFormVisible && <RatingForm baseUrl={baseUrl} setRatingFormVisible={setRatingFormVisible}/>}
      </article>
    </>
  );
}

export default FoodDetailPage;
