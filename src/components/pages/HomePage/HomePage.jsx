import classes from './HomePage.module.scss';

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {addExpense, getCategories} from "../../../redux/reducers/expenseReducer";

import ModalExpence from "./ModalExpence/ModalExpence";
import CategoresContent from "./CategoriesContent/CategoresContent";
import Header from "./Header/Header";
import TodayContent from "./TodayContent/TodayContent";
import Sidepanel from "./Sidepanel/Sidepanel";

const HomePage = () => {
    const [newExp, setNewExp] = useState({
        date: null,
        price: 0,
        category: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {categories, expenses, initialAmount} = useSelector(state => state.expenses);
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [expenses])

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const addNewExpense = async() => {
        dispatch(addExpense({
            userId: currentUser.id,
            ...newExp
        }));
        handleModal();
    };

    return (
        <div className={classes.container}>
            <Header/>
            <div className={classes.wrapper}>
                <Sidepanel/>
                <div>
                    <CategoresContent categories={categories}/>
                    <TodayContent expenses={expenses} initialAmount={initialAmount}/>
                </div>
            </div>
            {isModalOpen && <ModalExpence handleModal={handleModal} setNewExp={setNewExp} addNewExpense={addNewExpense} newExp={newExp}/>}
        </div>
    );
};
export default HomePage;