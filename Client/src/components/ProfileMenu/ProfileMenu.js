
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
import moment from 'moment/moment';
import { async } from 'rsvp';

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const ProfileMenu = (index) => {
    const [file, setFile] = useState("");

    const { user } = useContext(AuthContext);
    const [userN, setuserName] = useState(user.username);
    const [userPhone, setuserPhone] = useState(user.phone);
    const [userEmail, setuserEmail] = useState(user.email);
    const [userCity, setuserCity] = useState(user.city);
    const [userCountry, setuserCountry] = useState(user.country);
    const [passCur, setpassCur] = useState([])
    const [passNew, setpassNew] = useState([])
    const handleclick = async (e) => {

        e.preventDefault();
        const newImg = new FormData();
        newImg.append("file", file);
        newImg.append("upload_preset", "upload");
        try {
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/drohsdw1z/image/upload",
                newImg
            );
            const { url } = uploadRes.data;

            const temp = user
            temp.username = userN;
            temp.phone = userPhone;
            temp.email = userEmail;
            temp.city = userCity;
            temp.country = userCountry;
            temp.img = url
            console.log(temp)
            localStorage.setItem("user", JSON.stringify(temp))
            updateProfile(user._id, temp)
        } catch (err) {
            console.log(err)
        };


    }
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
    };

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
    // const cancelRoom=async()=>{
    //     try{

    //     }
    // }
    const { data, loading, error } = useFetch(
        `/listbill/${user._id}`)
    // console.warn(data)
    const getWaitingRoom = (data) => {

        let today = new Date()
        today.setHours(0, 0, 0, 0);
        today = moment(today).format("YYYY-MM-DD HH:mm");

        //console.warn("day ne")
        // console.warn(today)
        let temp = new Array()
        for (let ele of data) {
            temp.push(ele.bill)
        }
        let officalData = new Array()
        let cnt = 0
        let dat = new Array()
        for (let ele of temp) {
            cnt++;

            if (ele.length === 0) {
                continue;
            }
            for (let detail of ele) {
                if (detail.length === 0) {
                    continue;
                }
                let date = detail.Date
                let cmpDate = new Date(date[0])
                cmpDate = moment(date[0]).format("YYYY-MM-DD HH:mm");
                if (today <= cmpDate) {
                    officalData.push(ele)
                    dat.push(cnt)
                    break
                }
                break;
            }
            //
            //
            // 
            // 
            //
            //console.warn(date[0], cmpDate)

        }
        let waitDat = new Array()
        for (let i = 0; i < dat.length; i++) {
            waitDat.push(data[dat[i] - 1])
        }
        return waitDat
    }
    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());

        const dates = [];

        while (date <= end) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return dates;
    };

    const cancelRoom = async (alldates1, id) => {

        console.warn(alldates1, id)
        try {

            await axios.put("http://localhost:3636/api/rooms/cancelroom/" + id, {

                dates: alldates1
            });
        } catch (err) {
            console.log(err)
        }
    }
    const deleteBill = async (id) => {
        try {
            await axios.delete(`listbill/delete/${id}`)
        } catch (err) {
            console.log(err)
        }
    }
    const handleCancel = async (e) => {
        let value = JSON.parse((e.target.value))
        let id = value.id[0]
        let dates = value.Date
        let idBill = e.target.id
        console.warn(id, idBill)
        const alldates1 = getDatesInRange(dates[0], dates[1]);
        console.warn(alldates1)
        await cancelRoom(alldates1, id)
        await deleteBill(idBill)
        //cancelRoom(value)
        //console.warn(123)
    }
    let waitingRoom = getWaitingRoom(data)

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
                    <label htmlFor="file">
                        Image: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}

                    />


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
                {loading ? (
                    "loading"
                ) : (
                    <>{data ? (<>

                        {data.map((item) => (
                            <div>

                                <SearchBill item={item} key={item._id} />

                            </div>

                        ))}</>) : (
                        <div className='empty_profile'>
                            <IconContext.Provider value={{ color: '#E1E1E1', size: "7vh" }}>
                                <FaTrash></FaTrash>
                            </IconContext.Provider>
                            <h6>chưa có giao dịch nào</h6>

                        </div>)
                    }</>
                )}

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
            {Number(index.index) === 4 ? (<div>
                <h1>Phòng đang chờ</h1>
                {loading ? (
                    "loading"
                ) : (<>
                    {waitingRoom ? (<>
                        {
                            waitingRoom.map((item) => (
                                <div className="history_infor">
                                    <div >
                                        <span>Khách sạn :   </span>
                                        <span>{item.bill[0].hotel}</span>
                                    </div>
                                    <div>
                                        <span>Số Phòng :   </span>
                                        {item.bill.map((values) => (

                                            <div>
                                                <div className="history_date_infor">

                                                    <label>{values.room}</label>
                                                    <div className="date_infor">
                                                        <span>từ ngày {new Date(values.Date[0]).getDate() + "/" + new Date(values.Date[0]).getMonth() + "/" + new Date(values.Date[0]).getFullYear()} </span>
                                                        <span>đến ngày {new Date(values.Date[values.Date.length - 1]).getDate() + "/" + new Date(values.Date[values.Date.length - 1]).getMonth() + "/" + new Date(values.Date[values.Date.length - 1]).getFullYear()}</span>

                                                    </div>
                                                    <button value={JSON.stringify(values)} id={item._id} onClick={handleCancel}>Hủy đặt phòng</button>

                                                </div>

                                            </div>
                                        ))}

                                        <div className="history_price_infor">
                                            <span>price : </span>
                                            <h5>{item.Total}</h5>
                                        </div>
                                    </div>

                                </div>
                            ))

                        }</>) : (<div className='empty_profile'>
                            <IconContext.Provider value={{ color: '#E1E1E1', size: "7vh" }}>
                                <FaTrash></FaTrash>
                            </IconContext.Provider>
                            <h6>chưa có giao dịch nào</h6>

                        </div>)}

                </>
                )}

            </div>) : (<div />)}
        </div>
    )
}

export default ProfileMenu