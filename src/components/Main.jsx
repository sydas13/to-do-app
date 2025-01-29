import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Form from "./Form";
import ToDo from "./ToDo";

export default function Main() {
  const [todos, setTodos] = useState([]);
  const [filterValue, setFilterValue] = useState("default");

  let todoContainer = [];

  const todoCompleteHtml = `<h1>task completed</h1>`;

  const createTodoContainer = function (todos, filterValue) {
    if (filterValue === "default") {
      todoContainer = todos.map(
        (todo) =>
          !todo.isCompleted && (
            <ToDo
              key={todo.id}
              {...todo}
              handleComplete={handleComplete}
            ></ToDo>
          )
      );
    } else if (filterValue === "completed") {
      todoContainer = todos.map(
        (todo) =>
          todo.isCompleted && (
            <ToDo
              key={todo.id}
              {...todo}
              handleComplete={handleComplete}
            ></ToDo>
          )
      );
    } else {
      todoContainer = todos.map(
        (todo) =>
          !todo.isCompleted &&
          todo.taskCategory === filterValue && (
            <ToDo
              key={todo.id}
              {...todo}
              handleComplete={handleComplete}
            ></ToDo>
          )
      );
    }
  };

  const removeToDo = function (id) {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id != id);
    });
  };

  const handleComplete = function (event) {
    const todoId = event.currentTarget.id;
    todos.forEach((todo) =>
      todo.id === todoId ? { ...todo, isCompleted: true } : todo
    );
    const todoParent = event.currentTarget.closest(".todoContainer");
    todoParent.innerHTML = todoCompleteHtml;

    setTimeout(() => {
      removeToDo(todoId);
    }, 2000);
  };

  const handleSubmit = function (event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const taskName = formData.get("todo-name");
    const taskDescription = formData.get("todo-description");
    const taskPriority = formData.get("todo-priority");
    const taskDueDate = formData.get("todo-date");
    const taskDueTime = formData.get("todo-time");
    const taskCategory = formData.get("todo-category");

    const todo = {
      taskName,
      taskDescription,
      taskPriority,
      taskDueDate,
      taskDueTime,
      taskCategory,
      taskCreated: new Date().getTime(),
      id: uuidv4(),
    };

    setTodos((prev) => [...prev, todo]);

    event.currentTarget.reset();
  };

  createTodoContainer(todos, filterValue);

  const handleFilter = function (event) {
    setFilterValue(event.currentTarget.value);
    createTodoContainer(todos, filterValue);
  };

  return (
    <main className="w-screen my-10 flex flex-row mx-auto justify-around">
      <Form handleSubmit={handleSubmit}></Form>
      <div className="flex flex-col space-y-6 w-[50%]  ">
        <select
          className="border-2 border-black mx-auto max-w-[200px] rounded-md px-1 py-2 font-form"
          onChange={handleFilter}
        >
          <option value="default">Default</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="completed">Completed</option>
        </select>
        {todoContainer}
      </div>
    </main>
  );
}
