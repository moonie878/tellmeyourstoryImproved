<template>
  <LegalPageLayout
    title="Cookies Policy"
    last-updated="8 April 2026"
  >
    <h2>1. What are cookies?</h2>
    <p>
      Cookies are small text files stored on your device when you visit a website.
      They help websites remember information about your visit and improve your experience.
    </p>

    <h2>2. How we use cookies</h2>
    <p>We use cookies and similar technologies to:</p>
    <ul>
      <li>Keep the website functioning properly</li>
      <li>Remember preferences where relevant</li>
      <li>Understand how people use the site, if analytics cookies are accepted</li>
    </ul>

    <h2>3. Types of cookies we use</h2>
    <h3>Essential cookies</h3>
    <p>
      These are required for the website and app to function correctly, such as authentication,
      security, and session handling.
    </p>

    <h3>Analytics cookies</h3>
    <p>
      These help us understand usage patterns so we can improve the product. We only use these
      where consent has been given.
    </p>

    <h2>4. Managing your choices</h2>
    <p>
      You can manage your cookie preferences using our cookie banner when you first visit the site.
      You can also control cookies through your browser settings.
    </p>

    <h2>5. Third-party services</h2>
    <p>
      We may use trusted third-party providers such as Stripe, Supabase, Vercel, or analytics tools.
      These services may place cookies or use similar technologies where necessary.
    </p>

    <h2>6. Changes to this policy</h2>
    <p>
      We may update this Cookies Policy from time to time. Continued use of the service after changes
      are published means you accept the updated version.
    </p>

    <h2>7. Contact</h2>
    <p>
      If you have any questions about our use of cookies, contact us at
      <a href="mailto:hello@tellmeyourstory.uk">hello@tellmeyourstory.uk</a>.
    </p>
  </LegalPageLayout>
</template>

<script setup lang="ts">
import LegalPageLayout from '../components/legal/LegalPageLayout.vue'
import { useSeo } from '../composables/useSeo'
useSeo({
  title: 'Cookies Policy | Tell Me Your Story',
  description: 'Read the Tell Me Your Story cookies policy and learn how cookies are used on the site.',
})
</script>