import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useState } from "react";

const Widget = ({ type }) => {
  let data;
  const [amount, setAmount] = useState()
  const [numberBill, setNumberBill] = useState()
  const [earning, setEarning] = useState()
  //temporary
  const getNumberUser = async () => {
    try {
      const res = await axios.get("http://localhost:3636/api/users/countUsers/me");
      setAmount(res.data);
    } catch (err) {

    }
  }
  const getNumberBill = async () => {
    try {
      const res = await axios.get("http://localhost:3636/api/listbill/countBill/me");
      setNumberBill(res.data);
    } catch (err) {

    }
  }
  const getEarning = async () => {
    try {
      const res = await axios.get("http://localhost:3636/api/listbill/earning/me");
      setEarning(res.data);
    } catch (err) {

    }
  }
  getNumberUser()
  getNumberBill()
  getEarning()
  // const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        number: amount,
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        number: numberBill,
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        number: earning,
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        number: 0,

        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.number}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
