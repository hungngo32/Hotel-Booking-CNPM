import React, { useContext, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { json, Navigate } from 'react-router-dom';
import "./invoice.css"
import { GrLocation } from "react-icons/gr"
import { IconContext } from 'react-icons'
import logo from "../../img/logoHotel.png";
import ky from "../../img/ky.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
const Invoice = () => {
const [alertcheck,setalertcheck]= useState(true)
const [count, setCount] = useState(10);
const [intervalId, setIntervalId] = useState(0);
const navigate = useNavigate();

const abate=JSON.parse(localStorage.getItem('abate'))
const { user } = useContext(AuthContext)
if(count===0)
{
  navigate('/')
}
  return (
    <>
    <div className='invoice'>
        <div className='invoice_form'>
        <div className='invoice_logo'><img src={logo}></img> <span>Royal Hotel</span></div>
        <div className='invoice_phone'>
            <h1>Điện thoại:  </h1>
            <span>(+84) 0378870240 </span>
        </div>
        <div className='invoice_address'>
            <h1>Địa chỉ:</h1>
            <h2>Công Ty royal hotel</h2>
            <h2> Phường linh trung </h2>
            <h2>Vietnam 049712</h2>
            <h2>Mã số thuế/GST : 2005068778</h2>
        </div>
        
        <div className='invoice_code'>
            <h1> Mã số đặt Phòng: </h1>
            <span>216791</span>
        </div>
        <div className='invoice_code'>
            <h1> Ngày thu tiền: </h1>
            <span>ngày</span>
        </div>
        <div className='invoice_infor'>
            <h1>Hóa đơn đặt phòng khách sạn</h1>
            
                <div className='invoice_custome_label'>
                    <span>Họ tên địa chỉ khách hàng</span>
                </div>
                <div className='invoice_custome'>
                    <div>
                    <div className='profile_infor_1'>
                    <div><h2>Họ và tên: </h2>
                        <span >{user.username}</span></div>
                </div>
    
                <div>
                    <div className='profile_infor_1'><div> <h2>Email: </h2><span>{user.email}</span></div>
                        <div> <h2>Phone: </h2><span>{user.phone}</span></div>
                    </div>
                    
                </div>
                <div>
                    <div className='profile_infor_1'><div> <h2>City: </h2><span>{user.city}</span></div>
                        <div> <h2>Country: </h2><span>{user.country}</span></div>
                    </div>
                    
                </div>
                </div>
                </div>
             </div>
             <div className='invoice_detail'>
                <div className='invoice_infor_detail'>
                    <div className='label_infor_detail'>
                        <span>Thông tin chi tiết</span>
                    </div>
                    <div className='invoice_infor_hotel'>
                    {abate.room.map((item)=>(
                        <><div>
                            <h2>hotel: </h2>
                            <span>Home</span>
                        </div><div>

                                <h2>Room: </h2>
                                <span>{item.room}</span>
                            </div><div>
                                <h2>Loại Phòng: </h2>
                                <span>{item.desc}</span>
                            </div><div>
                                <h2>Thời gian : </h2>
                                <span>từ ngày {new Date(item.date[0]).getDate() + "/" + new Date(item.date[0]).getMonth() + "/" + new Date(item.date[0]).getFullYear()} </span>
                                <span>đến ngày {new Date(item.date[item.date.length - 1]).getDate() + "/" + new Date(item.date[item.date.length - 1]).getMonth() + "/" + new Date(item.date[item.date.length - 1]).getFullYear()}</span>
                            </div></>
                    ))}
                    </div >
                   
                    <div className='label_infor_detail'>
                        <label>Tổng Tiền thanh toán </label>
                    </div>
                </div>
                <div className='invoice_infor_total'>
                    <div className='label_infor_total'>
                        <span> Thành Tiền </span>
                    </div>
                    <div className='label_infor_total_1'>
                    {abate.room.map((item)=>(
                        <><div></div><span>{item.price}</span></>
                        ))}
                    </div>
                    
                </div>
             </div>
             <h3>Hóa đơn này chiết xuất tự động dành riêng cho khách hàng</h3>
             <div className='Ky'><img src={ky}></img></div>
        </div>
        <div className='alter_bill_a'>
         <h1> Đã đặt phòng thành công </h1>
         <div>
           <button onClick={()=>{navigate("/")}}>Click back home</button>
         </div>
     </div>
        
    </div>
</>
  )
}

export default Invoice