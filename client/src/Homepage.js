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

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  // color: theme.palette.text.secondary,
}));

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Dance-scription
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Homepage() {
  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Dance-scription 
          </Typography>
        </Toolbar>
      </AppBar>
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
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
            MotionCue
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              MotionCue is digitalizing the Performing Arts. We are bringing tools to digitalize your choreography and videos.
              present in the process of digitisation of the dancing body, to identify its ... ments and dance steps that used to convey the embod-.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Upload a video</Button>
              <Button variant="outlined">View an example</Button>
            </Stack>
          </Container>
        </Box>
        hello </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8


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
          Welcome to Dance-scription. Here to help you accelerate your learning!!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>

  );
}



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