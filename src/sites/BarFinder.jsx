import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://192.168.1.115:3000';

export default function BarFinder() {
  const [location, setLocation] = useState(null);
  const [range, setRange] = useState(1);
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gpsError, setGpsError] = useState(false);
  const [addressInput, setAddressInput] = useState('');
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [tempRange, setTempRange] = useState(1);
  const [locationMode, setLocationMode] = useState('gps');

  useEffect(() => {
    setLocation(null);
    setBars([]);
    setError(null);
    setLoading(locationMode === 'gps');
  }, [locationMode]);

  useEffect(() => {
    if (locationMode !== 'gps') return;

    if (!navigator.geolocation) {
      setGpsError(true);
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        setLoading(false);
      },
      () => {
        setGpsError(true);
        setError("Please enable GPS or switch to address mode");
        setLoading(false);
      }
    );
  }, [locationMode]);

  useEffect(() => {
    if (!location) return;
    const fetchData = async () => {
      try {
        setError(null);
        const response = await axios.get(`${API_URL}/drinks`, {
          params: { lat: location.lat, lng: location.lng, range: range }
        });
        setBars(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch bars');
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
          setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
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
      const res = await axios.get(`${API_URL}/geocode`, { params: { address: addressInput } });
      if (res.data.status === 'OK') {
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
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Find nearby bars with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 font-[Dancing_Script] text-5xl">Flirtini</span>
          </h1>
          <p className="text-gray-400">Discover the best cocktail spots near you</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-10 border border-gray-700/50">
          <div className="flex flex-col space-y-6">
            {/* Location Mode Toggle - Updated Style */}
            <div className="flex flex-col">
              <label className="text-gray-400 text-sm font-medium mb-2">Location Mode</label>
              <div className="relative flex items-center">
                <button
                  onClick={() => setLocationMode(locationMode === 'gps' ? 'address' : 'gps')}
                  className="relative inline-flex items-center h-10 rounded-full w-full bg-gray-700 transition-colors duration-300 overflow-hidden"
                >
                  {/* Background for both options (slate) */}
                  <div className="absolute inset-0 bg-gray-600"></div>
                  
                  {/* Text labels */}
                  <div className="relative z-10 flex w-full">
                    <div className={`flex-1 py-2 text-center font-medium transition-colors duration-200 ${
                      locationMode === 'gps' ? 'text-black' : 'text-gray-300'
                    }`}>
                      GPS Location
                    </div>
                    <div className={`flex-1 py-2 text-center font-medium transition-colors duration-200 ${
                      locationMode === 'address' ? 'text-black' : 'text-gray-300'
                    }`}>
                      Enter Address
                    </div>
                  </div>
                  
                  {/* White sliding pill */}
                  <div
                    className={`absolute left-0 top-1 h-8 w-1/2 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                      locationMode === 'address' ? 'translate-x-full' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Range Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-gray-400 text-sm font-medium">Search Radius</label>
                <span className="text-white font-medium bg-gray-700/50 px-3 py-1 rounded-full">
                  {tempRange.toFixed(1)} km
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={tempRange}
                onChange={(e) => setTempRange(parseFloat(e.target.value))}
                onMouseUp={() => setRange(tempRange)}
                onTouchEnd={() => setRange(tempRange)}
                className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0.1 km</span>
                <span>2 km</span>
              </div>
            </div>

            {/* Address Input */}
            {locationMode === 'address' && (
              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-medium">Your Address</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="e.g. 123 Main St, City"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    className="flex-grow p-3 rounded-lg text-white bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
                  />
                  <button
                    onClick={handleAddressSearch}
                    disabled={fetchingLocation}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-purple-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {fetchingLocation ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Locating...
                      </span>
                    ) : (
                      "Find Bars"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && !gpsError && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center p-5 bg-gray-800/50 rounded-full mb-6">
              <svg className="animate-spin h-10 w-10 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Finding your location</h3>
            <p className="text-gray-400">Please wait while we detect your position</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-gradient-to-r from-red-900/50 to-rose-900/50 border border-red-800/50 text-red-100 p-5 rounded-xl mb-8 shadow-lg backdrop-blur-sm">
            <div className="flex items-start">
              <svg className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-medium">Oops! Something went wrong</h3>
                <p className="mt-1 text-sm text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bars.map((bar) => (
            <div key={bar.name} className="bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300 rounded-xl p-6 shadow-lg border border-gray-700/50 flex flex-col h-full">
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{bar.name}</h3>
                <p className="text-gray-400 mb-4">{bar.address}</p>
                
                <div className="flex items-center mb-4">
                  {bar.rating && (
                    <div className="flex items-center mr-4">
                      <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-white font-medium">{bar.rating}</span>
                    </div>
                  )}
                  {bar.price_level && (
                    <div className="text-gray-300">
                      {Array.from({ length: bar.price_level }).map((_, i) => (
                        <span key={i}>$</span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center text-sm text-purple-300">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{bar.distance} • {bar.duration}</span>
                </div>
              </div>
              
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bar.name + ' ' + bar.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-200 shadow hover:shadow-lg hover:shadow-purple-500/20"
              >
                View on Maps
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && bars.length === 0 && location && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center p-5 bg-gray-800/50 rounded-full mb-6">
              <svg className="h-10 w-10 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No bars found</h3>
            <p className="text-gray-400 mb-6">We couldn't find any bars within {range} km of your location.</p>
            <button 
              onClick={() => setRange(Math.min(10, range + 1))}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Increase Search Radius
            </button>
          </div>
        )}
      </div>
    </div>
  );
}