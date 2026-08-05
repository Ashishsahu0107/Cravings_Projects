import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPalette } from "react-icons/fa";
import LogoHeader from "../assets/headerLogo.png";
import { useAuth } from "../context/AuthContext.jsx";
import { LogOut } from "lucide-react";
import Logo from "../assets/logo.jpeg";
import api from "../config/api.config.js";

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "corporate", label: "Corporate" },
  { value: "gourmet", label: "Gourmet" },
  { value: "pastel", label: "Pastel" },
  { value: "shadcn", label: "Shadcn" },
  { value: "slack", label: "Slack" },
  { value: "mintlify", label: "Mintlify" },
];

const Header = () => {
  const navigate = useNavigate();
  const { user, setIsLogin, isLogin, setUser } = useAuth();

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("cravings-theme") || "light";
    return themeOptions.some((option) => option.value === savedTheme)
      ? savedTheme
      : "light";
  });

  const handleLogout = async () => {
    try {
      await api.get('/auth/logout');
    } catch (e) {
      console.error("Logout failed on server", e);
    }
    setIsLogin(false);
    sessionStorage.removeItem("UserData");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("cravings-theme", theme);
  }, [theme]);

  const dashboardRoute = user
    ? {
        customer: "/user/dashboard",
        restaurant: "/restaurant-dashboard",
        rider: "/rider-dashboard",
        admin: "/admin-dashboard",
      }[user.userType] || "/user/dashboard"
    : "/user/dashboard";

  return (
    <>
      <nav className="flex sticky top-0 z-99 justify-between px-6 md:px-12 h-16 items-center bg-primary gap-4">
        <Link to={"/"}>
          <img src={LogoHeader} alt="header-images" className="h-14 " />
        </Link>
        <div className="flex items-center gap-3">
          

          {isLogin ? (
            <>
              <div className="flex items-center gap-4 ">
                <span className=" text-white">{user.fullName}</span>
                <Link
                  to={dashboardRoute}
                  className="p-2 bg-base-100 rounded-md text-primary text-decoration-none flex items-center hover:outline "
                >
                  Dashboard
                </Link>
                <img
                  src={user.photo || "https://placehold.co/100x100?text=U"}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full object-cover "
                />
                <div>
                  <button
                    onClick={handleLogout}
                    className="p-2 bg-base-100 rounded-md text-primary text-decoration-none"
                  >
                    <LogOut />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="./login"
                className="px-3 py-1 hover:outline  rounded-md text-white text-decoration-none"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 bg-base-100 rounded-md text-primary text-decoration-none flex items-center hover:bg-transparent hover:text-white hover:outline "
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
