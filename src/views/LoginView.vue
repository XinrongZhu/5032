<script setup>
/*
 * 
 * This component enables users to login and click link to register page.
 * 
 */
import { ref } from 'vue'
import router from '../router/index'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import db from '../firebase/init';

// Firebase instances
const auth = getAuth()
const db = getFirestore()

// reactive form data and error
const formData = ref({
  email: '',
  password: ''
})

const errors = ref({
  email: null,
  password: null,
  general: null  // for error from firebase
})

// Validate email
const validateEmail = (blur) => {
  const email = formData.value.email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(email)) {
    if (blur) errors.value.email = 'Invalid email format.'
  } else {
    errors.value.email = null
  }
}

// Validate password
const validatePassword = (blur) => {
  if (formData.value.password.length < 8) {
    if (blur) errors.value.password = 'Password must be at least 8 characters long.'
  } else {
    errors.value.password = null
  }
}

// Submit form and authenticate user
const signin = async () => {
  validateEmail(true)
  validatePassword(true)

  if (!errors.value.email && !errors.value.password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.value.email,
        formData.value.password
      )
      const user = userCredential.user

      // Get user doc from Firestore
      const userRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        const role = userDoc.data().role

        // Redirect to different page based on user role
        if (role === 'admin') {
          alert('Admin login successful!')
          router.push('/admindashboard')
        } else {
          console.log('Regular user login')
          router.push('/about')
        }
      } else {
        console.log('No role information found for this user')
      }
    } catch (error) {
      // Handle Firebase errors
      if (error.code === 'auth/wrong-password') {
        errors.value.general = 'Invalid password.'
      } else if (error.code === 'auth/user-not-found') {
        errors.value.general = 'User not found.'
      } else {
        errors.value.general = 'Login failed. Please try again.'
      }
      console.error('Error during sign in:', error.message)
    }
  }
}

// Clear the form
const clearForm = () => {
  formData.value = {
    email: '',
    password: ''
  }
  errors.value.general = null
}

// Navigate to the registration page
const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">👤 User Login</h1>
        <form @submit.prevent="signin">
          <div class="row mb-3">
            <div class="col-6">
              <label for="email" class="form-label">Email</label>
              <input
                type="text"
                class="form-control"
                id="email"
                @blur="() => validateEmail(true)"
                @input="() => validateEmail(false)"
                v-model="formData.email"
              />
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>

            <div class="col-6">
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

          <div v-if="errors.general" class="text-danger text-center mb-3">
            {{ errors.general }}
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Login</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            <button
              type="button"
              class="btn btn-link"
              @click="goToRegister"
              style="display: block; margin-top: 10px"
            >
              Register
            </button>
          </div>
        </form>
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
