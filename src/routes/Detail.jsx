import { useParams } from "react-router-dom";

function Detail(props) {
  let { id } = useParams();
  const result = props.foods.find((foods) => foods.id === parseInt(id));
  return (
    <div className="container">
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
