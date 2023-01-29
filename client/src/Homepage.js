import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import TextField from '@mui/material/TextField';
 // import image
import sample_detect_img from './sample-homepage-motion-annotated.gif';

export const themeOptions = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3c5a71',
      light: '#dbcff9',
    },
    secondary: {
      main: '#0075f5',
      light: '#91d1d6',
    },
  },
  spacing: 8,
  direction: 'rtl',
});

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}));

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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Homepage({youtubeURL, setYoutubeURL, response, fetchResponse}) {
  
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleInput = event  => {
    setYoutubeURL(event.target.value)
  }
  
  const handleSubmit = (event) => {
    const newURL = {
      "url": youtubeURL
    }
  fetch("http://localhost:8000/youtube_url/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newURL),
  }).then(fetchResponse)

  
}
// localhost:8000/youtube_url
  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      <main>
      <Grid container spacing={2} columns={16}>
      <Grid item xs={8}>
    <Item>

        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <CssVarsProvider theme={customTheme}>
              <Box sx={(theme) => theme.typography.display1}>MotionCue</Box>
            </CssVarsProvider>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              MotionCue is digitalizing the Performing Arts. We are bringing tools to textualize choreography in videos.
              This is a new form of transcribing! We are digitalizing body movements, in order to identify the movements and dance steps, so that we can provide users a comprehensive textual guide on dance movements. 
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              
            <Button variant="outlined">View an example</Button>

      <TextField
        onChange={handleInput}
        value={youtubeURL}
        fullWidth label="Enter a video URL"//optional
        size="large" id="fullWidth"
      />

      <Button class="button" variant="contained" onClick={handleSubmit}>Submit a video url</Button>
         

            </Stack>
          </Container>
        </Box>
         </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <body>
          <img padding_top={10} src={sample_detect_img} width="500" height="350" class="center"/>   
          </body>     
          </Item>
        </Grid>
        </Grid>
      </main>
    </ThemeProvider>

  );
}
