import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import ComputerTwoToneIcon from '@mui/icons-material/ComputerTwoTone';
import ConfirmationNumberTwoToneIcon from '@mui/icons-material/ConfirmationNumberTwoTone';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import TrainTwoToneIcon from '@mui/icons-material/TrainTwoTone';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSProperties } from 'styled-components';


export const Reports: React.FunctionComponent = () => {// Create a state  
    const navigate = useNavigate()
    const [status, setStatus] = useState('inactive');
    const handClick = (a: string) => {
        setStatus(a);
    };
    const navigateTo = (path: string) => {
        navigate(path)
    };
    const buttonStyles: CSSProperties = {
        padding: "10px 20px",
        borderRadius: "8px",
        border: "3px solid #222222",
        margin: "0 10px",
        fontSize: "1.2rem",
        fontWeight: 500,
        cursor: "pointer",
        minWidth: '200px',
        flexBasis: '25%',
        flex: 1,
        flexGrow: 1,
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }

    return <div style={{ width: '100%' }}>

        <div style={{ background: "white", display: "flex", justifyContent: "center", padding: '20px', flexWrap: 'wrap', gap: '20px'}}>
            <div
                style={{
                    ...buttonStyles, background: status === 'active1' ? "#f7a873" : "black",
                    color: status === 'active1' ? "black" : "white"
                }}
                onClick={() => { handClick("active1");navigateTo('/passenger-registration')}}>
                <PeopleAltTwoToneIcon sx={{width: '30px', height: '30px'}} />
                Passenger Registrations
            </div>
            <div
                style={{
                    ...buttonStyles, background: status === 'active3' ? "#f7a873" : "black",
                    color: status === 'active3' ? "black" : "white"
                }}
                onClick={() => { handClick("active3");navigateTo('/checker-performance')}}>
                <ConfirmationNumberTwoToneIcon sx={{width: '30px', height: '30px'}} />
                Checkers Performance
            </div>
            <div
                style={{
                    ...buttonStyles, background: status === 'active4' ? "#f7a873" : "black",
                    color: status === 'active4' ? "black" : "white"
                }}
                onClick={() => { handClick("active4");navigateTo('/station-activity')}}>
                <TrainTwoToneIcon sx={{width: '30px', height: '30px'}} />
                Station Activity
            </div>
            <div
                style={{
                    ...buttonStyles, background: status === 'active6' ? "#f7a873" : "black",
                    color: status === 'active6' ? "black" : "white"
                }}
                onClick={() => { handClick("active6");navigateTo('/financial-activity')}}>
                    <MonetizationOnTwoToneIcon sx={{width: '30px', height: '30px'}} />
                Financial summaries
            </div>
        </div>
    </div>
}
export default Reports;