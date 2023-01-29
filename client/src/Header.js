import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './react-tabs.css';
import Homepage from './Homepage';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Transcription from './Transcription';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MotionCue
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Header() {
  const responseContext = React.createContext({
    response: [], fetchResponse: () => {}
  })
  const [youtubeURL, setYoutubeURL] = React.useState("")
  const {response, fetchResponse} = React.useContext(responseContext)


  return(

    <div>  
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
      <Homepage youtubeURL={youtubeURL} response={response} setYoutubeURL={setYoutubeURL} fetchResponse={fetchResponse}></Homepage>
    </TabPanel>
    <TabPanel>
       <Transcription youtubeURL={youtubeURL} response={response}></Transcription>
    </TabPanel>
  </Tabs>
       <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
       <Typography variant="h6" align="center" gutterBottom>
         {/* Footer */}
       </Typography>
       <Typography
         variant="subtitle1"
         align="center"
         color="text.secondary"
         component="p"
       >
         Welcome to MotionCue. Here to help you accelerate your learning!!
       </Typography>
       <Copyright />
     </Box>
     </div>
)
    };
