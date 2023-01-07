import React, { useContext, useState } from 'react'
import { IconContext } from 'react-icons';
import { BsFillPersonFill } from "react-icons/bs";
import { FaBarcode, FaAngleDoubleRight } from "react-icons/fa"
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import { AuthContext } from '../../context/AuthContext';
import "./profile.css"
const Profile = () => {
    const { user } = useContext(AuthContext);
    const Menu = ["Tài khoản", "Quản lý đơn hàng", "Ưu đãi của tôi", "Câu hỏi của tôi"]
    const [index_menu, setindex] = useState(0)
    const [isActive, setActive] = useState(
        new Array(Menu.length).fill(false)
    );
    const handleClick = (e) => {
        console.log(e.target.id);
        const index = Number(e.target.id)
        let array = new Array(Menu.length).fill(false)
        array[index] = true
        setActive(array)
        setindex(index)
    }

    return (
        <>
            <Navbar />
            <div className='profile'>
                <div>
                    <div className='profile_'>
                        <div className='profile_icon'>
                            <IconContext.Provider value={{ color: '#454545', size: "6vh" }}>
                                <BsFillPersonFill />
                                <label>{user.username}</label>
                            </IconContext.Provider>
                        </div >
                        <div className="profile_barcode"><IconContext.Provider value={{ color: 'black', style: { fontSize: "8vh" } }}><FaBarcode /></IconContext.Provider>
                            <IconContext.Provider value={{ color: 'black', style: { fontSize: "8vh", } }}><FaBarcode /></IconContext.Provider>
                            <IconContext.Provider value={{ color: 'black', style: { fontSize: "8vh", } }}><FaBarcode /></IconContext.Provider>
                        </div>
                        <div className='profile_sdt'>
                            <div><h1>SĐT</h1>
                                <h2>tích điểm</h2></div>
                            <span>{user.phone}</span>
                        </div>
                        <div className='profile_rank'>
                            <div><span>BRONZE </span>
                                <span>0 HSVPoint </span>
                            </div>
                            <hr></hr>
                            <div>Nhận 200 điểm nữa để nâng hạng lên SILVER</div>
                            <div className='profile_more_infor'>
                                <h2>Xem tất cả quyền lợi</h2>
                                <div className='profile_right'><IconContext.Provider value={{ color: 'white', style: { fontSize: "2vh", } }}><FaAngleDoubleRight /></IconContext.Provider></div>
                            </div>
                        </div>
                    </div>
                    <div className='profile_menu'>
                        {Menu.map((values, index) => (<div id={index} onClickCapture={handleClick} className={isActive[index] ? "profile_menu_active" : "profile_menu_"}>
                            {values}
                        </div>))}
                    </div>
                </div>
                <div className='profile_element'>
                    <ProfileMenu index={index_menu}></ProfileMenu>
                </div>
            </div>
            <hr></hr>
            <div className='profile_Footer'>
                <Footer></Footer>
            </div>
        </>
    )
}

export default Profile