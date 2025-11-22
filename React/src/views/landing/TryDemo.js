import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  IconBook,
  IconUsers,
  IconShieldCheck,
  IconCheck,
  IconArrowRight,
} from '@tabler/icons';

const { REACT_APP_API } = process.env;

const TryDemo = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loadingRole, setLoadingRole] = useState(null);
  const [error, setError] = useState('');

  const demoAccounts = [
    {
      role: 'admin',
      title: 'Admin Account',
      icon: <IconShieldCheck size={40} />,
      email: 'admin@lms.com',
      password: 'Admin@123',
      color: 'error',
      perks: ['Manage users', 'Oversee courses', 'System administration'],
      description: 'Full control over the system',
    },
    {
      role: 'faculty',
      title: 'Faculty Account',
      icon: <IconBook size={40} />,
      email: 'faculty1@lms.com',
      password: 'Faculty@123',
      color: 'primary',
      perks: ['Create courses', 'Manage assignments', 'Grade students'],
      description: 'Create and manage educational content',
    },
    {
      role: 'student',
      title: 'Student Account',
      icon: <IconUsers size={40} />,
      email: 'student1@lms.com',
      password: 'Student@123',
      color: 'success',
      perks: ['View courses', 'Submit assignments', 'Check grades'],
      description: 'Access learning materials',
    },
  ];

  const handleDemoLogin = async (account) => {
    setLoadingRole(account.role);
    setError('');

    try {
      const response = await fetch(`${REACT_APP_API}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: account.email,
          password: account.password,
        }),
      });

      const data = await response.json();

      if (data.success && data.user) {
        localStorage.setItem('userDetails', JSON.stringify(data.user));

        // Redirect based on role
        if (data.user.userTypeCode === 'ADMIN') {
          navigate('/courses');
        } else if (data.user.userTypeCode === 'FACULTY') {
          navigate('/dashboard');
        } else if (data.user.userTypeCode === 'STUDENT') {
          navigate('/announcements');
        }
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please check the backend is running.');
      console.error('Login error:', err);
    } finally {
      setLoadingRole(null);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa', py: 8 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Button
            variant="text"
            onClick={() => navigate('/')}
            sx={{ mb: 3, justifySelf: 'flex-start' }}
          >
            ← Back to Home
          </Button>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Try the LMS Demo
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Experience the system as different user roles. Click any demo account below to login instantly.
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Demo Accounts Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {demoAccounts.map((account) => (
            <Grid item xs={12} md={4} key={account.role}>
              <Card
                sx={{
                  height: '100%',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  border: `3px solid ${theme.palette[account.color].main}`,
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                  },
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Card Header */}
                <Box
                  sx={{
                    bgcolor: theme.palette[account.color].main,
                    color: 'white',
                    p: 3,
                    textAlign: 'center',
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {account.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {account.title}
                  </Typography>
                  <Typography variant="body2">
                    {account.description}
                  </Typography>
                </Box>

                {/* Card Content */}
                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Credentials */}
                  <Box sx={{ mb: 3, p: 2, bgcolor: '#f0f0f0', borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ display: 'block', fontWeight: 'bold', mb: 1 }}>
                      Demo Credentials:
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
                      <strong>Email:</strong> {account.email}
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      <strong>Password:</strong> {account.password}
                    </Typography>
                  </Box>

                  {/* Perks */}
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                    What you can do:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                    {account.perks.map((perk, idx) => (
                      <Typography
                        component="li"
                        key={idx}
                        variant="body2"
                        sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
                      >
                        <IconCheck size={16} style={{ marginRight: 8, color: theme.palette[account.color].main }} />
                        {perk}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>

                {/* Card Actions */}
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    color={account.color}
                    size="large"
                    endIcon={<IconArrowRight />}
                    onClick={() => handleDemoLogin(account)}
                    disabled={loadingRole === account.role}
                    sx={{
                      fontWeight: 'bold',
                      py: 1.2,
                    }}
                  >
                    {loadingRole === account.role ? (
                      <>
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        Logging in...
                      </>
                    ) : (
                      'Try This Role'
                    )}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Info Section */}
        <Card sx={{ bgcolor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              📋 How it works:
            </Typography>
            <Box component="ol" sx={{ pl: 2 }}>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                Click "Try This Role" on any account card above
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                You'll be automatically logged in with that role's account
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                Explore the features available to that role
              </Typography>
              <Typography component="li" variant="body2">
                Use the logout option in the top-right corner to switch roles
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default TryDemo;
