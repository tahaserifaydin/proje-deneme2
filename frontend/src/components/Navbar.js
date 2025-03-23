import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Select,
} from '@mui/material';
import {
  AccountCircle,
  Favorite,
  Language,
} from '@mui/icons-material';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [language, setLanguage] = useState('tr');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    // TODO: Implement language change functionality
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold'
          }}
        >
          TATİLİM
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Select
            value={language}
            onChange={handleLanguageChange}
            size="small"
            sx={{ color: 'white', '& .MuiSelect-icon': { color: 'white' } }}
          >
            <MenuItem value="tr">TR</MenuItem>
            <MenuItem value="en">EN</MenuItem>
          </Select>

          <Button
            component={RouterLink}
            to="/hotels"
            color="inherit"
          >
            Oteller
          </Button>

          <Button
            component={RouterLink}
            to="/login"
            color="inherit"
            variant="outlined"
            sx={{
              borderColor: 'white',
              borderRadius: '8px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'white'
              }
            }}
          >
            Giriş Yap
          </Button>

          <Button
            component={RouterLink}
            to="/register"
            color="inherit"
            sx={{
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Üye Ol
          </Button>

          <IconButton
            component={RouterLink}
            to="/favorites"
            color="inherit"
          >
            <Favorite />
          </IconButton>

          <IconButton
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={RouterLink} to="/profile" onClick={handleClose}>
              Profilim
            </MenuItem>
            <MenuItem component={RouterLink} to="/bookings" onClick={handleClose}>
              Rezervasyonlarım
            </MenuItem>
            <MenuItem onClick={handleClose}>
              Çıkış Yap
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
