import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Context1 } from "./../App.jsx";

function Detail(props) {
  let { stock } = useContext(Context1);

  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let [num, setNum] = useState(0);
  let [error, setError] = useState("");
  let [modal, setModal] = useState(0);
  let [fade, setFade] = useState("");

  const isNumber = /^-?\d+$/.test(num);
  const handleChange = (e) => {
    setNum(e.target.value);
  };
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
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
    <div className={"container start " + fade}>
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
          <button onClick={() => {}} className="btn btn-danger">
            要約
          </button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setModal(0);
            }}
          >
            ボタン0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setModal(1);
            }}
          >
            ボタン1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setModal(2);
            }}
          >
            ボタン2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent modal={modal}></TabContent>
    </div>
  );
}
function TabContent(props) {
  let { stock } = useContext(Context1);

  let [fade, setFade] = useState("");
  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      clearTimeout(a);
      setFade("");
    };
  }, [props.modal]);
  // if (props.modal === 0) {
  //   return <div>商品の説明</div>;
  // } else if (props.modal === 1) {
  //   return <div>レビュー</div>;
  // } else if (props.modal === 2) {
  //   return <div>商品量</div>;
  // } else {
  //   return null;
  // }
  return (
    <div className={"start " + fade}>
      {
        [
          <div>商品の説明</div>,
          <div>レビュー</div>,
          <div>商品量 : {stock[0]}</div>,
        ][props.modal]
      }
    </div>
  );
}
export default Detail;
