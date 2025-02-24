import "./AddCatPage.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import TextArea from "../../components/TextArea/TextArea";

function AddCatPage({ baseUrl }) {
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    photo: null,
    birthday: "",
    gender: "",
    color: "",
    weight: "",
    intro: "",
  });

  const [isValid, setIsValid] = useState({
    name: true,
    photo: true,
    birthday: true,
    gender: true,
    color: true,
    weight: true,
    intro: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsValid({ ...isValid, [e.target.name]: true });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPhotoPreview(URL.createObjectURL(file)); 
      setIsValid({ ...isValid, photo: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    
    if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(formData.birthday)) {
      alert("Invalid date format! Please use YYYY-MM-DD.");
    }

    if (isNaN(formData.weight) || formData.weight <= 0) {
      alert("Invalid weight! Please enter a positive number.");
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

  const inputDetails = [
    {
      label: "Name",
      id: "name",
      value: formData.name,
      isValid: isValid.name,
      placeholder: "Name",
    },
    {
      label: "Birthday",
      id: "birthday",
      value: formData.birthday,
      isValid: isValid.birthday,
      placeholder: "YYYY-MM-DD",
    },
    {
      label: "Color",
      id: "color",
      value: formData.color,
      isValid: isValid.color,
      placeholder: "Color",
    },
    {
      label: "Weight(kg)",
      id: "weight",
      value: formData.weight,
      isValid: isValid.weight,
      placeholder: "Weight",
    },
  ];

  const selectDetails = [
    {
      label: "Gender",
      id: "gender",
      value: formData.gender,
      isValid: isValid.gender,
      options: [
        { label: "Female", value: "female" },
        { label: "Male", value: "male" },
      ],
    },
  ];

  const textareaDetails = {
    label: "Intro",
    id: "intro",
    value: formData.intro,
    isValid: isValid.intro,
    placeholder: "Intro",
  };

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
        label={textareaDetails.label}
        id={textareaDetails.id}
        name={textareaDetails.id}
        value={textareaDetails.value}
        placeholder={textareaDetails.placeholder}
        isInputValid={textareaDetails.isValid}
        changeInputHandle={handleChange}
      />
      <button className="form__button">Submit</button>
    </form>
  );
}

export default AddCatPage;
