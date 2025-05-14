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
  let [good, g_change] = useState(Array(title.length).fill(0));
  let [modal, setModal] = useState(false);
  let [selectedIndex, setSelectedIndex] = useState(null);
  let [i_value, c_value] = useState("");
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
      {/* <div className="list">
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
        <h4 onClick={() => setModal(!modal)}>{title[2]}</h4>
        <p>5月11日発行</p>
      </div>
      {modal === true ? <Modal /> : null} */}
      {title.map(function (item, i) {
        return (
          <div className="list" key={i}>
            <h4
              onClick={() => {
                setModal(!modal);
                setSelectedIndex(i);
              }}
            >
              {item}
              <span
                onClick={(e) => {
                  let copy = [...good];
                  copy[i] += 1;
                  e.stopPropagation();
                  g_change(copy);
                }}
              >
                👍
              </span>
              {good[i]}
            </h4>
            <p>
              5月11日発行{" "}
              <span>
                <button
                  className="d_Btn"
                  onClick={() => {
                    let copy = title.filter((_, idx) => idx !== i);
                    c_title(copy);
                  }}
                >
                  削除
                </button>
              </span>
            </p>
          </div>
        );
      })}
      <input className="new_title" />{" "}
      <button
        onClick={() => {
          let new_title = document.getElementsByClassName("new_title")[0].value;
          let copy = [...title];
          copy.unshift(new_title);
          c_title(copy);
        }}
      >
        入力
      </button>
      {modal === true ? (
        <Modal color={"skyblue"} title={title[selectedIndex]} />
      ) : null}
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal" style={{ background: props.color }}>
      <h4>{props.title}</h4>
      <p>日数</p>
      <p>内容</p>
      <button>修正</button>
    </div>
  );
}

export default App;
