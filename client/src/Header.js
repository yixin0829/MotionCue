import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './react-tabs.css';
import Homepage from './Homepage';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Transcription from './Transcription';

export default function Header() {
    return(

       
  <Tabs>
    {/* <ThemeProvider theme={themeOptions}> */}
        {/* <CssBaseline /> */}
        <AppBar class="button" position="relative">
          <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
            {/* <Typography variant="h6" color="inherit" noWrap>
              MotionCue
            </Typography> */}
    <TabList>
      <Tab>Home</Tab>
      <Tab >Transcription</Tab>
    </TabList>
    </Toolbar>
        </AppBar>
    <TabPanel>
      <Homepage></Homepage>
    </TabPanel>
    <TabPanel>
       <Transcription></Transcription>
    </TabPanel>
  </Tabs>
)
    };
