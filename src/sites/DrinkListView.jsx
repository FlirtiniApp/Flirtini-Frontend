import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SingleDrink from "../components/SingleDrink";
import Loader from "../components/Loader";

const DrinkListView = () => {
  const { name } = useParams();
  const [drinkList, setDrinkList] = useState(null);
  const [drinksData, setDrinksData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const LISTS_API_URL = "http://172.24.3.84:6969";
  const ALCOHOL_API_URL = "https://172.24.3.60:3000";

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchListAndDrinks = async () => {
      try {
        const listResponse = await axios.get(`${LISTS_API_URL}/lists`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const matchedList = listResponse.data.find(
          (list) => list.name === name
        );

        if (!matchedList) {
          setDrinkList(null);
          setDrinksData([]);
          setIsLoading(false);
          return;
        }

        setDrinkList(matchedList);

        const drinkPromises = matchedList.drinks.map((id) =>
          axios.get(`${ALCOHOL_API_URL}/alcohol/drink?id=${id}`)
        );

        const drinkResponses = await Promise.allSettled(drinkPromises);
        const successfulDrinks = drinkResponses
          .filter((res) => res.status === "fulfilled")
          .map((res) => res.value.data);

        setDrinksData(successfulDrinks);
      } catch (error) {
        console.error("Error fetching drinks from list:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListAndDrinks();
  }, [name]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );

  if (!drinkList)
    return (
      <div className="text-white text-3xl p-6">
        No list found with the name: <b>{name}</b>
      </div>
    );

  return (
    <div className="h-screen p-4">
      <h2 className="text-5xl text-white tracking-wide text-center">
        List: <span className="text-purple-400 italic">{drinkList.name}</span>
      </h2>

      {drinksData.length > 0 ? (
        <div className="flex flex-row gap-y-6 gap-x-10 p-6 flex-wrap justify-center">
          {drinksData.map((drink) => (
            <SingleDrink key={drink.id} drink={drink} isAdded={true} readonly />
          ))}
        </div>
      ) : (
        <p className="text-white text-lg">No drinks in this list.</p>
      )}
    </div>
  );
};

export default DrinkListView;
