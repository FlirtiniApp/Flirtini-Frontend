import { useRef, useState } from "react";

const SingleDrink = ({ drink }) => {

    const [showInstructions, setShowInstructions] = useState(false);
    const scrollRef = useRef(null);

    const toggleInstructions = () => {
        if (showInstructions) {
            setShowInstructions(false);
        }
        else {
            setShowInstructions(true);
            console.log(scrollRef.current);
            scrollRef.current?.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }

    return (
        <div className="bg-gray-800 rounded-xl w-[25vw] h-[90vh] overflow-x-hidden overflow-y-hidden">
            <img className="w-full aspect-square rounded-t-xl" src={drink.strDrinkThumb} alt={drink.strDrink} />

            <div ref={scrollRef} className="relative overflow-y-auto overflow-x-hidden h-[calc(80vh-24vw)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600">

                <div style={showInstructions ? { transform: "translateX(-100%)" } : undefined} className="p-4 h-fit transition-transform">
                    <h1 className="text-white text-2xl font-bold border-b-solid border-b-2 border-b-slate-600 !pb-2">{drink.strDrink}</h1>
                    <p className="text-gray-300 !mt-2">{drink.strCategory} &bull; IBA: {drink.strIBA != null ? drink.strIBA : "none"} &bull; {drink.strAlcoholic}</p>
                    <div className="flex gap-2 items-center justify-between !mt-4 flex-wrap">
                        <h2 className="text-white text-xl">Ingredients</h2>
                        <p onClick={() => toggleInstructions()} className="text-purple-400 hover:text-purple-500 text-sm cursor-pointer select-none flex items-center">
                            <span>Show instructions</span>
                            <span className="material-symbols-outlined">arrow_right_alt</span>
                        </p>
                    </div>
                    <p className="text-gray-300 !mt-2 flex justify-between"><span>Tequila</span><span>1 1/2 oz</span></p>
                    <p className="text-gray-300 !mt-2 flex justify-between"><span>Triple sec</span><span>1/2 oz</span></p>
                    <p className="text-gray-300 !mt-2 flex justify-between"><span>Lime juice</span><span>1 oz</span></p>
                    <p className="text-gray-300 !mt-2 flex justify-between"><span>Salt</span></p>
                </div>

                <div style={showInstructions ? undefined : { transform: "translateX(100%)" }} className="p-4 h-fit transition-transform absolute left-0 top-0">
                    <div className="flex gap-2 items-center justify-between !mt-4">
                        <p onClick={() => toggleInstructions()} className="text-purple-400 hover:text-purple-500 text-sm cursor-pointer select-none flex items-center">
                            <span className="material-symbols-outlined">arrow_left_alt</span>
                            <span>Go back</span>
                        </p>
                    </div>
                    <p className="text-gray-300 !mt-2">{drink.strInstructions}</p>
                </div>

            </div>

            <div className="h-[9vh] flex gap-3 mx-[1vw] pb-[2vh]">
                <div className="bg-purple-600 flex-1 flex justify-center items-center rounded-lg hover:bg-purple-500 select-none cursor-pointer transition-colors">
                    <span className="material-symbols-outlined text-slate-300 [transform:scale(1.5)] !text-[3vh]">favorite</span>
                </div>
                <div className="border-purple-600 border-2 border-solid flex-1 flex justify-center items-center rounded-lg select-none cursor-pointer hover:bg-gray-700 transition-colors">
                    <span className="material-symbols-outlined text-slate-300 [transform:scale(1.8)] !text-[3vh]">delete_sweep</span>
                </div>
            </div>
        </div>
    )
}

export default SingleDrink;