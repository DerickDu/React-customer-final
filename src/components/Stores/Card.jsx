import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const StoreCard = ({ item }) => {
    const navigate = useNavigate();
    return (
        < Card key={item.storeId
        } sx={{ minWidth: 150 }
        }>
            <CardContent>
                <Typography variant="h5" component="div">
                    Name: {item.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Address: {`(${item.addressX}, ${item.addressY})`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="outlined" size="small" onClick={(e) => {
                    e.preventDefault();
                    console.log(' Current StoreId', item.storeId)
                    localStorage.setItem('storeId', item.storeId);
                    console.log(' Current StoreId', localStorage.getItem('storeId'))
                    navigate(`/items/${item.storeId}`);

                }}>View product page</Button>
            </CardActions>
        </Card >
    );
}

export default StoreCard;