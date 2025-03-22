import React, { useState } from 'react';
import { Paper, InputBase, IconButton, Grid, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PersonIcon from '@mui/icons-material/Person';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';

dayjs.locale('tr');

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState(dayjs());
  const [checkOut, setCheckOut] = useState(dayjs().add(1, 'day'));
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    console.log({
      location,
      checkIn: checkIn.format('YYYY-MM-DD'),
      checkOut: checkOut.format('YYYY-MM-DD'),
      guests
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
      <Paper
        elevation={3}
        sx={{
          p: 2,
          maxWidth: 900,
          mx: 'auto',
          mt: 4,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 1, p: 1 }}>
              <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
              <InputBase
                placeholder="Nereye gitmek istiyorsunuz?"
                fullWidth
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <DatePicker
              label="Giriş Tarihi"
              value={checkIn}
              onChange={(newValue) => setCheckIn(newValue)}
              minDate={dayjs()}
              format="DD MMMM YYYY"
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DatePicker
              label="Çıkış Tarihi"
              value={checkOut}
              onChange={(newValue) => setCheckOut(newValue)}
              minDate={checkIn.add(1, 'day')}
              format="DD MMMM YYYY"
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 1, p: 1 }}>
              <PersonIcon sx={{ color: 'action.active', mr: 1 }} />
              <InputBase
                placeholder="Misafir Sayısı"
                fullWidth
                type="number"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                inputProps={{ min: 1, max: 10 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={1}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                backgroundColor: '#007fad',
                '&:hover': {
                  backgroundColor: '#006990',
                },
              }}
              onClick={handleSearch}
            >
              Ara
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
};

export default SearchBar;
