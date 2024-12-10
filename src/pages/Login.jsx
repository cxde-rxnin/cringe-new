import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  // Define the checkSession function
  const checkSession = async () => {
    try {
      const user = await account.get();
      console.log("User session found:", user);
      setUser(user);
      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.log("No active session:", error.message);
    }
  };

  // useEffect to check session when the component mounts
  useEffect(() => {
    checkSession(); // Call checkSession here after it's defined
  }, [navigate, setUser]);

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      // Create OAuth2 session with full URLs
      await account.createOAuth2Session(
        "google",
        `${window.location.origin}/`, // Success redirect (current origin)
        `${window.location.origin}/login` // Failure redirect (current origin)
      );
    } catch (error) {
      console.error("Error during Google login:", error.message);
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
