import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://172.24.3.54:3000";

export default function BarFinder() {
  const [location, setLocation] = useState(null);
  const [range, setRange] = useState(1);
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gpsError, setGpsError] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [tempRange, setTempRange] = useState(1);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGpsError(true);
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      () => {
        setGpsError(true);
        setError("Please enable GPS or enter your address below.");
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (!location) return;
    const fetchData = async () => {
      try {
        setError(null);
        const response = await axios.get(`${API_URL}/drinks`, {
          params: { lat: location.lat, lng: location.lng, range: range },
        });
        setBars(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch bars");
        setBars([]);
      }
    };
    fetchData();
  }, [location, range]);

  const handleAddressSearch = async () => {
    if (!addressInput.trim()) {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        return;
      }
      setFetchingLocation(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setError(null);
          setFetchingLocation(false);
        },
        () => {
          setError("Failed to get GPS location. Please enter your address.");
          setFetchingLocation(false);
        }
      );
      return;
    }
    setFetchingLocation(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/geocode`, {
        params: { address: addressInput },
      });
      if (res.data.status === "OK") {
        const loc = res.data.results[0].geometry.location;
        setLocation({ lat: loc.lat, lng: loc.lng });
        setError(null);
      } else {
        setError("Failed to fetch location data. Try a different address.");
      }
    } catch {
      setError("Failed to fetch location data.");
    } finally {
      setFetchingLocation(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-100 text-center">
          Find nearby bars with{" "}
          <span className="font-[Dancing_Script] text-5xl text-purple-500">
            Flirtini
          </span>
        </h1>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg mb-10 mt-10">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 ">
                Search radius: {tempRange.toFixed(1)} km
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={tempRange}
              onChange={(e) => setTempRange(parseFloat(e.target.value))}
              onMouseUp={() => setRange(tempRange)}
              onTouchEnd={() => setRange(tempRange)}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              style={{
                WebkitAppearance: "none",
                appearance: "none",
                height: "6px",
                borderRadius: "9999px",
              }}
            />
          </div>

          {gpsError && (
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Enter your address"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className="flex-grow p-2 rounded-md text-gray-200 bg-slate-900 focus:outline-none"
              />
              <button
                onClick={handleAddressSearch}
                disabled={fetchingLocation}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
              >
                {fetchingLocation ? "Locating..." : "Locate"}
              </button>
            </div>
          )}
        </div>

        {loading && !gpsError && (
          <div className="text-center text-gray-300 mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
            Getting your location...
          </div>
        )}

        {error && (
          <div className="bg-red-900 text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-6 justify-center mt-6">
          {bars.map((bar) => (
            <div
              key={bar.name}
              className="bg-gray-800 rounded-lg p-6 shadow-lg w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33%-1.5rem)] flex flex-col min-h-[280px]"
            >
              <div className="flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-purple-400 mb-1 leading-tight">
                  {bar.name}
                </h3>
                <p className="text-gray-300 mb-3 break-words leading-snug">
                  {bar.address}
                </p>
                <div className="flex items-center text-base mb-2 mt-auto">
                  <span className="text-yellow-400 mr-1">
                    ⭐ {bar.rating || "No rating"}
                  </span>
                  <span className="ml-auto text-purple-300">
                    {bar.price_level || ""}
                  </span>
                </div>
                <p className="text-purple-300 text-sm mb-6">
                  🚶‍♂️ {bar.duration} ({bar.distance})
                </p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  bar.name + " " + bar.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white text-sm text-center"
              >
                Open in Google Maps
              </a>
            </div>
          ))}
        </div>

        {!loading && bars.length === 0 && location && (
          <div className="text-center text-gray-400 mt-8">
            No bars found within {range} km radius. Try increasing the search
            range.
          </div>
        )}
      </div>
    </div>
  );
}
