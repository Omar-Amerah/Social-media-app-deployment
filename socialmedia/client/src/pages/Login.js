import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/login.css";
import LoginUser from "../components/utils/users/LoginUser.js"

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value && password) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value && username) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = LoginUser(username, password);
    if(data)
    {
        console.log((document.cookie).id);
        navigate("/");
    }
  };

  return (
    <>
      <div className="loginBox">
        <h1 className="title">Social Media</h1>
        <input
          type="text"
          className="input"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        ></input>
        <input
          type="text"
          className="input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        ></input>
        <button className="button" disabled={!formValid} onClick={handleSubmit}>
          Login
        </button>
      </div>
    </>
  );
}
