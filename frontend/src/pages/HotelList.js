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
  LocationOn,
} from '@mui/icons-material';
import { hotels } from '../data/hotels';
import HotelCard from '../components/HotelCard';

const HotelList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    stars: 0,
    type: 'all',
  });

  // Otel verilerini yükle ve filtrele
  useEffect(() => {
    // hotels.js'den tüm otelleri al
    let result = [...hotels];
    
    // Filtreleme işlemleri
    if (filters.stars > 0) {
      result = result.filter(hotel => Math.round(hotel.rating) >= filters.stars);
    }
    
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) {
      result = result.filter(hotel => 
        hotel.price >= filters.priceRange[0] && 
        hotel.price <= filters.priceRange[1]
      );
    }
    
    // Sıralama işlemleri
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Varsayılan sıralama (önerilen)
        result.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredHotels(result);
  }, [filters, sortBy, location.search]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleInteraction = (type) => {
    console.log(`Kullanıcı etkileşimi: ${type}`);
    // Burada etkileşim analitiği eklenebilir
  };

  return (
    <Container className="container">
      <Grid container className="grid-container" spacing={4}>
        {/* Filters Section */}
        <Grid item xs={12} md={3} className="filters-section">
          <Card className="card">
            <CardContent>
              <Typography variant="h6" gutterBottom className="title">
                Filtreler
              </Typography>

              <Box className="box" sx={{ mb: 3 }}>
                <Typography gutterBottom className="label">Fiyat Aralığı (₺)</Typography>
                <Slider
                  value={filters.priceRange}
                  onChange={(_, value) => handleFilterChange('priceRange', value)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5000}
                  className="slider"
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">₺{filters.priceRange[0]}</Typography>
                  <Typography variant="body2">₺{filters.priceRange[1]}</Typography>
                </Box>
              </Box>

              <Box className="box" sx={{ mb: 3 }}>
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
            </CardContent>
          </Card>
        </Grid>

        {/* Hotels List Section */}
        <Grid item xs={12} md={9} className="hotels-list-section">
          <Box className="box" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" className="title">
              {filteredHotels.length} sonuç bulundu
            </Typography>

            <FormControl sx={{ minWidth: 200 }} className="form-control">
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

          <Grid container spacing={4} className="hotel-grid">
            {filteredHotels.map((hotel) => (
              <Grid item xs={12} sm={6} md={4} key={hotel.id} className="hotel-grid-item">
                <HotelCard 
                  hotel={hotel} 
                  onInteraction={handleInteraction}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HotelList;
