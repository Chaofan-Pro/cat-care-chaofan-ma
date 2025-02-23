import "./PhotoUpload.scss";
import Error from "../Error/Error";
import catIcon from "/cat_icon.png";

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
        <img
          src={catIcon}
          alt="Preview"
          className="cat__photo cat__photo-preview"
        />
      )}
      <label className={isInputValid ? "form__photo-label" : "form__photo-label--error"} htmlFor={id}>
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
