import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";

const OAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultFromGoogle);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_AUTH_URL}/google-login`,
        {
          email: resultFromGoogle.user.email,
          username: resultFromGoogle.user.displayName,
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        dispatch(login());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      type="button"
      className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-full"
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      <span>Sign in with Google</span>
    </button>
  );
};

export default OAuth;
