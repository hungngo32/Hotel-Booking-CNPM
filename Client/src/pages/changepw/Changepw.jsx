import React from 'react'
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { async } from 'rsvp';

const Changepw = () => {
    let status = ""
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
        newpassword: undefined,
        confirmpass: undefined
    });



    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        console.warn(credentials["confirmpass"] !== credentials["newpassword"])
        // e.preventDefault();
        dispatch({ type: "LOGIN_START" });

        try {
            status = "Success"
            const res = await axios.post("/auth/updatepass", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            //THIS FIX

        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
            status = err.response.data
        }
    };
    return (
        <div className="login">
            <div className="lContainer">
                <h1>Update your password</h1>
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    onChange={handleChange}

                    className="lInput"
                />
                <input
                    type="password"
                    placeholder="old password"
                    id="password"
                    onChange={handleChange}
                    className="lInput"
                />
                <input
                    type="password"
                    placeholder="new password"
                    id="newpassword"
                    onChange={handleChange}

                    className="lInput"
                />
                <input
                    type="password"
                    placeholder="confirm your new password"
                    id="confirmpass"
                    onChange={handleChange}

                    className="lInput"
                />

                <div>
                    <button disabled={loading} onClick={handleClick} className="lButton"> Submit</button>
                    <button disabled={loading} onClick={() => navigate("/login")} className="lButton"> Login</button>


                </div>
                {error && <h3 >{error.message}</h3>}
            </div>
        </div>
    );
};


export default Changepw