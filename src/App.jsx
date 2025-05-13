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
      {title.map(function (title, i) {
        return (
          <div className="list" key={i}>
            <h4 onClick={() => setModal(!modal)}>
              {title}

              <span
                onClick={() => {
                  let copy = [...good];
                  copy[i] += 1;
                  g_change(copy);
                }}
              >
                👍
              </span>
              {good[i]}
            </h4>
            <p>5月11日発行</p>
          </div>
        );
      })}
      {modal === true ? (
        <Modal color={"skyblue"} title={title} c_title2="女性服おすすめ" />
      ) : null}
    </div>
  );
}

function Modal(props) {
  let [title, c_title] = useState([props.title[0], props.title[1], props[2]]);

  return (
    <div className="modal" style={{ background: props.color }}>
      <h4>{title[0]}</h4>
      <p>日数</p>
      <p>内容</p>
      <button
        onClick={() => {
          let copy = [...title];
          copy = [props.c_title2];
          c_title(copy);
        }}
      >
        修正
      </button>
    </div>
  );
}

export default App;
