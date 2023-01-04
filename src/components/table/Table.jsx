import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const List = () => {

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [list, setList] = useState([]);
  useEffect(() => {
    const getData = async () => {
      //console.warn(path)
      try {
        await axios.get("http://localhost:3636/api/listbill/" + id, {
          headers: {
            'Content-Type': 'application/json'

          },
        })
          .then(response => setList(response.data));
      } catch (err) { }
    }
    getData()
  }, [list])



  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">{row.username}</TableCell>
              <TableCell className="tableCell">{row.className}</TableCell>
              <TableCell className="tableCell">{row.phone}</TableCell>
              <TableCell className="tableCell">{row.Total}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export const ListRoom = () => {

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  //console.warn(id)
  const [list, setList] = useState([]);


  useEffect(() => {
    const getData = async () => {
      //console.warn(path)
      try {
        await axios.get("http://localhost:3636/api/hotels/room/" + id, {
          headers: {
            'Content-Type': 'application/json'

          },
        })
          .then(response => setList(response.data));
      } catch (err) { }
    }
    getData()
  }, [list])

  console.warn(list.length)



  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Title</TableCell>
            <TableCell className="tableCell">Desc</TableCell>
            <TableCell className="tableCell">Max People</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Room Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.length > 0 ? (list.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">{row.title}</TableCell>
              <TableCell className="tableCell">{row.desc}</TableCell>
              <TableCell className="tableCell">{row.maxPeople}</TableCell>
              <TableCell className="tableCell">{row.price}</TableCell>
              <TableCell className="tableCell">{row.roomNumber.length}</TableCell>

            </TableRow>
          ))) : (<></>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default List;
