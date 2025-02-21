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
    <>
      {cats.map((cat) => (
        <Link to={`/cat/${cat.id}`} key={cat.id}>
          <article>
            <img className="cat__photo" src={cat.photo} alt="cat photo" />
            <h2>{cat.name}</h2>
            <h3>{cat.birth_date.split("T")[0]}</h3>
            <p>{cat.gender}</p>
          </article>
        </Link>
      ))}
      <button>Add Cat</button>
    </>
  );
}

export default CatPage;
