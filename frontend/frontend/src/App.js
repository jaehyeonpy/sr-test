import Cookies from 'js-cookie';

import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';

import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { Route, Routes, Link, HashRouter} from 'react-router-dom';



// incomplete.

export function SignUp() {
  const handleSubmit = async () => {
    const credential = { 
      username: 'hello',
      password: 'helloworld!'
    }

    try {
      const response = await fetch('http://localhost:8000/auth/csrftoken', { 
        method: 'GET'
      })

      if (!response.ok) {
        throw new Error('An problem occured in the server.');
      }

      const responseData = response.json(); 
      console.log(responseData); 

    } catch (error) {
      console.error('An problem occured in the client:', error);
    }

    try {
      const csrfToken = Cookies.get('csrftoken');
      console.log(csrfToken.type)
      
      const response1 = await fetch('http://localhost:8000/auth/signup', { 
        method: 'POST', 

        headers: {
          'Content-Type': 'application/json', 
          'X-CSRFToken': csrfToken,
        },

        body: JSON.stringify(credential)
      })

      if (!response1.ok) {
        throw new Error('An problem occured in the server.')
      }

      const responseData = response1.json()
      console.log(responseData)

    } catch (error) {
      console.error('An problem occured in the client:', error)
    }
  }


  return (
    <Container fixed>
        <Stack spacing={5}>
          <h1>Sign up</h1>
          <TextField
            required
            label="ID"
          />

          <TextField
            required
            label="Password"
            type="password"
            autoComplete="current-password"
          />

          <Button 
            variant="contained"
            onClick={handleSubmit}
          >
            Register
          </Button>
      </Stack>
    </Container>
  );
}



// incomplete.

function SignIn() {
  const handleSubmit = async () => {
    const credential = { 
      username: 'hello',
      password: 'helloworld!'
    }

    try {
      const response = await fetch('http://localhost:8000/auth/csrftoken', { 
        method: 'GET'
      })

      if (!response.ok) {
        throw new Error('An problem occured in the server.');
      }

      const responseData = response.json(); 
      console.log(responseData); 

    } catch (error) {
      console.error('An problem occured in the client:', error);
    }

    try {
      const csrfToken = Cookies.get('csrftoken');
      console.log(csrfToken.type)
      
      const response1 = await fetch('http://localhost:8000/auth/signin', { 
        method: 'POST', 

        headers: {
          'Content-Type': 'application/json', 
          'X-CSRFToken': csrfToken,
        },

        body: JSON.stringify(credential)
      })

      if (!response1.ok) {
        throw new Error('An problem occured in the server.')
      }

      const responseData = response1.json()
      console.log(responseData)

    } catch (error) {
      console.error('An problem occured in the client:', error)
    }
  }

  return (
      <Container fixed>
        <Stack spacing={5}>
          <h1>Sign in</h1>

          <TextField
            required
            label="ID"
          />

          <TextField
            required
            label="Password"
            type="password"
            autoComplete="current-password"
          />

          <Link
              to="/signup"
              color="inherit"
          >
            Need to create an account?
          </Link>

          <Button 
            variant="contained"
            onClick={handleSubmit}
          >
            Sign in
          </Button>
        </Stack>
      </Container>
  );
}



//incomplete.

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export function Home() {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    open === true ? setOpen(false) : setOpen(true)
  };

  const [mode, setMode] = React.useState('light');
  const toggleMode = () => {
    mode === 'light' ? setMode('dark'): setMode('light');
  };

  const th = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={th}>
      <CssBaseline/>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column'
      }}>
        <AppBar open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>

            <Box flexGrow={1}></Box>

            <Button 
              color="inherit"
              sx={{mr: 2}}
              onClick={toggleMode} 
            >
              light/dark mode
            </Button>

            <Button 
              color="inherit"
            >
              Sign out 
            </Button>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <List>
            {['Users', 'Products', 'Settings'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </ThemeProvider>
  )
}



export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}