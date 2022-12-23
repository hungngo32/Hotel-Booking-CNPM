import React from 'react'
import { json } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar'
import"./bill.css"
import  logo from"../../img/logoHotel.png";
const Bill = () => {
    let bill = JSON.parse(localStorage.getItem('bill'));
    console.warn(bill)
    return (
    <div className='fillform'>
       <nav>
            <a href='/'>
                <img src={logo} ></img>
            </a>
            <div className='sequence'>
                <div className='step-active'><span>1</span></div>
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
             <span>Điền Thông Tin</span>
             <div className='form'>
                <span>Họ và tên</span>
                <div><input></input></div>
                <div className='email_sdt_bill'>
                    <span>Email</span>
                    <span>Số điện thoại</span>
                </div>
                <div className='input_email_sdt_bill'>
                    <input></input>
                    <input></input>
                </div>
                <span>Hãy cho chúng tôi biết Quý khách cần gì ? </span>
                

        
             </div>
            
           </div>
           <div className="hotelDetailsPrice_Bill">
           <div>
             <h1>Perfect for a-night stay!</h1>
             <span>
               Located in the real heart of Krakow, this property has an
               excellent location score of 9.8!
             </span>
             <h2>
               <b>$</b> 
             </h2>
           </div>
           </div>
         </div>
       </div>
       
     </div>
       
      
      </div>
       
    )
}

export default Bill
//<div><pre>{JSON.stringify(bill, null, 1)}</pre></div>