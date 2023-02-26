import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import lockImg from "../images/padlock.png";
import loginFormStyle from "../components/LoginForm.module.css";

function LoginForm() {
  let navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setIsCorrect(true);
  }, [email, pass]);

  useEffect(() => {
    let autoFill = false;
    const rememberData = localStorage.getItem("remember");
    if (rememberData === "true") {
      setIsChecked(true);
      autoFill = true;
    }
    const firstRegistration = localStorage.getItem("firstRegistration");
    if (firstRegistration) {
      autoFill = true;
      localStorage.removeItem("firstRegistration");
    }
    if (autoFill) {
      const userObject = getLocalStorageData();
      if (userObject) {
        setEmail(userObject.email);
        setPass(userObject.password);
      }
    }
  }, []);

  function getLocalStorageData() {
    const registerDataStr = localStorage.getItem("registerData");
    if (registerDataStr) {
      const userRegData = JSON.parse(registerDataStr);
      return userRegData;
    }
  }

  function formSubmitHandle(event) {
    event.preventDefault();
    const userObject = getLocalStorageData();
    if (email === "") {
      setErrorText("Email is required!");
      setIsCorrect((prev) => false);
    } else if (pass === "") {
      setErrorText("Password is required!");
      setIsCorrect((prev) => false);
    } else if (
      userObject === null ||
      userObject.email !== email ||
      userObject.password !== pass
    ) {
      setErrorText("User not found! Please follow the link to register!");
      setIsCorrect((prev) => false);
    } else {
      setErrorText("");
      setIsCorrect((prev) => true);
      localStorage.setItem("remember", isChecked);
      navigate("/home", {
        state: {
          pageinfo:
            "Congratulations! You have successfully logged in to the site",
        },
      });
    }
  }

  return (
    <div className={loginFormStyle["login-container"]}>
      <form autoComplete="off" onSubmit={formSubmitHandle}>
        <div className={loginFormStyle["login-header"]}>
          <div className={loginFormStyle["login-logo"]}>
            <img src={lockImg} alt="lock" />
          </div>
          <span>Sign in</span>
        </div>
        <div className={loginFormStyle["login-inputs"]}>
          <input
            type="text"
            id={loginFormStyle["log-input-email"]}
            name="email"
            placeholder="Email Address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id={loginFormStyle["log-input-password"]}
            name="password"
            placeholder="Password *"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <div className={loginFormStyle["login-remember-box"]}>
            <input
              type="checkbox"
              id={loginFormStyle["log-remember"]}
              checked={isChecked}
              onChange={() => setIsChecked((prev) => !prev)}
              className={isChecked ? loginFormStyle.checked : ""}
            />
            <label htmlFor="log-remember">Remember me</label>
          </div>
          <button type="submit">SIGN IN</button>
        </div>
        <div className={loginFormStyle["login-actions"]}>
          <Link
            to="/home"
            state={{ pageinfo: "This is a password recovery form" }}
            className={loginFormStyle["log-action-link"]}
          >
            Forgot password?
          </Link>
          <Link to="/signup" className={loginFormStyle["log-action-link"]}>
            Don't have an account? Sign Up
          </Link>
        </div>
        <div className={loginFormStyle["error-box"]}>
          <span
            className={isCorrect ? loginFormStyle["error-text-hidden"] : ""}
          >
            {errorText}
          </span>
        </div>
        <div className={loginFormStyle["copyright"]}>
          <span>Copyright &#169; Your Website 2023.</span>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
