// FEEDBACK: is this component used at all? I don't see any callers
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import api from '../../lib/api';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function DenseTable() {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [selectedRow, setSelectedRow] = useState(0);
    useEffect(() => {
        async function loadApps() {
            const url = "api/v1/apps.json"; //?fields[apps]=code,name
            const result = await api.get(url);
            if (result?.data?.data != null)
                setRows(result.data.data);
        }
        loadApps();

    }, []);

    const handleClick = (event, id) => {
        console.log(id);
        setSelectedRow(id);
    }
    const isSelected = (id) => {
        return selectedRow === id;
    }


    return (
        <div>
            <h1>Application List</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left">Code</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Created By</TableCell>
                            <TableCell align="left">Created At</TableCell>
                            <TableCell align="left">Updated At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${row.id}`;
                            return (
                                <TableRow key={row.id}
                                    hover
                                    onClick={(event) => handleClick(event, row.id)}
                                    role="checkbox"

                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isItemSelected}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.code}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.description}</TableCell>
                                    <TableCell align="left">{row.created_by}</TableCell>
                                    <TableCell align="left">{row.created_at}</TableCell>
                                    <TableCell align="left">{row.updated_at}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
