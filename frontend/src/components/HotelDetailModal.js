import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Rating,
  Divider,
  ImageList,
  ImageListItem,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Pool,
  Wifi,
  LocalParking,
  Restaurant,
  Spa,
  FitnessCenter,
  BeachAccess,
  Room,
  LocationOn,
  Star,
  Euro,
  Close,
} from '@mui/icons-material';

const amenityIcons = {
  'WiFi': <Wifi />,
  'Havuz': <Pool />,
  'Spa': <Spa />,
  'Restoran': <Restaurant />,
  'Fitness Merkezi': <FitnessCenter />,
  'Özel Plaj': <BeachAccess />,
  'Otopark': <LocalParking />,
};

const additionalImages = [
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
];

const HotelDetailModal = ({ open, onClose, hotel }) => {
  if (!hotel) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="span">
            {hotel.name}
          </Typography>
          <Button onClick={onClose} color="inherit">
            <Close />
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Ana Bilgiler */}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <LocationOn color="action" />
              <Typography variant="subtitle1">{hotel.location}</Typography>
              <Rating value={hotel.rating} readOnly size="small" />
              <Typography variant="subtitle1" color="primary" fontWeight="bold">
                ({hotel.rating}/5)
              </Typography>
            </Box>
          </Grid>

          {/* Fotoğraf Galerisi */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Fotoğraf Galerisi</Typography>
            <ImageList cols={3} gap={8}>
              <ImageListItem cols={2} rows={2}>
                <img src={hotel.image} alt={hotel.name} style={{ height: '100%', objectFit: 'cover' }} />
              </ImageListItem>
              {additionalImages.map((img, index) => (
                <ImageListItem key={index}>
                  <img src={img} alt={`${hotel.name} ${index + 1}`} style={{ height: '100%', objectFit: 'cover' }} />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>

          {/* Otel Özellikleri */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Otel Özellikleri</Typography>
            <List>
              {hotel.amenities.map((amenity) => (
                <ListItem key={amenity}>
                  <ListItemIcon>
                    {amenityIcons[amenity] || <Star />}
                  </ListItemIcon>
                  <ListItemText primary={amenity} />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Oda Bilgileri */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Oda Tipleri ve Fiyatlar</Typography>
            <List>
              <ListItem>
                <ListItemIcon><Room /></ListItemIcon>
                <ListItemText 
                  primary="Standart Oda"
                  secondary={`₺${hotel.price} / gece`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><Room /></ListItemIcon>
                <ListItemText 
                  primary="Deluxe Oda"
                  secondary={`₺${Math.round(hotel.price * 1.5)} / gece`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><Room /></ListItemIcon>
                <ListItemText 
                  primary="Suit Oda"
                  secondary={`₺${Math.round(hotel.price * 2)} / gece`}
                />
              </ListItem>
            </List>
          </Grid>

          {/* Otel Politikaları */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Otel Politikaları</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Giriş Saati</Typography>
                  <Typography>14:00'den itibaren</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Çıkış Saati</Typography>
                  <Typography>12:00'ye kadar</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  * Evcil hayvanlar kabul edilmektedir (ek ücret uygulanabilir)
                  * Tesis genelinde sigara içilmez
                  * Kredi kartı ile ödeme yapılabilir
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Kapat
        </Button>
        <Button variant="contained" color="primary">
          Rezervasyon Yap
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HotelDetailModal;
