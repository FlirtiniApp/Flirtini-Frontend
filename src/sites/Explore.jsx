import { useEffect, useState, useRef } from "react";
import axios from "axios";
import SingleDrink from "../components/SingleDrink";
import Lists from "../components/Lists";

const Explore = () => {

  const ALCOHOL_API_URL = "http://192.168.1.105:3000/alcohol";
  const LISTS_API_URL = "http://192.168.1.98:3000";

  const drinkRef = useRef(null);
  const drinkComponentRef = useRef(null);

  const [drinks, setDrinks] = useState([]);

  const [animateDrink, setAnimateDrink] = useState("none");
  const [transitionDrink, setTransitionDrink] = useState(1);
  const [listVisibility, setListVisibility] = useState(false);

  const animationVariants = {
    left: "[transform:translateX(-100%)] opacity-0",
    right: "[transform:translateX(100%)] opacity-0",
    preview: "[transform:translateX(0)] opacity-0",
    none: "[transform:translateX(0)] opacity-100"
  }

  const transitionDrinkVariants = {
    1: "transition-[transform, opacity]",
    2: "transition-none",
    3: "transition-[opacity]"
  }

  const listVisibilityVariants = {
    true: "block",
    false: "hidden"
  }

  const fetchInitialDrinks = async () => {
    for (let i = 0; i < 3; ++i) {
      fetchSingleDrink();
    }
  }

  const fetchSingleDrink = async () => {
    try {
      const response = await axios.get(`${ALCOHOL_API_URL}/randomdrink`);
      const drink = response.data;
      setDrinks(prev => [...prev, drink]);
    }
    catch (error) {
      console.error("Error fetching drink:", error);
    }
  }

  const postSingleDrink = async (drinkId) => {
    try {
      const response = await axios.post(`${LISTS_API_URL}/favourite`, { drinkId: Number(drinkId), userId: "688c7827ec7103b70f5b9810" });
      console.log("Drink successfully added to favourites");
    } catch (error) {
      console.error("Error", error);
    }
  }

  const killDrink = (isFavorite, drinkId) => {

    const node = drinkRef.current;

    const handleTransitionEnd = (e) => {
      if (e.target !== node) return;

      node.removeEventListener("transitionend", handleTransitionEnd);

      setDrinks(prev => prev.slice(1));
      fetchSingleDrink();

      setTransitionDrink(2);
      setAnimateDrink("preview");
    };

    node.addEventListener("transitionend", handleTransitionEnd);

    if (isFavorite) {
      setAnimateDrink("left");
      postSingleDrink(drinkId);
    }
    else {
      setAnimateDrink("right");
    }
  }

  const toggleLists = (show) => {
    if(show) {
      console.log("showing");
      setListVisibility(true);
    }
    else {
      console.log("hiding");
      setListVisibility(false);
    }
  }

  useEffect(() => {
    if (animateDrink === "preview") {
      setTransitionDrink(3);
      setAnimateDrink("none");

      const node = drinkRef.current;

      const handleTransitionEnd = (e) => {
        if (e.target !== node) return;

        node.removeEventListener("transitionend", handleTransitionEnd);

        setTransitionDrink(1);
        drinkComponentRef.current.enableButtons();
      };

      node.addEventListener("transitionend", handleTransitionEnd);
    }
  }, [transitionDrink]);

  useEffect(() => {
    fetchInitialDrinks();
  }, []);

  return (
    <>
      <div className={`absolute top-0 left-0 bg-black/50 w-full h-full z-10 ${listVisibilityVariants[listVisibility]}`}></div>
      <div className="w-full h-full flex justify-center items-center relative">
        <div ref={drinkRef} className={`w-fit h-fit ${transitionDrinkVariants[transitionDrink]} ease-in-out duration-500 ${animationVariants[animateDrink]}`}>
          {drinks[0] && <SingleDrink ref={drinkComponentRef} drink={drinks[0]} killDrink={killDrink} showLists={toggleLists} />}
        </div>
        <div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center z-11 ${listVisibilityVariants[listVisibility]}`}>
          <Lists hideLists={toggleLists}/>
        </div>
      </div>
    </>
  )
};

export default Explore;
