import classes from '../LogPage.module.scss';

const FormInput = ({label, ...otherProps}) => {
    return (
        <div className={classes.group}>
            <input className={classes.formInput} {...otherProps}/>
            {label && <label className={classes.formInputLabel}>{label}</label>}
        </div>
    );
};

export default FormInput;