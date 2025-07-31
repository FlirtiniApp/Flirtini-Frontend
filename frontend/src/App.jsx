import "./App.css";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
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
<<<<<<< Updated upstream:frontend/src/App.jsx
    // jak jakaś ścieżka ma nie mieć sidebara to wystarczy jej tu NIE WPISAĆ
  ].includes(path);
=======
    "/",
    "/profile",
  ].some((prefix) => path.startsWith(prefix));
>>>>>>> Stashed changes:src/App.jsx

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {showSidebar && <Sidebar />}
      <main className="flex-1 overflow-y-auto p-8">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/liked" element={<Liked />} />
            <Route path="/compose" element={<Compose />} />
            <Route path="/todays-choice" element={<TodaysChoice />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<div>Page Not Found</div>} />
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
