import {useState} from "react";
import {useDispatch} from "react-redux";

import classes from "../LogPage.module.scss"

import {logPassUser, logPopUpUser} from "../../../../redux/thunks/popUpThunk";
import FormInput from "../FormInput/FormInput";
import {useNavigate} from "react-router-dom";

const SignInForm = () => {
    const [formFields, setFormFields] = useState({
        email: '',
        password: '',
    });
    const {email, password} = formFields;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name] : value});
    };
    const resetFormFields = () => {
        setFormFields({
            email: '',
            password: ''
        });
    };

    const authUserPopUp = async() => {
        await dispatch(logPopUpUser());
        navigate("/home")
    };
    const authUserEmailAndPass = async(event) => {
        event.preventDefault();
        try {
            await dispatch(logPassUser({password, email}));
            navigate("/home")
        } catch (e) {
            switch (e.code) {
                case "auth/wrong-password":
                    alert("Wrong password!");
                    break;
                case "auth/user-now-found":
                    alert("No user with this email!");
                    break;
                default:
                    console.log(e.message)
            }
        } finally {
            console.log("reset")
            resetFormFields();
        }
    };

    return (
        <div className={classes.signInContainer}>
            <h2>Sign In</h2>
            <form>
                <FormInput value={formFields.email} name={"email"} type={"email"} label={"Input email:"} required onChange={handleChange}/>
                <FormInput value={formFields.password} name={"password"} type={"password"} label={"Input password:"} required onChange={handleChange}/>
                <div className={classes.buttonsContainer}>
                    <button className={classes.buttonAuth} onClick={authUserEmailAndPass}>Sign in</button>
                    <button className={classes.buttonAuth} onClick={authUserPopUp}>Sign in by Google</button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;