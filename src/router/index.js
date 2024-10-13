import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RatingView from '../views/RatingView.vue'
import AdminDashboard from '../views/Admindashboard.vue';
import SendEmail from '../views/SendEmail.vue'
import { getAuth } from 'firebase/auth';

// Define application routes
const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView, 
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/admindashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
  },
  {
    path: '/sendemail',
    name: 'SendEmail',
    component: SendEmail,
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
  }
];

// Create a new Vue Router instance with history mode and defined routes
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for route protection
// If the user is not authenticated, they will be redirected to the Login page when trying to access the About page
router.beforeEach((to, from, next) => {
  const auth = getAuth(); 
  const user = auth.currentUser;

  if (to.name === 'About' && !user) {
    alert("You need to log in to access this page.");
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;