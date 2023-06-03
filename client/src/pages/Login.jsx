import React, { useEffect, useRef } from "react";
import "./login.css";
import myImage from "../images/powelElssLogo.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../server";

function Login() {
  const navigate = useNavigate();
  const userRef = useRef();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userFocus, setUserFocus] = React.useState(false);

  useEffect(() => {
    userRef.current.focus();
    console.log(userFocus);
  }, []);
  async function handleLogin(e) {
    e.preventDefault();
    const data = { email, password };
    await axios
      .post(`${server}/api/auth/login`, data)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container">
      <div className="formContainer">
        <div className="formWrapper">
          <img src={myImage} alt="" />
          <div className="form">
            <span className="title">Log in to powel-elss</span>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                value={email}
                ref={userRef}
                placeholder="Your email"
                autoComplete="off"
                onFocus={() => setUserFocus(true)}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                value={password}
                placeholder="password"
                autoComplete="off"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
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
