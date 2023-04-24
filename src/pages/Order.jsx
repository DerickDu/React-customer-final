import React, { useEffect, useState } from "react"
// import { DataGrid, Button } from '@mui/material';
import OrderCard from "../components/Orders/OrderCard";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Order = () => {

    const navigate = useNavigate();
    if (localStorage.getItem('login') === "false" || localStorage.getItem('login') === null) {
        return <div><h1></h1><div>
            Please Login First
            <div>
                <Button onClick={() => {
                    navigate("/login")
                }}>Login</Button></div>
        </div></div>
    }

    if (localStorage.getItem('user')) {
        var userDetail = JSON.parse(localStorage.getItem('user-detail'));
    } else {
        var userDetail = { credit: 0 };
    }



    const [order, setOrder] = useState([]);  // add state to functional component, initial [], return a array and a function to update the state
    const getTotal = () => {
        let total = 0;
        order.map((item) => {
            if (item.orderStatus == "Not Purchased") {
                total += item.tempCost;
            }
        })
        return total;
    }
    useEffect(() => {
        fetch('http://6310apiserver-env.eba-jxexupk4.us-east-1.elasticbeanstalk.com/api/orders/customer/' + localStorage.getItem("user"))
            .then((res) => res.json())
            .then((data) => {
                setOrder(data.orders);


            })
            .catch((err) => {
                console.log(err);
            });
        //fetchOrders();
    }, [])



    const styles = {
        row: {
            width: "100%",
            margin: "15 auto",
            display: "flex",
            "flexDirection": "row",
            "justifyContent": "center",
        },
        block: {
            width: "100px",
        }
    }



    //fetch data, run the function vevery render of the component

    const mapOrders = (order) => {
        if (order["tempCost"] == 0) {
            return
        }
        return (
            <div style={styles.row}>
                <OrderCard order={order} storeId={order.storeId} />
            </div>
        )
    }

    const handlePay = () => {
        for (let i = 0; i < order.length; i++) {
            if (order[i].tempCost > 0 && order[i].orderStatus == "Not Purchased")
                console.log("order detail", order[i])
            const requestBody = {
                

            }


        }
    }

    handlePay();


    return (
        <div >
            <div className="header-row">
                <h1 className="pretty-h1 ">{`Total Value: $${getTotal()}`}</h1>
                <h1 className="pretty-h1">{`Available credit: $${userDetail.credit}`}</h1>
                <h1 className = "pretty-h2 ">{`Order List`}</h1>
                
                <Button className = "button" variant="contained">Pay In One Click</Button>
            </div>
            {order.map(mapOrders)}
        </div>
        //
    )
}


export default Order;

//