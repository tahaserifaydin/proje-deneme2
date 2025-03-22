import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Rating,
  Divider,
  ImageList,
  ImageListItem,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  TextField,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  LocationOn,
  Pool,
  Wifi,
  Restaurant,
  LocalParking,
  Spa,
  Comment,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    checkIn: null,
    checkOut: null,
  });
  const [guestCount, setGuestCount] = useState(1);

  useEffect(() => {
    // TODO: Implement actual API call
    // Simulated hotel data
    setHotel({
      id,
      name: 'Luxury Resort & Spa',
      location: 'Antalya, Turkey',
      description: 'Muhteşem deniz manzarası ve lüks hizmetleriyle unutulmaz bir tatil deneyimi.',
      price: 1200,
      stars: 5,
      rating: 4.5,
      reviews: [
        {
          id: 1,
          user: 'Ahmet Y.',
          rating: 5,
          comment: 'Mükemmel bir deneyimdi. Kesinlikle tekrar geleceğim.',
          date: '2025-02-15',
        },
        // More reviews...
      ],
      amenities: ['Havuz', 'WiFi', 'Restaurant', 'Otopark', 'Spa'],
      images: [
        '/images/hotel1-1.jpg',
        '/images/hotel1-2.jpg',
        '/images/hotel1-3.jpg',
        // More images...
      ],
      rooms: [
        {
          type: 'Standart Oda',
          price: 1200,
          capacity: 2,
        },
        {
          type: 'Deluxe Oda',
          price: 1800,
          capacity: 2,
        },
        {
          type: 'Suit Oda',
          price: 2500,
          capacity: 4,
        },
      ],
    });
  }, [id]);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement API call to update favorites
  };

  const handleBooking = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) {
      alert('Lütfen giriş ve çıkış tarihlerini seçin');
      return;
    }
    navigate(`/booking/${id}`, {
      state: {
        checkIn: selectedDates.checkIn,
        checkOut: selectedDates.checkOut,
        guests: guestCount,
      },
    });
  };

  if (!hotel) {
    return <Typography>Yükleniyor...</Typography>;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Hotel Images */}
          <ImageList variant="quilted" cols={4} rowHeight={200}>
            {hotel.images.map((image, index) => (
              <ImageListItem key={index} cols={index === 0 ? 2 : 1} rows={index === 0 ? 2 : 1}>
                <img src={image} alt={`${hotel.name} - ${index + 1}`} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>

          {/* Hotel Info */}
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" gutterBottom>
                {hotel.name}
              </Typography>
              <IconButton onClick={handleFavoriteToggle} color="primary">
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn color="primary" />
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                {hotel.location}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={hotel.stars} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({hotel.rating} / 5)
              </Typography>
            </Box>

            <Typography variant="body1" paragraph>
              {hotel.description}
            </Typography>

            {/* Amenities */}
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Otel Özellikleri
            </Typography>
            <Grid container spacing={2}>
              {hotel.amenities.map((amenity, index) => (
                <Grid item key={index}>
                  <Chip
                    icon={
                      amenity === 'Havuz' ? <Pool /> :
                      amenity === 'WiFi' ? <Wifi /> :
                      amenity === 'Restaurant' ? <Restaurant /> :
                      amenity === 'Otopark' ? <LocalParking /> :
                      <Spa />
                    }
                    label={amenity}
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>

            {/* Reviews */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Değerlendirmeler
            </Typography>
            <List>
              {hotel.reviews.map((review) => (
                <ListItem key={review.id} divider>
                  <ListItemIcon>
                    <Comment />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2">{review.user}</Typography>
                        <Rating value={review.rating} size="small" readOnly />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {review.date}
                        </Typography>
                        <Typography variant="body1">
                          {review.comment}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Right Column - Booking Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Rezervasyon
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ mb: 2 }}>
                <DatePicker
                  label="Giriş Tarihi"
                  value={selectedDates.checkIn}
                  onChange={(date) => setSelectedDates({ ...selectedDates, checkIn: date })}
                  renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
                />
                <DatePicker
                  label="Çıkış Tarihi"
                  value={selectedDates.checkOut}
                  onChange={(date) => setSelectedDates({ ...selectedDates, checkOut: date })}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>
            </LocalizationProvider>

            <TextField
              fullWidth
              type="number"
              label="Misafir Sayısı"
              value={guestCount}
              onChange={(e) => setGuestCount(parseInt(e.target.value))}
              InputProps={{ inputProps: { min: 1 } }}
              sx={{ mb: 2 }}
            />

            <Divider sx={{ my: 2 }} />

            {/* Room Types */}
            {hotel.rooms.map((room, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1">{room.type}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Kapasite: {room.capacity} kişi
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    ₺{room.price} / gece
                  </Typography>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleBooking}
              sx={{ mt: 2 }}
            >
              Rezervasyon Yap
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HotelDetail;
