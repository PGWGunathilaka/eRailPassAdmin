import ConfirmationNumberTwoToneIcon from '@mui/icons-material/ConfirmationNumberTwoTone';
import PreviewIcon from '@mui/icons-material/Preview';
import { Box, IconButton, MenuItem, Select, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers';
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useMemo, useState } from "react";
import { checkersData } from './CheckersData';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const CheckerPerformance: React.FunctionComponent = () => {
    const [filterBy, setFilterBy] = useState<'Daily' | 'Monthly' | 'Yearly'>('Daily');
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [opacity, setOpacity] = useState<{ uv: number; pv: number; }>({ uv: 1, pv: 1 });

    const handleMouseEnter = (o: any) => {
        const { dataKey } = o;
        setOpacity(prevState => ({ ...prevState, [dataKey]: 0.2 }));
    };

    const handleMouseLeave = (o: any) => {
        const { dataKey } = o;
        setOpacity(prevState => ({ ...prevState, [dataKey]: 1 }));
    };

    const checkedTotalByMonth = useMemo(() => {
        const totalsMap = new Map<string, number>();
        checkersData.forEach(item => {
            const key = item.month;
            const value = item.checked;
            totalsMap.set(key, (totalsMap.get(key) || 0) + value);
        });
        return Array.from(totalsMap.entries()).map(([month, checked_total]) => ({ month, checked_total }));
    }, [checkersData]);

    const fineTotalByMonth = useMemo(() => {
        const totalsMap = new Map<string, number>();
        checkersData.forEach(item => {
            const key = item.month;
            const value = item.fine_count;
            totalsMap.set(key, (totalsMap.get(key) || 0) + value);
        });
        return Array.from(totalsMap.entries()).map(([month, fine_total]) => ({ month, fine_total }));
    }, [checkersData]);

    const mergedData = checkedTotalByMonth.map(({ month, checked_total }) => ({
        month,
        checked_total,
        fine_total: fineTotalByMonth.find(({ month: m }) => m === month)?.fine_total || 0,
      }));
    const columns = useMemo<MRT_ColumnDef<(typeof checkersData)[number], any>[]>(
        () => [
            {
                accessorKey: 'checker',
                header: 'Checker ID',
                size: 20,
            },
            {
                accessorKey: 'month',
                header: 'Month',
                size: 40,
            },
            {
                accessorKey: 'checked',
                header: 'Checked Count',
                size: 30,
            },
            {
                accessorKey: 'fine_count',
                header: 'Fine Count',
                size: 30,
            },
            {
                accessorKey: 'total_fine',
                header: 'Total Fine',
                size: 30,
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: checkersData,
        enableColumnFilters: false,
        enableRowActions: true,
        positionActionsColumn: 'last',
        renderRowActions: ({ row }) => (
            <Box sx={{ display: "flex" }}>
                <IconButton onClick={() => console.info('Preview')}>
                    <PreviewIcon />
                </IconButton>
            </Box>
        ),
    });

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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'stretch' }}>
                    <div style={{ flexBasis: '50%', minWidth: '0' }} >
                        <MaterialReactTable table={table} />
                    </div>
                    <div style={{ flexBasis: '50%', minWidth: '0' }}>
                        <div style={{ width: '100%', height: '50%' }}>
                            <ResponsiveContainer width="100%">
                                <LineChart
                                    data={mergedData} // Use checkedTotalByMonth instead of checkersData
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
                                    <YAxis />
                                    <Tooltip wrapperStyle={{ color: 'black', fontSize: '14px' }} />
                                    <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                                    <Line type="monotone" dataKey="checked_total" name="Checked Count" strokeOpacity={opacity.pv} stroke="#8884d8" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="fine_total" name="Fine Count"strokeOpacity={opacity.uv} stroke="#82ca9d" activeDot={{ r: 4 }}/>
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckerPerformance;
