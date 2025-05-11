import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  let post = "名古屋うどんグルメ";
  let [title, b] = useState([
    "男性服おすすめ",
    "女性服おすすめ",
    "名古屋グルメ",
  ]);
  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: "red", fontSize: "16px" }}>ReactBlog</h4>
      </div>
      <div className="list">
        <h4>{title[0]}</h4>
        <p>5月11日発行</p>
      </div>
      <div className="list">
        <h4>{title[1]}</h4>
        <p>5月11日発行</p>
      </div>
      <div className="list">
        <h4>{title[2]}</h4>
        <p>5月11日発行</p>
      </div>
    </div>
  );
}

export default App;
