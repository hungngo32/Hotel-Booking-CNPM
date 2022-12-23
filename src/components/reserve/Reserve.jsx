import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaBed,
  FaHome,
  FaWifi,
  FaShower,
  FaChild,
  FaCheck,

} from "react-icons/fa"
import { IconContext } from "react-icons/lib";
import { AuthContext } from "../../context/AuthContext";

const Reserve = ({ hotelId }) => {
  const img1 = "https://th.bing.com/th/id/R.6f952f95fa8a0acae3c98555d9e2df3c?rik=fvwWq26FjAWCuQ&pid=ImgRaw&r=0"
  const { user } = useContext(AuthContext);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
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
  const ngay = JSON.parse(localStorage.getItem('date'));
  const alldates = getDatesInRange(dates[0]?.endDate ? dates[0].endDate : new Date(ngay[0].endDate), dates[0]?.startDate ? dates[0].startDate : new Date(ngay[0].startDate));

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };
  const handleCart = () => {
    const cart = []

    let date = JSON.parse(localStorage.getItem("date"))
    console.warn(date)
    for (let room of selectedRooms) {
      for (let item of data) {
        let infoItem = {}
        for (let roomNumber of item.roomNumber) {
          if (room === roomNumber._id) {
            infoItem["title"] = item.title
            infoItem["price"] = item.price
            infoItem["desc"] = item.desc
            infoItem["maxPeople"] = item.maxPeople
            infoItem["room"] = roomNumber.number
            infoItem["date"] = []
            infoItem["date"].push(date[0]["startDate"])
            infoItem["date"].push(date[0].endDate)

            cart.push(infoItem)
            user.cart.push(infoItem)
          }
        }
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    localStorage.setItem('user', JSON.stringify(user))
  }
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();
  const handleClickBook = (e) => {
    const value = e.target.value;
    console.log(data[value])
    //navigate('/')
    //ch xử lý
  }

  const handleClick = async () => {

    if (user == null) { navigate('/login') }
    else {
      try {
        handleCart()
        await Promise.all(
          selectedRooms.map((roomId) => {
            const res = axios.put(`ư${roomId}`, {
              dates: alldates,
            });
            return res.data;
            // const temp = axios.get(`http://localhost:3636/api/rooms/${roomId}`)
            // return true;
          })
        );
        window.location.reload(false);
      } catch (err) { }
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">

        {data.map((item, index) => (
          <>
            <div className="rInFo">
              <div className="rtitle">
                <span id="title">{item.title}</span>
                <label>{item.desc}</label>
              </div>
              <div className="rInFOitem">
                <div className="rservice_">
                  <img src={img1}></img>
                  <IconContext.Provider value={{ color: 'green', size: '15px' }}>
                    <div><FaHome></FaHome><span > 25 m^2 </span></div>
                    <div><FaBed></FaBed><span> 2 giường </span></div>
                    <div><FaWifi></FaWifi><span> free wifi </span></div>
                    <div><FaShower></FaShower><span> shower </span></div>
                  </IconContext.Provider>
                </div>
                <div className="rinforitem">
                  <div className="rpeople">
                    <IconContext.Provider value={{ color: '#EDEFF2', size: '20px' }}>
                      <div><FaChild></FaChild><span> x {item.maxPeople} người lớn </span></div>
                      <div><FaChild></FaChild><span> x {item.maxPeople} trẻ em </span></div>
                    </IconContext.Provider>
                  </div>
                  <hr></hr>
                  <div className="rincentives">
                    <label>Ưu đãi trong phòng </label>
                    <IconContext.Provider value={{ color: 'green', size: '10px' }}>
                      <div><FaCheck></FaCheck><span>Miễn phí buổi sáng</span> </div>
                      <div><FaCheck></FaCheck><span>Miễn phí Phòng tập thể dục</span> </div>
                    </IconContext.Provider>
                  </div>
                  <hr></hr>

                  <div className="rSelectR">
                    <div className="Rroom">
                      <label>Chọn Phòng : </label>

                      {item.roomNumber.map((roomNumber) => (
                        <div className="room">
                          <input
                            type="checkbox"
                            value={roomNumber._id}
                            onChange={handleSelect}
                            disabled={!isAvailable(roomNumber)}></input>
                          <span>{roomNumber.number}</span>
                        </div>
                      ))}

                    </div>
                    <span className="rPrice_">{item.price}$/day</span>
                    <button onClick={handleClickBook} value={index}> Book now !</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
        <button className="R_addtocar" onClick={handleClick}>Add to Cart !</button>
      </div>
    </div>
  );
};

export default Reserve;