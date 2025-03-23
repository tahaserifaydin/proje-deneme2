import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Divider,
  Chip,
  Rating,
  Paper,
  CircularProgress
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import PoolIcon from '@mui/icons-material/Pool';
import WifiIcon from '@mui/icons-material/Wifi';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { hotels } from '../data/hotels';
import SearchBar from '../components/SearchBar';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: null,
    checkOut: null,
    guests: 2
  });

  useEffect(() => {
    // URL'den veya state'den arama parametrelerini al
    const params = new URLSearchParams(location.search);
    const locationParam = params.get('location') || location.state?.location || '';
    const checkInParam = params.get('checkIn') || location.state?.checkIn || null;
    const checkOutParam = params.get('checkOut') || location.state?.checkOut || null;
    const guestsParam = parseInt(params.get('guests') || location.state?.guests || 2);

    setSearchParams({
      location: locationParam,
      checkIn: checkInParam,
      checkOut: checkOutParam,
      guests: guestsParam
    });

    // Arama sonuçlarını filtrele
    let filteredResults = [...hotels];
    
    if (locationParam) {
      filteredResults = filteredResults.filter(hotel => 
        hotel.name.toLowerCase().includes(locationParam.toLowerCase()) || 
        hotel.location.toLowerCase().includes(locationParam.toLowerCase())
      );
    }

    // Yükleme efekti için kısa bir gecikme
    setTimeout(() => {
      setResults(filteredResults);
      setLoading(false);
    }, 800);
  }, [location]);

  const handleBookNow = (hotel) => {
    navigate(`/booking/${hotel.id}`, {
      state: {
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        guests: searchParams.guests
      }
    });
  };

  const handleViewHotel = (hotel) => {
    navigate(`/hotel/${hotel.id}`, {
      state: {
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        guests: searchParams.guests
      }
    });
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'havuz':
        return <PoolIcon fontSize="small" />;
      case 'wifi':
        return <WifiIcon fontSize="small" />;
      case 'restoran':
        return <RestaurantIcon fontSize="small" />;
      default:
        return <HotelIcon fontSize="small" />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <SearchBar initialValues={searchParams} />
      
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {searchParams.location 
            ? `"${searchParams.location}" için arama sonuçları` 
            : 'Tüm Oteller'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {results.length} otel bulundu
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : results.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', mt: 4 }}>
          <Typography variant="h6">
            Aramanıza uygun sonuç bulunamadı.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Lütfen farklı bir konum veya tarih aralığı deneyin.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {results.map((hotel) => (
            <Grid item xs={12} key={hotel.id}>
              <Card 
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', md: 'row' },
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ 
                    width: { xs: '100%', md: 300 }, 
                    height: { xs: 200, md: 'auto' },
                    objectFit: 'cover'
                  }}
                  image={hotel.image}
                  alt={hotel.name}
                  onClick={() => handleViewHotel(hotel)}
                  style={{ cursor: 'pointer' }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <CardContent sx={{ flex: '1 0 auto', pb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography component="h2" variant="h6" sx={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleViewHotel(hotel)}>
                          {hotel.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <LocationOnIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                          <Typography variant="body2" color="text.secondary">
                            {hotel.location}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Rating value={hotel.rating} precision={0.5} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary">
                          {hotel.rating} / 5
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                      {hotel.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                      {hotel.amenities.slice(0, 4).map((amenity, index) => (
                        <Chip 
                          key={index}
                          icon={getAmenityIcon(amenity)}
                          label={amenity}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                      {hotel.amenities.length > 4 && (
                        <Chip 
                          label={`+${hotel.amenities.length - 4}`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </CardContent>
                  
                  <Divider />
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 2
                  }}>
                    <Box>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                        ₺{hotel.price}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        gecelik / kişi başı
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button 
                        variant="outlined" 
                        onClick={() => handleViewHotel(hotel)}
                      >
                        Detayları Gör
                      </Button>
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => handleBookNow(hotel)}
                      >
                        Rezervasyon Yap
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SearchResults;
