import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Rating,
  Button,
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
import { Favorite, Delete, Hotel } from '@mui/icons-material';

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = () => {
    try {
      // localStorage'dan favorileri al
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
      
      // Not: Backend entegrasyonu yapılacaksa aşağıdaki kodu kullanabilirsiniz
      /*
      const response = await fetch('/api/favorites', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      } else {
        setError('Favoriler yüklenirken bir hata oluştu.');
      }
      */
    } catch (err) {
      setError('Favoriler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  const handleRemoveFavorite = (hotelId) => {
    try {
      // localStorage'dan favorileri al
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      
      // Favorilerden kaldır
      const updatedFavorites = storedFavorites.filter(hotel => hotel.id !== hotelId);
      
      // Güncellenen favorileri localStorage'a kaydet
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      
      // State'i güncelle
      setFavorites(updatedFavorites);
      
      // Bildirim göster
      setSnackbarMessage('Otel favorilerinizden kaldırıldı');
      setSnackbarOpen(true);
      
      // Not: Backend entegrasyonu yapılacaksa aşağıdaki kodu kullanabilirsiniz
      /*
      const response = await fetch(`/api/favorites/${hotelId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setFavorites(favorites.filter(hotel => hotel.id !== hotelId));
      } else {
        setError('Favori silinirken bir hata oluştu.');
      }
      */
    } catch (err) {
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (favorites.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Hotel sx={{ fontSize: 80, color: 'primary.main', mb: 2, opacity: 0.7 }} />
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Favori Otelleriniz
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Henüz favori oteliniz bulunmuyor. Beğendiğiniz otelleri favorilere ekleyerek burada görebilirsiniz.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/hotels')}
            sx={{ 
              mt: 2, 
              px: 4, 
              py: 1.5, 
              borderRadius: 2,
              fontWeight: 'bold'
            }}
          >
            Otelleri Keşfet
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
        Favori Otelleriniz
      </Typography>

      <Grid container spacing={3}>
        {favorites.map((hotel) => (
          <Grid item xs={12} sm={6} md={4} key={hotel.id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
              }
            }}>
              <CardMedia
                component="img"
                height="200"
                image={hotel.image}
                alt={hotel.name}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/hotels/${hotel.id}`)}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" gutterBottom>
                    {hotel.name}
                  </Typography>
                  <IconButton
                    onClick={() => handleRemoveFavorite(hotel.id)}
                    color="error"
                    size="small"
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: 'rgba(211, 47, 47, 0.1)' 
                      } 
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>

                <Typography color="text.secondary" gutterBottom>
                  {hotel.location}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={hotel.rating} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({hotel.reviews || 0} değerlendirme)
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    ₺{hotel.price}
                  </Typography>
                  <Favorite color="error" />
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
      
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="info" 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Favorites;
