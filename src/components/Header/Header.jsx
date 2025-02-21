import "./Header.scss";
import arrow from "../../../public/arrow.svg";
import edit from "../../../public/edit.svg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Header() {
  const { id } = useParams();
//   console.log(id);

  return (
    <header className="header">
      <Link to={-1}>
        <img className="icon header__icon" src={arrow} alt="callender icon" />
      </Link>
    </header>
  );
}

export default Header;
