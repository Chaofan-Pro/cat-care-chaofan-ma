import "./Input.scss";
import Error from "../Error/Error";
import { useLocation } from "react-router-dom";

const Input = ({
  label,
  id,
  type = "text",
  value,
  placeholder,
  isInputValid,
  changeInputHandle,
}) => {
  const location = useLocation().pathname;

  return (
    <div className="form__group">
      <label className="form__label" htmlFor={id}>
        {label}
      </label>
      <input
        className={`form__input ${isInputValid ? "" : "form__input--error"} ${
          location.includes("add") ? "form__input--add" : ""
        }`}
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={changeInputHandle}
        placeholder={placeholder}
      />
      {!isInputValid && <Error />}
    </div>
  );
};

export default Input;
