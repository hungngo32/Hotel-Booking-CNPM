import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import React from "react";
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });




  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleChangePassword = () => {
    navigate("/changepassword")
  }
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      //THIS FIX
      localStorage.setItem('token-info', JSON.stringify(res.data));

      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };















  return (
    <div className="login">
      <div className="lContainer">
        <h1>LOGIN</h1>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}

          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <div>
          <button disabled={loading} onClick={handleClick} className="lButton"> Login</button>
          <button onClick={() => (navigate('/register'))} className="lButton"> Register</button>
        </div>
        <a onClick={() => (navigate('/changepassword'))} > Change password </a>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
