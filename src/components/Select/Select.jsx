import "./Select.scss";
import Error from "../Error/Error";
import { useLocation } from "react-router-dom";

const Select = ({
  label,
  id,
  value,
  isInputValid,
  changeInputHandle,
  options,
}) => {
  const location = useLocation().pathname;
  console.log(value);
  return (
    <div>
      <label className="form__label" htmlFor={id}>
        {label}
      </label>
      <select
        className={`form__input ${isInputValid ? "" : "form__input--error"} ${
          location.includes("add") ? "form__input--add" : ""
        }`}
        name={id}
        id={id}
        value={value}
        onChange={changeInputHandle}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value} className="option">
            {option.label}
          </option>
        ))}
      </select>
      {!isInputValid && <Error />}
    </div>
  );
};

export default Select;
