import "./Footer.scss";
import HomeIcon from "../HomeIcon/HomeIcon";
import FoodIcon from "../FoodIcon/FoodIcon";
import CatlenderIcon from "../CatlenderIcon/CatlenderIcon";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Link to="/cat">
          <HomeIcon />
        </Link>
        <Link to="/food">
          <FoodIcon />
        </Link>
        <Link to="/catlender">
          <CatlenderIcon />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
