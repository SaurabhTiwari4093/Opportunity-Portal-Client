import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Container, Box, Button } from '@mui/material';
import eDCLogo from '../assets/eDCWhiteLogo.svg';
import { useNavigate } from 'react-router-dom';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

export default function ResponsiveAppBar({ mode, setMode }) {
  const navigate = useNavigate();

  const changeMode = () => {
    if (mode === 'dark') {
      setMode('light');
      localStorage.setItem('colorMode', 'light');
    }
    else {
      setMode('dark');
      localStorage.setItem('colorMode', 'dark');
    }
  }

  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ height: "100%", display: "flex", justifyContent: "start", alignItems: "center", flexGrow: 1 }} >
            <img src={eDCLogo} alt="eDCLogo" loading="lazy" width={60} height={60} style={{ cursor: "pointer" }} onClick={() => { navigate('/') }} />
          </Box>
          <Box color="inherit" onClick={() => changeMode()}>
            {
              mode === "dark" ? <Button sx={{ color: "white" }}><WbSunnyIcon sx={{ mr: 1 }} /> {"Light"}</Button> : <Button sx={{ color: "white" }}><Brightness2Icon sx={{ mr: 1 }} />{"Dark"}</Button>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

