import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Form from "./Form";
import ToDo from "./ToDo";

export default function Main() {
  const [todos, setTodos] = useState([]);
  const [filterValue, setFilterValue] = useState("default");

  let todoContainer = [];

  const todoCompleteHtml = `<h1>task completed</h1>`;
  const todoRemovedHtml = `<h1>task removed</h1>`;

  const combineTimeAndDate = function (date, time) {
    const dateObj = new Date(date);
    const [hours, mins] = time.split(":").map((element) => Number(element));
    dateObj.setHours(hours, mins, 0, 0);
    const result = dateObj.getTime();
    return result;
  };

  const createTodoContainer = function (todos, filterValue) {
    if (filterValue === "default") {
      todoContainer = todos.map(
        (todo) =>
          !todo.isCompleted && (
            <ToDo
              key={todo.id}
              {...todo}
              handleComplete={handleComplete}
              handleRemove={handleRemove}
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
              handleRemove={handleRemove}
            ></ToDo>
          )
      );
    } else if (filterValue === "due-date") {
      const todoCopy = [...todos];
      todoCopy.sort((a, b) => a.combinedTime - b.combinedTime);
      todoContainer = todoCopy.map(
        (todo) =>
          !todo.isCompleted && (
            <ToDo
              key={todo.id}
              {...todo}
              handleComplete={handleComplete}
              handleRemove={handleRemove}
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
              handleRemove={handleRemove}
            ></ToDo>
          )
      );
    }
  };

  const handleRemove = function (event) {
    const todoParent = event.currentTarget.closest(".todoContainer");
    todoParent.innerHTML = todoRemovedHtml;
    todoParent.classList.add("completed-removed");
    const todoId = event.currentTarget.id;
    console.log(todoId);
    setTimeout(() => {
      setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
    }, 4000);
    console.log(todos);
  };

  const handleComplete = function (event) {
    const todoParent = event.currentTarget.closest(".todoContainer");
    todoParent.innerHTML = todoCompleteHtml;
    todoParent.classList.add("completed-removed");
    const todoId = event.currentTarget.id;
    setTimeout(() => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === todoId ? { ...todo, isCompleted: true } : todo
        )
      );
    }, 4000);
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
      combinedTime: combineTimeAndDate(taskDueDate, taskDueTime),
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
        <div className="filter-dropdown-container font-form flex flex-row justify-center items-center space-x-3">
          <label htmlFor="filter-dropdown" className="text-xl font-medium">
            Sort by:
          </label>
          <select
            className="border-2 bg-slate-300 border-black mx-auto max-w-[200px] rounded-md px-1 py-2 "
            id="filter-dropdown"
            onChange={handleFilter}
          >
            <option value="default">Default</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="completed">Completed</option>
            <option value="due-date">Due Date</option>
          </select>
        </div>

        {todoContainer}
      </div>
    </main>
  );
}
