import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faAt } from "@fortawesome/free-solid-svg-icons";
import "./Login.scss";
import authApi from "../../api/authApi";

export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const login = async () => {
    const data = {
      email: email,
      password: password,
    };
    const user = await authApi.login(data);
    localStorage.setItem("user", JSON.stringify(user));
    let path = `/`;
    navigate(path);
  };
  return (
    <div className="Login">
      <div className="logo">
        <img src="/assets/images/logo.png" alt="" />
      </div>
      <div className="login-logo">
        <img
          src="https://www.trustcorpltd.com/images/home_travel/for_login.svg"
          alt=""
        />
      </div>
      <div className="login-form">
        <h3>Login</h3>
        <form action="" className="login-form-items">
          <div className="login-group">
            <FontAwesomeIcon
              className="Header-seach-icon"
              size="xl"
              icon={faAt}
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email ID"
            />
          </div>
          <div className="login-group">
            <FontAwesomeIcon
              className="Header-seach-icon"
              size="xl"
              icon={faLock}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="forgotPass">
            <Link to="/" activeClassName="selected">
              Forgot Password?
            </Link>
          </div>

          <button
            type="button"
            className="login-form-btn"
            onClick={() => login()}
          >
            Đăng nhập
          </button>
          <div className="orLogin">
            <p> OR </p>
          </div>
          <button type="submit" className="login-form-btngoogle">
            <img src="https://freesvg.org/img/1534129544.png" alt="" />
            Login with Google
          </button>
        </form>
        <h4>
          New to Logistic?{" "}
          <Link className="linkRegister" to="/register">
            Register
          </Link>
        </h4>
      </div>
    </div>
  );
}
