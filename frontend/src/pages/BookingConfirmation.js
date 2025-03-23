import React from 'react';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const BookingConfirmation = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <CheckCircle sx={{ fontSize: 80, color: 'success.main' }} />
        </Box>
        <Typography variant="h4" gutterBottom>
          Rezervasyonunuz Alındı!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Rezervasyon detaylarınız e-posta adresinize gönderilecektir.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Ana Sayfaya Dön
        </Button>
      </Paper>
    </Container>
  );
};

export default BookingConfirmation; 