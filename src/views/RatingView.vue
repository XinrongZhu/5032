<template>
  <div class="rating-container">
    <h1>Rate Our Service</h1>
    <p>Please rate your experience with our service:</p>

    <div class="rating-form">
      <!-- Star Rating and Reason Component -->
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
      
      <button class="btn btn-primary mt-3" :disabled="!canSubmit" @click="submitRating">
        Submit Rating
      </button>
    </div>

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
import { ref, computed } from 'vue'

const rating = ref(0)
const reason = ref('')
const errors = ref({ reason: null })

const reviews = ref([
  { rating: 4, comment: 'Great service, very satisfied!' },
  { rating: 5, comment: 'Amazing experience!' },
  { rating: 3, comment: 'It was okay, could be better.' },
])

const validateReason = (blur) => {
  if (reason.value.length < 10) {
    if (blur) errors.value.reason = 'Reason must be at least 10 characters.'
  } else {
    errors.value.reason = null
  }
}

const setRating = (value) => {
  rating.value = value
}

const submitRating = () => {
  if (rating.value && reason.value.length >= 10) {
    reviews.value.push({ rating: rating.value, comment: reason.value })
    rating.value = 0
    reason.value = ''
    errors.value.reason = null
  }
}

const canSubmit = computed(() => {
  return rating.value > 0 && reason.value.length >= 10
})

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const total = reviews.value.reduce((sum, review) => sum + review.rating, 0)
  return total / reviews.value.length
})
</script>

<style scoped>
.rating-container {
  text-align: center;
  margin-top: 50px;
  padding: 0 20px; /* Add padding to avoid edges */
}

.rating-form {
  max-width: 600px;
  margin: 0 auto;
}

.stars {
  font-size: 2rem;
  cursor: pointer;
}

.star-filled {
  color: gold;
}

.star-empty {
  color: lightgray;
}

.reason-container {
  margin-top: 20px;
  text-align: left;
}

p {
  font-size: 1.2rem;
  color: #333;
}

.average-rating {
  margin-top: 30px;
  font-size: 1.5rem;
  color: #333;
}

.reviews-section {
  margin-top: 40px;
  text-align: left;
  font-size: 1.2rem;
  padding: 0 40px; 
}

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

