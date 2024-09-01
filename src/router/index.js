import { createRouter, createWebHistory } from 'vue-router'
import SigninView from '../views/SigninView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuth } from '../router/authenticated'
import RatingView from '../views/RatingView.vue'

// Destructure the `isAuthenticated` variable from `useAuth` for authentication checks
const { isAuthenticated } = useAuth()

// Define application routes
const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView, 
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SigninView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/rating',
    name: 'Rating',
    component: RatingView,
  },
];

// Create a new Vue Router instance with history mode and defined routes
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for route protection
// If the user is not authenticated, they will be redirected to the Login page when trying to access the About page
router.beforeEach((to, from, next) => {
  if (to.name === 'About' && !isAuthenticated.value) {
    alert("You need to log in to access this page.");
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router