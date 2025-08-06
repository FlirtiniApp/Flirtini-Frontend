import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Lists = ({ hideLists, currentDrink }) => {

    const LISTS_API_URL = "http://172.24.3.84:6969"

    const token = localStorage.getItem("token");

    const [lists, setLists] = useState([]);

    const newListInput = useRef(null);

    const [newListButtonActiveStyle, setNewListButtonStyles] = useState("inactive");
    const newListButtonStyles = {
        active: "text-slate-300 hover:text-purple-400 cursor-pointer hover:rotate-90",
        inactive: "text-gray-600"
    }

    const handleInput = () => {
        if (newListInput.current.value.length > 0) {
            setNewListButtonStyles("active");
        } else {
            setNewListButtonStyles("inactive");
        }
    }

    const handleListClose = () => {
        hideLists(false);
        newListInput.current.value = "";
    }

    const createListWithDrink = async () => {

        if (newListInput.current.value == "") return;

        const body = {
            name: newListInput.current.value,
            drinkIds: [Number(currentDrink.id)],
        }
        console.log(body);

        try {
            await axios.post("http://172.24.3.84:6969/listser",
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            )

            console.log("successfully created list with drink.")
        }
        catch (err) {
            console.error(err);
        }
    }

    const addToList = async (listNameGet) => {

        const body = {
            drinkId: currentDrink.id,
            listName: listNameGet
        }

        try {
            await axios.put("http://172.24.3.84:6969/lists",
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            )

            console.log("successfully added to list.")
        }
        catch (err) {
            console.error(err);
        }
    }

    const fetchLists = async () => {
        const token = localStorage.getItem("token");

        try {
            await axios.get(
                `${LISTS_API_URL}/lists`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            )
                .then(response => response.data)
                .then(data => {
                    setLists(data);
                })
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchLists();
    }, []);

    return (
        <div className="p-4 bg-slate-800 w-[40vw] rounded-xl">
            <div className="flex justify-between items-center border-b-2 border-b-slate-400 !pb-2">
                <h1 className="text-xl font-semibold">Add to list</h1>
                <span onClick={() => { handleListClose() }} className="material-symbols-outlined select-none cursor-pointer hover:text-purple-400 transition-[rotate,color] ease-in-out hover:rotate-90">close</span>
            </div>
            <div className="mt-6">
                <div className="w-full flex justify-between items-center gap-2 my-2 last:mb-0 first:mt-0 border-b-2 border-b-slate-600 pb-2 last:border-none">
                    <input onInput={() => { handleInput() }} className="bg-transparent placeholder:italic outline-none flex-1 text-gray-300" placeholder="New list..." ref={newListInput}></input>
                    <span onClick={() => { createListWithDrink() }} className={`material-symbols-outlined ${newListButtonStyles[newListButtonActiveStyle]} select-none transition-[rotate,color] ease-in-out`}>add_circle</span>
                </div>

                {lists?.map((list) => {
                    return (
                        <div className="w-full flex justify-between items-center gap-2 my-2 last:mb-0 first:mt-0 border-b-2 border-b-slate-600 pb-2 last:border-none">
                            <p className="text-normal text-gray-300">{list.name}</p>
                            <span onClick={() => { addToList(list.name) }} className="material-symbols-outlined text-slate-300 select-none cursor-pointer hover:text-purple-400 transition-[rotate,color] ease-in-out hover:rotate-90">add_circle</span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Lists;
