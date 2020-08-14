import React, { useState } from "react";
import { Grid, Container, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../images/logo2.png";
import { useUser } from "../../context/user-provider.jsx";

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        alignItems:"center",
        margin:"auto",
        width:"30%",
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0px',
        marginTop: "100px",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center"
    }
}));


export default function LoginForm() {
    const classes = useStyles();
    const { logIn } = useUser();

    const [form, setState] = useState({
        username: '',
        password: ''
    });
    function updateField(e) {
        setState({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleLogin() {
        await logIn(form);
    }

    return (
        <Container>
            <form className={classes.root}>
                <div style={{padding:"50px 10px"}}>
                    <h1 style={{ color:"#f50057"}}>Payments app</h1>
                    {/* <img src={logo} style={{ width:"25%" }} alt="Payments" ></img> */}
                    <Grid item className={classes.paper}>
                        <TextField
                            label="UserName"
                            name="username"
                            value={form.username}
                            onChange={updateField}>
                        </TextField>
                    </Grid>
                    <Grid item className={classes.paper}>
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={updateField}>
                        </TextField>
                    </Grid>
                    <Grid item className={classes.paper}>
                        <Button style={{ color: "#f50057"}} onClick={handleLogin}>Sign In</Button>
                    </Grid>
                </div>
            </form>
        </Container >
    );
}