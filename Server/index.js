const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/todo");

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
    done: "false",
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Retreiving all the tasks

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Updating status of task

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  TodoModel.findByIdAndUpdate(id, { done: done }, { new: true })
    .then((result) => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Deleting the task by id

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.status(200).send({ message: "Task successfully deleted", result });
      } else {
        res.status(404).send({ message: "Task not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "Error deleting the task", error: err });
    });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
