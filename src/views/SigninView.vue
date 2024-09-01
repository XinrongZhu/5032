<script setup>
/**
 * This component allows users to sign up an account.
 * It includes validation, required filled fields, client-side validation and sanitization and displays submitted data in a table.
 */
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import DOMPurify from 'dompurify'

// form data to store user input
const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  email: '',
  phone: '',
  gender: ''
})

// store validation errors
const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  email: null,
  phone: null,
  gender: null
})

// Sanitize input using DOMPurify
const sanitizeInput = (input) => {
  return DOMPurify.sanitize(input)
}

// store submitted form data
const submittedCards = ref([])

// validate form input
const validateForm = () => {
  // sanitize input
  formData.value.username = sanitizeInput(formData.value.username)
  formData.value.password = sanitizeInput(formData.value.password)
  formData.value.confirmPassword = sanitizeInput(formData.value.confirmPassword)
  formData.value.email = sanitizeInput(formData.value.email)
  formData.value.phone = sanitizeInput(formData.value.phone)

  // validate all content
  if (formData.value.username.length < 3) {
    errors.value.username = 'Username must be at least 3 characters long.'
  } else {
    errors.value.username = null
  }
  
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  if (password.length < minLength) {
    errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(formData.value.email)) {
    errors.value.email = 'Please enter a valid email address.'
  } else {
    errors.value.email = null
  }

  const phonePattern = /^(\+61|0)[4-5]\d{8}$/
  if (!phonePattern.test(formData.value.phone)) {
    errors.value.phone = 'Please enter a valid Australian phone number.'
  } else {
    errors.value.phone = null
  }
}

// Submit form
const submitForm = () => {
  validateForm()
  if (!errors.value.username && !errors.value.password && !errors.value.confirmPassword && !errors.value.email && !errors.value.phone) {
    submittedCards.value.push({ ...formData.value })
    clearForm()
    alert('Form submitted successfully!')
  }
}

// clear the form
const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    email: '',
    phone: '',
    gender: ''
  }
}
</script>

<template>
  <!-- Registration Form -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Registration Form</h1>
        <p class="text-center">
          Let's join us!
        </p>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <!-- Username-->
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>

            <!-- Gender -->
            <div class="col-md-6 col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select class="form-select" id="gender" v-model="formData.gender" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <!-- Password-->
            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>

            <!-- Confirm Password-->
            <div class="col-md-6 col-sm-6">
              <label for="confirm-password" class="form-label">Confirm password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @blur="() => validateConfirmPassword(true)"
              />
              <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
            </div>

            <!-- Email-->
            <div class="col-md-6 col-sm-6">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                @blur="() => validateEmail(true)"
                @input="() => validateEmail(false)"
                v-model="formData.email"
              />
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>

            <!-- Phone -->
            <div class="col-md-6 col-sm-6">
              <label for="phone" class="form-label">Phone</label>
              <input
                type="tel"
                class="form-control"
                id="phone"
                @blur="() => validatePhone(true)"
                @input="() => validatePhone(false)"
                v-model="formData.phone"
              />
              <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
            </div>
          </div>

          <!-- Australian Resident-->
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              </div>
            </div>
          </div>
          
          <!-- Submit and Clear Buttons -->
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Display submitted user information -->
  <div class="row mt-5">
    <h4>This is a Primevue Datatable.</h4>
    <DataTable :value="submittedCards" tableStyle="min-width: 50rem">
      <Column field="username" header="Username"></Column>
      <Column field="password" header="Password"></Column>
      <Column field="isAustralian" header="Australian Resident"></Column>
      <Column field="gender" header="Gender"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="phone" header="Phone"></Column>
    </DataTable>
  </div>
</template>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #e0bfbf; */
  border-radius: 10px;
}

/* Class selectors */
.form {
  text-align: center;
  margin-top: 50px;
}

/* ID selectors */
#username:focus,
#password:focus,
#isAustralian:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
