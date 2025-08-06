import { createRouter, createWebHistory } from 'vue-router'
import StartPage from '../pages/StartPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartPage,
    },
    {
      path: '/question1',
      name: 'question1',
      component: () => import('../pages/Question1Page.vue'),
    },
    {
      path: '/answer1',
      name: 'answer1',
      component: () => import('../pages/Answer1Page.vue'),
    },
    {
      path: '/question2',
      name: 'question2',
      component: () => import('../pages/Question2Page.vue'),
    },
    {
      path: '/answer2',
      name: 'answer2',
      component: () => import('../pages/Answer2Page.vue'),
    },
    {
      path: '/summary',
      name: 'summary',
      component: () => import('../pages/SummaryPage.vue'),
    },
  ],
})

export default router
