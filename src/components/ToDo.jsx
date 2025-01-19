import deleteBtn from "../assets/delete-btn.svg";
export default function ToDos() {
  return (
    <div className="bg-red-300 w-[90%]  max-w-[330px] sm:max-w-[500px]  rounded-md border-2 border-black hover:border-slate-500 mx-auto font-form px-3 pt-2 pb-3 flex flex-col space-y-2 relative">
      <h1 className="text-xl font-medium">GROCERY SHOPPING</h1>
      <p className="break-words">
        Buy vegetables, fruits, milk, and snacks from the supermarket. Don’t
        forget to use the discount coupons before they expire.
      </p>
      <p className="text-sm">Due Jan 20,2024, 11:59 AM</p>
      <input
        type="checkbox"
        name=""
        className="absolute bottom-2 right-4 w-4 h-4"
      ></input>
      <img
        src={deleteBtn}
        aria-placeholder="delete-btn"
        className="w-4 h-4 absolute bottom-2 right-11"
      ></img>
    </div>
  );
}
