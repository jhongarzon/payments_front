import React, { useState, useEffect, useMemo } from "react";
import { getToken, setToken, deleteToken, isLoggedIn } from "../helpers/auth-helper.js";
import API from "../lib/api.js";

const userContext = React.createContext();

export function UserProvider(props) {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        function loadUser() {
            if (!getToken()) {
                return;
            }
            const url = "loggedInUser.json";
            API.get(url)
                .then((result) => {
                    console.log(result);
                    setUser(result.data);
                    setLoadingUser(false);
                })
                .catch((error) => {
                    console.error(error);
                });

        }
        loadUser();
    }, []);
    function logIn(form) {
        const url = "authenticate";

        console.log(form);

        API.post(url, form)
            .then((result) => {
                setToken(result.data.auth_token);
                setLoadingUser(false);
            })
            .catch((error) => {
                console.error(error);                
                if (error.error && error.error.user_authentication){
                    alert(error.error.user_authentication);
                }else{
                    console.log(error);
                    // alert(error);
                }
            });
    }

    function logout() {
        setUser(null);
        setLoadingUser(true);
        deleteToken();
    }
    const value = useMemo(() => {
        return ({
            user,
            loadingUser,
            logIn,
            logout,
            isLoggedIn
        })
    }, [user, loadingUser]);
    return <userContext.Provider value={value} {...props}></userContext.Provider>
}
export function useUser() {
    var context = React.useContext(userContext);
    if (!context) {
        throw new Error("useUser must be inside user provider ");
    }
    return context;
}