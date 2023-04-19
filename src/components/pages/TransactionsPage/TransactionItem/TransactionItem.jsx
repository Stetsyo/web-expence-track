import classes from '../TransactionsPage.module.scss'

export const TransactionItem = ({trItem}) => {
  return (
    <div className={classes.transactionContainer}>
        <div className={classes.transactionIcon}>
            <img alt="ic" />
        </div>
        <div className={classes.transactionDesc}>
            <div className={classes.transactionName}>{trItem.category}</div>
            <div className={classes.transactionDate}>{trItem.date}</div>
        </div>
        <div className={classes.transactionPrice}>{trItem.price}</div>
    </div>
  )
}
