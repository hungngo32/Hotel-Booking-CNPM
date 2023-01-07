import React, { useState } from 'react'
import "./register.css"
const Register = () => {


    const [username, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const signUp = async () => {
        let user = { username, email, password, phone, city, country };
        console.warn(user)
        let res = await fetch("http://localhost:3636/api/auth/register",
            {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
        let temp = await res.json();
        localStorage.setItem("user-info", JSON.stringify(temp))

    }
    return (

        <div className="register">
            <div className="lContainer_r">
            <h1>REGISTER</h1>
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    className="lInput"
                    value={username}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
                <input
                    type="text"
                    placeholder="email"
                    id="email"
                    className="lInput"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    className="lInput"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <input
                    type="text"
                    placeholder="phone"
                    id="phone"
                    className="lInput"
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value)
                    }}
                />
                <input
                    type="text"
                    placeholder="city"
                    id="city"
                    className="lInput"
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value)
                    }}
                />
                <input
                    type="text"
                    placeholder="country"
                    id="country"
                    className="lInput"
                    value={country}
                    onChange={(e) => {
                        setCountry(e.target.value)
                    }}
                />
                <button onClick={signUp} className="lButton_r">
                    Register
                </button>
                <button onClick={()=>{navigator('/login')}} className="lButton_r">
                    Login
                </button>
            </div>
        </div>
    )
}

export default Register