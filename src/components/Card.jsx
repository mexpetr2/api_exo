import React from "react";

function Card({ student }) {
  return (
    <div className="Card">
      <h1>{student.firstName}</h1>
      <h2>{student.lastName}</h2>
      <p>{student.age}</p>
      <p>{student.language}</p>
    </div>
  );
}

export default Card;
