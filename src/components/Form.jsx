export default function Form() {
  return (
    <form className="sliding-window shadow-lg shadow-slate-700 hover:shadow rounded-md px-7 py-7 flex flex-col space-y-7 font-form text-xl mx-auto mb-10 sm:ml-7  bg-purple-100 border-2 border-red-600 hover:border w-[50%] max-w-[400px] min-w-[330px]">
      <div className="flex flex-row items-center justify-start space-x-2">
        <label className="font-bold text-red-700" htmlFor="todo-name">
          Task:
        </label>
        <input
          type="text"
          placeholder="Grocery Shopping"
          id="todo-name"
          name="todo-name"
          className="form-label border-2 rounded-md h-10 px-1 text-base sm:text-lg"
        ></input>
      </div>
      <div className="flex flex-row space-x-2 items-center justify-start">
        <label
          className=" form-label font-bold  text-red-700"
          htmlFor="todo-description"
        >
          Description:
        </label>
        <textarea
          rows={2}
          cols={20}
          placeholder="Buy eggs and tofu"
          id="todo-description"
          name="todo-description"
          className="border-2 rounded-md px-2 text-lg w-full py-1"
        ></textarea>
      </div>
      <div className="flex flex-row space-x-2 items-center justify-start">
        <label className="form-label font-bold text-red-700" htmlFor="priority">
          Priority:
        </label>
        <select
          className="border-2 rounded-md text-lg py-2 px-4"
          id="priority"
          name="priority"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="flex flex-row space-x-2 items-center justify-start">
        <label className="form-label font-bold text-red-700" htmlFor="date">
          Due Date:
        </label>
        <input
          id="date"
          name="date"
          className="border-2 rounded-md text-lg px-3 py-2"
          type="date"
        ></input>
      </div>
      <div className="flex flex-row space-x-2 items-center justify-start">
        <label className="form-label font-bold text-red-700" htmlFor="time">
          Task due at:
        </label>
        <input
          id="time"
          defaultValue="14:30"
          name="time"
          className="border-2 rounded-md text-lg px-3 py-2"
          type="time"
        ></input>
      </div>

      <div className="flex flex-col  justify-start sm:flex-row sm:space-x-4">
        <div className="flex flex-row space-x-2 mx-0">
          <input
            type="radio"
            name="category"
            id="work"
            value="work"
            className=""
          ></input>
          <label className="font-bold text-red-700" htmlFor="work">
            Work
          </label>
        </div>
        <div className="flex flex-row space-x-2 mx-0">
          <input
            type="radio"
            name="category"
            id="personal"
            value="personal"
            className=""
          ></input>
          <label className="font-bold text-red-700" htmlFor="personal">
            Personal
          </label>
        </div>
        <div className="flex flex-row space-x-2">
          <input
            type="radio"
            name="category"
            id="shopping"
            value="shopping"
            className=""
          ></input>
          <label className="font-bold text-red-700" htmlFor="shopping">
            Shopping
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-300 h-10 w-[50%] mx-auto rounded-md border-2 border-blue-700 hover:border-0"
      >
        Submit
      </button>
    </form>
  );
}
