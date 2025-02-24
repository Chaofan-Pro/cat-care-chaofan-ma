import "./CatPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import femaleIcon from "/src/assets/icons/female.svg";
import maleIcon from "/src/assets/icons/male.svg";

function CatPage({ baseUrl }) {
  const [cats, setCats] = useState(null);

  const fetchCats = async () => {
    try {
      const { data } = await axios.get(baseUrl + `/api/cats`);
      setCats(data);
    } catch (error) {
      console.error("ERROR: " + error);
    }
  };

  useEffect(() => {
    fetchCats();
  }, [baseUrl]);

  if (!cats) return <p>No Cat Found</p>;

  function calculateCatAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  }

  return (
    <section className="cats">
      {cats.map((cat) => {
        const age = calculateCatAge(cat.birth_date);
        return (
          <Link to={`/cat/${cat.id}`} key={cat.id}>
            <article className="cats__container">
              <img className="cats__photo" src={cat.photo} alt="cat photo" />
              <div className="cats__row">
                <h2 className="cats__name">{cat.name}</h2>
                {cat.gender === "Female" ? (
                  <img
                    className="cats__gender"
                    src={femaleIcon}
                    alt={cat.gender}
                  />
                ) : (
                  <img
                    className="cats__gender"
                    src={maleIcon}
                    alt={cat.gender}
                  />
                )}
              </div>
              <p className="cats__birthday">
                {age.years > 0 &&
                  `${age.years} year${age.years > 1 ? "s" : ""} `}
                {age.months > 0 &&
                  `${age.months} month${age.months > 1 ? "s" : ""} `}
                {age.days > 0 && `${age.days} day${age.days > 1 ? "s" : ""}`}
              </p>
            </article>
          </Link>
        );
      })}
      <Link to="/cat/add">
        <button className="button">Add Cat</button>
      </Link>
    </section>
  );
}

export default CatPage;
