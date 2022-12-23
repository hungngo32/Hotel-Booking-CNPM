import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "./cart.css"
const img1="https://th.bing.com/th/id/R.6f952f95fa8a0acae3c98555d9e2df3c?rik=fvwWq26FjAWCuQ&pid=ImgRaw&r=0"
const Cart = (setCart) => {
  
  const {user}=useContext(AuthContext);
  const[car,setcar]=useState(setCart.setCart);
    const [checkedState, setCheckedState] = useState(
      new Array(car.length).fill(false)
    );
    const[empty,setempty]=useState(car.length===0)
    const [total, setTotal] = useState(Number(0));
    const [checkall,setcheckall]=useState(false);
    const [abate,setabate]=useState(new Array());
    const handleSelect = (e) => {
      const checked = e.target.checked;
      const value = e.target.value;
      const id =e.target.id;
      checked ? setTotal(Number(total)+Number(value)):setTotal(Number(total)-Number(value))
      const updatedCheckedState = checkedState.map((item, index) =>
      index === Number(id) ? !item : item
    );
      setCheckedState(updatedCheckedState);
      console.log(id)
    };
    const handleSelectall = (e)=>{
        let checked_=e.target.checked;
        if(checked_)
        {
          setcheckall(true); 
          setCheckedState(new Array(car.length).fill(true))
        var result = car.reduce(function(tot, arr) { 
          return tot + arr.price;
        },0);
        setTotal(result)
        }
        else 
        {setcheckall(false);
          setTotal(Number(0))
          setCheckedState(new Array(car.length).fill(false))
        } 
  };
  const handleClickDelete = (e)=>{
      const index=e.target.id;
      if(car.length===1)
      {
        car.pop()
        setempty(true)
        localStorage.setItem("cart", JSON.stringify(new Array()))
        user.cart=new Array();
      }
      else 
      {
        const car_ = car.splice(Number(index),1)
        setcar(car_)
        localStorage.setItem("cart", JSON.stringify(car_))
        user.cart=car_;
      }
      localStorage.setItem('user',JSON.stringify(user))
  };
  const handleClickAbate = ()=>
  {
    const result = car.filter((word,index) =>checkedState[index] );

    localStorage.setItem("bill", JSON.stringify(result))
  };

  return (
    <div className='Cart'>
        <span>CART</span>
        <div className="rContainer_cart">
        <div className='select_all_cart'>
          <input type="checkbox" id="checkbox_all"   onChange={handleSelectall}></input>
          <span>Select all</span>
          <hr></hr>
        </div>
        {empty ? (<><div id='Car_empty'><span>CART IS EMPTY</span></div></>):
        (<>{car.map((item , index) => (
          <nav>
          <div className="rItem_cart" key={item._id}>
          <input type="checkbox" id={index} value={item.price}  checked={ checkedState[index]} onChange={handleSelect} />
            <img className="img_Room_cart" src={img1} alt=""></img>
            <div className="R_info_cart">
            <div className="rItemInfo_cart">
              <div className="rTitle">{item.title}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              </div>
            </div>
            <div className="rPrice_cart">
            <span>Price : </span>
            {item.price}$
            <div  id={index} onClick={handleClickDelete}>Delete</div>
          </div>
          </div>
          <hr></hr>
          </nav>
        ))}</>)}
      </div>
      <div className='ThanhToan'>
        <hr ></hr>
          <div className='Price_car'>
            <div>Total :</div>
            <div><span>{total}$</span></div>
          </div>
           <button >
            <a href='/bill' src="bill" onClick={handleClickAbate}>Abate</a>
          </button>
      </div>
    </div>
  )
}
export default Cart