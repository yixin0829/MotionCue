import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import {themeOptions } from "./Homepage" 
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';

import React, { useEffect, useRef } from 'react';
import YouTube from '@u-wave/react-youtube'; // eslint-disable-line import/no-unresolved
const {
  useCallback,
  useState,
} = React;

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

const interval = null;

const dummy_transcript = [
  "Jump", "Sleep", "Hop", "Run", "Spin", "Map"
]

export default function Transcription({youtubeURL, response, transcript=dummy_transcript})  {

  const [volume, setVolume] = useState(1);
  const [paused, setPaused] = useState(false);
  const [frame, setFrame] = useState(0);
  const intervalRef = useRef(null);


  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, []);


  const handlePlayerPause = useCallback(() => {
    setPaused(true);
    clearInterval(intervalRef.current);
  }, []);

  const handlePlayerPlay = useCallback((e) => {
    let currentFrame = Math.floor(e.target.getCurrentTime());
    setFrame(currentFrame); // start from one frame earlier

    intervalRef.current = setInterval(() => {
      setFrame(prevFrame => prevFrame + 1); // so that frame is on time at 0s offset from currentFrame
    }, 1000);

    // Time in Seconds
    // console.log();
    setPaused(false);
  }, []);

    return (
    // <h1>MotionCue Viewer</h1>
    <ThemeProvider theme={themeOptions}>
    <CssBaseline />
    <main>
          <CssVarsProvider theme={customTheme}>
            <Box sx={(theme) => 
              Object.assign(theme.typography.display1, {marginTop : "15px", marginBottom: "15px"})}>Motion Cue Viewer</Box>
          </CssVarsProvider>

          <YouTube
          video={youtubeURL.slice(-11)}
          width={640}
          height={480}
          autoplay
          controls={true}
          suggestedQuality={420}
          volume={volume}
          paused={paused}
          onPause={handlePlayerPause}
          onPlaying={handlePlayerPlay}
          ></YouTube>
    </main>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Transcription for video:
        </Typography>
        
        <Typography color="black" variant="h2">
        {(frame > 0 && frame <= transcript.length) && transcript[frame - 1]}
        </Typography>
          
          <br/>
          {response}
      </CardContent>
      <CardActions>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
    </ThemeProvider>

    
    );
}

