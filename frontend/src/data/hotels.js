// Örnek otel verileri
const hotels = [
  {
    id: 1,
    name: "Luxury Resort & Spa",
    location: "Antalya, Türkiye",
    description: "Denize sıfır lüks bir tatil deneyimi",
    price: 1200,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    amenities: ["Havuz", "Spa", "Restoran", "Bar", "Fitness Merkezi"],
    rooms: [
      {
        type: "Standart Oda",
        price: 1200,
        capacity: 2,
        availability: 5,
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV"]
      },
      {
        type: "Deluxe Oda",
        price: 1800,
        capacity: 2,
        availability: 3,
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Balkon", "Deniz Manzarası"]
      },
      {
        type: "Suit Oda",
        price: 2500,
        capacity: 4,
        availability: 1,
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a2ff329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Balkon", "Deniz Manzarası", "Jakuzi", "Oturma Alanı"]
      },
    ],
  },
  {
    id: 2,
    name: "Seaside Hotel",
    location: "Bodrum, Türkiye",
    description: "Muhteşem deniz manzaralı konforlu odalar",
    price: 950,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    amenities: ["Havuz", "Restoran", "Bar", "Plaj Erişimi"],
    rooms: [
      {
        type: "Standart Oda",
        price: 950,
        capacity: 2,
        availability: 8,
        image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV"]
      },
      {
        type: "Deluxe Oda",
        price: 1500,
        capacity: 2,
        availability: 4,
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Balkon", "Deniz Manzarası"]
      },
    ],
  },
  {
    id: 3,
    name: "Mountain View Resort",
    location: "Bolu, Türkiye",
    description: "Doğa ile iç içe huzurlu bir tatil",
    price: 800,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1605537964076-3cb0ea2ff329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    amenities: ["Havuz", "Spa", "Restoran", "Doğa Yürüyüşleri"],
    rooms: [
      {
        type: "Standart Oda",
        price: 800,
        capacity: 2,
        availability: 6,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Dağ Manzarası"]
      },
      {
        type: "Aile Odası",
        price: 1200,
        capacity: 4,
        availability: 2,
        image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1457&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Dağ Manzarası", "Oturma Alanı", "2 Yatak Odası"]
      },
    ],
  },
  {
    id: 4,
    name: "City Center Hotel",
    location: "İstanbul, Türkiye",
    description: "Şehrin kalbinde modern konfor",
    price: 1100,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1421&q=80",
    amenities: ["Restoran", "Bar", "Fitness Merkezi", "İş Merkezi"],
    rooms: [
      {
        type: "Standart Oda",
        price: 1100,
        capacity: 2,
        availability: 10,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Şehir Manzarası"]
      },
      {
        type: "Executive Oda",
        price: 1600,
        capacity: 2,
        availability: 5,
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Şehir Manzarası", "Çalışma Masası", "Executive Lounge Erişimi"]
      },
    ],
  },
  {
    id: 5,
    name: "Beachfront Paradise",
    location: "Fethiye, Türkiye",
    description: "Turkuaz sulara nazır muhteşem plaj",
    price: 1500,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1449&q=80",
    amenities: ["Özel Plaj", "Havuz", "Spa", "Su Sporları", "Restoran"],
    rooms: [
      {
        type: "Deniz Manzaralı Oda",
        price: 1500,
        capacity: 2,
        availability: 6,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Deniz Manzarası"]
      },
      {
        type: "Deluxe Suit",
        price: 2200,
        capacity: 3,
        availability: 2,
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Deniz Manzarası", "Balkon", "Oturma Alanı"]
      },
    ],
  },
  {
    id: 6,
    name: "Thermal Spa Resort",
    location: "Afyon, Türkiye",
    description: "Termal sularıyla ünlü sağlık ve dinlenme tesisi",
    price: 1300,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    amenities: ["Termal Havuz", "Spa", "Sağlık Merkezi", "Restoran"],
    rooms: [
      {
        type: "Standart Oda",
        price: 1300,
        capacity: 2,
        availability: 8,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV"]
      },
      {
        type: "Aile Odası",
        price: 1800,
        capacity: 4,
        availability: 4,
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Oturma Alanı", "2 Yatak Odası"]
      },
    ],
  },
  {
    id: 7,
    name: "Cappadocia Cave Hotel",
    location: "Nevşehir, Türkiye",
    description: "Eşsiz Kapadokya manzarasında mağara odalarda konaklama",
    price: 1700,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1585255318859-f5c15f4cffe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    amenities: ["Mağara Odalar", "Balon Turları", "Restoran", "Teras"],
    rooms: [
      {
        type: "Mağara Oda",
        price: 1700,
        capacity: 2,
        availability: 5,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Mağara Manzarası"]
      },
      {
        type: "Deluxe Mağara Suit",
        price: 2500,
        capacity: 2,
        availability: 2,
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Mağara Manzarası", "Balkon", "Oturma Alanı"]
      },
    ],
  },
  {
    id: 8,
    name: "Aegean Boutique Hotel",
    location: "Çeşme, Türkiye",
    description: "Ege'nin maviliğinde butik bir tatil deneyimi",
    price: 1200,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    amenities: ["Havuz", "Restoran", "Bar", "Plaj Erişimi"],
    rooms: [
      {
        type: "Standart Oda",
        price: 1200,
        capacity: 2,
        availability: 8,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV"]
      },
      {
        type: "Deluxe Oda",
        price: 1600,
        capacity: 2,
        availability: 4,
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Balkon", "Deniz Manzarası"]
      },
    ],
  },
  {
    id: 9,
    name: "Black Sea Resort",
    location: "Trabzon, Türkiye",
    description: "Karadeniz'in yeşil doğasında huzurlu bir kaçamak",
    price: 900,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    amenities: ["Havuz", "Restoran", "Doğa Yürüyüşleri"],
    rooms: [
      {
        type: "Standart Oda",
        price: 900,
        capacity: 2,
        availability: 10,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV"]
      },
      {
        type: "Aile Odası",
        price: 1300,
        capacity: 4,
        availability: 5,
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Oturma Alanı", "2 Yatak Odası"]
      },
    ],
  },
  {
    id: 10,
    name: "Pamukkale Thermal Hotel",
    location: "Denizli, Türkiye",
    description: "Pamukkale travertenlerine yakın termal otel",
    price: 1100,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    amenities: ["Termal Havuz", "Spa", "Restoran", "Travertenlere Yakınlık"],
    rooms: [
      {
        type: "Standart Oda",
        price: 1100,
        capacity: 2,
        availability: 8,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV"]
      },
      {
        type: "Deluxe Oda",
        price: 1500,
        capacity: 2,
        availability: 4,
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Balkon", "Traverten Manzarası"]
      },
    ],
  },
  {
    id: 11,
    name: "Marmaris Beach Resort",
    location: "Marmaris, Türkiye",
    description: "Marmaris'in berrak sularında tatil keyfi",
    price: 1300,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    amenities: ["Özel Plaj", "Havuz", "Su Sporları", "Restoran", "Bar"],
    rooms: [
      {
        type: "Standart Oda",
        price: 1300,
        capacity: 2,
        availability: 10,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV"]
      },
      {
        type: "Deniz Manzaralı Oda",
        price: 1700,
        capacity: 2,
        availability: 5,
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Balkon", "Deniz Manzarası"]
      },
    ],
  },
  {
    id: 12,
    name: "Uludağ Mountain Resort",
    location: "Bursa, Türkiye",
    description: "Kış sporları ve doğa tutkunları için ideal",
    price: 1400,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    amenities: ["Kayak İmkanı", "Spa", "Restoran", "Bar"],
    rooms: [
      {
        type: "Standart Oda",
        price: 1400,
        capacity: 2,
        availability: 8,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV"]
      },
      {
        type: "Dağ Manzaralı Oda",
        price: 1800,
        capacity: 2,
        availability: 4,
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Balkon", "Dağ Manzarası"]
      },
    ],
  },
  {
    id: 11,
    name: "Sapanca Göl Evi",
    location: "Sakarya, Türkiye",
    description: "Sapanca Gölü manzaralı lüks konaklama",
    price: 1400,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    amenities: ["Göl Manzarası", "Özel Plaj", "Restoran", "Barbekü Alanı", "Sauna"],
    rooms: [
      {
        type: "Göl Manzaralı Oda",
        price: 1400,
        capacity: 2,
        availability: 5,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Balkon", "Göl Manzarası"]
      },
      {
        type: "Villa Suit",
        price: 2800,
        capacity: 6,
        availability: 2,
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Özel Havuz", "Göl Manzarası", "Tam Donanımlı Mutfak", "3 Yatak Odası"]
      }
    ]
  },
  {
    id: 12,
    name: "Uludağ Dağ Evi",
    location: "Bursa, Türkiye",
    description: "Uludağ'da kayak merkezine yakın lüks dağ evi",
    price: 1600,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    amenities: ["Kayak Merkezi Erişimi", "Şömine", "Sauna", "Restoran", "Bar"],
    rooms: [
      {
        type: "Dağ Manzaralı Oda",
        price: 1600,
        capacity: 2,
        availability: 8,
        image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Şömine", "Dağ Manzarası"]
      },
      {
        type: "Aile Dağ Evi",
        price: 2400,
        capacity: 5,
        availability: 3,
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Şömine", "Dağ Manzarası", "Tam Donanımlı Mutfak", "2 Yatak Odası"]
      }
    ]
  },
  {
    id: 13,
    name: "Alaçatı Butik Otel",
    location: "İzmir, Türkiye",
    description: "Alaçatı'nın kalbinde tarihi taş ev",
    price: 1300,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1605537964076-3cb0ea2ff329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    amenities: ["Bahçe", "Havuz", "Kahvaltı", "Bisiklet Kiralama", "Ücretsiz Otopark"],
    rooms: [
      {
        type: "Standart Oda",
        price: 1300,
        capacity: 2,
        availability: 6,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Bahçe Manzarası"]
      },
      {
        type: "Taş Oda",
        price: 1800,
        capacity: 2,
        availability: 4,
        image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1457&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Özel Teras", "Bahçe Manzarası"]
      }
    ]
  },
  {
    id: 14,
    name: "Mardin Konağı",
    location: "Mardin, Türkiye",
    description: "Mardin'in tarihi dokusunda otantik konaklama",
    price: 1100,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1421&q=80",
    amenities: ["Teras", "Kahvaltı", "Tarihi Mimari", "Şehir Turu"],
    rooms: [
      {
        type: "Standart Oda",
        price: 1100,
        capacity: 2,
        availability: 7,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Şehir Manzarası"]
      },
      {
        type: "Tarihi Suit",
        price: 1700,
        capacity: 3,
        availability: 2,
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        features: ["Klima", "Minibar", "Ücretsiz Wi-Fi", "TV", "Özel Teras", "Şehir Manzarası", "Oturma Alanı"]
      }
    ]
  }
];

// Şehir listesi
const cities = [
  "Adana", "Adıyaman", "Afyon", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
  "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
  "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane",
  "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli",
  "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş",
  "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
  "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
  "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
];

// Popüler tatil bölgeleri
const popularDestinations = [
  "Antalya", "Bodrum", "Fethiye", "Marmaris", "Çeşme", "Alanya", "Kuşadası", "Kaş", "Side", "Kemer",
  "Kapadokya", "Pamukkale", "İstanbul", "İzmir", "Bursa", "Trabzon", "Uludağ", "Sapanca", "Abant", "Ölüdeniz"
];

export { hotels, cities, popularDestinations };
