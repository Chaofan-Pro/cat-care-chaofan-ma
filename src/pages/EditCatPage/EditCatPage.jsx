import "./EditCatPage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";

function EditCatPage({ baseUrl, cat, fetchCat }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch cat data on component mount
  useEffect(() => {
    fetchCat(id);
  }, [id]);

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    photo: null,
    birthday: "",
    gender: "",
    color: "",
    weight: "",
    intro: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  // Update form data when cat data is loaded
  useEffect(() => {
    if (cat) {
      setFormData({
        name: cat.name || "",
        photo: cat.photo || null,
        birthday: cat.birth_date.split("T")[0] || "",
        gender: cat.gender || "",
        color: cat.color || "",
        weight: cat.weight || "",
        intro: cat.intro || "",
      });
      setPhotoPreview(cat.photo);
    }
  }, [cat, baseUrl]);

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
    console.log(formData);
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
      console.log(formDataToSend);

      await axios.put(`${baseUrl}/api/cats/${id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  if (!cat) return <p>Loading cat data...</p>;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <PhotoUpload
        label="Photo"
        id="photo"
        changeInputHandle={handlePhotoChange}
        isInputValid={isValid.photo}
        preview={photoPreview}
      />
      {[
        { label: "Name", id: "name" },
        { label: "Birthday", id: "birthday" },
        { label: "Color", id: "color" },
        { label: "Weight", id: "weight" },
        { label: "Intro", id: "intro" },
      ].map(({ label, id }) => (
        <Input
          key={id}
          label={label}
          id={id}
          name={id}
          value={formData[id]}
          placeholder={label}
          isInputValid={isValid[id]}
          changeInputHandle={handleChange}
        />
      ))}
      {/* Select Dropdowns */}
      <Select
        label="Gender"
        id="gender"
        name="gender"
        value={formData.gender}
        isInputValid={isValid.gender}
        changeInputHandle={handleChange}
        options={[
          { label: "Female", value: "Female" },
          { label: "Male", value: "Male" },
        ]}
      />
      {/* Submit Button */}
      <button className="button form__button">Save Changes</button>
      <button className="button form__button">Delete Profile</button>
    </form>
  );
}

export default EditCatPage;
