import { useSelector } from 'react-redux'
import classes from './TransactionsPage.module.scss'
import { TransactionItem } from './TransactionItem/TransactionItem';
import TransactionDiagram from './TransactionsDiagram/TransactionDiagram';
import { useEffect, useState } from 'react';

export const TransactionsPage = () => {
    const [diagramData, setDiagramData] = useState([]);
    const {expenses, categoriesRepeat} = useSelector(state=>state.expenses);
    const data = [
        { title: 'A', value: 20, color: '#f44336' },
        { title: 'B', value: 15, color: '#9c27b0' },
        { title: 'C', value: 30, color: '#03a9f4' },
        { title: 'D', value: 25, color: '#4caf50' },
        { title: 'E', value: 10, color: '#ffeb3b' },
      ];
      
  return (
    <div>
        <TransactionDiagram data={data}/>
        {expenses && expenses.map(exp => {
            return <TransactionItem trItem={exp}/>  
        })}
    </div>
  )
}
