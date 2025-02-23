import "./Header.scss";
import arrow from "/arrow.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
function Header() {
  const location = useLocation().pathname;
  console.log(location);
  return location === "/cat" ? (
    <header></header>
  ) : (
    <header className="header">
      <Link to={-1}>
        <img className="icon header__icon" src={arrow} alt="callender icon" />
      </Link>
    </header>
  );
}

export default Header;
