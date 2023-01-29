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
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
 // import image
 import arch_img from './imgs/QHackArchitectureDiagram.jpeg';

const customTheme = extendTheme({
    typography: {
      display1: {
        // `--joy` is the default CSS variable prefix.
        // If you have a custom prefix, you have to use it instead.
        // For more details about the custom prefix, go to https://mui.com/joy-ui/customization/using-css-variables/#custom-prefix
        background:
        `linear-gradient(45deg, #5a63e0 20%, #ff8e53 90%)`,
        // `Webkit*` properties must come later.
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    },
  });
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
  const [youtubeURL, setYoutubeURL] = React.useState("")
  const [transcripts, setTranscripts] = React.useState([]);

  return(

    <div>  
  <Tabs>
        <AppBar class="button" position="relative">
          <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
    <TabList>
      <Tab>Home</Tab>
      <Tab >Transcription</Tab>
    </TabList>
    </Toolbar>
        </AppBar>
    <TabPanel>
      <Homepage youtubeURL={youtubeURL} setYoutubeURL={setYoutubeURL} setTranscripts={setTranscripts}></Homepage>
    </TabPanel>
    <TabPanel>
       <Transcription youtubeURL={youtubeURL} transcript={transcripts}></Transcription>
    </TabPanel>
  </Tabs>
       <Box class="boxspace" sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
       <Typography variant="h6" align="center" gutterBottom>
         {/* Footer */}
       </Typography>
       <Typography
         variant="subtitle1"
         align="center"
         color="text.secondary"
         component="p"
       >
         Welcome to MotionCue. Here to help you accelerate your learning!! Scroll down to learn more.
       </Typography>
       <Copyright />
     </Box>
     <CssVarsProvider theme={customTheme}>
            <Box  sx={(theme) => Object.assign(theme.typography.display1, {"margin-top": 80} )}>About</Box>
        </CssVarsProvider>
        <Box class="About" >
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
        We are bringing tools to contextualize choreography in videos. This is a new form of transcribing! We are digitalizing body movements in videos, so that we can provide users with a comprehensive text guide on how to perform them. Furthermore, text description of an image may also help sighted readers by providing them another option for processing visual information.     <br/> 
        </Typography>
        </Box> 
        <CssVarsProvider theme={customTheme}>
            <Box  sx={(theme) => Object.assign(theme.typography.display1, {"margin-bottom":-90} )}>Our Pipeline</Box>
        </CssVarsProvider>
        <Box class="About" >
        <img padding_top={0} src={arch_img} width="300" height="800" class="center"/>   
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Architecture Pipeline for URL to Visual Transcription Data:
        </Typography>

        <Typography
         variant="subtitle1"
         align="left"
         color="text.secondary"
         component="p"
       >          
            1. Use a youtube frame extractor and use it to sample images every second.
            <br/> 
            2. Process each frame to extract its pose landmark data using a pre-trained PoseDetection model (ie MoveNet, PostNet).
            <br/> 
            3. Feed each frame into the random forest model for pose detection 
            <br/> 
            4. Output to frontend. Query OpenAI for additional information.
            <br/> 
            <br/> 
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Building/training the model that generates the Visual Transcription Data:
        </Typography>
            <Typography
         variant="subtitle1"
         align="center"
         color="text.secondary"
         component="p"
       >
            First, we trained a quick random forest model on 2 poses by taking images manually that we recreated ourselves.
            Then, we found a youtube frame extractor and used it to sample images every second on tiktok videos for the popular  “green green grass blue blue sky” videos. We then processed each image on the backend to extract pose landmarks. Landmarks are 2D positional data points that identify where specific body parts are on the image. We then used kmeans cluster on each image’s landmark data to identify the best key frames and corresponding pose names.
            After identifying the poses that we wanted to classify with our model, we trained our random forest model to classify poses. :)
       </Typography>
        </Box> 


     </div>
)
    };
