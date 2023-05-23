import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Shopping.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Book from '../views/Book.vue'
import Author from '../views/Author.vue'
import Shopping from '../views/Shopping.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/shopping',
    name: 'Shopping',
    component: Shopping
  },
  {
    path: '/authors',
    name: 'Author',
    component: Author
  },
  {
    path: '/books',
    name: 'Book',
    component: Book
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
