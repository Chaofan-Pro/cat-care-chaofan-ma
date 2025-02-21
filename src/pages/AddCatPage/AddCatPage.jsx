import "./AddCatPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { v2 as cloudinary } from 'cloudinary';
import Input from "../../components/Input/Input";
// const api_key = "661896341535683";
// const cloud_name = "dzhnttkky";

function AddCatPage({ baseUrl }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [intro, setIntro] = useState("");

  const [isNameValid, setNameValid] = useState(true);
  const [isPhotoValid, setPhotoValid] = useState(true);
  const [isBirthdayValid, setBirthdayValid] = useState(true);
  const [isGenderValid, setGenderValid] = useState(true);
  const [isColorValid, setColorValid] = useState(true);
  const [isWeightValid, setWeightValid] = useState(true);
  const [isIntroValid, setIntroValid] = useState(true);

  const changeNameHandle = (e) => {
    setName(e.target.value);
    setNameValid(true);
  };
  const changePhotoHandle = (e) => {
    setPhoto(e.target.files[0]);
    setPhotoValid(true);
  };
  const changeBirthdayHandle = (e) => {
    setBirthday(e.target.value);
    setBirthdayValid(true);
  };
  const changeGenderHandle = (e) => {
    setGender(e.target.value);
    setGenderValid(true);
  };
  const changeColorHandle = (e) => {
    setColor(e.target.value);
    setColorValid(true);
  };
  const changeWeightHandle = (e) => {
    setWeight(e.target.value);
    setWeightValid(true);
  };
  const changeIntroHandle = (e) => {
    setIntro(e.target.value);
    setIntroValid(true);
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    setNameValid(!!name);
    setPhotoValid(!!photo);
    setBirthdayValid(!!birthday);
    setGenderValid(!!gender);
    setColorValid(!!color);
    setWeightValid(!!weight);
    setIntroValid(!!intro);

    if (
      !!name &&
      !!photo &&
      !!birthday &&
      !!gender &&
      !!color &&
      !!weight &&
      !!intro
    ) {
      try {
        await axios.post(
          baseUrl + `/api/cats`,
          {
            name,
            photo,
            birth_date: birthday,
            gender,
            color,
            weight,
            intro,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        navigate(-1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const catDetails = [
    {
      label: "Name",
      id: "name",
      value: name,
      isInputValid: isNameValid,
      changeInputHandle: changeNameHandle,
    },
    // {
    //   label: "Photo",
    //   id: "photo",
    //   value: photo,
    //   isInputValid: isPhotoValid,
    //   changeInputHandle: changePhotoHandle,
    // },
    {
      label: "Birthday",
      id: "birthday",
      value: birthday,
      isInputValid: isBirthdayValid,
      changeInputHandle: changeBirthdayHandle,
    },
    {
      label: "Gender",
      id: "gender",
      value: gender,
      isInputValid: isGenderValid,
      changeInputHandle: changeGenderHandle,
    },
    {
      label: "Color",
      id: "color",
      value: color,
      isInputValid: isColorValid,
      changeInputHandle: changeColorHandle,
    },
    {
      label: "Weight",
      id: "weight",
      value: weight,
      isInputValid: isWeightValid,
      changeInputHandle: changeWeightHandle,
    },
    {
      label: "Intro",
      id: "intro",
      value: intro,
      isInputValid: isIntroValid,
      changeInputHandle: changeIntroHandle,
    },
  ];

  return (
    <>
      <form className="form" onSubmit={submitHandle}>
        {catDetails.map((catDetail) => (
          <Input
            key={catDetail.id}
            label={catDetail.label}
            id={catDetail.id}
            value={catDetail.value}
            placeholder={catDetail.label}
            isInputValid={catDetail.isInputValid}
            changeInputHandle={catDetail.changeInputHandle}
          />
        ))}
        <div>
          <label htmlFor="photo">Photo</label>
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            onChange={changePhotoHandle}
          />
        </div>
        <button className="button form__button">Submit</button>
      </form>
    </>
  );
}

export default AddCatPage;
