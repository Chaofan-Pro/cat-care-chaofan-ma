import "./PhotoUpload.scss";
import Error from "../Error/Error";
import catIcon from "../../assets/icons/cat_icon.png";
import foodIcon from "../../assets/icons/food.png";
import { useLocation } from "react-router-dom";

const PhotoUpload = ({
  label,
  id,
  isInputValid,
  changeInputHandle,
  preview,
}) => {
  const location = useLocation().pathname;

  return (
    <div className="form__photo">
      {preview ? (
        <img src={preview} alt="Preview" className="cat__photo" />
      ) : location === "/cat/add" ? (
        <img
          src={catIcon}
          alt="Preview"
          className="cat__photo cat__photo-preview"
        />
      ) : (
        <img
          src={foodIcon}
          alt="Preview"
          className="cat__photo cat__photo-preview"
        />
      )}
      <label
        className={
          isInputValid ? "form__photo-label" : "form__photo-label--error"
        }
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="file-upload"
        type="file"
        id={id}
        name={id}
        accept="image/*"
        onChange={changeInputHandle}
      />
      {!isInputValid && <Error />}
    </div>
  );
};

export default PhotoUpload;
