import "./navbar.css";
import { json, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import React from "react";

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import Cart from "../../pages/cart/Cart";
import logo from "../../img/logoHotel.png";
import axios from "axios";
import RSVP from "rsvp";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  if (JSON.parse(localStorage.getItem('cart')) == null) { localStorage.setItem('cart', JSON.stringify([])) }
  const [car, setcar] = useState(JSON.parse(localStorage.getItem('cart')));





  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
    ;
  }







  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();
  const Login = () => {
    // 👇️ navigate to /contacts
    navigate('/login');
  };
  const emptyCart = async () => {
    try {
      await
        axios.put("http://localhost:3636/api/users/mycart/pull/" + user._id, {
        });

    } catch (err) { }
  }
  const updateCart = async () => {


    let carts = JSON.parse(localStorage.getItem('cart'));
    try {
      await Promise.all(
        carts.map((item) => {
          console.warn(item)
          const res = axios.post("http://localhost:3636/api/users/mycart/" + user._id, {
            cart: item,
          });
          return res.data;
        })
      );
    } catch (err) { }
  };
  // const handleCart = () => {
  //   var requests = [];

  //   requests.push(emptyCart());

  //   requests.push(updateCart());
  //   return RSVP.all(requests);
  // }

  const logout = () => {
    //handleCart()
    emptyCart();

    updateCart();
    console.warn(isLoggedin)
    localStorage.removeItem('user');
    setIsLoggedin(false); navigate("/");
    localStorage.removeItem('cart');
    navigate(0);
  };

  const Register = () => {
    // 👇️ navigate to /contacts
    navigate('/register');
  };
  return (
    <nav>
      <div className="navbar">
        <div className="navContainer">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="menuNavbar">
            <li><a href="/" className="link_content_navbar  active">Home</a></li>
            <li><a href="/login" className="link_content_navbar">Room</a></li>
            <li><a href="/login" className="link_content_navbar">Room Detail</a></li>
            <li><a href="/login" className="link_content_navbar">Pages</a></li>
            <li><a href="/login" className="link_content_navbar">Contact</a></li>
          </div>
          {user ? (
            <>
              <div className="menu_car">
                <div><a href="/profile" id="user_">{user.username}</a></div>
                <>
                  <IconContext.Provider value={{ color: '#EBDDDA' }}>
                    <div className='navbar_car'>
                      <Link to='./' className='menu-bars'>
                        <FaIcons.FaShoppingCart onClick={showSidebar} />
                      </Link>
                      {car.length === 0 ? (<span></span>) : (<span id="lengthCart">{car.length}</span>)}
                    </div>
                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                      <ul className='nav-menu-items' >
                        <li className='navbar-toggle' onClick={showSidebar}>
                          <Link to='./' className='menu-bars'>
                            <AiIcons.AiOutlineClose color="#1E1E1E" />
                          </Link>
                        </li>
                        {<Cart setCart={car} />}
                      </ul>
                    </nav>
                  </IconContext.Provider>
                </>
                <button className="navButton" onClickCapture={logout}  >Logout</button>

              </div>

            </>
          ) : (
            <div className="navItems">
              <button className="navButton" onClick={Register} >Register</button>
              <button className="navButton" onClick={Login}>Login</button>
            </div>
          )}

        </div>
      </div >
    </nav>
  );
};
export default Navbar;
//<button className="navButton" onClickCapture={cart}>Cart</button>