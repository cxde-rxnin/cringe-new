import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a session exists and fetch user details
    account
      .get()
      .then((user) => {
        console.log("User session found:", user); // Debug log
        setUser(user); // Set user in state
        // Appwrite should handle redirect, no need for manual navigate here
      })
      .catch((error) => {
        console.log("No session or error:", error.message); // Debug log
      });
  }, [setUser]);

  const handleGoogleLogin () {
    account.create0Auth2Session(
        "google",
        "https://usecringe.vercel.app/", // Success redirect URL
        "https://usecringe.vercel.app/login"
    )
  }

  return (
    <div className="flex items-center justify-center h-[90vh] text-white">
      <div className="text-center bg-white/5 w-72 h-80 p-10 rounded-md shadow-lg">
        <h1 className="text-2xl font-bold pb-10">Welcome to Cringe!</h1>
        <p className="text-sm font-regular -mt-5 mb-20">
          Log in to discover, stream, and enjoy the latest anime episodes.
        </p>
        <button
          onClick={handleGoogleLogin}
          className="bg-green-500 px-6 py-2 rounded-lg text-black font-medium hover:bg-green-600"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
