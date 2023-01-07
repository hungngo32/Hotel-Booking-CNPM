import React, { useContext, useState } from 'react'
import { json, Navigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar'
import "./bill.css"
import logo from "../../img/logoHotel.png";
import { ButtonsNav } from 'hero-slider';
import MailList from '../../components/mailList/MailList';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { SearchContext } from "../../context/SearchContext";
import {
  FaCalendarCheck,
  FaCalendarTimes,
  FaBed,
  FaPhone,

} from "react-icons/fa";
import { IconContext } from 'react-icons';
import { max } from 'date-fns';
import { AuthContext } from '../../context/AuthContext';
import Footer from '../../components/footer/Footer';
import { async } from 'rsvp';
const Bill = () => {

  const navigate = useNavigate();
  const img1 = "https://th.bing.com/th/id/R.6f952f95fa8a0acae3c98555d9e2df3c?rik=fvwWq26FjAWCuQ&pid=ImgRaw&r=0"
  let bill = JSON.parse(localStorage.getItem('bill'));

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  function sumArray(mang) {
    let sum = 0;
    mang.map(function (item) {
      sum += item.price * dayDifference(new Date(item.date[item.date.length - 1]), new Date(item.date[0]))
    });

    return sum;
  }
  const total = sumArray(bill)
  const { user } = useContext(AuthContext);
  const [check, setcheck] = useState(false);
  const [email, setemail] = useState(user.email);
  const [sdt, setsdt] = useState(user.phone);
  const [userName, setuserName] = useState('');
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const handleCloseRoom = async (selectedRooms, alldates) => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;

        })
      );
    } catch (err) { }
  }
  const handleBill = async (e) => {
    const ngay = JSON.parse(localStorage.getItem('date'));
    const alldates = getDatesInRange(ngay[0].startDate, ngay[0].endDate);
    console.warn(ngay, alldates)

    const ID = user._id

    if (userName === '' || sdt === '' || email === '') {
      setcheck(true);
    }
    else {
      let abate = {};

      //localStorage.setItem('abate', JSON.stringify(abate));
      setcheck(false);
      abate['username'] = user.username;
      abate['room'] = bill;
      abate['email'] = email;
      abate['phone'] = sdt;
      abate['name'] = userName;
      let selectedRooms = []
      let temp = []
      console.warn(bill)
      for (let ele of bill) {
        selectedRooms.push(ele.id)
      }
      console.warn(selectedRooms)
      for (let i of abate.room) {
        let ahihi = {}
        ahihi["hotel"] = i.title;
        ahihi["room"] = i.room;
        ahihi["id"] = i.id;
        let ngay = []
        for (let j of i.date) {
          ngay.push(new Date(j))
        }
        ahihi["Date"] = ngay
        temp.push(ahihi)



      }
      handleCloseRoom(selectedRooms, alldates)
      try {
        const newbill = {
          username: abate.username,
          UserID: ID,
          name: abate.name,
          email: abate.email,
          phone: user.phone,
          Total: total,
          bill: temp,

        };
        await axios.post("http://localhost:3636/api/listbill/new", newbill);
        //handleCloseRoom(bill.id)
        localStorage.setItem('abate', JSON.stringify(newbill));
      }
      catch (err) {
        console.log(err)
      }

      //navigate('/abate')
    }
    navigate("/invoice");

  }

  return (
    <div className='fillform'>
      <nav className='bill'>
        <a href='/'>
          <img src={logo} ></img>
        </a>
        <div className='sequence-active'>
          <div><span>1</span></div>
          <label  > Điền thông tin </label>
        </div>
        <hr></hr>
        <div className='sequence'>
          <div><span>2</span></div>
          <label> Thanh toán</label>
        </div>
        <hr></hr>
        <div className='sequence'>
          <div><span>3</span></div>
          <label> Xác nhận </label>
        </div>
      </nav>
      <div className="hotelContainer_Bill">
        <div className="hotelWrapper_Bill">
          <div className="hotelDetails_Bill">
            <div className="hotelDetailsTexts_Bill">
              <h1>Điền thông tin liên hệ</h1>
              <div className='form'>
                <label>Họ và tên</label>
                <span className='required'>*</span>
                {check === true && userName === "" ? (<span className='check_empty'>(empty)</span>) : (<span></span>)}
                <div ><input type='text' style={{ width: '90vh', height: '5vh', margin: "2vh 0px 2vh 15px" }} value={userName} onChange={e => setuserName(e.target.value)}  ></input></div>
                <div className='email_sdt_bill'>
                  <div><label>Email</label>
                    <span className='required'>*</span></div>
                  {check === true && email === "" ? (<span className='check_empty'>(empty)</span>) : (<span></span>)}
                  <div><label>Số điện thoại</label>
                    <span className='required'>*</span></div>
                  {check === true && sdt === "" ? (<span className='check_empty'>(empty)</span>) : (<span></span>)}
                </div>
                <div className='input_email_sdt_bill'>
                  <input type='text' style={{ width: '55vh', height: '5vh', margin: "2vh 5vh 2vh 15px" }} value={email} onChange={e => setemail(e.target.value)}></input>
                  <input type='text' style={{ width: '29vh', height: '5vh' }} value={sdt} onChange={e => setsdt(e.target.sdt)}></input>
                </div>
                <div className='bill_service'>
                  <h5>Hãy cho chúng tôi biết Quý khách cần gì ? </h5>
                  <h4>Lưu ý tất cả các yêu cầu chỉ được đáp ứng tùy theo khách sạn  </h4>
                  <div>
                    <div><input type='checkbox' style={{ margin: "0vh 2vh 0vh 15px", width: "20px" }}></input><span>Phòng không hút thuốc</span></div>
                    <div><input type='checkbox' style={{ margin: "0vh 2vh 0vh 15px", width: "20px" }}></input><span>Phòng hút thuốc</span></div>
                  </div>
                  <div>
                    <div><input type='checkbox' style={{ margin: "0vh 2vh 0vh 15px", width: "20px" }}></input><span>Giường lớn</span></div>
                    <div><input type='checkbox' style={{ margin: "0vh 2vh 0vh 15px", width: "20px" }}></input><span>Giường đôi</span></div>
                  </div>
                  <hr></hr>
                  <div>
                    <div><input type='checkbox' style={{ margin: "0vh 2vh 0vh 15px", width: "20px" }}></input><span>Phòng tầng cao</span></div>
                    <div><input type='checkbox' style={{ margin: "0vh 2vh 0vh 15px", width: "20px" }}></input><span>Thêm nôi trẻ em</span></div>
                  </div>
                </div>
                <button onClick={handleBill}>
                  <span>Tiếp tục</span>
                </button>
              </div>
            </div>
            <div className="hotelDetailsPrice_Bill">
              <h1>Thông tin đặt phòng</h1>
              <div className='infor_bill'>
                {bill.map((item) => (
                  <>
                    <div className='img_hotel_bill'><img src={img1}></img><div><h1>Khách sạn {item.hotel}</h1><span>Phòng {item.room}</span></div></div>
                    <hr></hr>
                    <IconContext.Provider value={{ color: '#EDEFF2', size: '20px' }}>
                      <div className='day_bill'>
                        <div><FaCalendarCheck></FaCalendarCheck>
                          <span>  Ngày nhận phòng </span></div>
                        <span>{new Date(item.date[0]).getDate() + "/" + new Date(item.date[0]).getMonth() + "/" + new Date(item.date[0]).getFullYear()}</span>

                      </div>
                    </IconContext.Provider>
                    <IconContext.Provider value={{ color: '#EDEFF2', size: '20px' }}>
                      <div className='day_bill'>
                        <div><FaCalendarTimes></FaCalendarTimes>
                          <span>  Ngày trả phòng </span></div>
                        <span>{new Date(item.date[item.date.length - 1]).getDate() + "/" + new Date(item.date[item.date.length - 1]).getMonth() + "/" + new Date(item.date[item.date.length - 1]).getFullYear()}</span>
                      </div>
                    </IconContext.Provider>
                    <IconContext.Provider value={{ color: '#EDEFF2', size: '20px' }}>
                      <div className='day_bill'>
                        <div><FaBed></FaBed>
                          <span> Số khách phòng </span></div>
                      </div>
                    </IconContext.Provider>
                    <h4>{item.price * dayDifference(new Date(item.date[item.date.length - 1]), new Date(item.date[0]))}$ / {dayDifference(new Date(item.date[item.date.length - 1]), new Date(item.date[0]))} day</h4>
                  </>

                ))}
                <hr></hr>
                <div className='total_bill'>
                  <span>Total</span>
                  <span>{total} $</span>
                </div>
                <div id='confirm_'>
                  <span>Booking của bạn đang được chờ xác nhận. Tư vấn viên sẽ sớm liên hệ với bạn</span>
                </div>
                <div>
                  <IconContext.Provider value={{ color: '#EDEFF2', size: '20px' }}>
                    <div className='contact_bill'>
                      <FaPhone></FaPhone>
                      <span> Gọi</span><span id='numberphone'> 1900 4698 </span><span>để được hỗ trợ 24/7</span>
                    </div>
                  </IconContext.Provider>
                </div>
                <div >
                </div >
              </div>
            </div>
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>

  )
}

export default Bill
//<div><pre>{JSON.stringify(bill, null, 1)}</pre></div>