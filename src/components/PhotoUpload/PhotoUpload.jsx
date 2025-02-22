import "./PhotoUpload.scss";
import Error from "../Error/Error";
import catIcon from "../../../public/cat_icon.png";

const PhotoUpload = ({
  label,
  id,
  isInputValid,
  changeInputHandle,
  preview,
}) => {
  return (
    <div className="form__photo">
      {preview ? (
        <img src={preview} alt="Preview" className="cat__photo" />
      ) : (
        <img src={catIcon} alt="Preview" className="cat__photo" />
      )}
      <label className="form__label" htmlFor={id}>
        {label}
      </label>
      <input
        className="form__photo-button"
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
