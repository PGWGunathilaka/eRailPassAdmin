import TrainTwoToneIcon from '@mui/icons-material/TrainTwoTone';
import { DataGrid, GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell,Tooltip, Legend, Pie, PieChart, ResponsiveContainer, Sector, XAxis, YAxis } from 'recharts';
import { ActiveShape } from 'recharts/types/util/types';
import { stationActivityData } from './StationActivityData';
import { Button, MenuItem, Select,  Typography } from '@mui/material';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
import PreviewIcon from '@mui/icons-material/Preview';

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
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill='#222222' style={{ fontSize: 14 }}>
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
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" fontSize={16}>{`Passengers: ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={22} textAnchor={textAnchor} fill="#999" fontSize={12}>
                {`(${((percent ?? 0) * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const StationActivity: React.FunctionComponent = () => {
    const [filterBy, setFilterBy] = useState<'Daily' | 'Monthly' | 'Yearly'>('Daily');
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [opacity, setOpacity] = useState<{ uv: number; pv: number; }>({ uv: 1, pv: 1 });
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const data = stationActivityData;

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    const columns: GridColDef<{ [key: string]: any; }>[] = [
        {
            field: 'date',
            headerName: 'Date',
            headerAlign: 'center',
            width: 150,
        },
        {
            field: 'station',
            headerName: 'Station Name',
            width: 200,
            headerAlign: 'center',
        },
        {
            field: 'view', // Add a field for the view action
            headerName: 'Actions',
            sortable: false,
            width: 120,
            renderCell: (params) => (
                <React.Fragment>
                    <PreviewIcon />
                </React.Fragment>
            ),
        },
        {
            field: 'normal',
            headerName: 'Normal',
            groupable: true,
            width: 150,
        },
        {
            field: 'reservation',
            headerName: 'Reservation',
            groupable: true,
            width: 150,
        },
        {
            field: 'seasonal',
            headerName: 'Seasonal',
            groupable: true,
            width: 150,

        },
        {
            field: 'passengers',
            headerName: 'Passengers',
            width: 200,
        },
    ];

    const columnGroupingModel: GridColumnGroupingModel = [
        {
            groupId: 'sold_ticket',
            headerName: 'Sold ticket count',
            headerAlign: 'center',
            headerClassName: 'my-super-theme--naming-group',
            children: [
                { groupId: 'normal', field: 'normal' },
                { groupId: 'reservation', field: 'reservation' },
                { groupId: 'seasonal', field: 'seasonal' }
            ],
        },
    ];
    const rowsWithIds = stationActivityData.map((row, index) => ({
        ...row,
        id: index.toString(), // You can use any unique identifier here, like row date or a generated UUID
    }));

    return (
        <div style={{ width: '100%', maxHeight: 'calc(100vh - 180px)', height: '100vh' }}>
            <div style={{ background: "white", justifyContent: "center", flexWrap: 'wrap', width: '100%', height: '100%' }}>
                <div style={{ width: '100%', height: '16%' }}>
                    <div style={{ padding: '12px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h5" style={{ display: 'flex', alignItems: 'center', color: '#222222' }}>
                            <TrainTwoToneIcon style={{ marginRight: "10px" }} />
                            Station Activity
                        </Typography>
                        <div style={{ display: 'flex', gap: '10px', flexDirection: 'row' }}>
                            <DatePicker
                                sx={{ width: '150px', '& .MuiInputBase-root': { fontSize: '0.875rem' } }}
                                label="From Date"
                                disableFuture
                                value={fromDate}
                                onChange={(date) => setFromDate(date)}
                                slotProps={{ textField: { size: 'small' } }}
                            />
                            <DatePicker
                                sx={{ width: '150px', '& .MuiInputBase-root': { fontSize: '0.875rem' } }}
                                label="To Date"
                                disableFuture
                                value={toDate}
                                onChange={(date) => setToDate(date)}
                                slotProps={{ textField: { size: 'small' } }}
                            />
                        </div>
                        <Select
                            value={filterBy}
                            onChange={(e) => setFilterBy(e.target.value as any)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            size='small'
                        >
                            <MenuItem value={"Daily"}>Daily</MenuItem>
                            <MenuItem value={"Monthly"}>Monthly</MenuItem>
                            <MenuItem value={"Yearly"}>Yearly</MenuItem>
                        </Select>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'stretch' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'stretch', height: '60vh' }}>
                        <div style={{ flexBasis: '50%', display: 'flex', justifyContent: 'center', alignItems: 'self-start' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        activeIndex={activeIndex}
                                        activeShape={renderActiveShape}
                                        data={data.map((d) => ({ label: d.station, value: d.passengers }))}
                                        innerRadius={45}
                                        outerRadius={120}
                                        dataKey="value"
                                        fill="#FFA500"
                                        onMouseEnter={onPieEnter}
                                    >
                                        {data.map((_, index) => (
                                            <Cell key={`cell-${index}`} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ flexBasis: '50%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
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
                                    <XAxis dataKey="station" tick={{ fontSize: 12, }} angle={-45} textAnchor="end" height={80} />
                                    <YAxis tick={{ fontSize: 12, }} />
                                    <Tooltip
                                        wrapperStyle={{ color: 'black', fontSize: '14px' }}
                                    />
                                    <Bar dataKey="normal" stackId="a" fill="#8dbf41" />
                                    <Bar dataKey="reservation" stackId="a" fill="#418dbf" />
                                    <Bar dataKey="seasonal" stackId="a" fill="#bf418d" />
                                    <Legend layout="vertical" align="right" verticalAlign="middle" margin={{ bottom: 50 }} style={{ fontSize: '12px' }} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems:'center'}}>
                        <DataGrid
                            experimentalFeatures={{ columnGrouping: true }}
                            rows={rowsWithIds}
                            columns={columns}
                            columnGroupingModel={columnGroupingModel}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StationActivity;
