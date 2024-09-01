<template>
  <div class="rating-container">
    <h1>Rate Our Service</h1>
    <p>Please rate your experience with our service:</p>

    <div class="rating-form">
      <!-- Star rating component -->
      <div class="stars">
        <span
          v-for="star in 5"
          :key="star"
          @click="setRating(star)"
          :class="{'star-filled': star <= rating, 'star-empty': star > rating}"
        >
          ★
        </span>
      </div>
      
      <!-- Reason-->
      <div class="reason-container mt-3">
        <label for="reason" class="form-label">Reason</label>
        <textarea
          id="reason"
          rows="3"
          v-model="reason"
          class="form-control"
          @blur="validateReason(true)"
          @input="validateReason(false)"
        ></textarea>
        <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
      </div>
      
      <!-- Submit button -->
      <button 
        class="btn btn-primary mt-3" 
        :disabled="!canSubmit || !isAuthenticated" 
        @click="submitRating"
      >
        Submit
      </button>
      <p v-if="!isAuthenticated" class="text-danger mt-2">You must be logged in to submit a rating.</p>
      
    </div>

    <!-- Average Rating and Reviews -->
    <div v-if="averageRating !== 0" class="average-rating mt-5">
      <h2>Current Average Rating: {{ averageRating.toFixed(1) }} / 5</h2>
      <p>Based on {{ reviews.length }} reviews</p>
    </div>

    <div class="reviews-section" v-if="reviews.length > 0">
      <h2>User Reviews</h2>
      <div class="review-card" v-for="(review, index) in reviews" :key="index">
        <div class="review-header">
          <strong>Rating:</strong> {{ review.rating }} / 5
        </div>
        <p class="review-comment">{{ review.comment }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
/*
 * 
 * This component enables users to rate a service and provide a reason for their rating.
 * It dynamically updates the star rating, validates the reason, and stores the data locally.
 * 
 */

import { ref, computed } from 'vue'
import { isAuthenticated } from '../router/authenticated'

// Initialize reactive state for the current rating and reason (comment)
const rating = ref(0)
const reason = ref('')
// Error state for validation of the reason field
const errors = ref({ reason: null })

// Simulated dynamic data source: array of past reviews
const initialReviews = [
  { rating: 4, comment: 'Great website, very satisfied!' },
  { rating: 5, comment: 'Amazing experience!' },
  { rating: 3, comment: 'It was okay, could be better.' },
]

// Reactive state for storing all reviews
const reviews = ref([...initialReviews])

// validate reason form data
const validateReason = (blur) => {
  if (reason.value.length < 10) {
    if (blur) errors.value.reason = 'Reason must be at least 10 characters.'
  } else {
    errors.value.reason = null
  }
}

// set the current user rating
const setRating = (value) => {
  rating.value = value
}

// submit the current rating and reason as a new review
const submitRating = () => {
  if (rating.value && reason.value.length >= 10 && isAuthenticated.value) {
    reviews.value.push({ rating: rating.value, comment: reason.value })
    rating.value = 0
    reason.value = ''
    errors.value.reason = null
  }
}

// check submit permission
const canSubmit = computed(() => {
  return rating.value > 0 && reason.value.length >= 10
})

// calculate average rating
const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const total = reviews.value.reduce((sum, review) => sum + review.rating, 0)
  return total / reviews.value.length
})
</script>

<style scoped>
/* Container for the rating view */
.rating-container {
  text-align: center;
  margin-top: 50px;
  padding: 0 20px; /* Add padding to avoid edges */
}

/* Container for the rating form */
.rating-form {
  max-width: 600px;
  margin: 0 auto;
}

/* Styling for the stars in the rating component */
.stars {
  font-size: 2rem;
  cursor: pointer;
}

/* Filled star styling */
.star-filled {
  color: gold;
}

/* Empty star styling */
.star-empty {
  color: lightgray;
}

/* Container for the reason textarea */
.reason-container {
  margin-top: 20px;
  text-align: left;
}

/* Paragraph text styling */
p {
  font-size: 1.2rem;
  color: #333;
}

/* Styling for the average rating display */
.average-rating {
  margin-top: 30px;
  font-size: 1.5rem;
  color: #333;
}

/* Container for the user reviews section */
.reviews-section {
  margin-top: 40px;
  text-align: left;
  font-size: 1.2rem;
  padding: 0 40px; 
}

/* Individual review card styling */
.review-card {
  background-color: #f9f9f9;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
}

.review-header {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 5px;
}

.review-comment {
  margin-left: 10px;
}
</style>

