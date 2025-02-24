import "./AddFoodPage.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import TextArea from "../../components/TextArea/TextArea";

function AddFoodPage({ baseUrl }) {
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    foodName: "",
    foodBrand: "",
    foodPhoto: null,
    foodType: "",
    foodDescription: "",
  });

  const [isValid, setIsValid] = useState({
    foodName: true,
    foodBrand: true,
    foodPhoto: true,
    foodType: true,
    foodDescription: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsValid({ ...isValid, [e.target.name]: true });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, foodPhoto: file });
      setPhotoPreview(URL.createObjectURL(file)); 
      setIsValid({ ...isValid, foodPhoto: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newValidation = {
      foodName: !!formData.foodName,
      foodBrand: !!formData.foodBrand,
      foodPhoto: !!formData.foodPhoto,
      foodType: !!formData.foodType,
      foodDescription: !!formData.foodDescription,
    };
    setIsValid(newValidation);

    if (Object.values(newValidation).includes(false)) {
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("food_name", formData.foodName);
      formDataToSend.append("food_brand", formData.foodBrand);
      formDataToSend.append("food_photo", formData.foodPhoto);
      formDataToSend.append("food_type", formData.foodType);
      formDataToSend.append("food_description", formData.foodDescription);
      await axios.post(`${baseUrl}/api/food`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  const inputDetails = [
    {
      label: "Food Brand",
      id: "foodBrand",
      value: formData.foodBrand,
      isValid: isValid.foodBrand,
      placeholder: "Food Brand",
    },
    {
      label: "Food Name",
      id: "foodName",
      value: formData.foodName,
      isValid: isValid.foodName,
      placeholder: "Food Name",
    },
  ];

  const selectDetails = [
    {
      label: "Food Type",
      id: "foodType",
      value: formData.foodType,
      isValid: isValid.foodType,
      options: [
        { label: "Dry Food", value: "Dry Food" },
        { label: "Wet Food", value: "Wet Food" },
        { label: "Snack", value: "Snack" },
      ],
    },
  ];

  return (
    <form className="form" onSubmit={handleSubmit}>
      <PhotoUpload
        label="Photo"
        id="photo"
        changeInputHandle={handlePhotoChange}
        isInputValid={isValid.foodPhoto}
        preview={photoPreview}
      />
      {inputDetails.map((input) => (
        <Input
          key={input.id}
          label={input.label}
          id={input.id}
          name={input.id}
          value={input.value}
          placeholder={input.placeholder}
          isInputValid={input.isValid}
          changeInputHandle={handleChange}
        />
      ))}
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
      <TextArea
        label="Food Description"
        id="foodDescription"
        name="food description"
        placeholder="food description"
        value={formData.foodDescription}
        isInputValid={isValid.foodDescription}
        changeInputHandle={handleChange}
      />
      <button className="form__button">Submit</button>
    </form>
  );
}

export default AddFoodPage;
