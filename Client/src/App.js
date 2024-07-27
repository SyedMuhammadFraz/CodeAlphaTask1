import React, { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";
import axios from "axios";

function App() {
  const [listTodo, setListTodo] = useState([]);

  // Add List Function
  let addList = (inputText) => {
    if (inputText !== "") setListTodo([...listTodo, inputText]);
  };

  // Add List Function

  let deleteListItem = (key) => {
    let newList = [...listTodo];
    newList.splice(key, 1);
    setListTodo(newList);
  };

  // GETTING through API
  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = () => {
    axios
      .get("http://localhost:3001/get")
      .then((res) => {
        if (res.data !== undefined) {
          setListTodo(res.data);
          console.log("Recieved" + res.data);
        } else {
          console.error("No data received from API");
        }
      })
      .catch((err) => console.log(err));
  };

  // Update APIS

  const handleEdit = (id, done) => {
    setListTodo((prevList) =>
      prevList.map((item) =>
        item._id === id ? { ...item, done: !item.done } : item
      )
    );

    axios
      .put(`http://localhost:3001/update/${id}`, { done: !done })
      .then((result) => {
        if (result.data !== undefined) {
          console.log(result);
          // Optionally, refetch list to ensure consistency with backend
          // fetchTodoList();
        } else {
          console.error("No data received from API");
        }
      })
      .catch((err) => {
        console.log(err);
        // Revert local state in case of error
        setListTodo((prevList) =>
          prevList.map((item) =>
            item._id === id ? { ...item, done: !item.done } : item
          )
        );
      });
  };

  // Delete API

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then((result) => {
        if (result.data !== undefined) {
          console.log("Delete successful:", result.data);
          fetchTodoList();
        } else {
          console.error("No data received from API");
        }
      })
      .catch((err) => console.error("Error deleting the task:", err));
  };

  return (
    <div className="main-container">
      <div className="center-container">
        <TodoInput addList={addList} />
        {listTodo.length === 0 ? (
          <div>
            <h2>No Record</h2>
          </div>
        ) : (
          listTodo.map((listItem, index) => {
            return (
              <TodoList
                key={listItem._id}
                index={index}
                item={listItem}
                deleteListItem={deleteListItem}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
