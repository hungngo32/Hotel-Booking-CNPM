import "./roomInfo.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import List1 from "../../components/table/List1";
import { getList } from "./getList";
import axios from 'axios';
import React from "react";
import { useEffect } from "react";
const RoomInfo = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [list, setList] = useState([]);

    useEffect(() => {
        let mounted = true;
        getList(id)
            .then(items => {
                if (mounted) {
                    setList(items)
                }
            })
        return () => mounted = false;
    }, [])
    console.warn(list)
    let data = list
    console.warn(data)
    let rows = []
    if (data) {
        rows = data.roomNumber
    }
    console.warn(rows)

    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <div className="editButton">Edit</div>
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <img
                                src="image.png  "
                                alt=""
                                className="itemImg"
                            />
                            <div className="details">
                                <h1 className="itemTitle">{data.title}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Price:</span>
                                    <span className="itemValue">{data.price}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Max People:</span>
                                    <span className="itemValue">{data.maxPeople}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Desciption:</span>
                                    <span className="itemValue">
                                        {data.desc}
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title">List Room</h1>
                    <TableContainer component={Paper} className="table">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="tableCell">Tracking ID</TableCell>
                                    <TableCell className="tableCell">Product</TableCell>
                                    <TableCell className="tableCell">Customer</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            </TableBody>
                            <TableBody>
                                {/* {rows.map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell className="tableCell">{row._id}</TableCell>

                                        <TableCell className="tableCell">{row.number}</TableCell>

                                        <TableCell className="tableCell">{row.number}</TableCell>

                                    </TableRow>
                                ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
};

export default RoomInfo;
