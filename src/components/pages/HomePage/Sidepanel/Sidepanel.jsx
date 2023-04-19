import classes from './Sidepanel.module.scss';
import {useNavigate} from "react-router-dom";
import AdminBlock from "./AdminBlock/AdminBlock";
import {useDispatch} from "react-redux";
import {signOut} from "../../../../redux/thunks/popUpThunk"

const Sidepanel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signOutUser = async() => {
        await dispatch(signOut());
        navigate("/authenticate")
    }
    return (
        <div className={classes.sidebar}>
            <div className={classes.profile}>
                <div className={classes.avatar}>
                    <img alt={"avatar"}/>
                </div>
                <div className={classes.name}>John Doe</div>
            </div>
            <AdminBlock sideList={["dashboard", "members"]} sideListName={"Administrations"}/>
            <AdminBlock sideList={["requests", "invoices", "transactions"]} sideListName={"Managments"}/>
            <AdminBlock sideList={["reports"]} sideListName={"Accounting"}/>
            <button className={classes.logOutButton} onClick={signOutUser}>Sign Out</button>
        </div>
    );
};

export default Sidepanel;