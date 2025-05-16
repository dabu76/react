import { useState } from "react";
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

function App() {
  let [foodsList] = useState(foods);
  let navigate = useNavigate();
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
                navigate("/detail");
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
                    <Modal
                      key={item.id}
                      title={item.title}
                      img={item.img}
                      content={item.content}
                    />
                  ))}
                </Row>
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
    <Col
      className="food-card"
      style={{ backgroundImage: `url(${props.img})` }}
      sm
    >
      <h4>{props.title}</h4>
      <p>{props.content}</p>
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
