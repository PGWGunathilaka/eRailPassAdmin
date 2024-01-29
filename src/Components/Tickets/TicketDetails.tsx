import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { CSSProperties } from "styled-components";
import { Tickets } from "./Tickets";
const navBarStyles: CSSProperties = {
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#222',
  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.25)',
  width: '100%',
  position: 'fixed',
  color: 'white',
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;

}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tab-${index}`,
  };
}

export const TicketDetails = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <div style={{ ...navBarStyles, position: "relative" }} >
          <Tabs
            selectionFollowsFocus
            value={value}
            onChange={handleChange}
            variant="scrollable"
            indicatorColor="secondary"
            textColor="secondary"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example">
            <Tab label="Normal" {...a11yProps(0)} sx={{ color: value === 0 ? 'primary.main' : 'grey' }} />
            <Tab label="Return" {...a11yProps(1)} sx={{ color: value === 1 ? 'primary.main' : 'grey' }} />
            <Tab label="Booking" {...a11yProps(2)} sx={{ color: value === 2 ? 'primary.main' : 'grey' }} />
            <Tab label="Intercity" {...a11yProps(3)} sx={{ color: value === 3 ? 'primary.main' : 'grey' }} />
            <Tab label="Seasons" {...a11yProps(4)} sx={{ color: value === 4 ? 'primary.main' : 'grey' }} />
          </Tabs>

        </div>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Tickets/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>

      </CustomTabPanel>
    </Box>

  );
}
export default TicketDetails;
