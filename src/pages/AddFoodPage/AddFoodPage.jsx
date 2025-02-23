import "./AddFoodPage.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";

function AddFoodPage({ baseUrl }) {
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(null);
  // Single State for Form Data
  const [formData, setFormData] = useState({
    name: "",
    photo: null,
    birthday: "",
    gender: "",
    color: "",
    weight: "",
    intro: "",
  });

  // Validation States
  const [isValid, setIsValid] = useState({
    name: true,
    photo: true,
    birthday: true,
    gender: true,
    color: true,
    weight: true,
    intro: true,
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
      setFormData({ ...formData, photo: file });
      setPhotoPreview(URL.createObjectURL(file)); // Preview Image
      setIsValid({ ...isValid, photo: true });
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Required Fields
    const newValidation = {
      name: !!formData.name,
      photo: !!formData.photo,
      birthday: !!formData.birthday,
      gender: !!formData.gender,
      color: !!formData.color,
      weight: !!formData.weight,
      intro: !!formData.intro,
    };
    setIsValid(newValidation);

    if (Object.values(newValidation).includes(false)) {
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("photo", formData.photo);
      formDataToSend.append("birth_date", formData.birthday);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("color", formData.color);
      formDataToSend.append("weight", formData.weight);
      formDataToSend.append("intro", formData.intro);
      await axios.post(`${baseUrl}/api/cats`, formDataToSend, {
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
      id: "name",
      value: formData.name,
      isValid: isValid.name,
      placeholder: "Food Brand",
    },
    {
      label: "Food Name",
      id: "birthday",
      value: formData.birthday,
      isValid: isValid.birthday,
      placeholder: "Food Name",
    },
  ];

  // Select Fields
  const selectDetails = [
    {
      label: "Food Type",
      id: "food_type",
      value: formData.gender,
      isValid: isValid.gender,
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
        isInputValid={isValid.photo}
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
      {/* Submit Button */}
      <button className="form__button">Submit</button>
    </form>
  );
}

export default AddFoodPage;
