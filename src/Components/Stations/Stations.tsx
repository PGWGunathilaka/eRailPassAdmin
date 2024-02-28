import { AppBar, Box, Tab, Tabs, Typography } from "@mui/material";
import React, { Children } from "react";
import { CSSProperties } from "styled-components";
import { StationsDetails } from "./StationsDetails";
import { SLine } from "../../models/Station";
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

export const Stations = () => {
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
            <Tab label="Main Line" {...a11yProps(0)}sx={{ color: value === 0 ? 'primary.main' : 'grey' }} />
            <Tab label="Matale Line" {...a11yProps(1)} sx={{ color: value === 1 ? 'primary.main' : 'grey' }} />
            <Tab label="Puttalam Line" {...a11yProps(2)} sx={{ color: value === 2 ? 'primary.main' : 'grey' }} />
            <Tab label="Nothern Line" {...a11yProps(3)} sx={{ color: value === 3 ? 'primary.main' : 'grey' }}/>
            <Tab label="Batticoloa Line" {...a11yProps(4)} sx={{ color: value === 4 ? 'primary.main' : 'grey' }} />
            <Tab label="Coast Line" {...a11yProps(5)} sx={{ color: value === 5 ? 'primary.main' : 'grey' }}/>
            <Tab label="KV Line" {...a11yProps(6)} sx={{ color: value === 6 ? 'primary.main' : 'grey' }}/>
            <Tab label="Trincomalee Line" {...a11yProps(7)} sx={{ color: value === 7 ? 'primary.main' : 'grey' }}/>
            <Tab label="Talaimannar Line" {...a11yProps(8)} sx={{ color: value === 8 ? 'primary.main' : 'grey' }}/>
          </Tabs>
          
        </div>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <StationsDetails sLine={SLine.MAIN_LINE} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <StationsDetails sLine={SLine.MATALE_LINE} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <StationsDetails sLine={SLine.PUTTALAM_LINE} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <StationsDetails sLine={SLine.NORTHER_LINE}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
      <StationsDetails sLine={SLine.BATTICOLOA_LINE} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
      <StationsDetails sLine={SLine.COAST_LINE} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
      <StationsDetails sLine={SLine.KV_LINE} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
      <StationsDetails sLine={SLine.TRINCOMALEE_LINE} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={8}>
      <StationsDetails sLine={SLine.TALAIMANNAR_LINE} />
      </CustomTabPanel>
    </Box>
    
  );
}
export default Stations;