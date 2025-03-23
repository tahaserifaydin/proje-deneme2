import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Button,
  Chip,
  Stack,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HotelDetailModal from './HotelDetailModal';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const HotelCard = ({ hotel }) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, isHotelFavorite, toggleFavorite } = useAuth();

  const handleOpenDetail = () => {
    setIsDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailModalOpen(false);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }
    toggleFavorite(hotel);
  };

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }
    navigate('/booking', {
      state: {
        hotelId: hotel.id,
        hotelName: hotel.name,
        price: hotel.price,
        checkIn: hotel.checkIn,
        checkOut: hotel.checkOut,
        guests: hotel.guests
      }
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'hotel':
        return 'Otel';
      case 'villa':
        return 'Villa';
      case 'bungalow':
        return 'Bungalow';
      case 'treehouse':
        return 'Treehouse';
      case 'house':
        return 'Ev';
      default:
        return 'Diğer';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'hotel':
        return 'primary';
      case 'villa':
        return 'secondary';
      case 'bungalow':
        return 'success';
      case 'treehouse':
        return 'warning';
      case 'house':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={hotel.image}
          alt={hotel.name}
          sx={{ cursor: 'pointer' }}
          onClick={handleOpenDetail}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }
          }}
          onClick={handleFavoriteClick}
          size="small"
        >
          {isHotelFavorite(hotel.id) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {hotel.name}
          </Typography>
          <Chip 
            label={
              hotel.type === 'hotel' ? 'Otel' : 
              hotel.type === 'villa' ? 'Villa' : 
              hotel.type === 'bungalow' ? 'Bungalow' : 
              hotel.type === 'treehouse' ? 'Treehouse' : 
              hotel.type === 'house' ? 'Ev' : 'Diğer'
            } 
            color={
              hotel.type === 'hotel' ? 'primary' : 
              hotel.type === 'villa' ? 'secondary' : 
              hotel.type === 'bungalow' ? 'success' : 
              hotel.type === 'treehouse' ? 'warning' : 
              hotel.type === 'house' ? 'info' : 'default'
            } 
            size="small"
          />
        </Box>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <LocationOnIcon color="action" fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {hotel.location}
          </Typography>
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={hotel.rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({hotel.reviewCount} değerlendirme)
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          {hotel.roomTypes.map((type, index) => (
            <Chip 
              key={index} 
              label={type} 
              size="small" 
              variant="outlined"
            />
          ))}
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          {hotel.amenities.slice(0, 3).map((amenity, index) => (
            <Chip key={index} label={amenity} size="small" />
          ))}
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            {hotel.price} ₺ / gece
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBookingClick}
            startIcon={<CreditCard />}
          >
            Hemen Rezervasyon Yap
          </Button>
        </Box>
      </CardContent>
      <HotelDetailModal
        open={isDetailModalOpen}
        onClose={handleCloseDetail}
        hotel={hotel}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="info">
          Rezervasyon yapabilmek için lütfen giriş yapın.
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default HotelCard;
