import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { validate as emailValidator } from 'react-email-validator'
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailValidator(email)) {
      return setErrors({
        email:
          "Invalid Email"
      })
    }

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal()
    }
  };

  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );
    closeModal()
  }

  return (
    <>
      <h2>Log In</h2>
      <form className="form">
        <div className="form-field">
          <label htmlFor="email" className={email.length > 0 || emailFocused ? "form-label has-content" : "form-label"}>
            Email
            {errors.email && <span className="error-message">{errors.email}</span>}
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password" className={password.length > 0 || passwordFocused ? "form-label has-content" : "form-label"}>
            Password
            {errors.password && <span className="error-message">{errors.password}</span>}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
        </div>
        <button onClick={handleSubmit} className="button" type="submit">keep toast&apos;n</button>
        <button onClick={handleDemoSubmit} className="demo button" type="submit">Demo user</button>
      </form>
    </>
  );
}

export default LoginFormModal;
