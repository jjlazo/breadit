import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { validate as emailValidator } from 'react-email-validator'
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [emailFocused, setEmailFocused] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailValidator(email)) {
      return setErrors({
        email:
          "Invalid Email"
      })
    }

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must match Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      {errors.server && <p>{errors.server}</p>}
      <form className="form" onSubmit={handleSubmit}>
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
          <label htmlFor="username" className={username.length > 0 || usernameFocused ? "form-label has-content" : "form-label"}>
            Username
            {errors.username && <span className="error-message">{errors.username}</span>}
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            onFocus={() => setUsernameFocused(true)}
            onBlur={() => setUsernameFocused(false)}
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
        <div className="form-field">
          <label htmlFor="confirm-password" className={confirmPassword.length > 0 || confirmPasswordFocused ? "form-label has-content" : "form-label"}>
            Confirm Password
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            onFocus={() => setConfirmPasswordFocused(true)}
            onBlur={() => setConfirmPasswordFocused(false)}
          />
        </div>
        {/* <label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            placeholder="Confirm Password"
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}
        <button className="button" type="submit">get toasty</button>
        {/* <button className="demo button" type="submit">Demo user</button> */}
      </form>
    </>
  );
}

export default SignupFormModal;
