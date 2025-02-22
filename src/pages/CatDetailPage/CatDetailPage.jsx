import "./CatDetailPage.scss";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function CatDetailPage({ cat, fetchCat }) {
  const { id } = useParams();
  useEffect(() => {
    fetchCat(id);
  }, [id]);
  //   console.log(id);

  if (!cat) return <p>No Cat Found</p>;
  return (
    <>
      <article className="cat">
        <img className="cat__photo" src={cat.photo} alt="cat photo" />
        <h2 className="cat__name">{cat.name}</h2>
        <h3 className="cat__text">Birthday: {cat.birth_date.split("T")[0]}</h3>
        <p className="cat__text">Gender: {cat.gender}</p>
        <p className="cat__text">Color: {cat.color}</p>
        <p className="cat__text">Weight: {cat.weight}kg</p>
        <p className="cat__text">Intro: {cat.intro}</p>
        <button className="button">Favorite Food</button>
        <button className="button">Catlender</button>
        <Link to={`/cat/edit/${id}`}>
          <button className="button">Edit Profile</button>
        </Link>
      </article>
    </>
  );
}

export default CatDetailPage;
