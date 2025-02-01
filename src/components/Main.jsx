import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Form from "./Form";
import ToDo from "./ToDo";

export default function Main({ todos, setTodos }) {
  const [filterValue, setFilterValue] = useState(() => {
    return localStorage.getItem("filterValue") || "default";
  });

  useEffect(() => {
    localStorage.setItem("filterValue", filterValue);
  });

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
    let filteredTodos = [...todos];
    if (filterValue === "default") {
      filteredTodos = filteredTodos.filter((todo) => !todo.isCompleted);
    } else if (filterValue === "completed") {
      filteredTodos = filteredTodos.filter((todo) => todo.isCompleted === true);
    } else if (filterValue === "due-date") {
      filteredTodos = filteredTodos
        .sort((a, b) => a.combinedTime - b.combinedTime)
        .filter((todo) => !todo.isCompleted);
    } else if (filterValue === "priority") {
      filteredTodos = filteredTodos
        .sort((a, b) => a.priorityNumber - b.priorityNumber)
        .filter((todo) => !todo.isCompleted);
    } else if (filterValue === "priorityAndDueDate") {
      filteredTodos = filteredTodos
        .sort((a, b) => a.combinedTime - b.combinedTime)
        .sort((a, b) => a.priorityNumber - b.priorityNumber)
        .filter((todo) => !todo.isCompleted);
    } else {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.taskCategory === filterValue && !todo.isCompleted
      );
    }

    const todoContainer = filteredTodos.map((todo) => (
      <ToDo
        key={todo.id}
        {...todo}
        handleComplete={handleComplete}
        handleRemove={handleRemove}
      ></ToDo>
    ));

    return todoContainer;
  };

  const handleRemove = function (event) {
    const todoParent = event.currentTarget.closest(".todoContainer");
    todoParent.innerHTML = todoRemovedHtml;
    todoParent.classList.add("completed-removed");
    const todoId = event.currentTarget.id;

    setTimeout(() => {
      setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
    }, 4000);
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
      id: uuidv4(),
      combinedTime: combineTimeAndDate(taskDueDate, taskDueTime),
      priorityNumber:
        taskPriority === "low" ? 3 : taskPriority === "medium" ? 2 : 1,
    };

    setTodos((prev) => [...prev, todo]);

    event.currentTarget.reset();
  };

  const handleFilter = function (event) {
    setFilterValue(event.currentTarget.value);
  };

  return (
    <main className="w-screen my-10 flex flex-row justify-evenly md:justify-around">
      <Form handleSubmit={handleSubmit}></Form>
      <div className="todo-container-div hidden sm:flex flex-col space-y-6 w-[90%] sm:w-[40%] md:w-[50%] sm:max-w-[500px] sm:min-w-[300px] ">
        <div className="filter-dropdown-container font-form flex flex-row justify-center items-center space-x-3">
          <label htmlFor="filter-dropdown" className="text-xl font-medium">
            Sort by:
          </label>
          <select
            value={filterValue}
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
            <option value="priority">Priority</option>
            <option value="priorityAndDueDate">Priority and Due Date</option>
          </select>
        </div>

        {createTodoContainer(todos, filterValue)}
      </div>
    </main>
  );
}
