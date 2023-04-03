import classes from '../Sidepanel.module.scss';
import {Link} from "react-router-dom";

const AdminBlock = ({sideList, sideListName}) => {
    return (
        <div className={classes.adminBlock}>
            <h4>{sideListName}</h4>
            {sideList.map(li => {
                return (
                    <div className={classes.sideComp}>
                       <Link to={`/${li}`}>{li}</Link>
                    </div>
                )
            })}
        </div>
    );
};

export default AdminBlock;