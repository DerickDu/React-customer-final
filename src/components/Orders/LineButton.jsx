import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import Line from './Line';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const LineButton = ({ OrderId }) => {
    const [showContent, setShowContent] = useState(false);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetch('http://6310apiserver-env.eba-jxexupk4.us-east-1.elasticbeanstalk.com/api/info/' + OrderId)
            .then((res) => res.json())
            .then((data) => {

                setInfo(data.info)
                console.log("info", data.info)


            })
            .catch((err) => {
                console.log(err);
            });
    }, [])
    const handleClick = () => {
        setShowContent(!showContent);
    };

    // const showLine = () => {
    //     return (
    //         info.map((item) => {
    //             return (
    //                 <div>
    //                     <p>{item.name}</p>
    //                 </div>

    //             )
    //         }))
    // }

    return (
        <div>
            <button onClick={handleClick} style={{backgroundColor: 'white'}}>Detail</button>

            {showContent && (
                <div>
                    <TableContainer
                        component={Paper}
                        variant="outlined">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Unit Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {info.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row["name"]}
                                        </TableCell>
                                        <TableCell align="right">{row["quantity"]}</TableCell>
                                        <TableCell align="right">{`$${Number(row["quantity"]) * Number(row["unitPrice"])}`}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                            {/* <Line info={info} /> */}
                        </Table></TableContainer>
                </div>
            )}
        </div>
    );

}

export default LineButton