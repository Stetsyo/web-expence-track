import React, {useEffect} from 'react';
import HomePage from "../HomePage/HomePage";
import {Navigate, Route, Routes} from "react-router-dom";
import LogPage from "../LogPage/LogPage";
import {useDispatch, useSelector} from "react-redux";
import {fetchExpenses} from "../../../redux/reducers/expenseReducer";

const StartPage = () => {
    const dispatch = useDispatch();
    const {isLoggedIn, userID} = useSelector(state => state.local);
    console.log(isLoggedIn)
    useEffect(() => {
        const gettingExpenses = async() => {
            await dispatch(fetchExpenses(userID));
        }
        gettingExpenses();
    }, [userID])
    return (
        <Routes>
            <Route path={"/authenticate"} element={<LogPage/>}/>
            <Route path={"/home"} element={isLoggedIn ? <HomePage/> : <Navigate to={"/authenticate"}/>}/>
            <Route path={"*"} element={isLoggedIn ? <Navigate to={"/home"}/> : <Navigate to={"/authenticate"}/>}/>
        </Routes>
    );
};

export default StartPage;