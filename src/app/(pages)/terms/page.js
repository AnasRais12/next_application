import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Divider,
  Grid,
} from '@mui/material';

const TermsAndConditions = () => {
  return (
    <Box minHeight="100vh" bgcolor="#f9fafb" pt={6}>
      <Grid >
        {/* Header */}
        <Paper elevation={3} sx={{  overflow: 'hidden' }}>
    <div className="  overflow-hidden   ">
                <div className="bg-primary p-6 md:p-8 xl:px-14 text-center">
                     <h1 className=" text-3xl custom:text-4xl sm:text-4xl md:text-4xl font-bold pt-6 text-white mb-2">
                        Terms and Conditions
                  </h1>
              <p className="text-white xs:text-md custom:text-md sm:text-lg">
               Welcome to <strong>Shopease</strong>. Please read these Terms and
              Conditions carefully before using our e-commerce platform.
              </p>
            </div>
          </div>
        </Paper>

        {/* Terms Sections */}
        <Paper elevation={3} sx={{ overflow: 'hidden', p: { mobileS:2, xs: 3, md: 4 } }}>
          {termsData.map(({ title, content }, idx) => (
            <TermSection key={title} number={idx + 1} title={title} content={content} />
          ))}

          {/* Contact */}
          {/* <Box  mt={'-30px'} p={3} >
            <Typography variant="h6" color="#047857" gutterBottom>
              Contact Us
            </Typography>
            <Grid container spacing={2} color="text.secondary">
              <Grid item xs={12} sm={6}>
                <Typography fontWeight={600} color="#047857">Email:</Typography>
                <Typography>support@shopease.com</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography fontWeight={600} color="#047857">Phone:</Typography>
                <Typography>+92 1100-111111</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography fontWeight={600} color="#047857">Address:</Typography>
                <Typography>123 Main Street, City, Country</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography fontWeight={600} color="#047857">Business Hours:</Typography>
                <Typography>Mon-Fri: 9AM - 6PM</Typography>
              </Grid>
            </Grid>
          </Box> */}
        </Paper>
      </Grid>
    </Box>
  );
};

const TermSection = ({ number, title, content }) => (
  <Box pb={4}>
    <Typography
      variant="h6"
      fontWeight={600}
      color="primary.main"
      display="flex"
      alignItems="center"
    >
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: '50%',
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 2,
          fontWeight: 700,
        }}
      >
        {number}
      </Box>
      {title}
    </Typography>
    <Box ml={5} color="text.secondary">
      {typeof content === 'string' ? <Typography>{content}</Typography> : content}
    </Box>
    <Divider sx={{ my: 4 }} />
  </Box>
);

const termsData = [
  {
    title: 'Introduction',
    content:
      "These Terms and Conditions ('Terms') govern your use of our website and online store. By accessing or using our e-commerce services, you agree to be bound by these Terms. If you disagree with any part of the Terms, you must not use our platform.",
  },
  {
    title: 'Account Registration',
    content: (
      <Typography>
        In order to make purchases, you must create an account on our website. You agree to provide accurate, current, and complete
        information during the registration process and update your information if necessary. You are responsible for maintaining the
        confidentiality of your account credentials.
      </Typography>
    ),
  },
  {
    title: 'Orders and Payments',
    content: (
      <>
        <Typography mb={2}>
          By placing an order on our website, you are offering to purchase products in accordance with these Terms. Once an order is
          placed, you will receive an order confirmation email. However, the contract is not considered complete until we dispatch the
          goods.
        </Typography>
        <Typography>
          All payments must be made in full at the time of placing an order. We accept payments via credit cards, debit cards, and other
          payment methods as indicated on the website. You represent and warrant that you have the legal right to use the payment method.
        </Typography>
      </>
    ),
  },
  {
    title: 'Pricing and Availability',
    content:
      'All product prices are displayed on our website in the relevant currency and include applicable taxes unless stated otherwise. We strive to ensure that all product prices and product information are accurate; however, errors may occur. In such cases, we reserve the right to cancel or modify orders with incorrect pricing.',
  },
  {
    title: 'Shipping and Delivery',
    content:
      'We offer various shipping options, and the delivery charges will be calculated at checkout. Delivery times may vary depending on your location and the availability of the items you ordered. You will be notified of any delays or issues with shipping.',
  },
  {
    title: 'Returns and Refunds',
    content: (
      <>
        <Typography mb={2}>
          We offer a return policy for products purchased on our platform. Products can be returned within a specified period (e.g., 30 days)
          from the date of delivery, subject to certain conditions (e.g., items must be in their original condition). Refunds will be issued
          once the returned product is inspected and accepted.
        </Typography>
        <Typography>
          Some items, such as perishable goods or intimate products, may not be eligible for return. Please check the product page for return
          eligibility before making a purchase.
        </Typography>
      </>
    ),
  },
  {
    title: 'Cancellations',
    content:
      'You may cancel your order before it is shipped. If your order has already been processed or shipped, you will need to follow the return process. Please contact our support team if you wish to cancel your order.',
  },
  {
    title: 'Product Information',
    content:
      'We make every effort to display our products accurately, including their descriptions, prices, and images. However, due to differences in device settings and other factors, we cannot guarantee that colors or other details will appear exactly as shown on your device.',
  },
  {
    title: 'User Conduct',
    content:
      'By using our platform, you agree to act lawfully and respect the rights of other users. You are prohibited from engaging in fraudulent activities, using automated systems to place orders, or attempting to gain unauthorized access to any part of the website.',
  },
  {
    title: 'Intellectual Property',
    content:
      'All content on our website, including but not limited to text, images, logos, graphics, and software, is owned by Shopease and protected by copyright and intellectual property laws. You are not permitted to copy, modify, or distribute any content without express permission.',
  },
  {
    title: 'Limitation of Liability',
    content:
      'Our liability for any claims related to the use of our website or products is limited to the total amount paid for the product(s) in question. We are not responsible for any indirect, incidental, or consequential damages arising from your use of our services.',
  },
  {
    title: 'Changes to Terms',
    content:
      'We reserve the right to modify or update these Terms at any time. Changes will be posted on this page, and the date of the latest revision will be updated. Please review these Terms regularly.',
  },
  {
    title: 'Governing Law',
    content:
      'These Terms and Conditions are governed by the laws of [Your Country/State]. Any disputes arising from the use of our services will be resolved in the courts located in [Your City/State].',
  },
];

export default TermsAndConditions;
