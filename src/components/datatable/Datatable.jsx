import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Navigate } from "react-router-dom";
const Datatable = ({ columns }, { type }) => {
  const location = useLocation();
  const navigate = useNavigate()
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);

  //const { data, loading, error } = useFetch(`/${path}`);

  // useEffect(() => {
  //   setList(data);
  // }, [data]);
  useEffect(() => {

    const path = location.pathname.split("/")[1];

    const getData = async (path) => {
      console.warn(path)
      try {
        await axios.get("http://localhost:3636/api/" + path, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + "123"
          },
        })
          .then(response => setList(response.data));
      } catch (err) { }
    }
    getData(path)
  }, [list])
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) { }
  };
  const handleView = async (id, path) => {
    // let id = params.row._id
    console.warn(id)
    if (path === "users") {
      let s = "/users/" + id
      console.warn(s)
      navigate("/users/" + id);
    } else if (path === "rooms") {
      let s = "/rooms/" + id
      console.warn(s)
      navigate("/rooms/" + id);
    }
    else if (path === "hotels") {

      navigate("/hotels/" + id);
    }
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">

            <div className="viewButton"
              onClick={() => handleView(params.row._id, path)}>View</div>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;