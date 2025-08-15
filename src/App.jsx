import "./App.css";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute";
import LoggedInRoute from "./components/LoggedInRoute";

const Explore = lazy(() => import("./sites/Explore"));
const Liked = lazy(() => import("./sites/Liked"));
const TodaysChoice = lazy(() => import("./sites/TodaysChoice"));
const Profile = lazy(() => import("./sites/Profile"));
const BarFinder = lazy(() => import("./sites/BarFinder"));
const DrinkListView = lazy(() => import("./sites/DrinkListView"));

const RegisterForm = lazy(() => import("./sites/RegistrationForm"));
const LoginForm = lazy(() => import("./sites/LoginForm"));

function Layout() {
  const location = useLocation();
  const path = location.pathname;

  const showSidebar = [
    "/explore",
    "/liked",
    "/compose",
    "/todays-choice",
    "/",
    "/find-bar",
    "/profile",
    // jak jakaś ścieżka ma nie mieć sidebara to wystarczy jej tu NIE WPISAĆ
  ].includes(path);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {showSidebar && <Sidebar />}
      <main className={`flex-1 overflow-y-auto p-5 ${showSidebar ? "" : ""}`}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Explore />
                </ProtectedRoute>
              }
            />
            <Route
              path="/explore"
              element={
                <ProtectedRoute>
                  <Explore />
                </ProtectedRoute>
              }
            />
            <Route
              path="/liked"
              element={
                <ProtectedRoute>
                  <Liked />
                </ProtectedRoute>
              }
            />
            <Route
              path="/todays-choice"
              element={
                <ProtectedRoute>
                  <TodaysChoice />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/find-bar"
              element={
                <ProtectedRoute>
                  <BarFinder />
                </ProtectedRoute>
              }
            />
            <Route
              path="register"
              element={
                <LoggedInRoute>
                  <RegisterForm />
                </LoggedInRoute>
              }
            />
            <Route
              path="login"
              element={
                <LoggedInRoute>
                  <LoginForm />
                </LoggedInRoute>
              }
            />
            <Route
              path="/lists/:name"
              element={
                <ProtectedRoute>
                  <DrinkListView />
                </ProtectedRoute>
              }
            />
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
