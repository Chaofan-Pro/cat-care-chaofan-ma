import "./EditFoodPage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import TextArea from "../../components/TextArea/TextArea";

function EditFoodPage({ baseUrl, food, fetchFood }) {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchFood(id);
  }, [id]);

  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const [formData, setFormData] = useState({
    foodName: "",
    foodBrand: "",
    foodPhoto: null,
    foodType: "",
    foodDescription: "",
  });

  useEffect(() => {
    if (food) {
      setFormData({
        foodName: food.food_name || "",
        foodBrand: food.food_brand || "",
        foodPhoto: food.food_photo || "",
        foodType: food.food_type || "",
        foodDescription: food.food_description || "",
      });
      setPhotoPreview(food.food_photo);
    }
  }, [food, baseUrl]);
  // Validation States
  const [isValid, setIsValid] = useState({
    foodName: true,
    foodBrand: true,
    foodPhoto: true,
    foodType: true,
    foodDescription: true,
  });

  // Handle Input Changes (Text Inputs)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsValid({ ...isValid, [e.target.name]: true });
  };

  // Handle File Upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setFormData({ ...formData, foodPhoto: file });
      setPhotoPreview(URL.createObjectURL(file)); // Preview Image
      setIsValid({ ...isValid, foodPhoto: true });
    } else {
      setPhotoFile(null);
    }
  };

  const deleteFood = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(`${baseUrl}/api/food/${id}`);
      navigate("/food");
    } catch (error) {
      console.error(error);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Required Fields
    const newValidation = {
      foodName: !!formData.foodName,
      foodBrand: !!formData.foodBrand,
      foodType: !!formData.foodType,
      foodDescription: !!formData.foodDescription,
      foodPhoto: !!formData.foodPhoto,
    };
    setIsValid(newValidation);

    if (Object.values(newValidation).includes(false)) {
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("food_name", formData.foodName);
      formDataToSend.append("food_brand", formData.foodBrand);
      formDataToSend.append("food_type", formData.foodType);
      formDataToSend.append("food_description", formData.foodDescription);

      if (photoFile) {
        formDataToSend.append("food_photo", photoFile); // Append file
      } else if (formData.foodPhoto) {
        formDataToSend.append("food_photo", formData.foodPhoto); // Append URL
      }

      await axios.put(`${baseUrl}/api/food/${id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  // Input Fields
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

  // Select Fields
  const selectDetails = [
    {
      label: "Food Type",
      id: "foodType",
      value: formData.foodType,
      isValid: isValid.foodType,
      options: [
        { label: "Please select", value: "" },
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
      {/* Select Dropdowns */}
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
      {/* Submit Button */}
      <button className="form__button">Submit</button>
    </form>
  );
}

export default EditFoodPage;
