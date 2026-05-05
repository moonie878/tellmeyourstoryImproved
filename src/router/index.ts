import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabase'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'
import ContactView from '../views/ContactView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/story/:id',
    name: 'story-editor',
    component: () => import('../views/StoryEditorView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/PrivacyView.vue'),
  },
  {
    path: '/cookies',
    name: 'cookies',
    component: () => import('../views/CookieView.vue'),
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('../views/TermsView.vue'),
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView,
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPasswordView,
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
  },
  {
    path: '/example',
    name: 'example-story',
    component: () => import('../views/ExampleStoryView.vue'),
  },
  {
  path: '/questions-to-ask-your-parents',
  name: 'questions-to-ask-parents',
  component: () => import('../views/QuestionsToAskParentsView.vue'),
},
{
  path: '/questions-to-ask-your-mum',
  name: 'questions-to-ask-mum',
  component: () => import('../views/QuestionsToAskMumView.vue'),
},
{
  path: '/blog/questions-to-ask-your-parents',
  component: () => import('../views/BlogQuestionsView.vue'),
},
{
  path: '/questions-to-ask-your-dad',
  name: 'questions-to-ask-dad',
  component: () => import('../views/QuestionsToAskDadView.vue'),
},
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 100,
      }
    }

    return { top: 0 }
  },
})

router.beforeEach(async (to) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (to.meta.requiresAuth && !session) {
    return '/login'
  }

  return true
})

export default router