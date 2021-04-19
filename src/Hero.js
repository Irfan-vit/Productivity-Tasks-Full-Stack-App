import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { db } from "./fire";
import firebase from "firebase";
import TodoListItem from "./Todo";
import "./App.css";

const Hero = ({ handleLogout }) => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []); // blank to run only on first launch

  function getTodos() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress
        }))
      );
    });
  }

  const addTodo = (e) => {
    e.preventDefault();
    if (todoInput === ".") {
      alert("Please Give Any Task");
    } else {
      db.collection("todos").add({
        inprogress: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        todo: todoInput
      });
    }

    setTodoInput("");
  };

  return (
    <section className="hero">
      <nav>
        <h2>To-Do List</h2>
        <button onClick={handleLogout}>Logout</button>
      </nav>

      <div className="ctr">
        <form>
          <TextField
            id="standard-basic"
            label="Enter the task"
            value={todoInput}
            onChange={(e) => {
              setTodoInput(e.target.value);
            }}
          />
          <div className="btn-ctr">
            <Button
              className="btn-stl"
              // disabled={todoInput < 1}
              type="submit"
              varient="contained"
              onClick={addTodo}
            >
              Enter
            </Button>
          </div>
        </form>
      </div>

      {todos.map((todo) => (
        <TodoListItem
          todo={todo.todo}
          inprogress={todo.inprogress}
          // todo={todo.id}
          id={todo.id}
        />
      ))}
    </section>
  );
};

export default Hero;
