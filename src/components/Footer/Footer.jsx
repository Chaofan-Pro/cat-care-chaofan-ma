import "./Footer.scss";
import catlender from "../../../public/calendar.svg";
import food from "../../../public/food.svg";
import home from "../../../public/home.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {" "}
        <Link to="/cat">
          <img className="icon footer__icon" src={home} alt="callender icon" />
        </Link>
        <Link to="/food">
          <img className="icon footer__icon" src={food} alt="home icon" />
        </Link>
        <Link to="/catlender">
          <img className="icon footer__icon" src={catlender} alt="food icon" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
