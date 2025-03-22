import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              TATİLİM
            </Typography>
            <Typography variant="body2">
              Hayalinizdeki tatili bulmanın en kolay yolu.
              En iyi oteller, en uygun fiyatlar ve unutulmaz deneyimler için TATİLİM yanınızda.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Hızlı Bağlantılar
            </Typography>
            <Box>
              <Link
                component={RouterLink}
                to="/hotels"
                color="inherit"
                sx={{ display: 'block', mb: 1 }}
              >
                Oteller
              </Link>
              <Link
                component={RouterLink}
                to="/campaigns"
                color="inherit"
                sx={{ display: 'block', mb: 1 }}
              >
                Kampanyalar
              </Link>
              <Link
                component={RouterLink}
                to="/about"
                color="inherit"
                sx={{ display: 'block', mb: 1 }}
              >
                Hakkımızda
              </Link>
              <Link
                component={RouterLink}
                to="/contact"
                color="inherit"
                sx={{ display: 'block', mb: 1 }}
              >
                İletişim
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Bizi Takip Edin
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              İletişim: info@tatilim.com
              <br />
              Tel: +90 (212) 555 0123
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, borderTop: 1, borderColor: 'rgba(255, 255, 255, 0.2)', pt: 2 }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} TATİLİM. Tüm hakları saklıdır.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
