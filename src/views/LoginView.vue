<script setup>
/*
 * 
 * This component enables users to login and click link to signin page.
 * 
 */
import { ref } from 'vue'
import router from '../router/index'
import { useRoute } from 'vue-router'
import { useAuth } from '../router/authenticated'

// Hardcoded credentials for user login
const savedUserName = 'mike'
const savedPassword = 'Qq@123456789'

// authentication methods
const { isAuthenticated, login} = useAuth()

// reactive form data and error
const formData = ref({
  username: '',
  password: '',
})

const errors = ref({
  username: null,
  password: null
})

// validate user name
const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

// validate user password
const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

// submit form and authenticate user
const submitForm = () => {
  validateName(true)
  validatePassword(true)
  if (!errors.value.username && !errors.value.password && formData.value.username === savedUserName 
  && formData.value.password === savedPassword) {
    alert("Login successfully!")
    isAuthenticated.value = true
    router.push({name: 'About'})
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Charity Health Platform</h1>
        <p class="text-center">Let's join us!</p>
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
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
          </div>
        </form>

        <!-- Link to Sign-up -->
        <p class="text-center mt-3">
            Don't have an account? 
            <router-link to="/signin">Sign up here</router-link>.
        </p>

      </div>
    </div>
  </div>
</template>

<style scoped>
.text-center {
  text-align: center;
}

/* Adjust margin */
.mt-3 {
  margin-top: 1rem;
}

</style>
