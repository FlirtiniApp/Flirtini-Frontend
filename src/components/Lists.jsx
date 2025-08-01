import { useRef, useState } from "react";

const Lists = ({ hideLists }) => {

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

    return (
        <div className="p-4 bg-slate-800 w-[40vw] rounded-xl">
            <div className="flex justify-between items-center border-b-2 border-b-slate-400 !pb-2">
                <h1 className="text-xl font-semibold">Your Lists</h1>
                <span onClick={() => {hideLists(false)}} className="material-symbols-outlined select-none cursor-pointer hover:text-purple-400 transition-colors">close</span>
            </div>
            <div className="mt-6">
                <div className="w-full flex justify-between items-center gap-2 my-2 last:mb-0 first:mt-0 border-b-2 border-b-slate-600 pb-2 last:border-none">
                    <input onInput={() => {handleInput()}} className="bg-transparent placeholder:italic outline-none flex-1 text-gray-300" placeholder="New list..." ref={newListInput}></input>
                    <span className={`material-symbols-outlined ${newListButtonStyles[newListButtonActiveStyle]} select-none transition-[rotate,color] ease-in-out`}>add_circle</span>
                </div>

                <div className="w-full flex justify-between items-center gap-2 my-2 last:mb-0 first:mt-0 border-b-2 border-b-slate-600 pb-2 last:border-none">
                    <p className="text-normal text-gray-300">Drinks for tomorrow</p>
                    <span className="material-symbols-outlined text-slate-300 select-none cursor-pointer hover:text-purple-400 transition-[rotate,color] ease-in-out hover:rotate-90">add_circle</span>
                </div>
                <div className="w-full flex justify-between items-center gap-2 my-2 last:mb-0 first:mt-0 border-b-2 border-b-slate-600 pb-2 last:border-none">
                    <p className="text-normal text-gray-300">Sunday evening</p>
                    <span className="material-symbols-outlined text-slate-300 select-none cursor-pointer hover:text-purple-400 transition-[rotate,color] ease-in-out hover:rotate-90">add_circle</span>
                </div>
                <div className="w-full flex justify-between items-center gap-2 my-2 last:mb-0 first:mt-0 border-b-2 border-b-slate-600 pb-2 last:border-none">
                    <p className="text-normal text-gray-300">With friends</p>
                    <span className="material-symbols-outlined text-slate-300 select-none cursor-pointer hover:text-purple-400 transition-[rotate,color] ease-in-out hover:rotate-90">add_circle</span>
                </div>
                <div className="w-full flex justify-between items-center gap-2 my-2 last:mb-0 first:mt-0 border-b-2 border-b-slate-600 pb-2 last:border-none">
                    <p className="text-normal text-gray-300">Miscellanous</p>
                    <span className="material-symbols-outlined text-slate-300 select-none cursor-pointer hover:text-purple-400 transition-[rotate,color] ease-in-out hover:rotate-90">add_circle</span>
                </div>
            </div>
        </div>
    );
};

export default Lists;
