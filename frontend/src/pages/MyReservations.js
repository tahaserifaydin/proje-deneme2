import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Rating,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tab,
  Tabs
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { hotels } from '../data/hotels';

const MyReservations = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [reservations, setReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Örnek rezervasyon verileri
    const mockReservations = [
      {
        id: 1,
        hotelId: 1,
        checkIn: '2024-04-15',
        checkOut: '2024-04-20',
        guests: 2,
        totalPrice: 12500,
        status: 'active'
      },
      {
        id: 2,
        hotelId: 2,
        checkIn: '2024-05-01',
        checkOut: '2024-05-05',
        guests: 3,
        totalPrice: 8000,
        status: 'active'
      }
    ];

    const mockPastReservations = [
      {
        id: 3,
        hotelId: 3,
        checkIn: '2024-02-15',
        checkOut: '2024-02-20',
        guests: 2,
        totalPrice: 10000,
        status: 'completed',
        hasComment: true
      }
    ];

    setReservations(mockReservations);
    setPastReservations(mockPastReservations);
  }, [isAuthenticated, navigate]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCommentClick = (reservation) => {
    setSelectedReservation(reservation);
    setOpenCommentDialog(true);
  };

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;

    // Yorumu kaydet
    const newComment = {
      id: Date.now(),
      hotelId: selectedReservation.hotelId,
      userId: user.id,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    // localStorage'a kaydet
    const comments = JSON.parse(localStorage.getItem('hotelComments') || '{}');
    if (!comments[selectedReservation.hotelId]) {
      comments[selectedReservation.hotelId] = [];
    }
    comments[selectedReservation.hotelId].push(newComment);
    localStorage.setItem('hotelComments', JSON.stringify(comments));

    // Rezervasyonu güncelle
    setPastReservations(prev =>
      prev.map(res =>
        res.id === selectedReservation.id
          ? { ...res, hasComment: true }
          : res
      )
    );

    setComment('');
    setRating(5);
    setOpenCommentDialog(false);
  };

  const getHotelById = (hotelId) => {
    return hotels.find(hotel => hotel.id === hotelId);
  };

  const ReservationCard = ({ reservation }) => {
    const hotel = getHotelById(reservation.hotelId);
    if (!hotel) return null;

    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <img
                src={hotel.image}
                alt={hotel.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                {hotel.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOnIcon color="primary" fontSize="small" />
                <Typography variant="body2" sx={{ ml: 0.5 }}>
                  {hotel.location}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Giriş: {format(new Date(reservation.checkIn), 'd MMMM yyyy', { locale: tr })}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Çıkış: {format(new Date(reservation.checkOut), 'd MMMM yyyy', { locale: tr })}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Misafir Sayısı: {reservation.guests}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                Toplam: ₺{reservation.totalPrice}
              </Typography>
              {reservation.status === 'completed' && !reservation.hasComment && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleCommentClick(reservation)}
                >
                  Yorum Yap
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Rezervasyonlarım
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Aktif Rezervasyonlar" />
          <Tab label="Geçmiş Rezervasyonlar" />
        </Tabs>
      </Box>

      {activeTab === 0 ? (
        <Box>
          {reservations.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              Aktif rezervasyonunuz bulunmamaktadır.
            </Typography>
          ) : (
            reservations.map(reservation => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))
          )}
        </Box>
      ) : (
        <Box>
          {pastReservations.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              Geçmiş rezervasyonunuz bulunmamaktadır.
            </Typography>
          ) : (
            pastReservations.map(reservation => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))
          )}
        </Box>
      )}

      {/* Yorum Yapma Dialog'u */}
      <Dialog open={openCommentDialog} onClose={() => setOpenCommentDialog(false)}>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Yorum Yap
            <IconButton onClick={() => setOpenCommentDialog(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography component="legend">Puanınız</Typography>
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              size="large"
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Yorumunuz"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCommentDialog(false)}>İptal</Button>
          <Button onClick={handleCommentSubmit} variant="contained" color="primary">
            Gönder
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyReservations; 