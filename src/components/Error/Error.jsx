import "./Error.scss";

const Error = ({ label, id, value, isInputValid, changeInputHandle }) => {
  return (
    <div className="form__error">
      <img
        className="form__error-icon"
        src="/src/assets/icons/error-24px.svg"
        alt="error icon"
      />
      <p className="form__error-text">This field is required</p>
    </div>
  );
};

export default Error;
