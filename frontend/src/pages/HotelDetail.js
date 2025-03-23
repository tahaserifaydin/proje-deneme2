import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Rating,
  Divider,
  ImageList,
  ImageListItem,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  CardMedia,
  Badge,
  Stack,
  Tooltip,
  Modal,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton as MuiIconButton
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  LocationOn,
  Pool,
  Wifi,
  Restaurant,
  LocalParking,
  Spa,
  Comment,
  CalendarMonth,
  Person,
  ArrowForward,
  CheckCircle,
  AcUnit,
  Kitchen,
  Tv,
  Balcony,
  Bathtub,
  Chair,
  Bed,
  Close,
  PhotoLibrary
} from '@mui/icons-material';
import {
  DatePicker
} from '@mui/x-date-pickers/DatePicker';
import {
  LocalizationProvider
} from '@mui/x-date-pickers/LocalizationProvider';
import {
  AdapterDayjs
} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import { hotels } from '../data/hotels';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import roomImages from '../data/roomImages';

dayjs.locale('tr');

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [selectedDates, setSelectedDates] = useState({
    checkIn: location.state?.checkIn ? dayjs(location.state.checkIn) : dayjs(),
    checkOut: location.state?.checkOut ? dayjs(location.state.checkOut) : dayjs().add(1, 'day'),
  });
  const [guestCount, setGuestCount] = useState(location.state?.guests || 2);
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedRoomImages, setSelectedRoomImages] = useState([]);
  const [galleryTitle, setGalleryTitle] = useState('');

  useEffect(() => {
    // Otel verilerini hotels.js dosyasından al
    const hotelData = hotels.find(h => h.id === parseInt(id));
    
    if (hotelData) {
      setHotel(hotelData);
      
      // Favorilerde olup olmadığını kontrol et
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const isInFavorites = favorites.some(fav => fav.id === hotelData.id);
      setIsFavorite(isInFavorites);
    }
    
    // Yükleme efekti için kısa bir gecikme
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [id]);

  const handleFavoriteToggle = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    
    // localStorage'da favorileri güncelle
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (newFavoriteStatus) {
      const updatedFavorites = [...favorites, hotel];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setSnackbar({
        open: true,
        message: 'Otel favorilere eklendi',
        severity: 'success'
      });
    } else {
      const updatedFavorites = favorites.filter(fav => fav.id !== hotel.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setSnackbar({
        open: true,
        message: 'Otel favorilerden çıkarıldı',
        severity: 'info'
      });
    }
  };

  const handleBooking = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) {
      setSnackbar({
        open: true,
        message: 'Lütfen giriş ve çıkış tarihlerini seçin',
        severity: 'error'
      });
      return;
    }
    
    navigate(`/booking/${id}`, {
      state: {
        checkIn: selectedDates.checkIn.format('YYYY-MM-DD'),
        checkOut: selectedDates.checkOut.format('YYYY-MM-DD'),
        guests: guestCount,
      },
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({...snackbar, open: false});
  };

  const calculateNights = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return 0;
    return selectedDates.checkOut.diff(selectedDates.checkIn, 'day');
  };

  const calculateTotalPrice = () => {
    const nights = calculateNights();
    return hotel ? hotel.price * nights * guestCount : 0;
  };

  const getFeatureIcon = (feature) => {
    switch (feature.toLowerCase()) {
      case 'klima':
        return <AcUnit fontSize="small" />;
      case 'minibar':
        return <Kitchen fontSize="small" />;
      case 'ücretsiz wi-fi':
        return <Wifi fontSize="small" />;
      case 'tv':
        return <Tv fontSize="small" />;
      case 'balkon':
        return <Balcony fontSize="small" />;
      case 'jakuzi':
        return <Bathtub fontSize="small" />;
      case 'oturma alanı':
        return <Chair fontSize="small" />;
      case '2 yatak odası':
        return <Bed fontSize="small" />;
      default:
        return null;
    }
  };

  const getAvailabilityColor = (availability) => {
    if (availability <= 2) return 'error';
    if (availability <= 5) return 'warning';
    return 'success';
  };

  const getAvailabilityText = (availability) => {
    if (availability <= 2) return 'Son birkaç oda kaldı!';
    if (availability <= 5) return 'Sınırlı sayıda oda mevcut';
    return 'Müsait';
  };

  const handleOpenGallery = (room) => {
    // Oda resimlerini roomImages.js dosyasından al
    const roomKey = `${id}-${room.type}`;
    
    // roomImages içinde bu oda için resimler var mı kontrol et
    if (roomImages[roomKey]) {
      setSelectedRoomImages(roomImages[roomKey]);
      console.log(`Oda resimleri bulundu: ${roomKey}`, roomImages[roomKey]);
    } else {
      // Eğer roomImages içinde yoksa, odanın kendi resmini kullan
      console.log(`Oda resimleri bulunamadı: ${roomKey}, varsayılan resim kullanılıyor`);
      setSelectedRoomImages([
        {
          original: room.image,
          thumbnail: room.image,
          description: room.type
        }
      ]);
    }
    
    setGalleryTitle(room.type);
    setOpenGallery(true);
  };

  const handleCloseGallery = () => {
    setOpenGallery(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!hotel) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          Otel bulunamadı
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Sol Sütun */}
        <Grid item xs={12} md={8}>
          {/* Otel Görselleri */}
          <Box sx={{ position: 'relative' }}>
            <img 
              src={hotel.image} 
              alt={hotel.name} 
              style={{ 
                width: '100%', 
                height: '400px', 
                objectFit: 'cover', 
                borderRadius: '8px' 
              }} 
            />
            <IconButton 
              onClick={handleFavoriteToggle} 
              sx={{ 
                position: 'absolute', 
                top: 16, 
                right: 16, 
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              {isFavorite ? 
                <Favorite sx={{ color: '#FF385C' }} /> : 
                <FavoriteBorder sx={{ color: '#FF385C' }} />
              }
            </IconButton>
          </Box>

          {/* Otel Bilgileri */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              {hotel.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn color="primary" fontSize="small" />
              <Typography variant="subtitle1" sx={{ ml: 0.5 }}>
                {hotel.location}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              <Rating value={hotel.rating} precision={0.5} readOnly size="small" />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                ({hotel.rating})
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Otel Hakkında
            </Typography>
            <Typography variant="body1" paragraph>
              {hotel.description}
            </Typography>

            {/* Özellikler */}
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Otel Özellikleri
            </Typography>
            <Grid container spacing={1}>
              {hotel.amenities.map((amenity, index) => (
                <Grid item key={index}>
                  <Chip
                    icon={
                      amenity.toLowerCase().includes('havuz') ? <Pool fontSize="small" /> :
                      amenity.toLowerCase().includes('wifi') ? <Wifi fontSize="small" /> :
                      amenity.toLowerCase().includes('restoran') ? <Restaurant fontSize="small" /> :
                      amenity.toLowerCase().includes('otopark') ? <LocalParking fontSize="small" /> :
                      <Spa fontSize="small" />
                    }
                    label={amenity}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              ))}
            </Grid>

            {/* Oda Tipleri */}
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Oda Tipleri
            </Typography>
            <Grid container spacing={3}>
              {hotel.rooms.map((room, index) => (
                <Grid item xs={12} key={index}>
                  <Card variant="outlined" sx={{ 
                    overflow: 'hidden',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3
                    }
                  }}>
                    <Grid container>
                      <Grid item xs={12} md={4} sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="100%"
                          image={room.image}
                          alt={room.type}
                          sx={{ 
                            height: { xs: 200, md: '100%' },
                            objectFit: 'cover',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleOpenGallery(room)}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<PhotoLibrary />}
                          size="small"
                          onClick={() => handleOpenGallery(room)}
                          sx={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            }
                          }}
                        >
                          Tüm Fotoğraflar
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                              <Typography variant="h6" fontWeight="bold">
                                {room.type}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Kapasite: {room.capacity} kişi
                              </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography variant="h6" color="primary" fontWeight="bold">
                                ₺{room.price}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                gecelik
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Typography variant="subtitle2" gutterBottom>
                            Oda Özellikleri
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                            {room.features.map((feature, idx) => (
                              <Tooltip key={idx} title={feature}>
                                <Chip
                                  icon={getFeatureIcon(feature)}
                                  label={feature}
                                  size="small"
                                  variant="outlined"
                                  sx={{ mb: 1 }}
                                />
                              </Tooltip>
                            ))}
                          </Stack>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                            <Badge 
                              color={getAvailabilityColor(room.availability)} 
                              badgeContent={room.availability} 
                              max={10}
                              sx={{ '& .MuiBadge-badge': { fontSize: '0.75rem', height: '22px', minWidth: '22px' } }}
                            >
                              <Typography variant="body2" sx={{ mr: 1 }}>
                                Müsait Oda:
                              </Typography>
                            </Badge>
                            <Chip 
                              label={getAvailabilityText(room.availability)} 
                              color={getAvailabilityColor(room.availability)} 
                              size="small"
                              variant="outlined"
                            />
                            <Button 
                              variant="contained" 
                              size="small"
                              onClick={() => handleBooking()}
                              sx={{ 
                                ml: 'auto',
                                backgroundColor: '#FF385C',
                                '&:hover': {
                                  backgroundColor: '#E61E4D',
                                }
                              }}
                            >
                              Rezervasyon Yap
                            </Button>
                          </Box>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* Sağ Sütun - Rezervasyon Kartı */}
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            position: 'sticky', 
            top: 24, 
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Rezervasyon
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  ₺{hotel.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  gecelik / kişi başı
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarMonth fontSize="small" color="primary" />
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                      Tarih Seçimi
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <DatePicker
                        label="Giriş Tarihi"
                        value={selectedDates.checkIn}
                        onChange={(newValue) => setSelectedDates({...selectedDates, checkIn: newValue})}
                        minDate={dayjs()}
                        format="DD MMMM"
                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DatePicker
                        label="Çıkış Tarihi"
                        value={selectedDates.checkOut}
                        onChange={(newValue) => setSelectedDates({...selectedDates, checkOut: newValue})}
                        minDate={selectedDates.checkIn?.add(1, 'day') || dayjs().add(1, 'day')}
                        format="DD MMMM"
                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </LocalizationProvider>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Person fontSize="small" color="primary" />
                  <Typography variant="subtitle2" sx={{ ml: 1 }}>
                    Misafir Sayısı
                  </Typography>
                </Box>
                <TextField
                  type="number"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                  InputProps={{ inputProps: { min: 1, max: 10 } }}
                  size="small"
                  fullWidth
                />
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    ₺{hotel.price} x {calculateNights()} gece x {guestCount} kişi
                  </Typography>
                  <Typography variant="body2">
                    ₺{calculateTotalPrice()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    Hizmet bedeli
                  </Typography>
                  <Typography variant="body2">
                    ₺{Math.round(calculateTotalPrice() * 0.05)}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Toplam
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  ₺{calculateTotalPrice() + Math.round(calculateTotalPrice() * 0.05)}
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleBooking}
                endIcon={<ArrowForward />}
                sx={{ 
                  py: 1.5, 
                  borderRadius: 2,
                  backgroundColor: '#FF385C',
                  '&:hover': {
                    backgroundColor: '#E61E4D',
                  }
                }}
              >
                Rezervasyon Yap
              </Button>
              
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                <CheckCircle fontSize="small" color="success" sx={{ mr: 1 }} />
                <Typography variant="caption" color="text.secondary">
                  Şimdi rezervasyon yapın, sonra ödeyin
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Resim Galerisi Modal */}
      <Dialog
        open={openGallery}
        onClose={handleCloseGallery}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{galleryTitle} - Fotoğraf Galerisi</Typography>
          <MuiIconButton edge="end" color="inherit" onClick={handleCloseGallery} aria-label="close">
            <Close />
          </MuiIconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedRoomImages.length > 0 ? (
            <ImageGallery 
              items={selectedRoomImages} 
              showPlayButton={false}
              showFullscreenButton={true}
              showThumbnails={true}
              showBullets={false}
              showNav={true}
              slideInterval={3000}
              slideDuration={450}
              lazyLoad={true}
            />
          ) : (
            <Typography variant="body1" align="center">Resim bulunamadı</Typography>
          )}
        </DialogContent>
      </Dialog>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default HotelDetail;
