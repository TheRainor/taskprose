import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  controlTokens,
  loginFormSubmit,
  registerFormSubmit,
  logoutFormSubmit,
} from "../services/index.js";
import { useUser } from "../contexts/userContext.jsx";

export function useAuth() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [isLoginMode, setIsLoginMode] = useState(true);

  const showLogin = () => setIsLoginMode(true);
  const showRegister = () => setIsLoginMode(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = await loginFormSubmit(formData);
    const { first_name, last_name, email } = data;
    setUser({ first_name, last_name, email });
    if (data.success) navigate("/todo/all");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const success = await registerFormSubmit(formData);
    if (success) showLogin();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logoutFormSubmit();
  };

  return {
    isLoginMode,
    showLogin,
    showRegister,
    handleLogin,
    handleRegister,
    handleLogout,
    navigate,
    controlTokens,
    setUser,
  };
}
