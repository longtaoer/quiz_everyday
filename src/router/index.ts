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
      path: '/quiz',
      name: 'quiz',
      component: () => import('../pages/QuizPage.vue'),
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('../pages/ResultPage.vue'),
    },
  ],
})

export default router
