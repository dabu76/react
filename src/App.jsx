/* eslint-disable*/

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  let post = "名古屋うどんグルメ";
  let [title, c_title] = useState([
    "男性服おすすめ",
    "女性服おすすめ",
    "名古屋グルメ",
  ]);
  let [good, g_change] = useState(0);

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: "red", fontSize: "16px" }}>ReactBlog</h4>
      </div>
      <button
        onClick={() => {
          let copy = [...title];
          copy[0] = "女性服おすすめ";
          c_title(copy);
        }}
      >
        change
      </button>
      <button
        onClick={() => {
          let copy = [...title];
          copy.sort();
          c_title(copy);
        }}
      >
        abc
      </button>
      <div className="list">
        <h4>
          {title[0]}
          <span
            onClick={() => {
              g_change(good + 1);
            }}
          >
            👍
          </span>
          {good}
        </h4>
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
      <Modal></Modal>
    </div>
  );
}
function Modal() {
  return (
    <div className="modal">
      <h4>題目</h4>
      <p>日数</p>
      <p>内容</p>
    </div>
  );
}

export default App;
