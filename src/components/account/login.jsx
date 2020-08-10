import React, { useState } from "react";
import { Grid, Container, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../images/logo192.png";
import { useUser } from "../../context/user-provider.jsx";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
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
            <form>
                <img src={logo} style={{ marginTop: "100px" }} alt="Payments" ></img>
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
                    <Button color="primary" onClick={handleLogin}>Sign In</Button>
                </Grid>
            </form>
        </Container >
    );
}