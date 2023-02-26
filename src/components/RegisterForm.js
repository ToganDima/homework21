import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import lockImg from "../images/padlock.png";
import registerFormStyle from "../components/RegisterForm.module.css";

function LoginForm() {
  const [firstNameClass, setFirstNameClass] = useState("");
  const [lastNameClass, setLastNameClass] = useState("");
  const [emailClass, setEmailClass] = useState("");
  const [passwordClass, setPasswordClass] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [firstnameVal, setFirstName] = useState("");
  const [lastnameVal, setLastName] = useState("");
  const [emailVal, setEmail] = useState("");
  const [passwordVal, setPassword] = useState("");

  let navigate = useNavigate();

  function onSubmitHandle(event) {
    event.preventDefault();
    const registerData = {
      firstname: firstnameVal,
      lastname: lastnameVal,
      email: emailVal,
      password: passwordVal,
    };

    let validForm = true;
    let errorMessage = "";

    Object.keys(registerData).map((value) => {
      let validateSetting = regExpSettings[value];
      if (!validateSetting.regexpStr.test(registerData[value])) {
        validForm = false;
        errorMessage = validateSetting.errorStr;
      }
    });

    if (validForm) {
      localStorage.setItem("registerData", JSON.stringify(registerData));
      localStorage.setItem("firstRegistration", true);
      navigate("/signin");
    } else {
      setIsCorrect(validForm);
      setErrorText(errorMessage);
    }
  }

  const regExpSettings = {
    firstname: {
      regexpStr: /^([a-zA-Z]{3,})+$/,
      errorStr: "First Name is required and must contain at least 3 letters",
    },
    lastname: {
      regexpStr: /^([a-zA-Z]{3,})+$/,
      errorStr: "Last Name is required and must contain at least 3 letters",
    },
    email: {
      regexpStr: /^[A-Z0-9._%+-]{3,}@[A-Z0-9.-]{2,}\.[A-Z]{2,}$/i,
      errorStr:
        "Email is required and must contain at least 3 characters, @, at least 2 characters, dot and at least 2 characters",
    },
    password: {
      regexpStr: /^(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
      errorStr:
        "Password is required and must contain at least 8 characters, one uppercase letter and one lowercase letter",
    },
  };

  function validateField(event) {
    const regExpStr = regExpSettings[event.target.name].regexpStr;
    let fieldClass = "";
    if (event.target.value !== "") {
      fieldClass = regExpStr.test(event.target.value)
        ? "valid-input"
        : "no-valid-input";
    }
    return fieldClass;
  }

  return (
    <div className={registerFormStyle["register-container"]}>
      <form autoComplete="off" onSubmit={onSubmitHandle}>
        <div className={registerFormStyle["register-header"]}>
          <div className={registerFormStyle["register-logo"]}>
            <img src={lockImg} alt="lock" />
          </div>
          <span>Sign up</span>
        </div>
        <div className={registerFormStyle["register-inputs"]}>
          <div className={registerFormStyle["first-last-namebox"]}>
            <input
              type="text"
              id={registerFormStyle["reg-input-firstname"]}
              className={registerFormStyle[firstNameClass]}
              name="firstname"
              value={firstnameVal}
              onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameClass(validateField(e));
              }}
              placeholder="First Name *"
            />
            <input
              type="text"
              id={registerFormStyle["reg-input-lastname"]}
              className={registerFormStyle[lastNameClass]}
              name="lastname"
              value={lastnameVal}
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameClass(validateField(e));
              }}
              placeholder="Last Name *"
            />
          </div>
          <input
            type="text"
            id={registerFormStyle["reg-input-email"]}
            className={registerFormStyle[emailClass]}
            name="email"
            value={emailVal}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailClass(validateField(e));
            }}
            placeholder="Email Address *"
          />
          <input
            type="password"
            id={registerFormStyle["reg-input-password"]}
            className={registerFormStyle[passwordClass]}
            name="password"
            value={passwordVal}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordClass(validateField(e));
            }}
            placeholder="Password *"
          />
          <div className={registerFormStyle["register-remember-box"]}>
            <input
              type="checkbox"
              id={registerFormStyle["reg-remember"]}
              checked={isChecked}
              onChange={() => setIsChecked((prev) => !prev)}
              className={isChecked ? registerFormStyle.checked : ""}
            />
            <label htmlFor="reg-remember">
              I want to receive inspiration, marketing promotions and updates
              via email
            </label>
          </div>
          <button type="submit">SIGN UP</button>
        </div>
        <div className={registerFormStyle["register-actions"]}>
          <NavLink
            to="/signin"
            className={registerFormStyle["reg-action-link"]}
          >
            Already have an account? Sign in
          </NavLink>
        </div>
        <div className={registerFormStyle["error-box"]}>
          <span
            className={isCorrect ? registerFormStyle["error-text-hidden"] : ""}
          >
            {errorText}
          </span>
        </div>
        <div className={registerFormStyle["copyright"]}>
          <span>Copyright &#169; Your Website 2023.</span>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
