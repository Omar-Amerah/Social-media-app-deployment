import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/register.css";
import RegisterUser from "../components/utils/users/RegisterUser.js";

export default function Register() {
  document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [formValid, setFormValid] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value && password && email) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value && username && email) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value && username && password) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await RegisterUser(username, password, email);
    if (data) {
      navigate("/login");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="registerBox">
        <h1 className="title">Register</h1>
        <input
          type="text"
          className="input"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        ></input>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        ></input>
        <input
          type="text"
          className="input"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        ></input>
        <button className="button" disabled={!formValid} onClick={handleSubmit}>
          Register
        </button>
        <button className="button" onClick={handleLoginClick}>
          Login
        </button>
      </div>
    </>
  );
}
