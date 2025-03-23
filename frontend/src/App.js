import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthProvider } from './contexts/AuthContext';
import './styles/App.css';
import './styles/HotelStyles.css';
import './styles/AuthStyles.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import HotelList from './pages/HotelList';
import HotelDetail from './pages/HotelDetail';
import Favorites from './pages/Favorites';
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import SearchResults from './pages/SearchResults';
import BookingConfirmation from './pages/BookingConfirmation';
import MyReservations from './pages/MyReservations';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Material Blue
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff', // White text
    },
    secondary: {
      main: '#1976d2', // Using blue as secondary color too
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff', // White text
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1976d2',
          color: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
        contained: {
          backgroundColor: '#1976d2',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#e3f2fd',
          color: '#1976d2',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <CssBaseline />
          <Router>
            <div className="app">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/hotels" element={<HotelList />} />
                  <Route path="/hotels/:id" element={<HotelDetail />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/search-results" element={<SearchResults />} />
                  <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                  <Route path="/my-reservations" element={<MyReservations />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
