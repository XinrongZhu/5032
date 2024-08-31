import { createRouter, createWebHistory } from 'vue-router'
import SigninView from '../views/SigninView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuth } from '../router/authenticated'

const { isAuthenticated } = useAuth()

const routes = [
  {
    path: '/',
    name: 'Signin',
    component: SigninView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
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