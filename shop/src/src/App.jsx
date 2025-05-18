import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button, Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import image from "./img/bg-1.png";
import food1 from "./img/food1.png";
import "./App.css";
import foods from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Detail from "./routes/Detail.jsx";
import axios from "axios";

function App() {
  let [foodsList, setFoodsList] = useState(foods);
  let navigate = useNavigate();
  let [count, setCount] = useState(0);
  let [wait, setWait] = useState("");

  return (
    <div className="App">
      <Navbar data-bs-theme="dark" className="main_color">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            sannpogate
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="">マップ</Nav.Link>
            <Nav.Link href="#features">グルメ</Nav.Link>
            <Nav.Link href="#pricing">散歩コース</Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail/1");
              }}
            >
              情報
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg-wrapper">
                <img src={image} style={{ width: "100%" }} />
              </div>
              <Container>
                <Row>
                  {foodsList.map((item) => (
                    <Col sm={4} key={item.id}>
                      <div
                        className="food-card"
                        style={{ backgroundImage: `url(${item.img})` }}
                      >
                        <h4>{item.title}</h4>
                        <p>{item.content}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
                {count < 2 ? (
                  <button
                    onClick={() => {
                      setWait("少々お待ちしてください");
                      let count1 = count;
                      let copy = [];
                      count1 = count1 + 1;
                      setCount(count1);
                      if (count1 === 1) {
                        console.log(wait);
                        axios
                          .get("https://codingapple1.github.io/shop/data2.json")
                          .then((result1) => {
                            copy = [...foodsList, ...result1.data];
                            setWait("");
                            setFoodsList(copy);
                          })
                          .catch(() => {
                            console.log("fail");
                            setWait("");
                          });
                      }
                      if (count1 === 2) {
                        axios
                          .get("https://codingapple1.github.io/shop/data3.json")
                          .then((result2) => {
                            let more = [...foodsList, ...result2.data];
                            setFoodsList(more);
                            setWait("");
                          })
                          .catch(() => {
                            console.log("fail");
                            setWait("");
                          });
                      }
                    }}
                  >
                    ボータン
                  </button>
                ) : null}
                <span>{wait}</span>
              </Container>
            </>
          }
        />
        <Route path="/detail/:id" element={<Detail foods={foods}></Detail>} />
        <Route path="/about" element={<About></About>}>
          <Route path="member" element={<div>member</div>} />
          <Route path="location" element={<div>位置情報</div>} />
        </Route>
        <Route path="/event" element={<Event></Event>}>
          <Route path="one" element={<p>初注文時40%クーポンサービス</p>} />
          <Route path="two" element={<p>お誕生日クーポン貰う</p>} />
        </Route>
        <Route path="*" element={<div>ページが見つかりません</div>} />
      </Routes>
    </div>
  );
}
function Modal(props) {
  return (
    <Col sm={4} key={item.id}>
      <div
        className="food-card"
        style={{ backgroundImage: `url(${item.img})` }}
      >
        <h4>{item.title}</h4>
        <p>{item.content}</p>
      </div>
    </Col>
  );
}

function About() {
  return (
    <div>
      <h4>会社情報ページ</h4>
      <Outlet></Outlet>
    </div>
  );
}
function Event() {
  return (
    <div>
      <h2>今日のイベント</h2>
      <Outlet></Outlet>
    </div>
  );
}
export default App;
