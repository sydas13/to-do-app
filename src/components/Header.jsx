import headerLogoStop from "../assets/stop logo.svg";
export default function Header() {
  return (
    <header className="shadow-md sticky top-10 z-10 bg-white w-screen h-30 rounded-md">
      <h1 className="flex flex-row justify-center items-center space-x-3 sm:space-x-5 font-header ">
        <img
          className="w-14 h-14 sm:w-28 sm:h-28"
          src={headerLogoStop}
          alt="app logo stop"
        ></img>
        <span className="header-text text-2xl sm:text-5xl font-semibold text-[#ffcc00] tracking-widest">
          THE DELAY
        </span>
      </h1>
    </header>
  );
}
