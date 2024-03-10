import ConfirmationNumberTwoToneIcon from '@mui/icons-material/ConfirmationNumberTwoTone';
import { MenuItem, Select, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TicketCheckedStatsType, UserService } from '../../Services/UserService';
import groupBy from 'object.groupby';

export type StatData = { _id: Dayjs, cName: string, count: number, isFined: number, fineTotal: number };

const CheckerPerformance: React.FunctionComponent = () => {
    const [filterBy, setFilterBy] = useState<'Daily' | 'Monthly' | 'Yearly'>('Daily');
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [opacity, setOpacity] = useState<{ uv: number; pv: number; }>({ uv: 1, pv: 1 });
    const [ticketCheckedStats, setTicketCheckedStats] = useState<StatData[]>([]);

    const convertStrToDate = (entry: TicketCheckedStatsType): StatData => {
        return {
            _id: dayjs(entry._id.ymd),
            cName: entry._id.checker.firstName + " " + entry._id.checker.lastName,
            count: entry.count,
            isFined: entry.isFined,
            fineTotal: entry.fineTotal,
        }
    }

    useEffect(() => {
        UserService.ticketCheckedStats().then(res => setTicketCheckedStats(res.data.map(convertStrToDate))) // get data for station
    }, [])

    const handleMouseEnter = (o: any) => {
        const { dataKey } = o;
        setOpacity(prevState => ({ ...prevState, [dataKey]: 0.2 }));
    };

    const handleMouseLeave = (o: any) => {
        const { dataKey } = o;
        setOpacity(prevState => ({ ...prevState, [dataKey]: 1 }));
    };
    const filteredData: StatData[] = (ticketCheckedStats || []).filter(item => {
        if (fromDate && toDate) {
            return item._id.isAfter(fromDate) && item._id.isBefore(toDate); // '[]' includes both from and to dates
        }
        return true; // If no date range is selected, return all data
    });

    const dataRaw0 = groupBy<StatData, string>(filteredData, (item) => {
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
    const dataRaw = Object.entries(dataRaw0) // [date:0, matching object list:1]
        .sort((a, b) => a[0] < b[0] ? -1 : 1)
        .map(e => {
            return {
                key: e[0],
                checkedTotal: e[1].reduce((c, v) => c + v.count, 0),
                finedCount:e[1].reduce((c, v) => c + v.isFined, 0),
            }
        })

    const columns = useMemo<MRT_ColumnDef<(typeof ticketCheckedStats)[number], any>[]>(
        () => [
            {
                accessorKey: 'cName',
                header: 'Checker Name',
                size: 20,
            },
            {
                accessorFn: (row) => row._id.format('YYYY-MM-DD'), //date not accept by table
                header: 'Date',
                size: 40,
            },
            {
                accessorKey: 'count',
                header: 'Checked Count',
                size: 30,
            },
            {
                accessorKey: 'isFined',
                header: 'Fine Count',
                size: 30,
            },
            {
                accessorKey: 'fineTotal',
                header: 'Total Fine',
                size: 30,
            }
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: ticketCheckedStats,
        enableColumnFilters: false,
        enableRowActions: false,
        positionActionsColumn: 'last',
    });

    console.log("kkkk", dataRaw)

    return (
        <div style={{ width: '100%', maxHeight: 'calc(100vh - 180px)', height: '100vh' }}>
            <div style={{ background: "white", justifyContent: "center", flexWrap: 'wrap', width: '100%', height: '100%' }}>
                <div style={{ width: '100%', height: '16%' }}>
                    <div style={{ padding: '12px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h5" style={{ display: 'flex', alignItems: 'center', color: '#222222' }}>
                            <ConfirmationNumberTwoToneIcon style={{ marginRight: "10px" }} />
                            Checkers Performance
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
                <div>
                    <div style={{ width: '100%', height: '400px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={dataRaw} // Use checkedTotalByMonth instead of checkersData
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="key" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
                                <YAxis />
                                <Tooltip wrapperStyle={{ color: 'black', fontSize: '14px' }} />
                                <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                                <Line type="monotone" dataKey="checkedTotal" name="Checked Count" strokeOpacity={opacity.pv} stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="finedCount" name="Fined Count" strokeOpacity={opacity.uv} stroke="#82ca9d" activeDot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ marginTop: '20px', borderTop: '2px solid black' }} >
                        <MaterialReactTable table={table} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckerPerformance;
