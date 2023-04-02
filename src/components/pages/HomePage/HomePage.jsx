import classes from './HomePage.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {addExpense, fetchExpenses} from "../../../redux/reducers/expenseReducer";
import {useEffect, useState} from "react";
import ModalExpence from "./ModalExpence/ModalExpence";
import logo from '../../../assets/logo/logo.svg'

const HomePage = () => {
    const [newExp, setNewExp] = useState({
        date: null,
        price: 0,
        category: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const getExpenses = async() => {
            await dispatch(fetchExpenses("21cr2r4324f342c"));
        }
        getExpenses()
    }, [])

    const {expenses, statusFetch} = useSelector(state => state.expenses);
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();


    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const addNewExpense = async() => {
        dispatch(addExpense({
            userId: "21cr2r4324f342c",
            ...newExp
        }));
        handleModal();
    };
    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <div className={classes.logo}>
                    <img alt={"logo"}/>
                </div>
            </header>
            <div className={classes.wrapper}>
                <aside className={classes.sidebar}>Sidebar</aside>
                <main className={classes.content}>
                    <div className={classes.topBar}>
                        <h2>Today's Date: {new Date().toLocaleDateString()}</h2>
                        <div className={classes.sortBlock}>
                            Sort by:
                            <select name={"selectSort"}>
                                <option value={"date"} selected>Date</option>
                                <option value={"price"}>Price</option>
                                <option value={"category"}>Category</option>
                            </select>
                        </div>
                        <button onClick={handleModal}>Add today`s expense</button>
                    </div>
                    <div className={classes.dataContainer}>
                        {expenses && expenses.map(e => {
                            return <div>{e.price}</div>
                        })}
                    </div>
                </main>
            </div>
            {isModalOpen && <ModalExpence handleModal={handleModal} setNewExp={setNewExp} addNewExpense={addNewExpense} newExp={newExp}/>}
        </div>
    );
};
export default HomePage;