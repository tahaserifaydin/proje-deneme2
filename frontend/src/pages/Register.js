import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  IconButton,
  Snackbar
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Google as GoogleIcon, 
  Facebook as FacebookIcon
} from '@mui/icons-material';
import '../styles/AuthStyles.css';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validasyonu
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      setSnackbarOpen(true);
      return;
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      setSnackbarOpen(true);
      return;
    }

    try {
      // Burada gerçek bir API çağrısı yapılacak
      // Şimdilik mock data kullanıyoruz
      if (formData.email === 'test@test.com') {
        setError('Bu e-posta adresi zaten kullanımda');
        setSnackbarOpen(true);
        return;
      }

      // Başarılı kayıt
      login({ 
        email: formData.email, 
        name: `${formData.firstName} ${formData.lastName}` 
      });
      navigate('/');
    } catch (err) {
      setError('Kayıt olurken bir hata oluştu');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="auth-container">
      <Paper elevation={0} className="auth-card">
        <Box className="auth-header">
          <Typography component="h1" variant="h4" className="auth-title">
            Üye Ol
          </Typography>
          <Typography component="h2" variant="h5" className="auth-subtitle">
            Tatilim'e Hoş Geldiniz
          </Typography>
        </Box>

        <Box className="auth-form">
          {error && (
            <Alert severity="error" className="auth-error">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              className="auth-input"
              required
              fullWidth
              id="firstName"
              label="Ad"
              name="firstName"
              autoComplete="given-name"
              autoFocus
              value={formData.firstName}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              className="auth-input"
              required
              fullWidth
              id="lastName"
              label="Soyad"
              name="lastName"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              className="auth-input"
              required
              fullWidth
              id="email"
              label="E-posta Adresi"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              className="auth-input"
              required
              fullWidth
              name="password"
              label="Şifre"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              className="auth-input"
              required
              fullWidth
              name="confirmPassword"
              label="Şifre Tekrar"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="auth-button"
            >
              Üye Ol
            </Button>
            
            <div className="auth-divider">veya</div>
            
            <Box className="social-buttons">
              <Button
                variant="contained"
                className="social-button google-button"
                startIcon={<GoogleIcon />}
              >
                Google
              </Button>
              <Button
                variant="contained"
                className="social-button facebook-button"
                startIcon={<FacebookIcon />}
              >
                Facebook
              </Button>
            </Box>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link component={RouterLink} to="/login" variant="body2" className="auth-link">
                Zaten hesabınız var mı? Giriş yapın
              </Link>
            </Box>
          </form>
        </Box>
      </Paper>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
