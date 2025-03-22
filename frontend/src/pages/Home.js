import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import SearchBar from '../components/SearchBar';
import HotelCard from '../components/HotelCard';
import { syncHotelsWithCursorAI, getRecommendations, trackInteraction } from '../services/cursorAI';

const Home = () => {
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: 'Grand Luxury Hotel',
      location: 'İstanbul, Türkiye',
      rating: 4.5,
      price: 1250,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      amenities: ['WiFi', 'Havuz', 'Spa', 'Restoran']
    },
    {
      id: 2,
      name: 'Seaside Resort & Spa',
      location: 'Antalya, Türkiye',
      rating: 5,
      price: 2100,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80',
      amenities: ['Özel Plaj', 'Spa', 'Fitness Merkezi', 'Bar']
    },
    {
      id: 3,
      name: 'Boutique City Hotel',
      location: 'İzmir, Türkiye',
      rating: 4,
      price: 850,
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      amenities: ['Kahvaltı', 'WiFi', 'Otopark']
    }
  ]);

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Otel verilerini Cursor.ai ile senkronize et
    const syncHotels = async () => {
      try {
        await syncHotelsWithCursorAI(hotels);
        // Başlangıç önerilerini al
        const initialRecommendations = await getRecommendations({});
        setRecommendations(initialRecommendations);
      } catch (error) {
        console.error('Error initializing Cursor.ai:', error);
      }
    };

    syncHotels();
  }, [hotels]);

  const handleHotelInteraction = async (hotelId, interactionType) => {
    try {
      // Kullanıcı etkileşimini izle
      await trackInteraction('user123', hotelId, interactionType);
      
      // Yeni önerileri al
      const newRecommendations = await getRecommendations({
        // Kullanıcı tercihlerine göre parametreler eklenebilir
      });
      setRecommendations(newRecommendations);
    } catch (error) {
      console.error('Error handling hotel interaction:', error);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Box
        sx={{
          background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
          En İyi Fiyatlarla Otel Rezervasyonu
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Binlerce oteli karşılaştırın ve size en uygun olanı seçin
        </Typography>
        <SearchBar />
      </Box>

      <Container sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Size Özel Öneriler
        </Typography>
        {recommendations.length > 0 ? (
          recommendations.map((hotel) => (
            <HotelCard 
              key={hotel.id} 
              hotel={hotel}
              onInteraction={(interactionType) => handleHotelInteraction(hotel.id, interactionType)}
            />
          ))
        ) : (
          hotels.map((hotel) => (
            <HotelCard 
              key={hotel.id} 
              hotel={hotel}
              onInteraction={(interactionType) => handleHotelInteraction(hotel.id, interactionType)}
            />
          ))
        )}
      </Container>
    </Box>
  );
};

export default Home;
