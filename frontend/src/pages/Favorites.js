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
} from '@mui/material';
import { Favorite, Delete } from '@mui/icons-material';

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      // TODO: Implement actual API call
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
    } catch (err) {
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  const handleRemoveFavorite = async (hotelId) => {
    try {
      // TODO: Implement actual API call
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
    } catch (err) {
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
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
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Favori Otelleriniz
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Henüz favori oteliniz bulunmuyor.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/hotels')}
            sx={{ mt: 2 }}
          >
            Otelleri Keşfet
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Favori Otelleriniz
      </Typography>

      <Grid container spacing={3}>
        {favorites.map((hotel) => (
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
                    onClick={() => handleRemoveFavorite(hotel.id)}
                    color="primary"
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
                    ({hotel.reviews} değerlendirme)
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
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
    </Container>
  );
};

export default Favorites;
