import "./Header.scss";
import arrow from "../../../public/arrow.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to={-1}>
        <img className="icon header__icon" src={arrow} alt="callender icon" />
      </Link>
    </header>
  );
}

export default Header;
