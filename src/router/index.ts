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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _from, next) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (to.meta.requiresAuth && !session) {
    return '/login'
  } else {
    next()
  }
})

export default router