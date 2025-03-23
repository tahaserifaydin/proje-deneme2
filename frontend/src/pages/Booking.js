import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  TextField,
  Grid,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar
} from '@mui/material';
import {
  CreditCard,
  AccountBalance,
  CreditScore,
  Money,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [hotel, setHotel] = useState({
    id: location.state?.hotelId,
    name: location.state?.hotelName,
    price: location.state?.price,
    rooms: [
      {
        type: 'Standart Oda',
        price: location.state?.price,
        capacity: 2,
      },
      {
        type: 'Deluxe Oda',
        price: location.state?.price * 1.5,
        capacity: 2,
      },
      {
        type: 'Suit Oda',
        price: location.state?.price * 2,
        capacity: 4,
      },
    ],
  });

  const [bookingDetails, setBookingDetails] = useState({
    checkIn: location.state?.checkIn || null,
    checkOut: location.state?.checkOut || null,
    guests: location.state?.guests || 1,
    roomType: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardHolderName: '',
    bankTransferInfo: '',
    installmentCount: '',
    hotelId: location.state?.hotelId || '',
    hotelName: location.state?.hotelName || '',
    price: location.state?.price || 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [isAuthenticated, navigate]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Rezervasyon bilgilerini localStorage'a kaydet
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    const newReservation = {
      id: Date.now(),
      hotelId: location.state.hotelId,
      hotelName: location.state.hotelName,
      checkIn: bookingDetails.checkIn,
      checkOut: bookingDetails.checkOut,
      guests: bookingDetails.guests,
      totalPrice: location.state.price * bookingDetails.guests,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    reservations.push(newReservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    
    // Rezervasyon onay sayfasına yönlendir
    navigate('/booking-confirmation', {
      state: { reservation: newReservation }
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const steps = ['Oda Seçimi', 'İletişim Bilgileri', 'Ödeme', 'Onay'];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Oda Seçimi
            </Typography>
            <Grid container spacing={2}>
              {hotel.rooms.map((room, index) => (
                <Grid item xs={12} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{room.type}</Typography>
                      <Typography color="textSecondary">
                        Kapasite: {room.capacity} Kişi
                      </Typography>
                      <Typography variant="h6" color="primary">
                        {room.price} ₺ / gece
                      </Typography>
                      <Button
                        variant={bookingDetails.roomType === room.type ? 'contained' : 'outlined'}
                        onClick={() => handleInputChange({ target: { name: 'roomType', value: room.type } })}
                        sx={{ mt: 1 }}
                      >
                        {bookingDetails.roomType === room.type ? 'Seçildi' : 'Seç'}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              İletişim Bilgileri
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Ad Soyad"
                  name="contactName"
                  value={bookingDetails.contactName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="E-posta"
                  name="contactEmail"
                  type="email"
                  value={bookingDetails.contactEmail}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Telefon"
                  name="contactPhone"
                  value={bookingDetails.contactPhone}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Ödeme Yöntemi
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                name="paymentMethod"
                value={bookingDetails.paymentMethod}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="credit_card"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CreditCard sx={{ mr: 1 }} />
                      Kredi Kartı
                    </Box>
                  }
                />
                <FormControlLabel
                  value="bank_transfer"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccountBalance sx={{ mr: 1 }} />
                      Banka Havalesi
                    </Box>
                  }
                />
                <FormControlLabel
                  value="installment"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CreditScore sx={{ mr: 1 }} />
                      Taksitli Ödeme
                    </Box>
                  }
                />
                <FormControlLabel
                  value="pay_at_hotel"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Money sx={{ mr: 1 }} />
                      Otelde Ödeme
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>

            {bookingDetails.paymentMethod === 'credit_card' && (
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Kart Numarası"
                      name="cardNumber"
                      value={bookingDetails.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Son Kullanma Tarihi"
                      name="cardExpiry"
                      value={bookingDetails.cardExpiry}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVC"
                      name="cardCVC"
                      value={bookingDetails.cardCVC}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Kart Üzerindeki İsim"
                      name="cardHolderName"
                      value={bookingDetails.cardHolderName}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {bookingDetails.paymentMethod === 'bank_transfer' && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" color="textSecondary">
                  Banka hesap bilgileri rezervasyon onayından sonra size iletilecektir.
                </Typography>
              </Box>
            )}

            {bookingDetails.paymentMethod === 'installment' && (
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Taksit Sayısı"
                  name="installmentCount"
                  type="number"
                  value={bookingDetails.installmentCount}
                  onChange={handleInputChange}
                  required
                />
              </Box>
            )}
          </Box>
        );
      case 3:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Rezervasyon Özeti
            </Typography>
            <Card>
              <CardContent>
                <Typography variant="h6">{hotel.name}</Typography>
                <Typography color="textSecondary">
                  {bookingDetails.roomType}
                </Typography>
                <Typography>
                  Giriş: {bookingDetails.checkIn}
                </Typography>
                <Typography>
                  Çıkış: {bookingDetails.checkOut}
                </Typography>
                <Typography>
                  Misafir Sayısı: {bookingDetails.guests}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">
                  İletişim Bilgileri
                </Typography>
                <Typography>
                  {bookingDetails.contactName}
                </Typography>
                <Typography>
                  {bookingDetails.contactEmail}
                </Typography>
                <Typography>
                  {bookingDetails.contactPhone}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">
                  Ödeme Yöntemi
                </Typography>
                <Typography>
                  {bookingDetails.paymentMethod === 'credit_card' && 'Kredi Kartı'}
                  {bookingDetails.paymentMethod === 'bank_transfer' && 'Banka Havalesi'}
                  {bookingDetails.paymentMethod === 'installment' && 'Taksitli Ödeme'}
                  {bookingDetails.paymentMethod === 'pay_at_hotel' && 'Otelde Ödeme'}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Rezervasyon
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Geri
          </Button>
          <Button
            variant="contained"
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            disabled={activeStep === steps.length - 1 && !isAuthenticated}
          >
            {activeStep === steps.length - 1 ? 'Rezervasyonu Tamamla' : 'İleri'}
          </Button>
        </Box>
      </Paper>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={2000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
          Rezervasyon yapabilmek için lütfen giriş yapın.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Booking;
