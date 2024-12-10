import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite";  // Ensure your Appwrite config is correct

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    account
      .get()
      .then((user) => {
        setUser(user); // Store user info in the state
        navigate("/"); // Redirect to home if user is authenticated
      })
      .catch(() => {
        // No session or error
      });
  }, [navigate, setUser]);

  const handleGoogleLogin = async () => {
    try {
      // Initiate Google OAuth2 login
      await account.createOAuth2Session(
        "google",
        "https://usecringe.vercel.app/", // Success URL
        "https://usecringe.vercel.app/login" // Failure URL
      );
    } catch (error) {
      console.error("Error during Google login:", error.message); // Debug log
    }
  };

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
