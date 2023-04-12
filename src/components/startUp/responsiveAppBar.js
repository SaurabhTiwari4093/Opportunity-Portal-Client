import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import eDCLogo from '../../assets/eDCWhiteLogo.svg';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const pages = [
  {
    page: "Internship",
    route: "internship"
  },
  {
    page: "Job",
    route: "internship"
  },
  {
    page: "Cofounder",
    route: "internship"
  }
]

function ResponsiveAppBar({ companyName, mode, setMode,setStartUpDetails }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (value) => {
    setAnchorElNav(null);
    navigate(value.route, { state: { type: value.page } });
  };

  const handleCloseUserMenu = (route) => {
    setAnchorElUser(null);
    navigate(route)
  };

  const logOut = (route) => {
    setAnchorElNav(null);
    navigate(route);
    setStartUpDetails(null);
    localStorage.removeItem("localStorageStartUpId");
  };

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
          <Box sx={{ height: "100%", alignItems: "center", display: { xs: 'none', md: 'flex' }, mr: 2 }} >
            <img src={eDCLogo} alt="eDCLogo" loading="lazy" width={60} height={60} style={{ cursor: "pointer" }} onClick={() => { navigate('internship', { state: { type: 'Internship' } }) }} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((value, key) => (
                <MenuItem onClick={() => handleCloseNavMenu(value)} key={key}>
                  <Typography textAlign="center">{value.page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ height: "100%", alignItems: "center", display: { xs: 'flex', md: 'none' }, flexGrow: 1 }} >
            <img src={eDCLogo} alt="eDCLogo" loading="lazy" width={60} height={60} style={{ cursor: "pointer" }} onClick={() => { navigate('internship', { state: { type: 'Internship' } }) }} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((value, key) => (
              <Button onClick={() => handleCloseNavMenu(value)} sx={{ my: 2, color: "white", display: 'block' }} key={key}>
                {value.page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={companyName} src="#" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => handleCloseUserMenu('account')}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><PersonIcon sx={{ mr: 1 }} /> {"Account"}</Box>
              </MenuItem>
              <MenuItem onClick={() => logOut("/")}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><LogoutIcon sx={{ mr: 1 }} /> {"Logout"}</Box>
              </MenuItem>
              <MenuItem onClick={() => changeMode()}>
                {
                  mode === "dark" ? <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><WbSunnyIcon sx={{ mr: 1 }} /> {"Light"}</Box> : <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><Brightness2Icon sx={{ mr: 1 }} />{"Dark"}</Box>
                }
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
