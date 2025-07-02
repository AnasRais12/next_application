// ✅ FAQ section converted to Material UI with Accordion
'use client';
import React from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept credit/debit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for secure online payments.',
  },
  {
    question: 'How can I track my order?',
    answer:
      "Once your order is shipped, you'll receive a tracking number via email. You can also check your order status in your account dashboard.",
  },
  {
    question: 'What is your return policy?',
    answer:
      'You can return most products within 30 days of purchase. Items must be unused, in original packaging with all tags attached. Some exclusions apply.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping takes 3-5 business days. Express options (1-2 business days) are available at checkout for an additional fee.',
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'Yes, we ship to over 50 countries worldwide. International delivery times vary between 7-14 business days depending on destination.',
  },
  {
    question: 'Can I modify or cancel my order?',
    answer:
      'You can modify or cancel your order within 1 hour of placement by contacting our customer support team immediately.',
  },
  {
    question: 'Are there any hidden fees?',
    answer:
      'No, we display all costs upfront including product price, taxes, and shipping fees before you complete your purchase.',
  },
];

export default function FAQ() {
  return (
    <Box sx={{ minHeight: '100vh', pt: 6,  }}>
        {/* Header Section */}
        {/* Header Section */}
        <div className="bg-primary p-6 px-0 md:p-8 xl:px-14 text-center">
          <h1 className=" text-3xl custom:text-4xl sm:text-4xl md:text-4xl font-bold pt-6 text-white mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-emerald-100 xs:text-md custom:text-md sm:text-lg">
            Find answers to common questions about our products and services
          </p>
        </div>

        {/* FAQ Accordion */}
        <Box sx={{ my: 4,px:'12px'  }}>
          {faqs.map((item, index) => (
            <Paper elevation={1} sx={{ mb: 3 }} key={index}>
              <Accordion sx={{ py:'3px'}} disableGutters>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
                >
                  <Typography fontWeight={600}>{item.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{item.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            </Paper>
          ))}
        </Box>
    </Box>
  );
}
