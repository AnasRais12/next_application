"use client"
import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Grid,
} from '@mui/material';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
    console.log(formData);
  };

  return (
    <Box sx={{ backgroundColor: '#f9fafb',  pt: 5, }}>
      <Box  >
          <div className="  pb-10 overflow-hidden   ">
        <div className="bg-primary p-6 md:p-8 xl:px-14 text-center">
       <h1 className=" text-3xl custom:text-4xl sm:text-4xl md:text-4xl font-bold pt-6 text-white mb-2">
            Contact Our Team
          </h1>
          <p className="text-white xs:text-md custom:text-md sm:text-lg">
           Have questions or feedback? We'd love to hear from you.
          </p>
        </div>
      </div>

        <Grid elevation={1} sx={{ pb: 4, borderRadius: 2, mx: { xs: "10px", mobileS: "5px" },px:{mobileS:"6px", xs:"8px",  xl:"12px"} }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item mobileS={12}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item mobileS={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item mobileS={12}>
                <FormControl fullWidth required>
                  <InputLabel>Subject</InputLabel>
                  <Select
                   sx={{ 
        borderRadius: '10px' 
      }}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    label="Subject"
                  >
                    <MenuItem value="">Select a subject</MenuItem>
                    <MenuItem value="support">Customer Support</MenuItem>
                    <MenuItem value="feedback">Product Feedback</MenuItem>
                    <MenuItem value="order">Order Inquiry</MenuItem>
                    <MenuItem value="business">Business Partnership</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item mobileS={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Grid>


              <Grid item mobileS={12}>
                <Button sx={{py:"6px"}} type="submit" variant="contained" color="primary">
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        
      </Box>
    </Box>
  );
};

export default ContactForm;
