import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Auth.css";
import { useUser } from "../../context/UserContext";
import API from "../../api/axiosInstance";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data: res } = await API.post("/auth", data);
      localStorage.setItem("token", res.data);
      console.log("response after login:", res);
      setUser({
        _id: res._id,
        name: res.name,
        email: res.email,
        role: res.role,
        token: res.data,
      });
      toast.success(res.message);
      navigate(res.role === "admin" ? "/admin" : "/");
    } catch (error: any) {
      if (error.response) setError(error.response.data.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const { credential } = credentialResponse;
      if (!credential) return;

      const { data: res } = await API.post("/google-auth", { credential });

      console.log("response after login:", res);
      localStorage.setItem("token", res.data);
      setUser({
        _id: res._id,
        name: res.name,
        email: res.email,
        role: res.role,
        token: res.data,
      });

      toast.success(res.message);
      navigate(res.role === "admin" ? "/admin" : "/");
    } catch (err: any) {
      console.error(err);
      setError("Google sign-in failed.");
    }
  };

  const handleGoogleError = () => {
    setError("Google sign-in was cancelled or failed.");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="wrapper">
        <div className="auth-container">
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Password:
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
              />
            </label>
            {error && <div className="error-message">{error}</div>}
            <button type="submit">Sign In</button>
            {/* <button
            type="submit"
            disabled={signInMutation.isPending}
            className="sign"
          >
            {signInMutation.isPending ? <LoadingSpinner /> : "Sign In"}
          </button> */}
            <div className="divider">OR</div>

            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              shape="rectangular"
              theme="outline"
              size="large"
              text="continue_with"
            />

            <p>
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignIn;
