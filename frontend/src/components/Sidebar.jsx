import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-[96vh] fixed w-[11vw] flex flex-col justify-between my-[2vh] px-4 border-r-2 border-gray-500">
      <div className="flex items-center gap-2">
        <img className="w-[3vw]" src="/Flirtini/logo.png" alt="Flirtini Logo" />
        <h1 className="text-white text-2xl font-bold font-[Dancing_Script]">
          Flirtini
        </h1>
      </div>

      <div className="flex flex-col gap-6 items-start mt-6 flex-grow justify-center">
        <Link
          to="/explore"
          className="text-gray-300 hover:text-white flex items-center gap-3"
        >
          <span className="material-symbols-outlined">explore</span>
          <p>Explore</p>
        </Link>
        <Link
          to="/liked"
          className="text-gray-300 hover:text-white flex items-center gap-3"
        >
          <span className="material-symbols-outlined">favorite</span>
          <p>Liked</p>
        </Link>
        <Link
          to="/compose"
          className="text-gray-300 hover:text-white flex items-center gap-3"
        >
          <span className="material-symbols-outlined">local_bar</span>
          <p>Compose</p>
        </Link>
        <Link
          to="/todays-choice"
          className="text-gray-300 hover:text-white flex items-center gap-3"
        >
          <span className="material-symbols-outlined">star</span>
          <p>Today's choice</p>
        </Link>
      </div>

      <div>
        <Link
          to="/profile"
          className="text-gray-300 hover:text-white flex items-center gap-3"
        >
          <span className="material-symbols-outlined">person</span>
          <p>Profile</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
