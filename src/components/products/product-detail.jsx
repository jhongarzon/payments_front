import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ProductDetail(props) {
    return (
        <div>

            <Dialog
                open={props.open}
                onClose={props.close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{props.product.name}</DialogTitle>
                <DialogContent>
                    <DialogContent>
                        <div style={{ width: "100%", alignItems:"center" }}>
                            <img src={`http://localhost:3001/api/v1/vandal/assets/img/${props.product.image}`} style={{ height: "50%" }} alt={props.product.name} />
                        </div>
                    </DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.product.description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.pay} color="primary">Pay</Button>
                    <Button onClick={props.close} color="primary" autoFocus>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}