import { useRef, useState, forwardRef, useImperativeHandle } from "react";

const SingleDrink = forwardRef(
  ({ drink, killDrink, showLists, isAdded }, ref) => {
    const [showInstructions, setShowInstructions] = useState(false);
    const scrollRef = useRef(null);

    const [disabled, setDisabled] = useState(false);

    useImperativeHandle(ref, () => ({
      enableButtons: () => {
        setDisabled(false);
      },
    }));

    const handleClick = (isFavorite) => {
      if (!disabled) {
        setDisabled(true);
        if (isFavorite) killDrink(true, drink.id, drink.name);
        else killDrink(false, drink.id, drink.name);
      }
    };

    const handleListAdd = () => {
      showLists(true);
    };

    const toggleInstructions = () => {
      if (showInstructions) {
        setShowInstructions(false);
      } else {
        setShowInstructions(true);
        scrollRef.current?.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    return (
      <div
        className={`bg-gray-800 rounded-xl w-[25vw] overflow-x-hidden overflow-y-hidden ${
          isAdded ? "" : "h-[90vh]"
        }`}
      >
        <img
          className="w-full aspect-square rounded-t-xl"
          src={drink.image}
          alt={drink.name}
        />

        <div
          ref={scrollRef}
          className={`relative overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600 ${
            isAdded ? "" : "h-[calc(80vh-24vw)]"
          }`}
        >
          <div
            style={
              showInstructions ? { transform: "translateX(-100%)" } : undefined
            }
            className="p-4 h-fit transition-transform"
          >
            <div className="w-full flex justify-between items-center border-b-solid border-b-2 border-b-slate-600 !pb-2">
              <h1 className="text-white text-2xl font-bold">{drink.name}</h1>
              <span
                onClick={() => {
                  handleListAdd();
                }}
                className="material-symbols-outlined cursor-pointer select-none transition-[rotate,color] ease-in-out hover:rotate-90 hover:text-purple-400"
              >
                add_circle
              </span>
            </div>
            <p className="text-gray-300 !mt-2">
              {drink.category} &bull; IBA:{" "}
              {drink.IBA != null ? drink.IBA : "none"} &bull;{" "}
              {drink.isAlcoholic}
            </p>
            <div className="flex gap-2 items-center justify-between !mt-4 flex-wrap">
              <h2 className="text-white text-xl">Ingredients</h2>
              <p
                onClick={() => toggleInstructions()}
                className="text-purple-400 hover:text-purple-500 text-sm cursor-pointer select-none flex items-center"
              >
                <span>Show instructions</span>
                <span className="material-symbols-outlined">
                  arrow_right_alt
                </span>
              </p>
            </div>
            {drink.ingredients.map((ingredient, index) => {
              return (
                <p
                  key={`ingredient${index}`}
                  className="text-gray-300 !mt-2 flex justify-between"
                >
                  <span>{ingredient.ingredient}</span>
                  <span>{ingredient.measure || "to taste"}</span>
                </p>
              );
            })}
          </div>

          <div
            style={
              showInstructions ? undefined : { transform: "translateX(100%)" }
            }
            className="p-4 h-fit w-full transition-transform absolute left-0 top-0"
          >
            <div className="flex gap-2 items-center justify-between !mt-4">
              <p
                onClick={() => toggleInstructions()}
                className="text-purple-400 hover:text-purple-500 text-sm cursor-pointer select-none flex items-center"
              >
                <span className="material-symbols-outlined">
                  arrow_left_alt
                </span>
                <span>Go back</span>
              </p>
            </div>
            <p className="text-gray-300 !mt-2">{drink.instructions}</p>
          </div>
        </div>

        <div
          className={`h-[9vh] flex gap-3 mx-[1vw] ${
            isAdded ? "hidden" : "pb-[2vh]"
          }`}
        >
          <div
            onClick={() => {
              handleClick(true);
            }}
            className="bg-purple-600 flex-1 flex justify-center items-center rounded-lg hover:bg-purple-500 select-none cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-slate-300 [transform:scale(1.5)] !text-[3vh]">
              favorite
            </span>
          </div>
          <div
            onClick={() => {
              handleClick(false);
            }}
            className="border-purple-600 border-2 border-solid flex-1 flex justify-center items-center rounded-lg select-none cursor-pointer hover:bg-gray-700 transition-colors"
          >
            <span className="material-symbols-outlined text-slate-300 [transform:scale(1.8)] !text-[3vh]">
              delete_sweep
            </span>
          </div>
        </div>
      </div>
    );
  }
);

export default SingleDrink;
