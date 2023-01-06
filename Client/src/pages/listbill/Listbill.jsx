import React, { useContext } from 'react'
import { json } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar'
import Header from "../../components/header/Header";
import useFetch from "../../hooks/useFetch";
import { SearchBill } from "../../components/searchItem/SearchItem";
import { AuthContext } from '../../context/AuthContext';

const ListBill = () => {
    const { user } = useContext(AuthContext)

    const { data, loading, error } = useFetch(
        `/listbill/${user.username}`)
    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listResult">
                {loading ? (
                    "loading"
                ) : (
                    <>{data.map((item) => (
                        <SearchBill item={item} key={item._id} />
                    ))}

                    </>
                )}
            </div>
        </div>
    )
}
export default ListBill