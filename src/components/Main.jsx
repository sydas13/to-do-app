import { useState } from "react";
import Form from "./Form";
import ToDo from "./ToDo";
export default function Main() {
  const [todos, setTodos] = useState([]);

  const TodoContainer = todos.map((todo) => {
    return <ToDo key={todo.taskCreated} {...todo} />;
  });

  const handleSubmit = function (event) {
    event.preventDefault();
    console.log(event.currentTarget);
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
      taskCreated: new Date(),
    };
    setTodos((prev) => [...prev, todo]);

    event.currentTarget.reset();
  };

  return (
    <main className="w-screen my-10 flex flex-row mx-auto justify-around">
      <Form handleSubmit={handleSubmit}></Form>
      <div className="flex flex-col space-y-6 w-[50%]  ">{TodoContainer}</div>
    </main>
  );
}
