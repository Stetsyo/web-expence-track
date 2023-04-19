import classes from './TodayContent.module.scss';
import {Link} from "react-router-dom";

const TodayContent = ({expenses, initialAmount}) => {
    return (
        <div className={classes.todayContent}>
            <div className={classes.lastExp}>
                <span>Last transactions:</span>
                <Link to={"/transactions"}>See all</Link>
                <div className={classes.lastExpContainer}>
                    {expenses.slice(-4).map(exp => {
                        return (
                            <div className={classes.expenseCard}>
                                <h4>${exp.price}</h4>
                                <p>{exp.category}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={classes.currentAmount}>
                <h3>Current amount: ${initialAmount}</h3>
            </div>
        </div>
    );
};

export default TodayContent;