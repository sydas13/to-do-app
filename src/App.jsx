import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleBinder = function () {
    const formEl = document.querySelector(".todo-form");
    formEl.classList.toggle("hidden");
    formEl.classList.toggle("flex");
    const todoContainerEl = document.querySelector(".todo-container-div");
    todoContainerEl.classList.toggle("hidden");
    todoContainerEl.classList.toggle("flex");
  };

  return (
    <>
      <Header todos={todos} handleBinder={handleBinder}></Header>
      <Main todos={todos} setTodos={setTodos}></Main>
    </>
  );
}

export default App;
