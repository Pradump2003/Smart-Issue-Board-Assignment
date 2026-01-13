import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../hooks/useUser";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/api/v1/user/logout`, {
        method: "GET",
        credentials: "include",
      });

      toast.success("Logged out successfully 👋");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error("Logout failed");
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between h-auto sm:h-[70px] px-4 sm:px-6 py-3 sm:py-0 gap-2">
        <h1 className="text-sm sm:text-lg font-semibold truncate max-w-full sm:max-w-[70%]">
          Welcome,{" "}
          <span className="font-bold text-indigo-600">
            {user?.email || "User"}
          </span>
        </h1>

        <button
          onClick={handleLogout}
          className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
