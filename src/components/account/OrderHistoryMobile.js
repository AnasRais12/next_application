"use client"
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Chip,
  Tabs,
  Tab,
  Stack,
  IconButton,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Rating,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';

const OrdrHistoryMobile = () => {
  const [value, setValue] = useState(0);
  const [openReview, setOpenReview] = useState(false);
  const [openTrack, setOpenTrack] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenReview = (order) => {
    setSelectedOrder(order);
    setOpenReview(true);
  };

  const handleCloseReview = () => {
    setOpenReview(false);
    setSelectedOrder(null);
    setRating(0);
    setReviewText('');
  };

  const handleSubmitReview = () => {
    console.log('Rating:', rating, 'Review:', reviewText, 'Order:', selectedOrder);
    handleCloseReview();
  };

  const handleOpenTrack = (order) => {
    setSelectedOrder(order);
    setOpenTrack(true);
  };

  const handleCloseTrack = () => {
    setOpenTrack(false);
    setSelectedOrder(null);
  };

  // Filter ongoing orders (status: "Picked" for this example)
  const ongoingOrders = [
    {
      name: "Regular Fit Polo",
      size: "L",
      price: "$1,100",
      status: "Picked",
      review: null,
      rating: null,
      image: "https://via.placeholder.com/100x150" // Replace with your image URL
    },
  ];

  const completedOrders = [
    {
      name: "Regular Fit Slogan",
      size: "M",
      price: "$1,190",
      status: "Completed",
      review: "Leave Review",
      rating: null,
      image: "https://via.placeholder.com/100x150" // Replace with your image URL
    },
    {
      name: "Regular Fit Black",
      size: "L",
      price: "$1,690",
      status: "Completed",
      review: "Leave Review",
      rating: null,
      image: "https://via.placeholder.com/100x150" // Replace with your image URL
    },
    {
      name: "Regular Fit V-Neck",
      size: "S",
      price: "$1,290",
      status: "Completed",
      review: "Leave Review",
      rating: null,
      image: "https://via.placeholder.com/100x150" // Replace with your image URL
    },
    {
      name: "Regular Fit Pink",
      size: "M",
      price: "$1,341",
      status: "Completed",
      review: null,
      rating: "3.5/5",
      image: "https://via.placeholder.com/100x150" // Replace with your image URL
    },
  ];

  const currentOrders = value === 0 ? ongoingOrders : completedOrders;

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 2 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
            My Orders
          </Typography>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2, maxWidth: 400, margin: '0 auto' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          sx={{ mb: 2, bgcolor: '#e0e0e0', borderRadius: '8px' }}
        >
          <Tab label="Ongoing" sx={{ textTransform: 'none', fontSize: '0.9rem' }} />
          <Tab label="Completed" sx={{ textTransform: 'none', fontSize: '0.9rem' }} />
        </Tabs>

        {currentOrders.length === 0 ? (
          <Box sx={{ textAlign: 'center', p: 4 }}>
            <Box
              component="img"
              src="https://via.placeholder.com/50?text=Box"
              alt="No orders icon"
              sx={{ width: '50px', mb: 2, filter: 'grayscale(100%)' }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              No Ongoing Orders!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You don't have any ongoing orders at this time.
            </Typography>
          </Box>
        ) : (
          <List>
            {currentOrders.map((order, index) => (
              <React.Fragment key={index}>
                <Paper elevation={0} sx={{
                  p: 2,
                  mb: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  bgcolor: '#fff'
                }}>
                  <ListItem sx={{ p: 0, alignItems: 'flex-start' }}>
                    <img
                      src={order.image}
                      alt={order.name}
                      style={{ width: '100px', marginRight: '16px' }}
                    />
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {order.name}
                        </Typography>
                      }
                      secondary={
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body2" color="text.secondary">
                            Size {order.size}
                          </Typography>
                          <Chip
                            label={order.status}
                            size="small"
                            color={order.status === "Picked" ? "default" : "success"}
                            sx={{
                              ml: 1,
                              fontSize: '0.7rem',
                              position: "absolute",
                              top: '0',
                              right: 0,
                              height: '20px',
                              bgcolor: order.status === "Picked" ? '#f5f5f5' : '#e8f5e9'
                            }}
                          />
                        </Stack>
                      }
                    />
                  </ListItem>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: 1 }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {order.price}
                    </Typography>
                    {order.status === "Picked" ? (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          textTransform: 'none',
                          fontSize: '0.8rem',
                          bgcolor: '#000',
                          color: '#fff',
                          '&:hover': { bgcolor: '#333' }
                        }}
                        onClick={() => handleOpenTrack(order)}
                      >
                        Track Order
                      </Button>
                    ) : order.review ? (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          textTransform: 'none',
                          fontSize: '0.8rem',
                          bgcolor: '#000',
                          color: '#fff',
                          '&:hover': { bgcolor: '#333' }
                        }}
                        onClick={() => handleOpenReview(order)}
                      >
                        {order.review}
                      </Button>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        {order.rating}
                      </Typography>
                    )}
                  </Stack>
                </Paper>
                {index < currentOrders.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>

      <Dialog open={openReview} onClose={handleCloseReview} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <Typography variant="h6">Leave a Review</Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseReview}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 2 }}>
          <Typography variant="body2" gutterBottom>
            How was your order? Please give your rating and also your review.
          </Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            sx={{ mb: 2 }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Write your review..."
            type="text"
            fullWidth
            variant="outlined"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, bgcolor: '#000', color: '#fff', '&:hover': { bgcolor: '#333' } }}
            onClick={handleSubmitReview}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={openTrack} onClose={handleCloseTrack} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <Typography variant="h6">Track Order</Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseTrack}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 2 }}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <svg width="200" height="100" viewBox="0 0 200 100">
              <path d="M20 80 L80 80 L120 20" stroke="#000" strokeWidth="2" fill="none" />
              <circle cx="20" cy="80" r="8" fill="#e0e0e0" />
              <circle cx="80" cy="80" r="8" fill="#000">
                <title>Packing</title>
              </circle>
              <circle cx="120" cy="20" r="8" fill="#e0e0e0">
                <title>Delivered</title>
              </circle>
              <text x="10" y="85" fontSize="10">Packing</text>
              <text x="70" y="85" fontSize="10">In Transit</text>
              <text x="110" y="25" fontSize="10">Delivered</text>
            </svg>
          </Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Order Status</Typography>
          <List dense>
            <ListItem>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', bgcolor: '#e0e0e0', mr: 1 }} />
                <Typography variant="body2">Packing</Typography>
              </Box>
              <Typography variant="caption" sx={{ ml: 'auto' }}>2336 Jack Warren Rd, Delta Junction, Alaska 9...</Typography>
            </ListItem>
            <ListItem>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', bgcolor: '#000', mr: 1 }} />
                <Typography variant="body2">Picked</Typography>
              </Box>
              <Typography variant="caption" sx={{ ml: 'auto' }}>2417 Tongass Ave #11, Ketchikan, Alaska 99901...</Typography>
            </ListItem>
            <ListItem>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', bgcolor: '#e0e0e0', mr: 1 }} />
                <Typography variant="body2">In Transit</Typography>
              </Box>
              <Typography variant="caption" sx={{ ml: 'auto' }}>16 Rr 2, Ketchikan, Alaska 99901, USA</Typography>
            </ListItem>
            <ListItem>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', bgcolor: '#e0e0e0', mr: 1 }} />
                <Typography variant="body2">Delivered</Typography>
              </Box>
              <Typography variant="caption" sx={{ ml: 'auto' }}>925 S Chugach St #APT 10, Alaska 99645</Typography>
            </ListItem>
          </List>
          <Paper elevation={0} sx={{ p: 1, mt: 2, border: '1px solid #e0e0e0', borderRadius: '8px', bgcolor: '#fff' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <img src="https://via.placeholder.com/40" alt="Delivery Guy" style={{ width: '40px', borderRadius: '50%' }} />
              <Box>
                <Typography variant="subtitle2">Jacob Jones</Typography>
                <Typography variant="caption">Delivery Guy</Typography>
              </Box>
              <IconButton size="small" sx={{ ml: 'auto' }}>
                <PhoneIcon />
              </IconButton>
            </Stack>
          </Paper>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OrdrHistoryMobile;