import "./AddCatPage.scss";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";

function AddCatPage({ baseUrl }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setColor] = useState("");
  const [color, setContactName] = useState("");
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
    setPhoto(e.target.value);
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
    setPhone(e.target.value);
    setPhoneValid(true);
  };
  const changeEmailHandle = (e) => {
    setEmail(e.target.value);
    setEmailValid(true);
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    setNameValid(!!name);
    setAddressValid(!!address);
    setCityValid(!!city);
    setCountryValid(!!country);
    setContactNameValid(!!contactName);
    setContactPositionValid(!!contactPosition);
    setPhoneValid(!!phone);
    setEmailValid(!!email);

    if (
      !!name &&
      !!address &&
      !!city &&
      !!country &&
      !!contactName &&
      !!contactPosition &&
      !!phone &&
      !!email
    ) {
      try {
        await axios.post(baseUrl + `/api/warehouses`, {
          warehouse_name: name,
          address,
          city,
          country,
          contact_name: contactName,
          contact_position: contactPosition,
          contact_phone: phone,
          contact_email: email,
        });
        navigate(-1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const warehouseDetails = [
    {
      label: "Warehouse Name",
      id: "warehouse_name",
      value: name,
      isInputValid: isNameValid,
      changeInputHandle: changeNameHandle,
    },
    {
      label: "Street Address",
      id: "address",
      value: address,
      isInputValid: isAddressValid,
      changeInputHandle: changeAddressHandle,
    },
    {
      label: "City",
      id: "city",
      value: city,
      isInputValid: isCityValid,
      changeInputHandle: changeCityHandle,
    },
    {
      label: "Country",
      id: "country",
      value: country,
      isInputValid: isCountryValid,
      changeInputHandle: changeCountryHandle,
    },
  ];
  const contactDetails = [
    {
      label: "Contact Name",
      id: "contact_name",
      value: contactName,
      isInputValid: isContactNameValid,
      changeInputHandle: changeContactNameHandle,
    },
    {
      label: "Position",
      id: "contact_position",
      value: contactPosition,
      isInputValid: isContactPositionValid,
      changeInputHandle: changeContactPositionHandle,
    },
    {
      label: "Phone Number",
      id: "contact_phone",
      value: phone,
      isInputValid: isPhoneValid,
      changeInputHandle: changePhoneHandle,
    },
    {
      label: "Email",
      id: "contact_email",
      value: email,
      isInputValid: isEmailValid,
      changeInputHandle: changeEmailHandle,
    },
  ];

  return (
    <>
      <article></article>
    </>
  );
}

export default AddCatPage;
