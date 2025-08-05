import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  const loadProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://172.24.3.162:3000/account/profile",
        { withCredentials: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-2/3 h-7/8">
          <div class="grid grid-cols-2 grid-rows-3 h-full border-1 border-white rounded-2xl">
            <div class="p-8 flex justify-center items-center">
              <h3 className="text-5xl">
                Hello{" "}
                <span className="italic font-medium text-purple-500">
                  {user?.login}
                </span>{" "}
                !
              </h3>
            </div>

            <div class="row-span-3 p-2 pl-0">
              <div className="border-l border-white h-full flex justify-center items-center">
                <img src="joice.png" alt="joice xdxd" className="w-4/5" />
              </div>
            </div>

            <div class="p-7 pb-10 h-100 text-xl gap-9 flex flex-col justify-center border-y-1 w-12/13 m-auto border-white">
              <p>
                <span className="text-3xl mr-2">Name:</span>
                <span className="text-white/80 text-2xl">
                  {user?.firstName} {user?.lastName}
                </span>
              </p>
              <p>
                <span className="text-3xl mr-2">Birthday:</span>
                <span className="text-white/80 text-2xl">
                  {user?.birthDate
                    ? new Date(user.birthDate).toLocaleDateString("pl-PL")
                    : ""}
                </span>
              </p>
              <p>
                <span className="text-3xl mr-2">Email:</span>
                <span className="text-white/80 text-2xl">{user?.email}</span>
              </p>
              <p>
                <span className="text-3xl mr-2">Phone number:</span>
                <span className="text-white/80 text-2xl">
                  {user?.phoneNumber}
                </span>
              </p>
            </div>

            <div className="h-29 mt-auto flex justify-center items-center">
              <button
                onClick={() => {
                  const target = document.getElementById("lists");
                  target?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-50 h-18 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined [transform:scale(1.8)] text-white leading-none">
                  bookmarks
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* listy */}
      <div className="h-screen w-full p-7 border-t-1 border-white" id="lists">
        <div className="flex flex-row flex-wrap justify-center gap-4">
          <div className="w-1/4 aspect-square relative ">
            <div className="w-full h-full border-white rounded-xl border p-2 blur-[1px] hover:blur-[0px] bg-[url(/logo.png)] bg-no-repeat bg-center bg-cover"></div>
            <span className="absolute bottom-0 left-0 p-4 text-2xl tracking-wider text-white/50">
              NAZWA
            </span>
          </div>
          <div className="w-1/4 aspect-square relative">
            <div className="w-full h-full border-white rounded-xl border p-2 blur-[1px] hover:blur-[0px]"></div>
            <span className="absolute bottom-0 left-0 p-4 text-2xl tracking-wider text-white/50">
              NAZWA
            </span>
          </div>
          <div className="w-1/4 aspect-square relative">
            <div className="w-full h-full border-white rounded-xl border p-2 blur-[1px] hover:blur-[0px]"></div>
            <span className="absolute bottom-0 left-0 p-4 text-2xl tracking-wider text-white/50">
              NAZWA
            </span>
          </div>
          <div className="w-1/4 aspect-square relative">
            <div className="w-full h-full border-white rounded-xl border p-2 blur-[1px] hover:blur-[0px]"></div>
            <span className="absolute bottom-0 left-0 p-4 text-2xl tracking-wider text-white/50">
              NAZWA
            </span>
          </div>
          <div className="w-1/4 aspect-square relative">
            <div className="w-full h-full border-white rounded-xl border p-2 blur-[1px] hover:blur-[0px]"></div>
            <span className="absolute bottom-0 left-0 p-4 text-2xl tracking-wider text-white/50">
              NAZWA
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
