// App.jsx
import { Suspense, lazy, createContext, useEffect, useState } from "react";
import { Button, Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import image from "./img/bg-1.png";
import "./App.css";
import foods from "./data.js";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Detail = lazy(() => import("./routes/Detail.jsx"));
const Cart = lazy(() => import("./routes/cart.jsx"));
export const Context1 = createContext();

function App() {
  useEffect(() => {
    const existing = localStorage.getItem("watched");
    if (!existing) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);
  const [foodsList, setFoodsList] = useState(foods);
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [wait, setWait] = useState("");
  const [stock] = useState([10, 11, 12]);
  let result = useQuery({
    queryKey: ["name"],
    queryFn: () =>
      axios
        .get("https://codingapple1.github.io/userdata.json")
        .then((res) => res.data),
  });

  return (
    <div className="App">
      <Navbar data-bs-theme="dark" className="main_color">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>sannpogate</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="">マップ</Nav.Link>
            <Nav.Link href="#features">グルメ</Nav.Link>
            <Nav.Link href="#pricing">散歩コース</Nav.Link>
            <Nav.Link onClick={() => navigate("/detail/1")}>情報</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {result.isLoading ? "ローディング中" : result.data.name}
            {result.error ? "エラー発生" : null}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg-wrapper">
                <img src={image} style={{ width: "100%" }} alt="main" />
              </div>
              <Container>
                <Row>
                  {foodsList.map((item) => (
                    <Modal key={item.id} item={item} />
                  ))}
                </Row>

                {count < 2 && (
                  <button
                    onClick={() => {
                      setWait("少々お待ちしてください");
                      const nextCount = count + 1;
                      setCount(nextCount);

                      if (nextCount === 1) {
                        axios
                          .get("https://codingapple1.github.io/shop/data2.json")
                          .then((res) => {
                            setFoodsList([...foodsList, ...res.data]);
                            setWait("");
                          })
                          .catch(() => {
                            console.log("fail");
                            setWait("");
                          });
                      }

                      if (nextCount === 2) {
                        axios
                          .get("https://codingapple1.github.io/shop/data3.json")
                          .then((res) => {
                            setFoodsList([...foodsList, ...res.data]);
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
                )}
                <span>{wait}</span>
              </Container>
            </>
          }
        />

        <Route
          path="/detail/:id"
          element={
            <Context1.Provider value={{ stock }}>
              <Suspense fallback={<div>ローディング中</div>}>
                <Detail foods={foodsList} />
              </Suspense>
            </Context1.Provider>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>member</div>} />
          <Route path="location" element={<div>位置情報</div>} />
        </Route>

        <Route path="/event" element={<Event />}>
          <Route path="one" element={<p>初注文時40%クーポンサービス</p>} />
          <Route path="two" element={<p>お誕生日クーポン貰う</p>} />
        </Route>

        <Route path="*" element={<div>ページが見つかりません</div>} />
      </Routes>
    </div>
  );
}

// ✨ item을 props로 받아서 카드로 렌더링
function Modal({ item }) {
  return (
    <Col sm={4}>
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
      <Outlet />
    </div>
  );
}

function Event() {
  return (
    <div>
      <h2>今日のイベント</h2>
      <Outlet />
    </div>
  );
}

export default App;
