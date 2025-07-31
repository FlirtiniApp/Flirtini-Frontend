import "./App.css";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";

const Explore = lazy(() => import("./sites/Explore"));
const Liked = lazy(() => import("./sites/Liked"));
const Compose = lazy(() => import("./sites/Compose"));
const TodaysChoice = lazy(() => import("./sites/TodaysChoice"));
const Profile = lazy(() => import("./sites/Profile"));

function Layout() {
  const location = useLocation();
  const path = location.pathname;

  const showSidebar = [
    "/explore",
    "/liked",
    "/compose",
    "/todays-choice",
    "/",
    // jak jakaś ścieżka ma nie mieć sidebara to wystarczy jej tu NIE WPISAĆ
  ].includes(path);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {showSidebar && <Sidebar />}
      <main className={`flex-1 overflow-y-auto p-8 ${showSidebar ? "ml-[11vw]" : ""}`}>
        <Suspense fallback={<Loader />}>
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
  );
}

function App() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
}

export default App;
