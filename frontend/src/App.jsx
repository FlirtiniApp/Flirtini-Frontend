import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Sidebar from "./components/Sidebar";

const Explore = lazy(() => import("./sites/Explore"));
const Liked = lazy(() => import("./sites/Liked"));
const Compose = lazy(() => import("./sites/Compose"));
const TodaysChoice = lazy(() => import("./sites/TodaysChoice"));
const Profile = lazy(() => import("./sites/Profile"));

function App() {
  return (
    <HashRouter>
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto ml-[220px]">
          <Suspense fallback={<div className="text-white p-4">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Explore />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/liked" element={<Liked />} />
              <Route path="/compose" element={<Compose />} />
              <Route path="/todays-choice" element={<TodaysChoice />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
