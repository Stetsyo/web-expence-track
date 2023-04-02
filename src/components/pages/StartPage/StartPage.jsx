import React, {useState} from 'react';
import HomePage from "../HomePage/HomePage";
import {Navigate, Route, Routes} from "react-router-dom";
import LogPage from "../LogPage/LogPage";

const StartPage = () => {
    const getIsSigned = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        return isLoggedIn;
    }
    return (
        <Routes>
            <Route path={"/authenticate"} element={<LogPage/>}/>
            <Route path={"/home"} element={<HomePage/>}/>
            <Route path={"/"} element={getIsSigned() ? <Navigate to={"/home"}/> : <Navigate to={"authenticate"}/>}/>
        </Routes>
    );
};

export default StartPage;