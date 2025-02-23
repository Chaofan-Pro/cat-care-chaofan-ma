import "./Error.scss";
import error from "/error.svg";

const Error = () => {
  return (
    <div className="form__error">
      <img
        className="form__error-icon"
        src={error}
        alt="error icon"
      />
      <p className="form__error-text">This field is required</p>
    </div>
  );
};

export default Error;
