import "./Input.scss";
import Error from "../Error/Error";
import { useLocation } from "react-router-dom";

const Input = ({
  label,
  id,
  value,
  placeholder,
  isInputValid,
  changeInputHandle,
}) => {
  const location = useLocation().pathname;

  return (
    <>
      <label className="form__label" htmlFor={id}>
        {label}
      </label>
      <input
        className={`form__input ${isInputValid ? "" : "form__input--error"} ${
          location.includes("add") ? "form__input--add" : ""
        }`}
        type="text"
        id={id}
        value={value}
        onChange={changeInputHandle}
        placeholder={placeholder}
      />
      {!isInputValid && <Error />}
    </>
  );
};

export default Input;
