import deleteBtn from "../assets/delete-btn.svg";
export default function ToDos(props) {
  console.log(props);

  const bgColor = {
    low: "bg-yellow-200",
    medium: "bg-red-300",
    high: "bg-green-300",
  };

  const formatDateTime = function (date, time) {
    const dateObj = new Date(date);
    const formatObj = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });
    const dateResult = formatObj.format(dateObj);
    const [hours, minutes] = time.split(":").map((element) => Number(element));
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    const timeResult = now.toTimeString().slice(0, 5);
    return `Due ${dateResult}, ${timeResult}`;
  };

  return (
    <div
      className={`${
        bgColor[props.taskPriority]
      } w-[90%]  max-w-[330px] sm:max-w-[500px]  rounded-md border-2 border-black hover:border-slate-500 mx-auto font-form px-3 pt-2 pb-3 flex flex-col space-y-2 relative`}
    >
      <h1 className="text-xl font-medium">{props.taskName.toUpperCase()}</h1>
      <p className="break-words">{props.taskDescription}</p>
      <p className="text-sm">
        {formatDateTime(props.taskDueDate, props.taskDueTime)}
      </p>
      <input
        type="checkbox"
        name=""
        className="absolute bottom-2 right-4 w-4 h-4 cursor-pointer"
      ></input>
      <img
        src={deleteBtn}
        aria-placeholder="delete-btn"
        className="w-4 h-4 absolute bottom-2 right-11 cursor-pointer"
      ></img>
    </div>
  );
}
