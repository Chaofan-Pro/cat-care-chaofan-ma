import "./CatPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
              <h2 className="cats__name">{cat.name}</h2>
              <p className="cats__birthday">
                {age.years} year {age.months} month {age.days} day
              </p>
              <p className="cats__gender">{cat.gender}</p>
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
