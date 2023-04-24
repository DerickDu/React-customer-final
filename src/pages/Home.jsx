import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";


const Home = () => {
    // if (localStorage.getItem('login') === false) {
    //     return
    // }
    const navigate = useNavigate();
    if (localStorage.getItem('login') === "false") {
        return <div><h1></h1><div>
            Please Login First
            <div>
                <Button onClick={() => {
                    navigate("/login")
                }}>Login</Button></div>
        </div></div>
    }

    if (JSON.parse(localStorage.getItem('user-detail')) === null) {
        var userDetail = {
            firstName: "",
            lastName: "",
            customerId: "",
            phoneNumber: "",
            addressX: "",
            addressY: "",
            credit: "",
            rating: "",
        }
    } else {
        var userDetail = JSON.parse(localStorage.getItem('user-detail'))
    }
    console.log("🚀 ~ file: Home.jsx:21 ~ Home ~ userDetail:", userDetail)


    return <div>
        {JSON.parse(localStorage.getItem('user-detail')) === null ? (<div>
            <h2>{`Home`}</h2>
            <h3>Please Login First</h3>
                    <div>
                <Button onClick={() => {
                    navigate("/login")
                }}>Login</Button></div>
        </div>) : (
                <div>
            <h2>{`Home`}</h2>
            <h2>{`Hi, ${userDetail.firstName} ${userDetail.lastName}`}</h2>
            <h2>{`Your customer ID: ${userDetail.customerId}`}</h2>
            <h2>{`Your phone number: ${userDetail.phoneNumber ? userDetail.phoneNumber : "Not Provided"}`}</h2>
            <h2>{`Your address is (${userDetail.addressX},${userDetail.addressY})`}</h2>
            <h2>{`Your available credit: $${userDetail.credit}`}</h2>
            <h2>{`Your rating: ${userDetail.rating}`}</h2></div>
        )}
        
        


    </div>;
};

export default Home;