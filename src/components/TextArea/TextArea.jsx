import "./TextArea.scss";
import Error from "../Error/Error";
import { useLocation } from "react-router-dom";

const TextArea = ({
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
      <textarea
        className={`form__input form__textarea ${
          isInputValid ? "" : "form__input--error"
        } ${
          location.includes("add")
            ? "form__input--add"
            : location.includes("edit")
            ? ""
            : "form__input--rating"
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

export default TextArea;
