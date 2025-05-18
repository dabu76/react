import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail(props) {
  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let [num, setNum] = useState(0);
  let [error, setError] = useState("");
  const isNumber = /^-?\d+$/.test(num);
  const handleChange = (e) => {
    setNum(e.target.value);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 2000);
    if (!isNumber) {
      setError("数字だけ入力してください");
    } else {
      setError("");
    }
    return () => {
      clearTimeout(timer);
    };
  }, [num]);

  let { id } = useParams();
  const result = props.foods.find((foods) => foods.id === parseInt(id));
  return (
    <div className="container">
      {alert == true ? (
        <div className="alert alert-warning">2秒以内購入したら割引</div>
      ) : null}
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
          <p>{error}</p>
          <input onChange={handleChange} type="text"></input>
          <h4 className="p">{result.title}</h4>
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
