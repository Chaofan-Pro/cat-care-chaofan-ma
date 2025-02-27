import "./EditCatPage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import TextArea from "../../components/TextArea/TextArea";

function EditCatPage({ baseUrl, cat, fetchCat }) {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCat(id);
  }, [id]);

  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    birthday: "",
    gender: "",
    color: "",
    weight: "",
    intro: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  useEffect(() => {
    if (cat) {
      setFormData({
        name: cat.name || "",
        photo: cat.photo || "",
        birthday: cat.birth_date.split("T")[0] || "",
        gender: cat.gender || "",
        color: cat.color || "",
        weight: cat.weight || "",
        intro: cat.intro || "",
      });
      setPhotoPreview(cat.photo);
    }
  }, [cat, baseUrl]);

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
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file)); 
      setIsValid({ ...isValid, photo: true });
    } else {
      setPhotoFile(null);
    }
  };

  const deleteCat = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(`${baseUrl}/api/cats/${id}`);
      navigate("/cat");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newValidation = {
      name: !!formData.name,
      photo: !!(photoFile || formData.photo),
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

    if (isNaN(formData.weight) || formData.weight < 0) {
      alert("Invalid weight! Please enter a positive number.");
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name || "");
      formDataToSend.append("birth_date", formData.birthday || "");
      formDataToSend.append("gender", formData.gender || "");
      formDataToSend.append("color", formData.color || "");
      formDataToSend.append("weight", formData.weight || "");
      formDataToSend.append("intro", formData.intro || "");

      if (photoFile) {
        formDataToSend.append("photo", photoFile);
      } else if (formData.photo) {
        formDataToSend.append("photo", formData.photo);
      }

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
    <article className="main">
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
        ].map(({ label, id }) => (
          <Input
            key={id}
            label={label}
            id={id}
            name={id}
            value={formData[id]}
            isInputValid={isValid[id]}
            changeInputHandle={handleChange}
          />
        ))}
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
        <TextArea
          label="Intro"
          id="intro"
          name="intro"
          value={formData.intro}
          isInputValid={isValid.intro}
          changeInputHandle={handleChange}
        />
        <button type="submit" className="form__button">
          Save Changes
        </button>
      </form>
      <button onClick={deleteCat} className="button button--delete">
        Delete Profile
      </button>
    </article>
  );
}

export default EditCatPage;
