import { joinPaths } from '@remix-run/router';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import {
    FaTrash
} from "react-icons/fa"
import "./profilemenu.css"
import { IconContext } from 'react-icons';
import useFetch from '../../hooks/useFetch';
import { SearchBill } from "../../components/searchItem/SearchItem";
import axios from "axios";
const ProfileMenu = (index) => {
    const { user } = useContext(AuthContext);
    const [userN, setuserName] = useState(user.username);
    const [userPhone, setuserPhone] = useState(user.phone);
    const [userEmail, setuserEmail] = useState(user.email);
    const [userCity, setuserCity] = useState(user.city);
    const [userCountry, setuserCountry] = useState(user.country);
    const [passCur, setpassCur] = useState([])
    const [passNew, setpassNew] = useState([])

    const updateProfile = async (id, data) => {

        let url = "http://localhost:3636/api/users/" + id
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Awaiting response.json()
        const resData = await response.json();
        console.warn(resData)
    };

    const updatePassword = async (id, data) => {

        let url = "http://localhost:3636/api/users/" + id
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Awaiting response.json()
        const resData = await response.json();
        console.warn(resData)
    };
    const handleclick = () => {
        const temp = user
        temp.username = userN;
        temp.phone = userPhone;
        temp.email = userEmail;
        temp.city = userCity;
        temp.country = userCountry;
        localStorage.setItem("user", JSON.stringify(temp))
        updateProfile(user._id, temp)

    }
    const doimatkhau = async () => {
        try {
            const newPass = {
                passwordCurr: passCur,
                newpassword: passNew
            }
            await axios.put(`/users/updatePassword/${user._id}`, newPass);
        } catch (err) {
            console.log(err)
        }


    };
    const { data, loading, error } = useFetch(
        `/listbill/${user._id}`)

    return (
        <div className='_0'>
            {Number(index.index) === 0 ? (<div >
                <div className='profile_href'> <a href='/'>Home /</a>
                    <a href='/profile'>Tài khoản</a>
                </div>
                <h1>Tài Khoản</h1>
                <div className='profile_infor_0'>
                    <div><span >UserName</span>
                        <span className='required'>*</span></div>
                </div>
                <div ><input type='text' style={{ width: '50vh', height: '5vh', margin: "2vh 0px 2vh 15px" }} value={userN} onChange={e => setuserName(e.target.value)} ></input></div>
                <div>
                    <div className='profile_infor_0'><div> <span>Email</span><span className='required'>*</span></div>
                        <div> <span>Phone</span><span className='required'>*</span></div>
                    </div>
                    <div >
                        <input type='text' style={{ width: '40vh', height: '5vh', margin: "2vh 0px 2vh 15px" }} value={userEmail} onChange={e => setuserEmail(e.target.value)} ></input>
                        <input type='text' style={{ width: '30vh', height: '5vh', margin: "2vh 0px 2vh 15px" }} value={userPhone} onChange={e => setuserPhone(e.target.value)} ></input>
                    </div>
                </div>
                <div>
                    <div className='profile_infor_0'><div> <span>City</span><span className='required'>*</span></div>
                        <div> <span>Country</span><span className='required'>*</span></div>
                    </div>
                    <div  >
                        <input type='text' style={{ width: '40vh', height: '5vh', margin: "2vh 0px 2vh 15px" }} value={userCity} onChange={e => setuserCity(e.target.value)} ></input>
                        <input type='text' style={{ width: '30vh', height: '5vh', margin: "2vh 0px 2vh 15px" }} value={userCountry} onChange={e => setuserCountry(e.target.value)} ></input>
                    </div>
                </div>
                <button onClick={handleclick}>Lưu</button>

                <div>
                    <div className='profile_infor_0'><div> <span>Password Current</span><span className='required'>*</span></div>
                        <div> <span>New Password</span><span className='required'>*</span></div>
                    </div>
                    <div  >
                        <input type='text' style={{ width: '40vh', height: '5vh', margin: "2vh 0px 2vh 15px" }} onChange={e => setpassCur(e.target.value)} ></input>
                        <input type='text' style={{ width: '30vh', height: '5vh', margin: "2vh 0px 2vh 15px" }} onChange={e => setpassNew(e.target.value)} ></input>
                    </div>
                </div>
                <button onClick={doimatkhau}> Đổi mật khẩu</button>
            </div>) : (<div />)}









            {Number(index.index) === 1 ? (<div >
                <div className='profile_href'> <a href='/'>Home /</a>
                    <a href='/profile'>Lịch sử</a>
                </div>
                <h1>Lịch sử đặt phòng</h1>
                <span> Load từ sever</span>
                {loading ? (
                    "loading"
                ) : (
                    <>{data.map((item) => (
                        <SearchBill item={item} key={item._id} />
                    ))}

                    </>
                )}


                <div className='empty_profile'>
                    <IconContext.Provider value={{ color: '#E1E1E1', size: "7vh" }}>
                        <FaTrash></FaTrash>
                    </IconContext.Provider>
                    <h6>chưa có giao dịch nào</h6>

                </div>
            </div>) : (<div />)}







            {Number(index.index) === 2 ? (<div>
                <div className='profile_href'> <a href='/'>Home /</a>
                    <a href='/profile'>ưu đãi</a>
                </div>
                <h1>Ưu đãi của tôi</h1>
                <div>
                    <span> test case chưa load từ sever </span>
                    <div className='empty_profile'>
                        <IconContext.Provider value={{ color: '#E1E1E1', size: "7vh" }}>
                            <FaTrash></FaTrash>
                        </IconContext.Provider>
                        <h6>chưa có ưu đãi nào </h6>
                    </div>
                </div>
            </div>) : (<div />)}
            {Number(index.index) === 3 ? (<div>
                <div className='profile_href'> <a href='/'>Home /</a>
                    <a href='/profile'>Câu hỏi</a>
                </div>
                <h1>Câu hỏi của tôi</h1>
                <div className='empty_profile'>
                    <IconContext.Provider value={{ color: '#E1E1E1', size: "7vh" }}>
                        <FaTrash></FaTrash>
                    </IconContext.Provider>
                    <h6>chưa có câu hỏi nào</h6>
                </div>
            </div>) : (<div />)}
        </div>
    )
}

export default ProfileMenu