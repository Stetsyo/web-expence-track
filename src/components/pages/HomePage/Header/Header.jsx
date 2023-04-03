import classes from './Header.module.scss';
import logo from "../../../../assets/logo/logo.svg";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <img src={logo} alt={"logopic"}/>
            </div>
            <input type={"text"}/>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;