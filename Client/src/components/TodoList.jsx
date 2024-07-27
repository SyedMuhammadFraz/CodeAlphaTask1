import React from "react";
import "../App.css";
import { BsCircle, BsCircleFill } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";

function TodoList(props) {
  return (
    <li>
      <span>
        <div
          className="checkbox"
          onClick={() => props.handleEdit(props.item._id, props.item.done)}
        >
          {props.item.done === true ? (
            <BsCircleFill />
          ) : (
            <BsCircle />
          )}
        </div>
      </span>
      <span className={`task ${props.item.done ? "completed" : ""}`}>
        {props.item.task}
      </span>
      <span>
        <FaRegTrashAlt
          className="delete-icon"
          onClick={() => {
            props.handleDelete(props.item._id);
          }}
        />
      </span>
    </li>
  );
}

export default TodoList;
