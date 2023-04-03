import {useState} from "react"
import {useDispatch} from "react-redux";

import classes from "../LogPage.module.scss";

import {signUpPassUser} from "../../../../redux/reducers/userReducer";
import {Form, useNavigate} from "react-router-dom";
import FormInput from "../FormInput/FormInput";

const SignUpForm = () => {
    const [formFields, setFormFields] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const {displayName, email, password, confirmPassword} = formFields;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name] : value});
    }    ;
    const resetFormFields = () => {
        setFormFields({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (password !== confirmPassword) return;
        try {
            await dispatch(signUpPassUser({password, email, displayName}));
            navigate("/home")
        } catch (e) {
            if (e.code === "auth/email-already-in-use") {
                alert('Cannot create user. Email already used.')
            } else {
                console.log(e.message)
            }
        } finally {
            resetFormFields()
        }
    };

    return (
        <div className={classes.signUpContainer}>
            <h2>Don`t have account an? Create a new one!</h2>
            <span>Sign Up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label= {"Name:"}
                    value={displayName}
                    name={"displayName"}
                    type={"text"}
                    onChange={handleChange}
                    required/>

                <FormInput
                    label={"Email:"}
                    value={email}
                    name={"email"}
                    type={"email"}
                    onChange={handleChange}
                    required/>

                <FormInput
                    label={"Password:"}
                    value={password}
                    name={"password"}
                    type={"password"}
                    onChange={handleChange}
                    required/>

                <FormInput
                    label={"Confirm password:"}
                    value={confirmPassword}
                    name={"confirmPassword"}
                    type={"password"}
                    onChange={handleChange}
                    required/>

                <button className={classes.buttonAuth} type={"submit"}>Sign up</button>
            </form>
        </div>
    );
};

export default SignUpForm;