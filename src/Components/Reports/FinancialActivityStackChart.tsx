import React from "react";
import { Bar, BarChart, CartesianGrid, DefaultTooltipContent, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { financialActivityStackChartData } from "./FinancialActivityStackChartData";


const FinancialActivityStackChart: React.FunctionComponent = () => {
    const data = financialActivityStackChartData;

    return (
        <ResponsiveContainer width="100%" height="90%">
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    left: 50,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Month" tick={{ fontSize: 12, }} angle={-45} textAnchor= "end" height={60}/>
                <YAxis tick={{ fontSize: 16, }}/>
                <Tooltip
                wrapperStyle={{ color: 'black', fontSize: '14px' }}
                 />
                <Bar dataKey="Normal" stackId="a" fill="#8dbf41" />
                <Bar dataKey="Reservation" stackId="a" fill="#418dbf" />
                <Bar dataKey="Seasonal" stackId="a" fill="#bf418d" />
                <Legend layout="vertical" align="right" verticalAlign="middle"/>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default FinancialActivityStackChart;