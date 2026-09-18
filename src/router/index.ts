import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { supabase } from '../lib/supabase'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'
import ContactView from '../views/ContactView.vue'

/**
 * Every public route here is prerendered and added to the sitemap
 * automatically (see scripts/prerender.mjs). No list to maintain.
 *
 * Excluded automatically: dynamic routes (:id), redirects, requiresAuth,
 * and anything in NOINDEX_PREFIXES in composables/useSeo.ts.
 * To exclude a public page by hand: meta: { prerender: false }.
 */
const routes: RouteRecordRaw[] = [
  // ── Core ──────────────────────────────────────────────────────────────────
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
  { path: '/pricing', name: 'pricing', component: () => import('../views/PricingView.vue') },
  { path: '/example', name: 'example-story', component: () => import('../views/ExampleStoryView.vue') },
  { path: '/gift', name: 'gift', component: () => import('../views/GiftView.vue') },
  { path: '/tribute', name: 'tribute', component: () => import('../views/TributeView.vue'), meta: { public: true } },
  { path: '/my-story', name: 'my-story', component: () => import('../views/MyStoryView.vue'), meta: { seo: { title: 'My Story — Tell Me Your Story' } } },
  { path: '/help', name: 'help', component: () => import('../views/HelpVideosView.vue'), meta: { seo: { title: 'Help & Guides — Tell Me Your Story' } } },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/christmas', name: 'christmas', component: () => import('../views/ChristmasView.vue') },
  { path: '/fathers-day', name: 'fathers-day', component: () => import('../views/FathersDayView.vue') },

  // ── Legal ─────────────────────────────────────────────────────────────────
  { path: '/privacy', name: 'privacy', component: () => import('../views/PrivacyView.vue') },
  { path: '/cookies', name: 'cookies', component: () => import('../views/CookieView.vue') },
  { path: '/terms', name: 'terms', component: () => import('../views/TermsView.vue') },

  // ── Auth (noindex, not prerendered) ───────────────────────────────────────
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
  { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue') },
  { path: '/forgot-password', name: 'forgot-password', component: ForgotPasswordView },
  { path: '/reset-password', name: 'reset-password', component: ResetPasswordView },

  // ── App (logged in) ───────────────────────────────────────────────────────
  { path: '/dashboard', name: 'dashboard', component: () => import('../views/DashboardView.vue'), meta: { requiresAuth: true } },
  { path: '/account', name: 'account', component: () => import('../views/AccountView.vue'), meta: { requiresAuth: true } },
  { path: '/story/:id', name: 'story-editor', component: () => import('../views/StoryEditorView.vue'), meta: { requiresAuth: true } },

  // ── Shared / private links (noindex) ──────────────────────────────────────
  { path: '/story/share/:token', name: 'story-share', component: () => import('../views/StoryShareView.vue') },
  { path: '/listen/:id', name: 'listen', component: () => import('../views/ListenView.vue') },
  { path: '/gift/redeem/:token', name: 'gift-redeem', component: () => import('../views/GiftRedeemView.vue') },

  // ── Blog ──────────────────────────────────────────────────────────────────
  { path: '/blog/questions-to-ask-your-parents', name: 'blog-questions-to-ask-parents', component: () => import('../views/BlogQuestionsView.vue') },
  { path: '/blog/how-to-record-your-parents-life-story', name: 'blog-how-to-record', component: () => import('../views/BlogHowToRecordView.vue') },
  { path: '/blog/what-to-do-when-a-parent-wont-open-up', name: 'blog-wont-open-up', component: () => import('../views/BlogWontOpenUpView.vue') },
  { path: '/blog/free-memorial-slideshow-maker', name: 'blog-free-memorial-slideshow', component: () => import('../views/BlogFreeMemorialSlideshowView.vue') },
  { path: '/blog/funeral-slideshow-ideas', name: 'blog-funeral-slideshow-ideas', component: () => import('../views/BlogFuneralSlideshowIdeasView.vue') },
  { path: '/blog/celebration-of-life-video', name: 'blog-celebration-of-life-video', component: () => import('../views/BlogCelebrationOfLifeVideoView.vue') },
  { path: '/blog/how-to-make-a-memorial-tribute-video', name: 'blog-tribute-video', component: () => import('../views/BlogTributeVideoView.vue') },

  // ── Comparisons & reviews ─────────────────────────────────────────────────
  { path: '/storyworth-alternative', name: 'storyworth-alternative', component: () => import('../views/StoryworthAlternativeView.vue') },
  { path: '/storyworth-review', name: 'storyworth-review', component: () => import('../views/StoryworthReviewView.vue') },
  { path: '/storyworth-vs-tellmeyourstory', name: 'storyworth-vs-tellmeyourstory', component: () => import('../views/StoryworthVsTellMeYourStoryView.vue') },
  { path: '/storyworth-vs-remento', name: 'storyworth-vs-remento', component: () => import('../views/StoryworthVsRementoView.vue') },
  { path: '/remento-alternative', name: 'remento-alternative', component: () => import('../views/RementoAlternativeView.vue') },
  { path: '/remento-review', name: 'remento-review', component: () => import('../views/RementoReviewView.vue') },
  { path: '/remento-vs-tellmeyourstory', name: 'remento-vs-tellmeyourstory', component: () => import('../views/RementoVsTellMeYourStoryView.vue') },
  { path: '/storykeeper-review', name: 'storykeeper-review', component: () => import('../views/StorykeeperReviewView.vue') },
  { path: '/storykeeper-alternative', name: 'storykeeper-alternative', component: () => import('../views/StorykeeperAlternativeView.vue') },
  { path: '/storykeeper-vs-storyworth', name: 'storykeeper-vs-storyworth', component: () => import('../views/StorykeeperVsStoryworthView.vue') },
  { path: '/best-memory-book-apps-uk', name: 'best-memory-book-apps-uk', component: () => import('../views/BestMemoryBookAppsView.vue') },
  { path: '/memory-book-vs-memory-box', name: 'memory-book-vs-memory-box', component: () => import('../views/MemoryBookVsMemoryBoxView.vue') },

  // ── Questions guides ──────────────────────────────────────────────────────
  // NOTE: /questions-to-ask-your-mum, -dad and -grandma were each defined twice.
  // Vue Router uses the FIRST match, so these views are the live ones.
  // QuestionsToAskMumView.vue and QuestionsToAskDadView.vue were never shown.
  { path: '/questions-to-ask-your-mum', name: 'questions-to-ask-mum', component: () => import('../views/QuestionsToAskYourMumView.vue') },
  { path: '/questions-to-ask-your-dad', name: 'questions-to-ask-dad', component: () => import('../views/QuestionsToAskYourDadView.vue') },
  { path: '/questions-to-ask-your-grandma', name: 'questions-to-ask-grandma', component: () => import('../views/QuestionsToAskGrandmaView.vue') },
  { path: '/questions-to-ask-your-grandad', name: 'questions-to-ask-grandad', component: () => import('../views/QuestionsToAskGrandadView.vue') },
  { path: '/questions-to-ask-your-grandparents', name: 'questions-to-ask-grandparents', component: () => import('../views/QuestionsToAskGrandparentsView.vue') },
  { path: '/questions-to-ask-elderly-parents', name: 'questions-elderly-parents', component: () => import('../views/QuestionsToAskElderlyParentsView.vue') },
  { path: '/questions-to-ask-dying-parent', name: 'questions-dying-parent', component: () => import('../views/QuestionsToAskDyingParentView.vue') },
  { path: '/end-of-life-questions-to-ask-parents', name: 'end-of-life-questions-to-ask-parents', component: () => import('../views/EndOfLifeQuestionsToAskParentsView.vue') },
  { path: '/questions-about-childhood', name: 'questions-about-childhood', component: () => import('../views/QuestionsAboutChildhoodView.vue') },
  { path: '/questions-about-family-history', name: 'questions-about-family-history', component: () => import('../views/QuestionsAboutFamilyHistoryView.vue') },
  { path: '/life-story-questions', name: 'life-story-questions', component: () => import('../views/LifeStoryQuestionsView.vue') },
  { path: '/life-story-interview-questions', name: 'life-story-interview-questions', component: () => import('../views/LifeStoryInterviewQuestionsView.vue') },
  { path: '/oral-history-questions', name: 'oral-history-questions', component: () => import('../views/OralHistoryQuestionsView.vue') },
  { path: '/resources/50-questions-printable', name: 'free-questions-download', component: () => import('../views/FreeQuestionsDownloadView.vue') },

  // ── How-to guides ─────────────────────────────────────────────────────────
  { path: '/how-to-write-a-life-story', name: 'how-to-write-a-life-story', component: () => import('../views/HowToWriteALifeStoryView.vue') },
  { path: '/how-to-capture-parents-life-story', name: 'how-to-capture-parents-life-story', component: () => import('../views/HowToCaptureParentsLifeStoryView.vue') },
  { path: '/how-to-record-grandparents-story', name: 'how-to-record-grandparents-story', component: () => import('../views/HowToRecordGrandparentsStoryView.vue') },
  { path: '/how-to-write-an-obituary', name: 'how-to-write-an-obituary', component: () => import('../views/HowToWriteAnObituaryView.vue') },
  { path: '/write-your-own-life-story', name: 'write-your-own-life-story', component: () => import('../views/WriteYourOwnLifeStoryView.vue') },
  { path: '/legacy-letter-to-children', name: 'legacy-letter-to-children', component: () => import('../views/LegacyLetterToChildrenView.vue') },

  // ── Product-type pages ────────────────────────────────────────────────────
  { path: '/life-story-book', name: 'life-story-book', component: () => import('../views/LifeStoryBookView.vue') },
  { path: '/what-is-a-life-story-book', name: 'what-is-a-life-story-book', component: () => import('../views/WhatIsALifeStoryBookView.vue') },
  { path: '/tell-me-your-story-journal-alternative', name: 'journal-alternative', component: () => import('../views/JournalAlternativeView.vue') },
  { path: '/life-story-journal', name: 'life-story-journal', component: () => import('../views/LifeStoryJournalView.vue') },
  { path: '/life-story-video', name: 'life-story-video', component: () => import('../views/LifeStoryVideoView.vue') },
  { path: '/keepsake-book', name: 'keepsake-book', component: () => import('../views/KeepsakeBookView.vue') },
  { path: '/memorial-book', name: 'memorial-book', component: () => import('../views/MemorialBookView.vue') },
  { path: '/family-history-book', name: 'family-history-book', component: () => import('../views/FamilyHistoryBookView.vue') },

  // ── Care & end of life ────────────────────────────────────────────────────
  { path: '/dementia-life-story-book', name: 'dementia-life-story-book', component: () => import('../views/DementiaLifeStoryBookView.vue') },
  { path: '/life-story-work-in-care-homes', name: 'life-story-work-in-care-homes', component: () => import('../views/LifeStoryWorkInCareHomesView.vue') },
  { path: '/reminiscence-therapy-life-story', name: 'reminiscence-therapy-life-story', component: () => import('../views/ReminiscenceTherapyLifeStoryView.vue') },
  { path: '/end-of-life-gift', name: 'end-of-life-gift', component: () => import('../views/EndOfLifeGiftView.vue') },
  { path: '/bereavement-gift-ideas', name: 'bereavement-gift-ideas', component: () => import('../views/BereavementGiftIdeasView.vue') },

  // ── Gift occasions ────────────────────────────────────────────────────────
  {
    path: '/christmas-gifts-for-grandparents',
    name: 'christmas-gifts-grandparents',
    component: () => import('../views/ChristmasGiftsGrandparentsView.vue'),
    meta: { seo: { title: 'Christmas Gifts for Grandparents — Their Life Story in Their Own Voice' } },
  },
  {
    path: '/christmas-gift-for-parents-who-have-everything',
    name: 'christmas-gift-parents-have-everything',
    component: () => import('../views/ChristmasGiftParentsHaveEverythingView.vue'),
    meta: { seo: { title: 'Christmas Gifts for Parents Who Have Everything | Tell Me Your Story' } },
  },
  {
    path: '/meaningful-christmas-gifts',
    name: 'meaningful-christmas-gifts',
    component: () => import('../views/MeaningfulChristmasGiftsView.vue'),
    meta: { seo: { title: 'Meaningful Christmas Gifts — 8 Ideas That Get Kept | Tell Me Your Story' } },
  },
  { path: '/unique-gift-for-elderly-parents', name: 'unique-gift-elderly-parents', component: () => import('../views/UniqueGiftElderlyParentsView.vue') },
  { path: '/gifts-for-parents-who-have-everything', name: 'gifts-for-parents-who-have-everything', component: () => import('../views/GiftsForParentsWhoHaveEverythingView.vue') },
  { path: '/gift-for-someone-who-has-everything', name: 'gift-for-someone-who-has-everything', component: () => import('../views/GiftForSomeoneWhoHasEverythingView.vue') },
  { path: '/personalised-gift-for-grandparents', name: 'personalised-gift-for-grandparents', component: () => import('../views/PersonalisedGiftForGrandparentsView.vue') },
  { path: '/mothers-day-gift-ideas', name: 'mothers-day-gift-ideas', component: () => import('../views/MothersDayGiftView.vue') },
  { path: '/fathers-day-gift-for-grandad', name: 'fathers-day-gift-for-grandad', component: () => import('../views/FathersDayGiftGrandadView.vue') },
  { path: '/anniversary-gift-ideas', name: 'anniversary-gift-ideas', component: () => import('../views/AnniversaryGiftView.vue') },
  { path: '/60th-birthday-gift-ideas', name: '60th-birthday-gift', component: () => import('../views/SixtyBirthdayGiftView.vue') },
  { path: '/70th-birthday-gift-ideas', name: '70th-birthday-gift', component: () => import('../views/SeventyBirthdayGiftView.vue') },
  { path: '/80th-birthday-gift-ideas', name: '80th-birthday-gift', component: () => import('../views/EightyBirthdayGiftView.vue') },
  { path: '/90th-birthday-gift-ideas', name: '90th-birthday-gift', component: () => import('../views/NinetyBirthdayGiftView.vue') },

  // ── Redirects (also add as real 301s in vercel.json) ──────────────────────
  // Same view was served at two URLs — duplicate content. Keep one.
  { path: '/christmas-gift-ideas-for-grandparents', redirect: '/christmas-gifts-for-grandparents' },
  { path: '/questions-to-ask-your-parents', redirect: '/blog/questions-to-ask-your-parents' },
  { path: '/price', redirect: '/pricing' },
  { path: '/plan', redirect: '/pricing' },
  { path: '/plans', redirect: '/pricing' },
  { path: '/subscriptions', redirect: '/pricing' },
  { path: '/billing', redirect: '/pricing' },

  // ── 404 (must be last) ────────────────────────────────────────────────────
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ el: to.hash, behavior: 'smooth', top: 80 })
        }, 500)
      })
    }

    return { top: 0 }
  },
})

// Only touch Supabase when the route actually needs a login.
router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return { path: '/login', query: { redirect: to.fullPath } }
  return true
})

export default router