import classes from './LogPage.module.scss';
import {popUpGoogleSignIn} from "../../../firebase/firebase";
import SignInForm from "./SignInForm/SignInForm";
import SignUpForm from "./SignUpForm/SignUpForm";

const LogPage = () => {

    return (
        <div className={classes.signPageContainer}>
            <SignInForm/>
            <SignUpForm/>
        </div>
    );
};

export default LogPage;