import React from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Divider,
  Button,
  Avatar,
} from '@mui/material';

export default function ShippingInfoPage() {
  return (
    <Box sx={{  bgcolor: 'white', pt: 8 }}>
      <Grid mobileS={12} >
        {/* Header */}
        <Paper elevation={3} sx={{  overflow: 'hidden',  }}>
         <div className="  overflow-hidden   ">
                <div className="bg-primary p-6 px-4 sm:px-8 md:px-8 md:p-8 xl:px-14 text-center">
                     <h1 className=" text-3xl custom:text-4xl sm:text-4xl md:text-4xl font-bold  text-white mb-2">
           Shipping Information
                  </h1>
              <p className="text-white xs:text-md custom:text-md sm:text-lg">
                 At Shopease we want you to be completely satisfied with your
                purchase. If you're not happy with your order, we'll make it right.
              </p>
            </div>
          </div>
          
        </Paper>

        {/* How to Track Order */}
        <Box my={4} px={{ mobileS: 2,xs: 3, md: 5 }}>
          <Typography variant="h5" fontWeight={600} color="primary.main" mb={3}>
            How to Track Your Order
          </Typography>

          {[
            {
              title: 'Check Your Email',
              desc: 'You’ll receive a confirmation email with your order number and a tracking link.',
            },
            {
              title: 'Visit the Tracking Page',
              desc: 'Click the tracking link in your email or enter your order number on our website.',
            },
            {
              title: 'Track in Real-Time',
              desc: 'View live updates on your shipment’s location and estimated delivery date.',
            },
          ].map((step, index) => (
            <Box key={index} display="flex" alignItems="flex-start" mb={3}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 40,
                  height: 40,
                  fontWeight: 'bold',
                  mr: 2,
                }}
              >
                {index + 1}
              </Avatar>
              <Box>
                <Typography fontWeight={600}>{step.title}</Typography>
                <Typography color="text.secondary">{step.desc}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Delivery FAQs */}
        <Box mb={8} px={{ mobileS: 2,xs: 3, md: 5 }}>
          <Typography variant="h5" fontWeight={600} color="primary.main" mb={3}>
            Delivery FAQs
          </Typography>
          {[
            {
              question: 'How long does delivery take?',
              answer: 'Standard delivery takes 3-5 business days. Express options are available at checkout.',
            },
            {
              question: 'What if my package is delayed?',
              answer:
                'Check tracking for updates. If delayed beyond the estimated date, contact our support team.',
            },
            {
              question: 'Can I change my shipping address?',
              answer:
                'Address changes are only possible before your order is shipped. Contact us immediately for assistance.',
            },
          ].map((faq, idx) => (
            <Box key={idx} mb={3}>
              <Typography fontWeight={600}>{faq.question}</Typography>
              <Typography color="text.secondary">{faq.answer}</Typography>
              <Divider sx={{ my: 2 }} />
            </Box>
          ))}
        </Box>

        {/* CTA */}
        <Box px={{mobileS: 2, xs: 3, md: 5 }} pb={6}>
          <Typography color="text.secondary" mb={2}>
            Need help? Contact our support team.
          </Typography>
          <Link href="/contact" passHref legacyBehavior>
            <Button
              variant="contained"
              sx={{
                py: '6px' ,
                bgcolor: 'primary.main',
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              Contact Support
            </Button>
          </Link>
        </Box>
      </Grid>
    </Box>
  );
}
