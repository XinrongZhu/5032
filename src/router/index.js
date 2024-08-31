import { createRouter, createWebHistory } from 'vue-router'
import SigninView from '../views/SigninView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuth } from '../router/authenticated'
import RatingView from '../views/RatingView.vue'

const { isAuthenticated } = useAuth()

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

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'About' && !isAuthenticated.value) {
    alert("You need to log in to access this page.");
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router