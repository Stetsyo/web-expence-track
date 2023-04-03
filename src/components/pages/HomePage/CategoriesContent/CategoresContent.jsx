import classes from './CategoresContent.module.scss';

const CategoriesContent = ({categories}) => {
    return (
        <div className={classes.categoriesContent}>
            <h3>Your favorite categories</h3>
            <div className={classes.dataContainer}>
                {categories.length > 0 ?
                    categories.map(e => {
                        return <div className={classes.categoryCard}>{e}</div>
                    })
                    :
                    <div className={classes.categoriesEmpty}>
                        It looks like you haven't created any transactions yet.
                    </div>
                }
            </div>
        </div>
    );
};

export default CategoriesContent;