import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AddPostView from '@/views/AddPostView.vue'
import ContactView from '@/views/ContactView.vue'
import PostView from '@/views/PostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/add-post',
      name: 'addpost',
      component: AddPostView,
    },
    {
      path: '/',
      name: 'Contact',
      component: ContactView,
    },
    {
      path: '/post',
      name: 'post',
      component: PostView,
    },
  ],
})

export default router
