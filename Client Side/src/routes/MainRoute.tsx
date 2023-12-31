import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Main from "../pages/Main/Main";
import Shopping from "../pages/Shopping/Shopping";
import { useUserState } from "../hooks/useUserState";
import Page404 from "../pages/Page404";

export const MainRoute = () => {
  const { user } = useUserState();
  const role = user?.role;

  const UserOrRedirect = () => {
    if (role === "user" || role === "admin") {
      return <Shopping />;
    } else {
      // If user is not logged in, redirect to main page
      return <Navigate to="/" replace />;
    }
  };

  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shopping" element={<UserOrRedirect />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};
