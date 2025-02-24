import "./Header.scss";
import BackIcon from "../BackIcon/BackIcon";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
function Header() {
  const location = useLocation().pathname;
  return ["/cat", "/food"].includes(location) ? (
    <header></header>
  ) : (
    <header className="header">
      <Link to={-1}>
        <BackIcon />
      </Link>
    </header>
  );
}

export default Header;
