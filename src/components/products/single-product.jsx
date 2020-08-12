import React from 'react';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));
export default function SingleProduct(props) {

    const classes = useStyles();
    return (
        <div onClick={(e) => props.handleClick(e, props.product)}>
            <img src={`http://localhost:3001/api/v1/vandal/assets/img/${props.product.image}`} alt={props.product.name} />
            <GridListTileBar
                title={props.product.name}
                subtitle={<span>$: {props.product.price}</span>}
                titlePosition="bottom"
                actionIcon={
                    <IconButton aria-label={`star ${props.product.name}`} className={classes.icon}>
                        <StarBorderIcon />
                    </IconButton>
                }
                actionPosition="left"
                className={classes.titleBar} />
        </div>
    );
}