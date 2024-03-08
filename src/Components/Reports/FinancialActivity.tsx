import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import { Button, Divider, MenuItem, Select, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState } from "react";
import FinancialActivityPieChart from './FinancialActivityPieChart';
import FinancialActivityStackChart from './FinancialActivityStackChart';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';


const FinancialActivity: React.FunctionComponent = () => {
    const [summaryMode, setSummaryMode] = useState<'by_station' | 'by_date'>('by_station');
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);

    const handleExportSpreadsheet = () => {
        // Logic to export spreadsheet
        console.log("Exporting spreadsheet...");
    };

    return (
        <div style={{ width: '100%', maxHeight: 'calc(100vh - 180px)', height: '100vh' }}>
            <div style={{ background: "white", justifyContent: "center", flexWrap: 'wrap', width: '100%', height: '100%' }}>
                <div style={{ width: '100%', height: '12%', display: 'flex', alignItems: 'center' }}>
                    <div style={{ padding: '12px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h5" style={{ display: 'flex', alignItems: 'center', color: '#222222' }}> <MonetizationOnTwoToneIcon style={{ marginRight: "10px" }} /> Financial summary</Typography>
                    </div>
                </div>
                <div style={{ width: '100%', height: '88%', display: 'flex' }}>
                    <div style={{ flexBasis: '200px', display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 20px', alignItems: 'streach' }}>
                        <ToggleButtonGroup
                            value={summaryMode}
                            exclusive
                            aria-label="summary-mode-toggle"
                            onChange={(_, v) => setSummaryMode(v)}
                        >
                            <ToggleButton value="by_station" aria-label="by-station-toggle">
                                <Typography style={{ alignItems: 'center', color: '#222222' }}> By station</Typography>
                            </ToggleButton>
                            <ToggleButton value="by_date" aria-label="by-date-toggle">
                                <Typography style={{ display: 'flex', alignItems: 'center', color: '#222222' }}> By Date</Typography>
                            </ToggleButton>
                        </ToggleButtonGroup>

                        <Select size='small'>
                            <MenuItem value={"Monthly"}>Monthly</MenuItem>
                        </Select>
                        <DatePicker
                            sx={{ '& .MuiInputBase-root': { fontSize: '0.875rem' } }}
                            label="From Date"
                            disableFuture
                            value={fromDate}
                            onChange={(date) => setFromDate(date)}
                            slotProps={{ textField: { size: 'small' } }}
                        />
                        <DatePicker
                            sx={{ '& .MuiInputBase-root': { fontSize: '0.875rem' } }}
                            label="To Date"
                            disableFuture
                            value={toDate}
                            onChange={(date) => setToDate(date)}
                            slotProps={{ textField: { size: 'small' } }}
                        />
                        <Button variant="contained" onClick={handleExportSpreadsheet}
                        sx={{
                            fontSize: '.8rem', // Adjust the font size as needed
                            '& svg': { 
                                fontSize: '1.5rem', // Adjust the icon size as needed
                            }
                        }}><BrowserUpdatedIcon/>Export Spreadsheet</Button>
                    </div>
                    <Divider orientation="vertical" flexItem sx={{ marginBottom: '1%' }} />
                    <div style={{ flexGrow: 1 }}>
                        {summaryMode === 'by_station' && <FinancialActivityPieChart />}
                        {summaryMode === 'by_date' && <FinancialActivityStackChart />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialActivity;
