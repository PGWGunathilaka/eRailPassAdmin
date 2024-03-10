import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import { MenuItem, Select, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from "dayjs";
import groupBy from "object.groupby";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { UserService } from '../../Services/UserService';

export type StatData = { _id: Dayjs, count: number };

export const PassengerRegistration: React.FunctionComponent = () => {// Create a state  
    const [filterBy, setFilterBy] = useState<'Daily' | 'Monthly' | 'Yearly'>('Daily');
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [statData, setStatData] = useState<StatData[]>([]);
    const [toDate, setToDate] = useState<Date | null>(null);

    const convertStrToDate = (entry: { _id: string, count: number }): StatData => {
        return { _id: dayjs(entry._id), count: entry.count }
    }

    useEffect(() => {
        UserService.passengerStats().then(res => setStatData(res.data.map(convertStrToDate))) // get data for station
    }, [])

    const filteredData = (statData ||[]).filter(item => {
        if (fromDate && toDate) {
            return item._id.isAfter(fromDate) && item._id.isBefore(toDate); // '[]' includes both from and to dates
        }
        return true; // If no date range is selected, return all data
    });

    const dataRaw = groupBy<StatData, string>(filteredData, (item) => {
        switch (filterBy) {
            case "Daily":
                return item._id.format("YYYY-MM-DD")
            case "Monthly":
                return item._id.format("YYYY-MM")
            case "Yearly":
                return item._id.format("YYYY")
            default:
                return '';
        }
    })
    const data = Object.entries(dataRaw).map(([name, values]) => ({ name, count: values.reduce((c, i) => c + i.count, 0) }))



    return <div style={{ width: '100%', maxHeight: 'calc(100vh - 180px)', height: '100vh' }}>

        <div style={{ background: "white", justifyContent: "center", flexWrap: 'wrap', width: '100%', height: '100%' }}>
            <div style={{ width: '100%', height: '16%' }}>
                <div style={{ padding: '12px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Typography variant="h5" style={{ display: 'flex', alignItems: 'center', color: '#222222' }}> <PeopleAltTwoToneIcon style={{ marginRight: "10px" }} /> Passenger Registrations</Typography>
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
            <div style={{ width: '100%', height: '80%' }}>
                <ResponsiveContainer width="100%" height="90%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" height={filterBy === "Yearly" ? 20 : 60} angle={filterBy === "Yearly" ? 0 : -45} interval={filterBy === "Daily" ? 10 : 0} textAnchor={filterBy === "Yearly" ? "middle" : "end"} tick={{ fontSize: filterBy === "Yearly" ? 24 : 12 }} />
                        <YAxis />
                        <Tooltip
                            wrapperStyle={{ color: 'black' }}
                            content={({ payload, label }) => {
                                if (payload && payload.length > 0) {
                                    return (
                                        <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
                                            <Typography variant="body1" style={{ marginBottom: '5px' }}>{label}</Typography>
                                            {payload.map((entry, index) => (
                                                <Typography key={index} variant="body2" style={{ color: "#222222" }}>{`${entry.name}: ${entry.value}`}</Typography>
                                            ))}
                                        </div>
                                    );
                                }
                                return null;
                            }}

                        />
                        {/* <Legend /> */}
                        <Bar dataKey="count" fill="#73C2F7" activeBar={<Rectangle fill="#f7a873" stroke="#222222" />} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
}
export default PassengerRegistration;