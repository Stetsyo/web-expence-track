import React from "react";
import { PieChart } from "react-minimal-pie-chart";

const TransactionDiagram = ({ data }) => {
  return (
    <PieChart 
        data={data} 
        lineWidth = {40}
        viewBoxSize={[300, 100]}
        label={({ dataEntry }) =>`${dataEntry.title} - ${dataEntry.value}%`}
        labelPosition={80}
        labelStyle={{fontSize: '5px'}}
    />
  );
};

export default TransactionDiagram;
