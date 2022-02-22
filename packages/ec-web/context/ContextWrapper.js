import HeaderContext from "./HeaderContext";
import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import Router from 'next/router';
import AppContext from './AppContext'

function ContextWrapper({children, categoriesItems, userId, jwt, userProfile}){

    const [user, setUser] = useState(null);

    const loginUser = async() => {
        // const res = await fetch(`${process.env.API_URL}/profiles/?user._id=${userId}`);
        // var profile = await res.json();
        // profile = profile[0];
        // setUser({userId, jwt, profile});
        Router.push('/');
    }
    const logoutUser = async () => {
        // setUser(null);
        Router.push('/');
    }


    return(
            <AuthContext.Provider value={{userId, loginUser, logoutUser, jwt, userProfile}}>
                <HeaderContext.Provider value={{categoriesItems, userProfile, userId}}>
                    {children}
                </HeaderContext.Provider>
            </AuthContext.Provider>

)
}

export default ContextWrapper;