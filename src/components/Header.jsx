import headerLogoStop from "../assets/stop logo.svg";
import emptyBinder from "../assets/empty binder.svg";
import filledBinder from "../assets/filled binder.svg";
export default function Header({ todos, handleBinder }) {
  return (
    <header className="shadow-md sticky top-0 z-10 bg-white w-full mx-aut h-14 sm:h-28 rounded-md font-header">
      <img
        onClick={handleBinder}
        src={todos.length > 0 ? filledBinder : emptyBinder}
        alt="see tasks"
        className="w-8 h-8 right-5 top-3 absolute cursor-pointer sm:hidden"
      ></img>
      <h1 className="flex flex-row justify-center items-center space-x-2 sm:space-x-5 ">
        <img
          className="w-12 h-12 sm:w-28 sm:h-28 mt-1 sm:mt-0"
          src={headerLogoStop}
          alt="app logo stop"
        ></img>
        <span className="header-text text-xl sm:text-5xl font-semibold text-[#ffcc00] tracking-widest">
          THE DELAY
        </span>
      </h1>
    </header>
  );
}
