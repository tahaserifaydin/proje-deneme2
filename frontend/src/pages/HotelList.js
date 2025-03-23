import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Sort,
} from '@mui/icons-material';

const HotelList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    stars: 0,
    type: 'all',
  });

  // Simulated hotel data (replace with API call)
  useEffect(() => {
    // TODO: Implement actual API call
    setHotels([
      {
        id: 1,
        name: 'Luxury Resort & Spa',
        location: 'Antalya, Turkey',
        price: 1200,
        stars: 5,
        rating: 4.5,
        reviews: 234,
        image: '/images/hotel1.jpg',
        type: 'resort',
        isFavorite: false,
      },
      // Add more hotels...
    ]);
  }, [location.search]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    // Implement sorting logic
  };

  const handleFavoriteToggle = (hotelId) => {
    // Implement favorite toggle logic
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
    // Implement filtering logic
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Filters Section */}
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Filtreler
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Fiyat Aralığı (₺)</Typography>
              <Slider
                value={filters.priceRange}
                onChange={(_, value) => handleFilterChange('priceRange', value)}
                valueLabelDisplay="auto"
                min={0}
                max={5000}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Yıldız Sayısı</Typography>
              <Rating
                value={filters.stars}
                onChange={(_, value) => handleFilterChange('stars', value)}
              />
            </Box>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Konaklama Tipi</InputLabel>
              <Select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <MenuItem value="all">Tümü</MenuItem>
                <MenuItem value="hotel">Otel</MenuItem>
                <MenuItem value="resort">Resort</MenuItem>
                <MenuItem value="villa">Villa</MenuItem>
                <MenuItem value="apartment">Apart</MenuItem>
              </Select>
            </FormControl>
          </Card>
        </Grid>

        {/* Hotels List Section */}
        <Grid item xs={12} md={9}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5">
              {hotels.length} sonuç bulundu
            </Typography>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Sırala</InputLabel>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                startAdornment={<Sort />}
              >
                <MenuItem value="recommended">Önerilen</MenuItem>
                <MenuItem value="price_asc">Fiyat (Düşükten Yükseğe)</MenuItem>
                <MenuItem value="price_desc">Fiyat (Yüksekten Düşüğe)</MenuItem>
                <MenuItem value="rating">En Çok Beğenilen</MenuItem>
                <MenuItem value="name_asc">İsim (A-Z)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Grid container spacing={4}>
            {hotels.map((hotel) => (
              <Grid item xs={12} sm={6} md={4} key={hotel.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={hotel.image}
                    alt={hotel.name}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/hotels/${hotel.id}`)}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="h6" gutterBottom>
                        {hotel.name}
                      </Typography>
                      <IconButton
                        onClick={() => handleFavoriteToggle(hotel.id)}
                        color="primary"
                      >
                        {hotel.isFavorite ? <Favorite /> : <FavoriteBorder />}
                      </IconButton>
                    </Box>

                    <Typography color="text.secondary" gutterBottom>
                      {hotel.location}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={hotel.rating} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({hotel.reviews} değerlendirme)
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" color="primary">
                        ₺{hotel.price}
                      </Typography>
                      <Chip label={`${hotel.stars} Yıldızlı`} size="small" />
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2 }}
                      onClick={() => navigate(`/hotels/${hotel.id}`)}
                    >
                      Detayları Gör
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HotelList;
