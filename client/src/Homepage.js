import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
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

const responseContext = React.createContext({
  response: [], fetchResponse: () => {}
})

// function SendYoutubeURL() {
  
// }

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

export default function Homepage() {

  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [youtubeURL, setYoutubeURL] = React.useState("")
  const {response, fetchResponse} = React.useContext(responseContext)

  const handleInput = event  => {
    setYoutubeURL(event.target.value)
  }
  
  const handleSubmit = (event) => {
    const newURL = {
      "url": "youtubeURL"
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
      {/* <AppBar class="button" position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            MotionCue
          </Typography>
        </Toolbar>
      </AppBar> */}
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
              <Button class="button" variant="contained" onClick={handleSubmit}>Submit a video url</Button>
              <Button variant="outlined">View an example</Button>
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
      {/* End footer */}
    </ThemeProvider>

  );
}

//unused
// On the backend, we contextulize your choreography to text by digitising a dancing body. This is a new form of transcribing! We are digitalizing body movements, in order to identify the movements and dance steps, so that we can provide users a comprehensive textual guide on dance movements. (/)

//       <Container sx={{ py: 8 }} maxWidth="md">
//   {/* End hero unit */}
//   <Grid container spacing={4}>
//     {cards.map((card) => (
//       <Grid item key={card} xs={12} sm={6} md={4}>
//         <Card
//           sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
//         >
//           <CardMedia
//             component="img"
//             sx={{
//               // 16:9
//               pt: '56.25%',
//             }}
//             image="https://source.unsplash.com/random"
//             alt="random"
//           />
//           <CardContent sx={{ flexGrow: 1 }}>
//             <Typography gutterBottom variant="h5" component="h2">
//               Heading
//             </Typography>
//             <Typography>
//               This is a media card. You can use this section to describe the
//               content.
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Button size="small">View</Button>
//             <Button size="small">Edit</Button>
//           </CardActions>
//         </Card>
//       </Grid>
//     ))}
//   </Grid>
// </Container>