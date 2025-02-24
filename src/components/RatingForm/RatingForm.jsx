import "./RatingForm.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Select from "../../components/Select/Select";
import TextArea from "../../components/TextArea/TextArea";
import RatingStar from "../RatingStar/RatingStar";
import Error from "../Error/Error";

function RatingForm({ baseUrl, setRatingFormVisible }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const numbericId = Number(id);

  const [formData, setFormData] = useState({
    foodId: numbericId,
    catId: "",
    rating: null,
    comment: "",
  });
  const [cats, setCats] = useState(null);

  const fetchCats = async () => {
    try {
      const { data } = await axios.get(baseUrl + `/api/cats`);
      setCats(data);
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  useEffect(() => {
    fetchCats();
  }, [baseUrl]);

  const [isValid, setIsValid] = useState({
    foodId: true,
    catId: true,
    rating: true,
    comment: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsValid({ ...isValid, [e.target.name]: true });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formattedDate =
      currentDate.getFullYear() +
      "-" +
      String(currentDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(currentDate.getDate()).padStart(2, "0") +
      " " +
      String(currentDate.getHours()).padStart(2, "0") +
      ":" +
      String(currentDate.getMinutes()).padStart(2, "0") +
      ":" +
      String(currentDate.getSeconds()).padStart(2, "0");

    const newValidation = {
      foodId: !!formData.foodId,
      catId: !!formData.catId,
      rating: !!formData.rating,
      comment: !!formData.comment,
    };
    setIsValid(newValidation);

    if (Object.values(newValidation).includes(false)) {
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("food_id", formData.foodId);
      formDataToSend.append("cat_id", formData.catId);
      formDataToSend.append("rating", formData.rating);
      formDataToSend.append("comment", formData.comment);
      formDataToSend.append("timestamp", formattedDate);

      await axios.post(`${baseUrl}/api/rating`, formDataToSend, {
        headers: { "Content-Type": "application/json" },
      });
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  const selectDetails = [
    {
      label: "Cat",
      id: "catId",
      value: formData.catId,
      isValid: isValid.catId,
      options: cats
        ? cats.map((cat) => ({ label: cat.name, value: cat.id }))
        : [{ label: "No cats available", value: "" }],
    },
  ];

  return (
    <form className="rating__form" onSubmit={handleSubmit}>
      {selectDetails.map((select) => (
        <Select
          key={select.id}
          label={select.label}
          id={select.id}
          name={select.id}
          value={select.value}
          isInputValid={select.isValid}
          changeInputHandle={handleChange}
          options={select.options}
        />
      ))}
      <label htmlFor="rating" className="form__label">
        Rating
      </label>
      <RatingStar
        totalStars={5}
        value={formData.rating}
        onRatingChange={handleRatingChange}
      />
      {!isValid.rating && <Error />}
      <TextArea
        label="Comment"
        id="comment"
        name="comment"
        placeholder="comment"
        value={formData.comment}
        isInputValid={isValid.comment}
        changeInputHandle={handleChange}
      />
      <button className="button" type="submit">
        Submit
      </button>
      <Link to={`/food/${id}`}>
        <button className="button" onClick={() => setRatingFormVisible(false)}>
          Cancel
        </button>
      </Link>
    </form>
  );
}

export default RatingForm;
