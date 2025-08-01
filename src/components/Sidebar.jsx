import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const styles = {
    activeLink: "text-purple-400 hover:text-purple-500 flex items-center gap-3",
    inactiveLink: "text-gray-300 hover:text-white flex items-center gap-3",
  }

  return (
    <div className="h-[96vh] fixed w-[11vw] min-w-fit flex flex-col justify-between my-[2vh] px-4 border-r-2 border-gray-500">
      <div className="flex items-center gap-2">
        <img className="w-[50px]" src="/Flirtini/logo.png" alt="Flirtini Logo" />
        <h1 className="text-white text-2xl font-bold font-[Dancing_Script]">
          Flirtini
        </h1>
      </div>

      <div className="flex flex-col gap-6 items-start mt-6 flex-grow justify-center">
        <NavLink
          to="/explore"
          className={({ isActive }) => (isActive ? styles.activeLink : styles.inactiveLink)}
        >
          <span className="material-symbols-outlined">explore</span>
          <p>Explore</p>
        </NavLink>
        <NavLink
          to="/liked"
          className={({ isActive }) => (isActive ? styles.activeLink : styles.inactiveLink)}
        >
          <span className="material-symbols-outlined">favorite</span>
          <p>Liked</p>
        </NavLink>
        <NavLink
          to="/compose"
          className={({ isActive }) => (isActive ? styles.activeLink : styles.inactiveLink)}
        >
          <span className="material-symbols-outlined">local_bar</span>
          <p>Compose</p>
        </NavLink>
        <NavLink
          to="/todays-choice"
          className={({ isActive }) => (isActive ? styles.activeLink : styles.inactiveLink)}
        >
          <span className="material-symbols-outlined">star</span>
          <p>Today's choice</p>
        </NavLink>
      </div>

      <div>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? styles.activeLink : styles.inactiveLink)}
        >
          <span className="material-symbols-outlined">person</span>
          <p>Profile</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
