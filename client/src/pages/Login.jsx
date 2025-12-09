import { useState } from "react";
import Nav from "../components/Nav";
import { useAuthHook } from "../hooks/useAuthHook.js"; 
import { useNavigate } from "react-router-dom";

function Login() {
  const { login, register } = useAuthHook();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const toggleMode = () => setIsLogin(!isLogin);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (isLogin) {
      const responseStatus = await login({username: formData.username, password: formData.password})
      console.log("Login response status:", responseStatus);
      if (responseStatus == 200) {
        navigate("/");
      } else if (responseStatus == 401) {
        setError("Invalid username or password.");
      } else {
        setError("An error occurred during login. Please try again later.");
      }
    } else {
      const responseStatus = await register({username: formData.username, password: formData.password})
      if (responseStatus == 201) {
        navigate("/");
      } else if (responseStatus == 400) {
        setError("Username already exists. Please try a different username.");
      } else if (responseStatus == 401) {
        setError("Invalid username or password.");
      } else if (responseStatus == 500) {
        setError("An error occurred during login. Please try again later.");
      }
    }
  };

  return (
    <>
        <Nav/>
        <div className="flex items-center justify-center  p-4">
        <div className="w-full max-w-md bg-light-color rounded-2xl shadow-md p-8">
            <h2 className="text-2xl text-text-color font-semibold mb-6 text-center">
            {isLogin ? "Login" : "Sign Up"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full px-4 py-2 text-text-color border border-white rounded-xl focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <div className="relative">
                <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 text-text-color border border-white rounded-xl pr-20 focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.password}
                onChange={handleChange}
                required
                />
                <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-2 text-sm text-text-color hover:underline"
                >
                {showPassword ? "Hide" : "Show"}
                </button>
            </div>
            {!isLogin && (
                <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 text-text-color border border-white rounded-xl focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                />
            )}
            <button
                type="submit"
                className="w-full bg-lighter-color text-white py-2 rounded-xl hover:bg-blue-800 transition"
            >
                {isLogin ? "Login" : "Sign Up"}
            </button>
            </form>
            <p className="text-center text-sm mt-4 text-red-400">{error}</p>
            <p className="text-center text-sm mt-4 text-text-color">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
                onClick={toggleMode}
                className="text-blue-600 hover:underline"
            >
                {isLogin ? "Sign up here" : "Log in here"}
            </button>
            </p>
        </div>
        </div>
    </>
  );
}


export default Login