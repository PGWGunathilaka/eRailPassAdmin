import React, { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
import { ActiveShape } from 'recharts/types/util/types';
import { financialActivityData } from './FinancialActivityPieChartData';


const renderActiveShape: ActiveShape<PieSectorDataItem> = (props: PieSectorDataItem) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * (midAngle ?? 0));
    const cos = Math.cos(-RADIAN * (midAngle ?? 0));
    const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
    const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
    const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
    const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {(payload as unknown as any)?.label}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={(outerRadius ?? 0) + 6}
                outerRadius={(outerRadius ?? 0) + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" fontSize={20}>{`Income ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={22} textAnchor={textAnchor} fill="#999" fontSize={16}>
                {`(${((percent ?? 0) * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};



const FinancialActivityPieChart: React.FunctionComponent = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const data = financialActivityData;

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    return (
        <ResponsiveContainer width="100%" height="95%">
            <PieChart>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data.map((d) => ({ label: d.station, value: d.income }))}
                    innerRadius={80}
                    dataKey="value"
                    fill="#8dbf41"
                    onMouseEnter={onPieEnter}
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default FinancialActivityPieChart;