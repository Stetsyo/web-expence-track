import classes from './Sidepanel.module.scss';
import {useNavigate} from "react-router-dom";
import AdminBlock from "./AdminBlock/AdminBlock";
import {useDispatch} from "react-redux";
import {signOut} from "../../../../redux/reducers/userReducer"

const Sidepanel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signOutUser = async() => {
        await dispatch(signOut());
        console.log(1)
        navigate("/authenticate")
    }
    return (
        <div className={classes.sidebar}> {/* use classes.sidebar */}
            <div className={classes.profile}> {/* use classes.profile */}
                <div className={classes.avatar}> {/* use classes.avatar */}
                    <img alt={"avatar"}/>
                </div>
                <div className={classes.name}>John Doe</div> {/* use classes.name */}
            </div>
            <AdminBlock sideList={["dashboard", "members"]} sideListName={"Administrations"}/>
            <AdminBlock sideList={["requests", "invoices", "transactions"]} sideListName={"Managments"}/>
            <AdminBlock sideList={["reports"]} sideListName={"Accounting"}/>
            <button className={classes.logOutButton} onClick={signOutUser}>Sign Out</button>
        </div>
    );
};

export default Sidepanel;