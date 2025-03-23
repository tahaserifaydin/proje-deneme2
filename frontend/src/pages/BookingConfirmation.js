import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const BookingConfirmation = () => {
  const navigate = useNavigate();

  const handleViewReservations = () => {
    navigate('/my-reservations');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Box sx={{ mb: 3 }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: 'primary.main' }} />
        </Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Rezervasyonunuz Onaylandı!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Rezervasyonunuz başarıyla oluşturuldu. Rezervasyon detaylarınızı görüntülemek için "Rezervasyonlarım" sayfasını ziyaret edebilirsiniz.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleViewReservations}
            size="large"
          >
            Rezervasyonlarımı Görüntüle
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleGoHome}
            size="large"
          >
            Ana Sayfaya Dön
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BookingConfirmation; 