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
    path: '/blog/free-memorial-slideshow-maker',
     name: 'blog-free-memorial-slideshow',
      component: () => import('../views/BlogFreeMemorialSlideshowView.vue') 
    },
{ 
  path: '/blog/funeral-slideshow-ideas',
   name: 'blog-funeral-slideshow-ideas',
    component: () => import('../views/BlogFuneralSlideshowIdeasView.vue') 
  },
  {
  path: '/account',
  name: 'account',
  component: () => import('../views/AccountView.vue'),
  meta: { requiresAuth: true }
},
{
  path: '/storyworth-alternative',
  name: 'storyworth-alternative',
  component: () => import('../views/StoryworthAlternativeView.vue')
},
{ path: '/life-story-book',                    name: 'life-story-book',                    component: () => import('../views/LifeStoryBookView.vue') },
{ path: '/memorial-book',                      name: 'memorial-book',                      component: () => import('../views/MemorialBookView.vue') },
{ path: '/christmas-gift-ideas-for-grandparents', name: 'christmas-gift-grandparents',     component: () => import('../views/ChristmasGiftGrandparentsView.vue') },
{ path: '/unique-gift-for-elderly-parents',    name: 'unique-gift-elderly-parents',        component: () => import('../views/UniqueGiftElderlyParentsView.vue') },
{
  path: '/remento-alternative',
  name: 'remento-alternative',
  component: () => import('../views/RementoAlternativeView.vue')
},
{
  path: '/christmas',
  name: 'christmas',
  component: () => import('../views/ChristmasView.vue')
},
{ 
  path: '/blog/celebration-of-life-video',
   name: 'blog-celebration-of-life-video',
    component: () => import('../views/BlogCelebrationOfLifeVideoView.vue') 
  },
  { path: '/blog/how-to-make-a-memorial-tribute-video', 
    name: 'blog-tribute-video',
    component: () => import('../views/BlogTributeVideoView.vue') 
  },
  {
  path: '/tribute',
  component: () => import('../views/TributeView.vue'),
  meta: { public: true }
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

  // ── Standalone pricing page ───────────────────────────────────────────────
  {
    path: '/pricing',
    name: 'pricing',
    component: () => import('../views/PricingView.vue'),
  },

  // ── Blog ──────────────────────────────────────────────────────────────────
  {
    path: '/blog/questions-to-ask-your-parents',
    name: 'blog-questions-to-ask-parents',
    component: () => import('../views/BlogQuestionsView.vue'),
  },
  {
    path: '/blog/how-to-record-your-parents-life-story',
    name: 'blog-how-to-record',
    component: () => import('../views/BlogHowToRecordView.vue'),
  },
  {
    path: '/blog/what-to-do-when-a-parent-wont-open-up',
    name: 'blog-wont-open-up',
    component: () => import('../views/BlogWontOpenUpView.vue'),
  },
  {
  path: '/story/share/:token',
  component: () => import('../views/StoryShareView.vue'),
},

  // ── Redirects ─────────────────────────────────────────────────────────────
  {
    path: '/questions-to-ask-your-parents',
    redirect: '/blog/questions-to-ask-your-parents',
  },
  { path: '/price', redirect: '/pricing' },
  { path: '/plan', redirect: '/pricing' },
  { path: '/plans', redirect: '/pricing' },
  { path: '/subscriptions', redirect: '/pricing' },
  { path: '/billing', redirect: '/pricing' },
  { path: '/listen/:id', name: 'listen', component: () => import('../views/ListenView.vue') },
  { path: '/gift', component: () => import('../views/GiftView.vue') },
{ path: '/gift/redeem/:token', component: () => import('../views/GiftRedeemView.vue') },
{ path: '/fathers-day', component: () => import('../views/FathersDayView.vue') },

  // ── SEO landing pages ─────────────────────────────────────────────────────
  {
    path: '/questions-to-ask-your-mum',
    name: 'questions-to-ask-mum',
    component: () => import('../views/QuestionsToAskMumView.vue'),
  },
  {
    path: '/questions-to-ask-your-dad',
    name: 'questions-to-ask-dad',
    component: () => import('../views/QuestionsToAskDadView.vue'),
  },
  {
    path: '/questions-to-ask-your-grandma',
    name: 'questions-to-ask-grandma',
    component: () => import('../views/QuestionsToAskGrandmaView.vue'),
  },
  {
    path: '/questions-to-ask-your-grandparents',
    name: 'questions-to-ask-grandparents',
    component: () => import('../views/QuestionsToAskGrandparentsView.vue'),
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
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth',
            top: 80,
          })
        }, 500)
      })
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