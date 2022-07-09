import { Icon } from '@iconify/react';
import { React, useEffect, useState } from 'react';
import axios from 'axios';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Input,
  Slide,
  Button,
  InputAdornment,
  ClickAwayListener,
  IconButton
} from '@mui/material';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    const data = {
      name: input
    };
    axios
      .post('http://localhost:8080/comestic/public/api/getIdProduct', data)
      .then((response) => {
        localStorage.setItem('productId', response.data.data);
        window.location.href = 'http://localhost:3001/dashboard/products/info';
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };

  return (
    // <ClickAwayListener>
    <div>
      {!isOpen && (
        <IconButton onClick={handleOpen}>
          <Icon icon={searchFill} width={20} height={20} />
        </IconButton>
      )}

      <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
        <SearchbarStyle>
          <Input
            id="inputSearch"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            fullWidth
            disableUnderline
            placeholder="Search…"
            startAdornment={
              <InputAdornment position="start">
                <Box
                  component={Icon}
                  icon={searchFill}
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
            sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
          />
          <Button variant="contained" onClick={handleClose}>
            Search
          </Button>
        </SearchbarStyle>
      </Slide>
    </div>
  );
}
