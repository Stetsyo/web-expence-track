import classes from './ModalExpence.module.scss';

const ModalExpence = ({handleModal, setNewExp, newExp, addNewExpense}) => {

    return (
        <div className={classes.modal}>
            <div className={classes.modalContent}>
                <span className={classes.close} onClick={handleModal}>&times;</span>
                <h3>Add new expense</h3>
                <input type="date" value={newExp.date} onChange={(e) => setNewExp({...newExp, date: e.target.value})} />
                <input type="number" value={newExp.price} onChange={(e) => setNewExp({...newExp, price: e.target.value})} />
                <input type="text" value={newExp.category} onChange={(e) => setNewExp({...newExp, category: e.target.value})} />
                <button onClick={addNewExpense}>Save</button>
            </div>
        </div>
    );
};

export default ModalExpence;