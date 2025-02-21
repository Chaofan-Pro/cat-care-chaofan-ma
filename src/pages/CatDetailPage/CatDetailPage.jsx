import "./CatDetailPage.scss";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function CatDetailPage({ cat, fetchCat }) {
  const { id } = useParams();
  useEffect(() => {
    fetchCat(id);
  }, [id]);
  if (!cat) return <p>No Cat Found</p>;
  return (
    <>
      <article>
        <img className="cat__photo" src={cat.photo} alt="cat photo" />
        <h2>{cat.name}</h2>
        <h3>{cat.birth_date.split("T")[0]}</h3>
        <p>{cat.gender}</p>
      </article>
    </>
  );
}

export default CatDetailPage;
