import axios from "axios";
import { useState, useEffect } from "react";

import SingleDrink from "../components/SingleDrink";

const Liked = () => {
  const ALCOHOL_API_URL = "https://172.24.3.60:3000";

  const [fullLikes, setFullLikes] = useState([]);
  const [likes, setLikes] = useState([]);

  const fetchDrink = async (id) => {
    try {
      const response = await axios.get(
        `${ALCOHOL_API_URL}/alcohol/drink?id=${id}`
      );
      const drink = response.data;
      setFullLikes((prev) => [...prev, drink]);
    } catch (error) {
      console.error("Error fetching drink:", error);
    }
  };

  const fetchLiked = async () => {
    const token = localStorage.getItem("token");

    await axios
      .get("http://172.24.3.84:6969/favourite", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setLikes(data);
        Array.from(data).forEach((drink) => {
          fetchDrink(drink.drinkId);
        });
      });
  };

  useEffect(() => {
    fetchLiked();
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-semibold mb-6 text-white">
        Your <span className="text-purple-400">LIKED</span> drinks
      </h1>

      {fullLikes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6 px-2">
          {fullLikes.map((drink) => (
            <div
              key={drink.id}
              className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex  justify-center"
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
