import React, {useEffect, useState} from 'react';
import HomePage from "../HomePage/HomePage";
import {Navigate, Route, Routes} from "react-router-dom";
import LogPage from "../LogPage/LogPage";
import {useDispatch, useSelector} from "react-redux";
import {getExpenses} from "../../../firebase/firebase";
import {fetchExpenses, getCategories} from "../../../redux/reducers/expenseReducer";

const StartPage = () => {
    const dispatch = useDispatch();
    const {isLoggedIn, userID} = useSelector(state => state.local);
    useEffect(() => {
        const gettingExpenses = async() => {
            await dispatch(fetchExpenses(userID));
        }
        gettingExpenses();
    }, [userID])
    return (
        <Routes>
            <Route path={"/authenticate"} element={<LogPage/>}/>
            <Route path={"/home"} element={<HomePage/>}/>
            <Route path={"/"} element={isLoggedIn ? <Navigate to={"/home"}/> : <Navigate to={"authenticate"}/>}/>
        </Routes>
    );
};

export default StartPage;