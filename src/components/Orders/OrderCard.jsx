import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react'
import LineButton from './LineButton';
import axios from 'axios';
import "./OrderCard.css"
const OrderCard = ({ order, storeId }) => {

    const [store, setStore] = useState("");

    const cancelOrder = () => {
        axios.post("http://6310apiserver-env.eba-jxexupk4.us-east-1.elasticbeanstalk.com/api/orders/cancel", {
            "orderId": order.orderId
        })
            .then((res) => {
                console.log(res)
                refreshPage()
                window.alert("Order Cancelled Successfully")
            }
            ).catch((err) => {
                console.log(err)
            }
            )
    }
    function refreshPage() {
        window.location.reload(false);
    }



    useEffect(() => {

        fetch('http://6310apiserver-env.eba-jxexupk4.us-east-1.elasticbeanstalk.com/api/stores/')
            .then((res) => res.json())
            .then((data) => {
                setStore(data.data.name);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    return (

        (order.orderStatus != "Canceled" && (< Card  className="card" key={order.Id} sx={{ bgcolor: "#E8E8E8" }}>
            <div className="block"> </div>
            <CardContent className = "content">
                <p className = "title">
                    Order ID: {order.orderId}</p>
                <p className = "text">
                    Order Cost: ${order.tempCost}</p>
                <p className = "text">
                    From Store: {storeId} </p>
                <p className = "text">
                    Order Status: {order.orderStatus}</p>
            </CardContent>
            <CardActions>
                <LineButton OrderId={order.orderId} />
            </CardActions>
            <CardActions>
                <Button variant="outlined" size="middle" onClick={(e) => {
                    e.preventDefault();
                    cancelOrder()
                    // console.log(item)
                    // clickHandler(item);
                }}>Cancel Order</Button>
            </CardActions>
        </Card >))

    );
}

export default OrderCard;