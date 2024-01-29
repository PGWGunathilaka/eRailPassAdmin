import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import StoreIcon from '@mui/icons-material/Store';
import { ClickAwayListener, Grow, MenuItem, MenuList, Paper } from "@mui/material";
import Popper from '@mui/material/Popper';
import React, { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";
export const Layout: React.FunctionComponent<{ children: any }> = ({ children }) => {
    const navigate = useNavigate()
    const [status, setStatus] = useState('inactive');
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const anchorRef1 = React.useRef<HTMLDivElement>(null);
    const anchorRef2 = React.useRef<HTMLDivElement>(null);
    const handClick = (a: string) => {
        setStatus(a);
        setOpen1(false);
        setOpen2(false);
    };
    const handleToggle1 = () => {
        setOpen1(!open1);
    };
    const handleToggle2 = () => {
        setOpen2(!open2);
    };
    const handleClose1 = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef1.current &&
            anchorRef1.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpen1(false);
    };
    const handleClose2 = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef2.current &&
            anchorRef2.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpen2(false);
    };
    const navigateTo = (path: string) => {
        navigate(path)
        setOpen1(false)
        setOpen2(false);
    };
    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen1(false);
            setOpen2(false);
        } else if (event.key === 'Escape') {
            setOpen1(false);
            setOpen2(false);
        }
    }
    const navBarStyles: CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '1.2rem',
        padding: '0 30px',
        backgroundColor: '#222',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.25)',
        width: '90%',
        height: '80px',
        borderRadius: '13px',
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translate(-50%)',
    }
    const buttonStyles: CSSProperties = {
        display: 'flex',
        gridTemplateColumns: 'repeate(6, auto)',
        gridGap: '5px',
        listStyle: 'none',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: '5px',
        borderRadius: '8px',
    }
    const menuStyles: CSSProperties = {
        ...buttonStyles,
        background: status === 'active0' ? "white " : "initial",
        color: status === 'active0' ? "black" : "white",
    };


    return <>
        <Popper
            open={open1}
            anchorEl={anchorRef1.current}
            role={undefined}
            placement="bottom-start"
            transition
            style={{ padding: '2px 0', zIndex: 3 }}
            disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}>
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose1}>
                            <MenuList
                                autoFocusItem={open1}
                                id="composition-menu"
                                aria-labelledby="composition-button1"
                                onKeyDown={handleListKeyDown}>
                                <MenuItem onClick={() => { navigateTo('/station-masters') }}>Station Masters</MenuItem>
                                <MenuItem onClick={() => { navigateTo('/checkers') }}>Checkers</MenuItem>
                                <MenuItem onClick={() => { navigateTo('/pending-approvals') }}>Pending Approvals</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
        <Popper
            open={open2}
            anchorEl={anchorRef2.current}
            role={undefined}
            placement="bottom-start"
            transition
            style={{ padding: '2px 0', zIndex: 3 }}
            disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}>
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose2}>
                            <MenuList
                                autoFocusItem={open2}
                                id="composition-menu"
                                aria-labelledby="composition-button2"
                                onKeyDown={handleListKeyDown}>
                                <MenuItem onClick={() => { navigateTo('/profile') }}>Profile</MenuItem>
                                <MenuItem onClick={() => { navigateTo('') }}>Log out</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
        <div
            style={{
                maxHeight: 'calc(100% - 180px)',
                position: 'fixed',
                top: '120px',
                border: '3px solid #222',
                width: '90%',
                overflow: 'auto',
                zIndex: 2,
            }}>
            <div>  {children}</div>
        </div>

        <div style={navBarStyles}>

            <div id="composition-button1"
                aria-controls={open1 ? 'composition-menu' : undefined}
                aria-expanded={open1 ? 'true' : undefined}
                aria-haspopup="true"
                ref={anchorRef1}
                style={{
                    ...buttonStyles,
                    background: status === 'active0' ? "white " : "initial",
                    color: status === 'active0' ? "black" : "white"
                }}
                onClick={() => { handClick("active0"); handleToggle1() }}>
                <AccountBoxIcon></AccountBoxIcon>
                User Profiles
            </div>
            <div
                style={{
                    ...buttonStyles, background: status === 'active1' ? "white " : "initial",
                    color: status === 'active1' ? "black" : "white"
                }}
                onClick={() => { handClick("active1"); navigateTo('/ticket-details') }}>
                <FontAwesomeIcon icon={faTicket} />
                Ticket Details
            </div>
            <div
                style={{
                    ...buttonStyles, background: status === 'active2' ? "white " : "initial",
                    color: status === 'active2' ? "black" : "white"
                }}
                onClick={() => handClick("active2")}>
                <InsertChartIcon></InsertChartIcon>
                Reports
            </div>
            <div
                style={{
                    ...buttonStyles, background: status === 'active3' ? "white " : "initial",
                    color: status === 'active3' ? "black" : "white"
                }}
                onClick={() => { handClick("active3"); navigateTo('/train-profiles') }}>
                <DirectionsSubwayIcon></DirectionsSubwayIcon>
                Train Profiles
            </div>
            <div
                style={{
                    ...buttonStyles, background: status === 'active4' ? "white " : "initial",
                    color: status === 'active4' ? "black" : "white"
                }}
                onClick={() => { handClick("active4"); navigateTo('/stations') }} >
                <StoreIcon></StoreIcon>
                Stations
            </div>
            <div id="composition-button2"
                aria-controls={open2 ? 'composition-menu' : undefined}
                aria-expanded={open2 ? 'true' : undefined}
                aria-haspopup="true"
                ref={anchorRef2}
                style={{
                    ...buttonStyles, padding: '10px',
                    borderRadius: '5px', background: status === 'active5' ? "white " : "hsl(24, 89%, 71%)",
                    color: status === 'active5' ? "black" : "white"
                }}
                onClick={() => { handClick("active5"); handleToggle2() }} >
                <PersonSharpIcon />
            </div>
        </div>
    </>
}