import React, { useEffect, useState } from 'react'
import { Card, Button } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import BasicCard from './Card';
import axios from 'axios';
import "./Cart.css"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import FolderIcon from '@mui/icons-material/Folder';
// import DeleteIcon from '@mui/icons-material/Delete';



const Cart = ({ ItemInCart, setCartItems }) => {

    const handleMinusToCart = (clickedItem) => {
        setCartItems((prev) => {
            const isItemInCart = prev.find((item) => item.name === clickedItem.name);

            if (isItemInCart) {
                const newCart = (prev.map((item) =>
                    item.name === clickedItem.name
                        ? { ...item, amount: item.amount - 1 }
                        : item)
                )
                localStorage.setItem("cart", JSON.stringify(newCart));
                return newCart;
            }
            const newCart = [...prev, { ...clickedItem, amount: 0 }];
            localStorage.setItem("cart", JSON.stringify(newCart));
            return newCart;
        });
    };

    const calculateTotal = (ItemInCart) => {
        let total = 0;
        ItemInCart.forEach((item) => {
            total += item.price * item.amount;
        })
        return total;
    }
    const sumTotalAmount = (ItemInCart) => {
        let total = 0;
        ItemInCart.forEach((item) => {
            total += item.amount;
        })
        return total;
    }
    const clickToBuy = () => {
        if (sumTotalAmount(ItemInCart) === 0) {
            alert("Please add item to cart")
        }
        axios.post("http://6310apiserver-env.eba-jxexupk4.us-east-1.elasticbeanstalk.com/api/orders/", {
            "customer": 1,
            "tempCost": 0,
            "tempWeight": 0,
            "purchased": true,
            "storeId": localStorage.getItem('storeId'),
            "orderStatus": "Not Purchased",
            "deliveryTime": 0,
            "purchaseTime": null,
            "arrivalTime": null
        }).then((res) => {
            console.log("set orderId to", JSON.stringify(res.data["order_id"]))
            const order_id = JSON.stringify(res.data["order_id"])
            for (let i = 0; i < ItemInCart.length; i++) {
                if (ItemInCart[i].amount === 0) {
                    continue;
                } else {
                    console.log("order id", order_id)
                    const requestBody = {
                        "itemId": ItemInCart[i].itemId,
                        "quantity": ItemInCart[i].amount,
                        "orderId": order_id
                    }
                    console.log("🚀 ~ file: Cart.jsx:75 ~ clickToBuy ~ requestBody:", requestBody)
                    axios.post("http://6310apiserver-env.eba-jxexupk4.us-east-1.elasticbeanstalk.com/api/lines/", requestBody)
                        .then((res) => {
                            console.log(res)
                        }
                        ).catch((err) => {
                            console.log(err)
                        })
                }
            }
        })
            .catch((err) => {
                console.log(err)
            })

        alert("Order placed Successfully!")
        setCartItems([]);
        localStorage.setItem("cart", JSON.stringify([]));
    }

    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
      }));

    return (
        <div style={{overflow: "visible"}}>
                    {ItemInCart.map((item) => {
                        if (item.amount === 0) {
                            return null;
                        } else {
                            return (
                                <div className='list' key={item.itemId} style={{marginBottom: "5px"}}>
                                <Typography sx={{ mt: 4, mb: 2, padding: 2, color: "black" }} variant="h6" component="div">
                                {`${item.name} ✖️ ${item.amount}`}
                              </Typography>
                              {/* <h1 key={item.name} style={{marginRight: "20px", fontSize: "40px", cursor: 'pointer'}} onClick={() => { handleMinusToCart(item) }}>🗑️</h1> */}
                              <Button key={item.name} style={{marginRight: "20px", fontSize: "18px"}} variant="outlined" onClick={() => { handleMinusToCart(item) }}>Delete</Button>
                              </div>
                            )
                        }
                    })}
                    
                    <div style={{fontSize: "30px", fontWeight: "bold", float: "right",marginTop: "10px"}}>
                        Total💰: $ {calculateTotal(ItemInCart)}
                        <Button style={{padding: "10px",  width:"150px", fontSize:"20px", marginLeft: "10px" }} variant="contained" onClick={() => { clickToBuy() }}>Buy</Button>
                    </div>
              
            
        </div>
    )
}

export default Cart