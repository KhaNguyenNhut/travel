import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faAt,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import "./Register.scss";

export default function Register() {
  return (
    <div className="Register">
      <div className="logo">
        <img src="/assets/images/logo.png" alt="" />
      </div>
      <div className="Register-logo">
        <img
          src="https://www.trustcorpltd.com/images/home_travel/for_login.svg"
          alt=""
        />
      </div>
      <div className="Register-form">
        <h3>Register</h3>
        <form action="" className="Register-form-items">
          <div className="Register-group">
            <FontAwesomeIcon
              className="Header-seach-icon"
              size="xl"
              icon={faUserAstronaut}
            />
            <input type="text" placeholder="Tên người dùng" />
          </div>
          <div className="Register-group">
            <FontAwesomeIcon
              className="Header-seach-icon"
              size="xl"
              icon={faAt}
            />
            <input type="text" placeholder="Email ID" />
          </div>
          <div className="Register-group">
            <FontAwesomeIcon
              className="Header-seach-icon"
              size="xl"
              icon={faLock}
            />
            <input type="password" placeholder="Password" />
          </div>
          <div className="Register-group">
            <FontAwesomeIcon
              className="Header-seach-icon"
              size="xl"
              icon={faLock}
            />
            <input type="password" placeholder="Re-Password" />
          </div>
          <div className="forgotPass">
            <Link to="#" activeClassName="selected">
              Chấp nhập điều khoản
            </Link>
          </div>

          <button type="submit" className="Register-form-btn">
            Đăng ký
          </button>
        </form>
        <h4>
          Joined us before?{" "}
          <Link className="linkRegister" to="/login">
            Login
          </Link>
        </h4>
      </div>
    </div>
  );
}
