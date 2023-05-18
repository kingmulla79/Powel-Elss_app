import React, { useState } from "react";
import "./login.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import myImage from "../images/powelElssLogo.jpg";
import { useNavigate } from "react-router-dom";
import { server } from "../server";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  // const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${server}/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        toast.success("Login Success!");
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="formContainer">
        <div className="formWrapper">
          <img src={myImage} alt="" />
          <div className="form">
            <span className="title">Log in to powel-elss</span>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="password">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
              <button>Sign in</button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>
          &copy;Powel-elss<sup>KE</sup>. Energy Efficiency Services
        </p>
      </div>
    </div>
  );
}

export default Login;
