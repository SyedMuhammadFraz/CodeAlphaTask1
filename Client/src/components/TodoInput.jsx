import React, { useState } from "react";
import axios from "axios";

function TodoInput(props) {
  const [inputText, setInputText] = useState("");

  const handleEnter = (e) => {
    if (e.keyCode == 13) {
      handleAdd();
    }
  };

  const handleAdd = () => {
    axios
      .post("http://localhost:3001/add", { task: inputText })
      .then((res) => {
        props.addList(res.data);
        setInputText=''
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Enter your task"
        className="input-box-todo"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        onKeyDown={handleEnter}
      />
      <button
        className="add-btn"
        onClick={() => {
          handleAdd();
        }}
      >
        +
      </button>
    </div>
  );
}

export default TodoInput;
