import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelDetailModal from './HotelDetailModal';

const HotelCard = ({ hotel, onInteraction }) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOpenDetail = () => {
    setIsDetailModalOpen(true);
    // Detay görüntüleme etkileşimini izle
    onInteraction && onInteraction('view_details');
  };

  const handleCloseDetail = () => {
    setIsDetailModalOpen(false);
  };

  const handleBookingClick = () => {
    // Rezervasyon etkileşimini izle
    onInteraction && onInteraction('book_hotel');
  };

  const handleRatingChange = (value) => {
    // Derecelendirme etkileşimini izle
    onInteraction && onInteraction('rate_hotel');
  };

  return (
    <>
      <Card sx={{ display: 'flex', mb: 2, height: 200 }}>
        <CardMedia
          component="img"
          sx={{ width: 300 }}
          image={hotel.image}
          alt={hotel.name}
          onClick={() => onInteraction && onInteraction('view_image')}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent sx={{ flex: '1 0 auto', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography component="h5" variant="h6">
                  {hotel.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <LocationOnIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {hotel.location}
                  </Typography>
                </Box>
                <Rating 
                  value={hotel.rating} 
                  readOnly 
                  size="small" 
                  sx={{ mt: 1 }}
                  onChange={(event, value) => handleRatingChange(value)}
                />
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                  ₺{hotel.price}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  gecelik fiyat
                </Typography>
              </Box>
            </Box>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              {hotel.amenities.map((amenity, index) => (
                <Chip 
                  key={index} 
                  label={amenity} 
                  size="small"
                  onClick={() => onInteraction && onInteraction('view_amenity')}
                />
              ))}
            </Stack>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 2 }}>
            <Button variant="contained" sx={{ mr: 2 }} onClick={handleOpenDetail}>
              Detayları Gör
            </Button>
            <Button variant="outlined" onClick={handleBookingClick}>
              Hemen Rezervasyon Yap
            </Button>
          </Box>
        </Box>
      </Card>

      <HotelDetailModal
        open={isDetailModalOpen}
        onClose={handleCloseDetail}
        hotel={hotel}
      />
    </>
  );
};

export default HotelCard;
