import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button, Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import image from "./img/bg-1.png";
import food1 from "./img/food1.png";
import "./App.css";
import foods from "./data.js";

import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  let [foodsList] = useState(foods);

  return (
    <div className="App">
      <Navbar data-bs-theme="dark" className="main_color">
        <Container>
          <Navbar.Brand href="#home">sannpogate</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">マップ</Nav.Link>
            <Nav.Link href="#features">グルメ</Nav.Link>
            <Nav.Link href="#pricing">散歩コース</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div
        className="main-bg food_img1"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
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

export default App;
