import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import api from '../../lib/api';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

export default function ShowProducts() {

    const [rows, setRows] = useState([]);    
    useEffect(() => {
        async function loadApps() {
            const url = "api/v1/products.json"; //?fields[apps]=code,name
            const result = await api.get(url);
            if (result?.data?.data != null)
                setRows(result.data.data);
        }
        loadApps();

    }, []);


    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GridList cellHeight={200} spacing={1} className={classes.gridList}>
                {rows.map((tile) => (
                    <GridListTile key={tile.id} cols={tile.is_enabled ? 2 : 1} rows={tile.is_enabled ? 2 : 1}>
                        <img src={tile.image} alt={tile.name} />
                        <GridListTileBar
                            title={tile.title}
                            titlePosition="top"
                            actionIcon={
                                <IconButton aria-label={`star ${tile.name}`} className={classes.icon}>
                                    <StarBorderIcon />
                                </IconButton>
                            }
                            actionPosition="left"
                            className={classes.titleBar}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}