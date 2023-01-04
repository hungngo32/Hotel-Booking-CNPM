import "./singleHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List, { ListRoom } from "../../components/table/Table";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NewHotel from "../newHotel/NewHotel";
import { hotelInputs } from "../../formSource";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadUrl } from "firebase/storage"


const SingleHotel = () => {
    const [rooms, setRooms] = useState([]);
    const { data, loading, error } = useFetch("/rooms");
    const [edit, setedit] = useState(false)
    const location = useLocation();

    const [list, setList] = useState([]);
    const path = location.pathname.split("/")[1];
    //console.log(path) 
    const id = location.pathname.split("/")[2];
    useEffect(() => {
        const getData = async () => {
            //console.warn(path)
            if (list.length != 0) { return }
            try {
                await axios.get("http://localhost:3636/api/" + "hotels/find/" + id, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => setList(response.data));
            } catch (err) { }
        }
        getData()
    }, [list])
    const [files, setFiles] = useState("");

    const [info, setInfo] = useState({
        "photos": [files],
        "address": list.address,
        "city": list.city,
        "name": list.name,
        "title": list.title,
        "price": list.price,
    });
    //console.log(list)



    const handleChange = (e) => {

        // setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        // let hello = list
        // hello[e.target.id]=e.target.value
        // setList(hello)
        setList((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        console.log(e.target.id)
    };

    // console.log(list)
    const updateProfile = async (id, list) => {

        let url = "http://localhost:3636/api/hotels/" + id
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(list)
        });

        // Awaiting response.json()
        const resData = await response.json();
        console.warn(resData)
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", files);
        data.append("upload_preset", "upload");
        console.warn(data)
        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/lamadev/image/upload",
                data
            );

            const { url } = uploadRes.data;

            // const newUser = {
            //     ...info,
            //     img: url,
            // };

            //        await axios.post("/auth/register", newUser);
            console.warn(url)
            list["photos"] = [url]

        } catch (err) {
            console.log(err);
        }
        // e.preventDefault();
        // try {
        //   const list = await Promise.all(
        //     Object.values(files).map(async (file) => {
        //       const data = new FormData();
        //       data.append("file", file);
        //       data.append("upload_preset", "upload");
        //       const uploadRes = await axios.post(
        //         "https://api.cloudinary.com/v1_1/lamadev/image/upload",
        //         data
        //       );

        //       const { url } = uploadRes.data;
        //       return url;
        //     })
        //   );

        //   const newhotel = {
        //     ...info,
        //     rooms,
        //     photos: list,
        //   };

        //   await axios.post("/hotels", newhotel);
        // } catch (err) { console.log(err) }
        //   console.warn(id, list)
        await updateProfile(id, list)
        //setedit(false)
    };
    console.log(list)
    const handclickEDIT = () => {
        setedit(true)
    }
    localStorage.setItem("user_curr", JSON.stringify(list.username))
    return (

        <div className={edit ? "single_acive" : "single"} >

            {edit ? (<>
                <div className="edit_infor">
                    <div className="form_edit">

                        <div className="right">
                            <h1><span> EDIT HOTEL</span> <span className="cancel_edit" onClick={() => { setedit(false); console.log(edit) }}>x</span></h1>

                            <form>
                                <div className="formInput">
                                    <label htmlFor="file">
                                        Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        multiple
                                        onChange={(e) => setFiles(e.target.files[0])}
                                        style={{ display: "none" }}
                                    />
                                </div>

                                {hotelInputs.map((input) => (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        <input
                                            id={input.id}
                                            value={list[input.id]}
                                            onChange={handleChange}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                        />
                                    </div>
                                ))}
                                <div className="formInput">
                                    <label>Featured</label>
                                    <select id="featured" onChange={handleChange}>

                                        <option value={false}>No</option>
                                        <option value={true}>Yes</option>
                                    </select>
                                </div>


                            </form>
                            <button onClick={handleClick}>Save</button>
                        </div>
                    </div>
                </div></>
            ) :
                (<>
                    <Sidebar />
                    <div className="singleContainer">
                        <Navbar />
                        <div className="top">
                            <div className="left">
                                <div className="editButton" onClick={handclickEDIT}>Edit</div>
                                <h1 className="title">Information</h1>
                                <div className="item">
                                    <img
                                        //#endregionsrc="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                                        src={list.photos}
                                        alt=""
                                        className="itemImg"
                                    />
                                    <div className="details">
                                        <h1 className="itemTitle">{list.name}</h1>
                                        <div className="detailItem">
                                            <span className="itemKey">type:</span>
                                            <span className="itemValue">{list.type}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Address:</span>
                                            <span className="itemValue">{list.address}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">City:</span>
                                            <span className="itemValue">
                                                {list.city}
                                            </span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Country:</span>
                                            {/* <span className="itemValue">{list.country}</span> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
                        </div>
                        <div className="bottom">
                            <h1 className="title">Details</h1>
                            <ListRoom />
                        </div>
                    </div></>)}
        </div>
    );
};

export default SingleHotel;