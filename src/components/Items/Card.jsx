import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react'
import "./Card.css"
const BasicCard = ({ item, clickHandler }) => {

    return (
        < Card key={item.itemId} sx={{ minWidth: 150 }
        }>
            <CardContent>
                <Typography variant="h5" component="div">
                    {item.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {item.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="outlined" size="small" onClick={(e) => {
                    e.preventDefault();
                    console.log(item)
                    clickHandler(item);
                }}>Add to Cart</Button>
            </CardActions>
        </Card >
    );
}

export default BasicCard;