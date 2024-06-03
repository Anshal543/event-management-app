import React, { useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Navibar from "./components/layout/Navibar";
import Footer from "./components/layout/Footer";
import { login } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";
import NotFoundPage from "./pages/NotFoundPage";
import CreateEventPage from "./pages/CreateEventPage";
import SingleEventPage from "./pages/SingleEventPage";
import GetRegisterEvent from "./pages/GetRegisterEvent";
import SignUpPage from "./pages/SignUpPage";
axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_AUTH_URL}/auth`
      );
      console.log(data.data);
      if (data) {
        dispatch(login(data?.data));
      }
    };
    getData();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Navibar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/single-event/:id" element={<SingleEventPage />} />
          <Route path="/getRegisteredEvents/:id" element={<GetRegisterEvent />} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
