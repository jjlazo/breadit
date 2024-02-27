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
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!emailValidator(email)){
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
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="Email"
            // required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
            // required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button onClick={handleSubmit} className="button" type="submit">keep toast&apos;n</button>
        <button onClick={handleDemoSubmit} className="demo button" type="submit">Demo user</button>
        <span className="google-auth-div">-or-</span>
        <a href={`${window.origin}/api/auth/oauth_login`} className="google-auth"><button className="button" type="button">Sign in with Google</button></a>
      </form>
    </>
  );
}

export default LoginFormModal;
