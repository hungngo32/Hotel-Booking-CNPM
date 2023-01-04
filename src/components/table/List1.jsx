import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const List1 = ({ cols }) => {
    console.warn("daynay")
    console.warn(cols)
    let rows = cols.roomNumber;
    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">STT</TableCell>
                        <TableCell className="tableCell">Room</TableCell>
                        <TableCell className="tableCell">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow >
                            <TableCell className="tableCell">{index}</TableCell>
                            <TableCell className="tableCell">{row.number}</TableCell>
                            <TableCell className="tableCell">{row.number}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default List1;
