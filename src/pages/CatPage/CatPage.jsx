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

  return (
    <section className="cats">
      {cats.map((cat) => (
        <Link to={`/cat/${cat.id}`} key={cat.id}>
          <article className="cats__container">
            <img className="cats__photo" src={cat.photo} alt="cat photo" />
            <h2 className="cats__name">{cat.name}</h2>
            <h3 className="cats__birthday">{cat.birth_date.split("T")[0]}</h3>
            <p className="cats__gender">{cat.gender}</p>
          </article>
        </Link>
      ))}
      <Link to="/cat/add">
        <button className="button">Add Cat</button>
      </Link>
    </section>
  );
}

export default CatPage;
