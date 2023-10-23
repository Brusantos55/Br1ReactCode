import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Materials from './Materials';
import Tabla from './TablaComp'
import {useNavigate} from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles, Box, Tab, Tabs } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    arrow:{
      display: 'flex', 
      justifyContent: 'center', 
      margin:'0 0 10px', 
      cursor:'pointer'
    },
    tabs:{
      '& .MuiTabs-flexContainer':{display:'flex', justifyContent:'center'},
    }
}))

function TabPanel(props) {
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
        <Box p={2}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.tabs}>
    <div onClick={() => { navigate(`/materials/`)}}
        className={classes.arrow}>
      <ArrowBackIosIcon /><b>Back To Materials</b>
    </div>
      <AppBar position="static" >
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Detalle" />
          <Tab label="Composicion" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Materials />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Tabla/>
      </TabPanel>
    </div>
  );
}