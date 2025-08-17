import axios from "axios";
import { useState, useEffect } from "react";

import SingleDrink from "../components/SingleDrink";

const Liked = () => {
  const BACKEND_URL = "http://localhost:3000";

  const token = localStorage.getItem("token");

  const [fullLikes, setFullLikes] = useState([]);

  const fetchDrink = async (id) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/alcohol/getdrinkbyid?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      const drink = response.data;
      setFullLikes((prev) => [...prev, drink]);
    } catch (error) {
      console.error("Error fetching drink:", error);
    }
  };

  const fetchLiked = async () => {
    try {
      const response = await axios
        .get(`${BACKEND_URL}/favourite/getfavourites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      const data = response.data.favourites;

      for (const drink of data) {
        await fetchDrink(drink.drinkId);
      }
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  useEffect(() => {
    fetchLiked();
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-semibold mb-6 text-white">
        Your <span className="text-purple-400">Liked</span> Drinks
      </h1>

      {fullLikes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6 px-2">
          {fullLikes.map((drink) => (
            <div
              key={drink.id}
              className="shadow-md hover:shadow-lg transition-shadow flex justify-center"
            >
              <SingleDrink
                key={drink.id}
                drink={drink}
                isAdded={true}
                readonly
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-lg">No liked drinks found.</p>
      )}
    </div>
  );
};

export default Liked;
