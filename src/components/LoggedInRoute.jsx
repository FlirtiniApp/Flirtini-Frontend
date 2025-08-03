import { Navigate } from "react-router-dom";

const LoggedInRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem("token");

    if (isLoggedIn) {
        return <Navigate to="/explore" />;
    }

    return children;
};

export default LoggedInRoute;
