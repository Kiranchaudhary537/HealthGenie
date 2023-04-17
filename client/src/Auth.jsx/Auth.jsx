import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import AXIOS from "../utils/AXIOS";

export const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };
  const handleonclick = () => {
    window
      .open("http://localhost:5000/api/auth/google/callback", "_self")
      .then(() => {
        handleToggle();
      });
  };

  const getUser = async (event) => {
    event.preventDefault();
    try {
      const { data } = await AXIOS.get("/auth/login/success", {
        withCredentials: true,
      });
  
      setUser(data.user);
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 m-4 md:space-y-6 sm:p-8">
            {showLogin ? (
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight tracking-tight  md:text-2xl ">
                  Log in to your account
                </h1>
                <button
                  onClick={getUser}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full flex items-center justify-center mt-2"
                >
                  <AiFillGoogleCircle className="text-red-500 text-xl mr-2" />
                  Log In
                </button>
                <div
                  onClick={handleToggle}
                  className=" mt-4 text-sm font-light text-gray-500 dark:text-gray-900"
                >
                  Don't have an account yet?{" "}
                  <p className="font-medium text-primary-900 hover:underline dark:text-primary-500">
                    Sign up
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight tracking-tight  md:text-2xl ">
                  Sign Up with Google
                </h1>
                <button
                  onClick={handleonclick}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full flex items-center justify-center mt-2"
                >
                  <AiFillGoogleCircle className="text-red-500 text-xl mr-2" />
                  Sign Up
                </button>
                <div
                  onClick={handleToggle}
                  className="text-sm mt-4  font-light text-gray-500 dark:text-gray-900"
                >
                  Already registered?{" "}
                  <p className="font-medium text-primary-900 hover:underline dark:text-primary-500">
                    Log In
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Function to log user out
export function Logout() {
  localStorage.removeItem("accessToken");
}

// Function to check if user is logged in
export function isLoggedIn() {
  return localStorage.getItem("accessToken") !== null;
}

// Function to check login status with server
export async function checkLogin() {
  return axios
    .get(CHECK_LOGIN_API, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response) => {
      return response.data.loggedIn;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}
