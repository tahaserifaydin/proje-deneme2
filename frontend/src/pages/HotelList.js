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
    <Container className="container">
      <Grid container className="grid-container" spacing={3}>
        {/* Filters Section */}
        <Grid item xs={12} md={3} className="filters-section">
          <Card className="card">
            <Typography variant="h6" gutterBottom className="title">
              Filtreler
            </Typography>

            <Box className="box">
              <Typography gutterBottom className="label">Fiyat Aralığı (₺)</Typography>
              <Slider
                value={filters.priceRange}
                onChange={(_, value) => handleFilterChange('priceRange', value)}
                valueLabelDisplay="auto"
                min={0}
                max={5000}
                className="slider"
              />
            </Box>

            <Box className="box">
              <Typography gutterBottom className="label">Yıldız Sayısı</Typography>
              <Rating
                value={filters.stars}
                onChange={(_, value) => handleFilterChange('stars', value)}
                className="rating"
              />
            </Box>

            <FormControl fullWidth className="form-control">
              <InputLabel className="input-label">Konaklama Tipi</InputLabel>
              <Select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="select"
              >
                <MenuItem value="all" className="menu-item">Tümü</MenuItem>
                <MenuItem value="hotel" className="menu-item">Otel</MenuItem>
                <MenuItem value="resort" className="menu-item">Resort</MenuItem>
                <MenuItem value="villa" className="menu-item">Villa</MenuItem>
                <MenuItem value="apartment" className="menu-item">Apart</MenuItem>
              </Select>
            </FormControl>
          </Card>
        </Grid>

        {/* Hotels List Section */}
        <Grid item xs={12} md={9} className="hotels-list-section">
          <Box className="box">
            <Typography variant="h5" className="title">
              {hotels.length} sonuç bulundu
            </Typography>

            <FormControl className="form-control">
              <InputLabel className="input-label">Sırala</InputLabel>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                startAdornment={<Sort className="sort-icon" />}
                className="select"
              >
                <MenuItem value="recommended" className="menu-item">Önerilen</MenuItem>
                <MenuItem value="price_asc" className="menu-item">Fiyat (Düşükten Yükseğe)</MenuItem>
                <MenuItem value="price_desc" className="menu-item">Fiyat (Yüksekten Düşüğe)</MenuItem>
                <MenuItem value="rating" className="menu-item">En Çok Beğenilen</MenuItem>
                <MenuItem value="name_asc" className="menu-item">İsim (A-Z)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Grid container className="hotel-grid">
            {hotels.map((hotel) => (
              <Grid item xs={12} sm={6} md={4} key={hotel.id} className="hotel-grid-item">
                <Card className="card">
                  <CardMedia
                    component="img"
                    height="200"
                    image={hotel.image}
                    alt={hotel.name}
                    className="hotel-image"
                    onClick={() => navigate(`/hotels/${hotel.id}`)}
                  />
                  <CardContent className="card-content">
                    <Box className="box">
                      <Typography variant="h6" gutterBottom className="title">
                        {hotel.name}
                      </Typography>
                      <IconButton
                        onClick={() => handleFavoriteToggle(hotel.id)}
                        color="primary"
                        className="favorite-button"
                      >
                        {hotel.isFavorite ? <Favorite className="favorite-icon" /> : <FavoriteBorder className="favorite-icon" />}
                      </IconButton>
                    </Box>

                    <Typography color="text.secondary" gutterBottom className="label">
                      {hotel.location}
                    </Typography>

                    <Box className="box">
                      <Rating value={hotel.rating} precision={0.5} readOnly size="small" className="rating" />
                      <Typography variant="body2" className="label">
                        ({hotel.reviews} değerlendirme)
                      </Typography>
                    </Box>

                    <Box className="box">
                      <Typography variant="h6" color="primary" className="price">
                        ₺{hotel.price}
                      </Typography>
                      <Chip label={`${hotel.stars} Yıldızlı`} size="small" className="chip" />
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      className="button"
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
