import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { loginUser } from "../services/login";
import { setSession } from "../services/session";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await loginUser(data.email, data.password);

    if (res.Status === 200) {
      const user = res.Data;

      setSession("user", user);
      navigate("/dashboard");
    } else {
      alert("Login gagal! Periksa email dan password.");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://thumbs.dreamstime.com/b/neon-background-wallpaper-futuristic-glowing-lights-cool-backgrounds-blue-white-green-image-generated-use-ai-276346033.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative flex flex-col z-10 bg-white/95 backdrop-blur-sm p-10 rounded-2xl shadow-2xl w-[420px] border border-gray-200">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Mentor Login</h1>
          <p className="text-gray-600 text-sm">Student Assessment Platform</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5 flex flex-col">

          <div className="flex flex-col">
            <Label  className="mb-2 text-gray-700 font-medium">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="mentor@example.com"
              className="border-2 w-full border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-2 text-gray-700 font-medium">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="border-2 w-full border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all mt-2"
          >
            Sign In
          </Button>

          <div className="text-center mt-4">
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            © 2024 Student Assessment Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
