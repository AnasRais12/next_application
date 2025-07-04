"use client"
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  List,
  
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import theme from '@/lib/theme';

const PrivacyPolicy = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', pt: 6 }}>
      <Grid mobileS={12} >
        <Paper elevation={3} sx={{  overflow: 'hidden' }}>
          {/* Header */}
                       <div className="  overflow-hidden   ">
        <div className="bg-primary p-6 md:p-8 xl:px-14 text-center">
       <h1 className=" text-3xl custom:text-4xl sm:text-4xl md:text-4xl md:pt-6 pt-0 font-bold text-white mb-2">
               Privacy Policy
          </h1>
          <p className="text-white xs:text-md custom:text-md sm:text-lg">
            Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
          </p>
        </div>
      </div>

          {/* Content */}
          <Box sx={{ p: { mobileS:2, xs: 3, md: 5, } }}>
            <Typography paragraph color="text.secondary">
              At <Box component="span" fontWeight={600} color="primary.main">Shopease</Box>, we are committed to protecting your
              privacy. This Privacy Policy outlines how we collect, use, and protect your
              personal information when you visit our website and use our services.
            </Typography>

            <Section title="1. Information We Collect">
              <Typography paragraph sx={{ color: 'text.secondary' }}>
                We collect personal information when you visit our website, make a purchase,
                create an account, or interact with us in other ways. This information may include:
              </Typography>
              <MuiList items={[
                'Name',
                'Email address',
                'Phone number',
                'Billing and shipping address',
                'Payment information (e.g., credit card details)',
                'Order history',
                'IP address and device information',
              ]} />
            </Section>

            <Section title="2. How We Use Your Information">
              <Typography paragraph color="text.secondary">
                The information we collect is used for the following purposes:
              </Typography>
              <MuiList items={[
                'To process and fulfill your orders',
                'To communicate with you about your orders, promotions, or customer service inquiries',
                'To improve our website and services',
                'To send you marketing communications (with your consent)',
                'To comply with legal obligations and protect our rights',
              ]} />
            </Section>

            <Section title="3. How We Protect Your Information">
              <Typography paragraph color="text.secondary">
                We implement a variety of security measures to ensure the protection of your personal
                information. These include encryption, secure payment processing, and access control to
                safeguard against unauthorized access, alteration, or destruction of your personal data.
              </Typography>
            </Section>

            <Section title="4. Sharing Your Information">
              <Typography paragraph color="text.secondary">
                We do not sell, trade, or rent your personal information to third parties. However, we may
                share your information with trusted third-party service providers who help us operate our
                website and fulfill your orders, including:
              </Typography>
              <MuiList items={[
                'Payment processors',
                'Shipping carriers',
                'Marketing and analytics partners',
                'Customer support providers',
              ]} />
              <Typography paragraph color="text.secondary">
                We ensure that these third parties comply with our privacy standards and use your data only
                for the purposes for which it was provided.
              </Typography>
            </Section>

            <Section title="5. Cookies and Tracking Technologies">
              <Typography paragraph color="text.secondary">
                We use cookies and similar technologies to enhance your experience on our website. Cookies
                are small files that are stored on your device to help us remember your preferences, improve
                functionality, and analyze user behavior. You can control the use of cookies through your
                browser settings.
              </Typography>
            </Section>

            <Section title="6. Your Rights">
              <Typography paragraph color="text.secondary">
                Depending on your location, you may have the following rights regarding your personal
                information:
              </Typography>
              <MuiList items={[
                'The right to access the information we hold about you',
                'The right to correct any inaccurate or incomplete information',
                'The right to request the deletion of your personal information',
                'The right to object to the processing of your personal information',
                'The right to withdraw consent for marketing communications',
              ]} />
              <Typography paragraph color="text.secondary">
                To exercise any of these rights, please contact us at the information below. We will respond
                to your request in accordance with applicable data protection laws.
              </Typography>
            </Section>

            <Section title="7. Data Retention">
              <Typography paragraph color="text.secondary">
                We retain your personal information only for as long as necessary to fulfill the purposes
                outlined in this Privacy Policy, including for legal, accounting, or reporting requirements.
                Once your data is no longer needed, we will securely delete or anonymize it.
              </Typography>
            </Section>

            <Section title="8. Changes to This Privacy Policy">
              <Typography paragraph color="text.secondary">
                We may update this Privacy Policy from time to time. When we do, we will post the updated
                version on our website, and the date of the latest revision will be reflected at the top
                of this page. We encourage you to review this policy periodically for any changes.
              </Typography>
            </Section>

            <Section title="9. Contact Us">
              <Typography paragraph color="text.secondary">
                If you have any questions or concerns about this Privacy Policy or how we handle your personal
                information, please contact us at:
              </Typography>
              <Box sx={{  mt: 2 }}>
                <Typography color="text.secondary">
                  <strong  className="inline-block text-primary w-[70px]">Email:</strong>{' '}
                  admin@shopease.com
                </Typography>
                <Typography color="text.secondary">
                  <strong  className="inline-block text-primary w-[70px]">Phone:</strong>{' '}
                  +92 1100-111111
                </Typography>
                <Typography color="text.secondary">
                  <strong  className="inline-block text-primary w-[70px]">Address:</strong>{' '}
                  123 Main Street, City, Country
                </Typography>
              </Box>
            </Section>
          </Box>
        </Paper>
      </Grid>
    </Box>
  );
};

// Reusable Section component
const Section = ({ title, children }) => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h6" component="h2" color='text.primary' fontWeight={600} gutterBottom>
      {title}
    </Typography>
    {children}
  </Box>
);

// Reusable List with bullets
const MuiList = ({ items }) => (
  <List sx={{ listStyleType: 'disc', pl: 4 }}>
    {items.map((text, idx) => (
      <ListItem key={idx} sx={{ display: 'list-item', py: 0.5, }}>
        <ListItemText primary={text} />
      </ListItem>
    ))}
  </List>
);

export default PrivacyPolicy;
