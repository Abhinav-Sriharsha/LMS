import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  IconBook,
  IconClipboardList,
  IconUsers,
  IconTrendingUp,
  IconArrowRight,
  IconShieldCheck,
} from '@tabler/icons';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      icon: <IconBook size={40} />,
      title: 'Course Management',
      description: 'Faculty can easily create, manage, and organize courses with detailed descriptions and materials.',
    },
    {
      icon: <IconClipboardList size={40} />,
      title: 'Assignments & Quizzes',
      description: 'Streamline assessment with flexible assignment and quiz creation, submission tracking, and grading.',
    },
    {
      icon: <IconUsers size={40} />,
      title: 'Student Engagement',
      description: 'Keep students informed with announcements, track progress through grades, and view profiles.',
    },
    {
      icon: <IconTrendingUp size={40} />,
      title: 'Performance Tracking',
      description: 'Monitor student performance with comprehensive grade tracking and analytics.',
    },
  ];

  const roles = [
    {
      title: 'Admin',
      description: 'Manage the entire system',
      perks: [
        'Create and manage user accounts',
        'Oversee all courses',
        'System administration',
        'User management',
      ],
      color: 'error',
      icon: <IconShieldCheck size={32} />,
    },
    {
      title: 'Faculty',
      description: 'Create and manage educational content',
      perks: [
        'Create and publish courses',
        'Create assignments & quizzes',
        'Post announcements',
        'Grade students',
        'Track student progress',
      ],
      color: 'primary',
      icon: <IconBook size={32} />,
    },
    {
      title: 'Student',
      description: 'Access your courses and learning materials',
      perks: [
        'View enrolled courses',
        'Submit assignments',
        'Take quizzes',
        'View grades',
        'Read announcements',
        'Manage profile',
      ],
      color: 'success',
      icon: <IconUsers size={32} />,
    },
  ];

  return (
    <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            Learning Management System
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Empower education with a comprehensive platform for faculty, students, and administrators
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            endIcon={<IconArrowRight />}
            onClick={() => navigate('/try-demo')}
            sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
          >
            Try Now
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 6 }}>
          Key Features
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, boxShadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Roles Section */}
      <Box sx={{ bgcolor: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 6 }}>
            Choose Your Role
          </Typography>
          <Grid container spacing={4}>
            {roles.map((role, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: `2px solid ${theme.palette[role.color].main}`,
                    transition: 'transform 0.3s, boxShadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    },
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ color: role.color, mb: 2 }}>
                      {role.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {role.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                      {role.description}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                      Key Perks:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                      {role.perks.map((perk, idx) => (
                        <Typography
                          component="li"
                          key={idx}
                          variant="body2"
                          sx={{ mb: 1, color: 'textSecondary' }}
                        >
                          {perk}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* CTA Button */}
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Ready to experience the LMS?
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<IconArrowRight />}
              onClick={() => navigate('/try-demo')}
              sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#1a1a1a', color: 'white', py: 4, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="body2">
            © 2024 Learning Management System. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
