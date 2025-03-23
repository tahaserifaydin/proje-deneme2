import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, TextField, MenuItem, FormControl, InputLabel, Select, Grid } from '@mui/material';
import SearchBar from '../components/SearchBar';
import HotelCard from '../components/HotelCard';

const Home = () => {
  const [hotels] = useState([
    {
      id: 1,
      name: 'Luxury Resort & Spa',
      type: 'hotel',
      location: 'Fethiye, Muğla',
      price: 2500,
      rating: 4.8,
      reviewCount: 128,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      amenities: ['Havuz', 'Spa', 'Restoran', 'Bar', 'Fitness Merkezi', 'Wi-Fi'],
      roomTypes: ['Standard', 'Deluxe', 'Suite', 'Bungalow']
    },
    {
      id: 2,
      name: 'Mountain Villa Retreat',
      type: 'villa',
      location: 'Kalkan, Antalya',
      price: 3500,
      rating: 4.9,
      reviewCount: 85,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      amenities: ['Özel Havuz', 'Deniz Manzarası', 'Tam Mutfak', 'Bahçe', 'Wi-Fi'],
      roomTypes: ['Villa', 'Deluxe Villa', 'Luxury Villa']
    },
    {
      id: 3,
      name: 'Beachfront Bungalow Resort',
      type: 'bungalow',
      location: 'Kalkan, Antalya',
      price: 1800,
      rating: 4.7,
      reviewCount: 156,
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      amenities: ['Özel Plaj', 'Restoran', 'Bar', 'Spor Alanı', 'Wi-Fi'],
      roomTypes: ['Standart Bungalow', 'Deniz Manzaralı Bungalow', 'Aile Bungalow']
    },
    {
      id: 4,
      name: 'Historic Boutique Hotel',
      type: 'hotel',
      location: 'Kalkan, Antalya',
      price: 1200,
      rating: 4.6,
      reviewCount: 92,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      amenities: ['Restoran', 'Bar', 'Tarihi Bahçe', 'Wi-Fi'],
      roomTypes: ['Standard', 'Deluxe', 'Suite']
    },
    {
      id: 5,
      name: 'Luxury Treehouse Resort',
      type: 'treehouse',
      location: 'Fethiye, Muğla',
      price: 2800,
      rating: 4.9,
      reviewCount: 64,
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      amenities: ['Özel Teras', 'Doğa Manzarası', 'Restoran', 'Spa', 'Wi-Fi'],
      roomTypes: ['Standart Treehouse', 'Deluxe Treehouse', 'Aile Treehouse']
    },
    {
      id: 6,
      name: 'Seaside Villa Complex',
      type: 'villa',
      location: 'Kalkan, Antalya',
      price: 4200,
      rating: 4.8,
      reviewCount: 78,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      amenities: ['Özel Havuz', 'Deniz Manzarası', 'Tam Mutfak', 'Bahçe', 'Wi-Fi', 'Spa'],
      roomTypes: ['Villa', 'Deluxe Villa', 'Luxury Villa', 'Presidential Villa']
    },
    {
      id: 7,
      name: 'Eco-Friendly Bungalow Resort',
      type: 'bungalow',
      location: 'Fethiye, Muğla',
      price: 1500,
      rating: 4.7,
      reviewCount: 112,
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      amenities: ['Organik Bahçe', 'Restoran', 'Yoga Alanı', 'Wi-Fi', 'Bisiklet'],
      roomTypes: ['Standart Bungalow', 'Deniz Manzaralı Bungalow', 'Aile Bungalow', 'Eco Bungalow']
    },
    {
      id: 8,
      name: 'Modern Boutique Hotel',
      type: 'hotel',
      location: 'Kalkan, Antalya',
      price: 2000,
      rating: 4.6,
      reviewCount: 95,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      amenities: ['Restoran', 'Bar', 'Fitness Merkezi', 'Wi-Fi', 'Spa'],
      roomTypes: ['Standard', 'Deluxe', 'Suite', 'Executive Suite']
    },
    {
      id: 9,
      name: 'Deniz Manzaralı Ev',
      type: 'house',
      location: 'Fethiye, Muğla',
      price: 800,
      rating: 4.5,
      reviewCount: 45,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      amenities: ['Deniz Manzarası', 'Tam Mutfak', 'Bahçe', 'Wi-Fi', 'Otopark'],
      roomTypes: ['2+1', '3+1', '4+1']
    },
    {
      id: 10,
      name: 'Dağ Evi',
      type: 'house',
      location: 'Fethiye, Muğla',
      price: 600,
      rating: 4.4,
      reviewCount: 38,
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      amenities: ['Doğa Manzarası', 'Tam Mutfak', 'Bahçe', 'Wi-Fi', 'Şömine'],
      roomTypes: ['1+1', '2+1', '3+1']
    }
  ]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filters, setFilters] = useState({
    accommodationType: 'all',
    roomType: 'all',
    minPrice: '',
    maxPrice: '',
    rating: 'all'
  });

  useEffect(() => {
    let filtered = [...hotels];

    // Konaklama türüne göre filtreleme
    if (filters.accommodationType !== 'all') {
      filtered = filtered.filter(hotel => hotel.type === filters.accommodationType);
    }

    // Oda tipine göre filtreleme
    if (filters.roomType !== 'all') {
      filtered = filtered.filter(hotel => hotel.roomTypes.includes(filters.roomType));
    }

    // Fiyat aralığına göre filtreleme
    if (filters.minPrice) {
      filtered = filtered.filter(hotel => hotel.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(hotel => hotel.price <= Number(filters.maxPrice));
    }

    // Puanlamaya göre filtreleme
    if (filters.rating !== 'all') {
      filtered = filtered.filter(hotel => hotel.rating >= Number(filters.rating));
    }

    setFilteredHotels(filtered);
  }, [filters, hotels]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
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

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Konaklama Seçenekleri
        </Typography>

        {/* Filtreler */}
        <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Konaklama Türü</InputLabel>
            <Select
              name="accommodationType"
              value={filters.accommodationType}
              onChange={handleFilterChange}
              label="Konaklama Türü"
            >
              <MenuItem value="all">Tümü</MenuItem>
              <MenuItem value="hotel">Otel</MenuItem>
              <MenuItem value="villa">Villa</MenuItem>
              <MenuItem value="bungalow">Bungalow</MenuItem>
              <MenuItem value="treehouse">Treehouse</MenuItem>
              <MenuItem value="house">Ev</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Oda Tipi</InputLabel>
            <Select
              name="roomType"
              value={filters.roomType}
              onChange={handleFilterChange}
              label="Oda Tipi"
            >
              <MenuItem value="all">Tümü</MenuItem>
              <MenuItem value="Standard">Standart Oda</MenuItem>
              <MenuItem value="Deluxe">Deluxe Oda</MenuItem>
              <MenuItem value="Suite">Suite Oda</MenuItem>
              <MenuItem value="Villa">Villa</MenuItem>
              <MenuItem value="Bungalow">Bungalow</MenuItem>
              <MenuItem value="Treehouse">Treehouse</MenuItem>
            </Select>
          </FormControl>

          <TextField
            name="minPrice"
            label="Min. Fiyat"
            type="number"
            value={filters.minPrice}
            onChange={handleFilterChange}
            sx={{ minWidth: 150 }}
          />

          <TextField
            name="maxPrice"
            label="Max. Fiyat"
            type="number"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            sx={{ minWidth: 150 }}
          />

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Min. Puan</InputLabel>
            <Select
              name="rating"
              value={filters.rating}
              onChange={handleFilterChange}
              label="Min. Puan"
            >
              <MenuItem value="all">Tümü</MenuItem>
              <MenuItem value="4">4+ Yıldız</MenuItem>
              <MenuItem value="4.5">4.5+ Yıldız</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          {filteredHotels.map((hotel) => (
            <Grid item key={hotel.id} xs={12} sm={6} md={4}>
              <HotelCard hotel={hotel} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
