import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Rating,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Grid,
  CircularProgress,
  Tooltip,
  Card,
  CardContent,
  Avatar,
  Divider,
  Badge,
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
  },
}));

const ReviewFeedback = () => {
  const [assignmentId, setAssignmentId] = useState('');
  const [review, setReview] = useState(''); // Changed from 'reviewee' to 'review'
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const aId = params.get('assignmentId');
    setAssignmentId(aId);
    fetchReviews(aId);
  }, [location.search]);

  const [reviews, setReviews] = useState([]);

  const fetchReviews = async (aId) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/api/assignments/${aId}/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      enqueueSnackbar('Failed to fetch reviews.', { variant: 'error' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review || !feedback || rating === 0) {
      enqueueSnackbar('Please complete all fields.', { variant: 'warning' });
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8080/api/reviews/submit',
        {
          assignmentId,
          reviewId: review, // Changed 'revieweeId' to 'reviewId'
          feedback,
          rating,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      enqueueSnackbar('Review submitted successfully!', { variant: 'success' });
      // Reset form
      setReview('');
      setFeedback('');
      setRating(0);
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Failed to submit review.', { variant: 'error' });
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" align="center" gutterBottom>
        Review & Feedback Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Dashboard Card - Summary */}
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Assignment Overview
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Assignment ID: {assignmentId || 'N/A'}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Your Progress</Typography>
              <Rating value={rating} readOnly />
              <Typography variant="caption" color="textSecondary">
                Current rating
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Form for Feedback */}
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Submit Your Review
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {isLoading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                  <CircularProgress />
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="review-label">Select Review</InputLabel>
                        <Tooltip title="Choose the review you want to give feedback for">
                          <Select
                            labelId="review-label"
                            id="review"
                            value={review}
                            label="Review"
                            onChange={(e) => setReview(e.target.value)}
                            required
                            disabled={reviews.length === 0}
                          >
                            {reviews.length > 0 ? (
                              reviews.map((rev) => (
                                <MenuItem key={rev.id} value={rev.id}>
                                  {rev.title}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem disabled value="">
                                No reviews available
                              </MenuItem>
                            )}
                          </Select>
                        </Tooltip>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Feedback"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        required
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        disabled={reviews.length === 0}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Box>
                        <Typography component="legend">Rating</Typography>
                        <Rating
                          name="simple-controlled"
                          value={rating}
                          onChange={(event, newValue) => setRating(newValue)}
                          disabled={reviews.length === 0}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={reviews.length === 0}
                      >
                        Submit Feedback
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReviewFeedback;
