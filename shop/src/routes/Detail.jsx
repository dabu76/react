import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail(props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const alert = document.getElementsByClassName("alert")[0];
      alert.style.display = "none";
    }, 2000);
  });

  let [count, setCount] = useState(0);

  let { id } = useParams();
  const result = props.foods.find((foods) => foods.id === parseInt(id));
  return (
    <div className="container">
      <div className="alert alert-warning">2秒以内購入したら割引</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        ボータン
      </button>
      <div className="row">
        <div className="col-md-6">
          <img src={result.img} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{result.title}</h4>
          <p>{result.content}</p>
          <p>{result.price}</p>
          <p>2.5km</p>
          <button className="btn btn-danger">要約</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
