import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AccountSupportPage = () => {
  return (
    <Box  bgcolor="#f9fafb" pt={5}>
      <Grid mobileS={12} >
        {/* Header */}
        {/* <Card sx={{ borderRadius: 3, mb: 4, boxShadow: 4, border: '1px solid #e5e7eb' }}>
          <Box
            sx={{
              background: 'linear-gradient(to right, #047857, #065f46)',
              color: 'white',
              textAlign: 'center',
              py: 5,
              px: { xs: 3, md: 6 },
            }}
          >
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Account Support
            </Typography>
            <Typography variant="body1">
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
          </Box>
          <CardContent>
            <Box display="flex" alignItems="start" bgcolor="#ecfdf5" p={2} borderLeft={4} borderColor="#10b981" borderRadius={2}>
              <CheckCircleIcon sx={{ color: '#047857', mr: 2, mt: '4px' }} />
              <Typography variant="body1">
                At <b style={{ color: '#047857' }}>Shopease</b>, manage your account and get help.
              </Typography>
            </Box>
          </CardContent>
        </Card> */}
           <div className="  pb-10 overflow-hidden   ">
        <div className="bg-primary p-6 md:p-8 xl:px-14 text-center">
       <h1 className=" text-3xl custom:text-4xl sm:text-4xl md:text-4xl font-bold pt-6 text-white mb-2">
           Account Support
          </h1>
          <p className="text-white xs:text-md custom:text-md sm:text-lg">
           At Shopease manage your account and get help.
          </p>
        </div>
      </div>

        {/* Quick Solutions */}
        <Box mb={6}  px={{ mobileS: 2, xs: 3, md: 5 }} >
          <Typography variant="h6" fontWeight="600" color="primary.main" mb={2}>
            Quick Solutions
          </Typography>
          <List sx={{ bgcolor: '#f9fafb', borderRadius: 2,listStyleType: 'disc', pl: 3.5  }}>
            {[
              { title: 'Forgot Password', desc: 'Reset your password using your email' },
              { title: 'Update Account Details', desc: 'Change your personal information' },
              { title: 'Close Account', desc: 'Permanently delete your account' },
            ].map((item, i) => (
              <ListItem key={i} sx={{ bgcolor: '#f9fafb', mb: 1, borderRadius: 2,display: 'list-item', py: 0.5  }}>
                <ListItemText
                  primary={<Typography fontWeight="medium">{item.title}</Typography>}
                  secondary={<Typography color="text.secondary">{item.desc}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Contact Support */}
        <Box mb={6} px={{ mobileS: 2, xs: 3, md: 5 }}>
          <Typography variant="h6" fontWeight="600" color="primary.main" mb={2}>
            Contact Support
          </Typography>
          <Grid container spacing={2} px={1}>
            <Grid item xs={12} md={6} >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <PhoneIcon />
                </Avatar>
                <Box>
                  <Typography fontWeight="medium">Call Us</Typography>
                  <Typography color="text.secondary" variant="body2">
                    +1 (555) 123-4567
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <EmailIcon />
                </Avatar>
                <Box>
                  <Typography fontWeight="medium">Email Us</Typography>
                  <Typography color="text.secondary" variant="body2">
                    support@example.com
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* FAQ */}
        <Box mb={6} px={{ mobileS: 2, xs: 3, md: 5 }}>
          <Typography variant="h6" fontWeight="600" color="primary.main" mb={2}>
            Frequently Asked Questions
          </Typography>
          {[{
            question: 'How do I update my email address?',
            answer: 'Go to Account Settings → Personal Information → Edit Email',
          }, {
            question: "Why can't I log in?",
            answer: 'Try resetting your password or contact support if the issue persists',
          }].map((faq, i) => (
            <Accordion key={i} sx={{ mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="medium">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary" variant="body2">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Grid>
    </Box>
  );
};

export default AccountSupportPage;
