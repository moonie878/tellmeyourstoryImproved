<template>
  <LegalPageLayout
    title="Privacy Policy"
    last-updated="8 April 2026"
  >
    <h2>1. Introduction</h2>
    <p>
      Welcome to <strong>Tell Me Your Story</strong>. We respect your privacy and are committed
      to protecting your personal data. This policy explains how we collect, use, and store
      information when you use our website and app.
    </p>

    <h2>2. Information we collect</h2>
    <p>We may collect the following information:</p>
    <ul>
      <li>Account information, such as your email address and login details</li>
      <li>Story content, including written answers and uploaded images</li>
      <li>Usage data, such as how you interact with the app</li>
      <li>Payment-related information processed securely by Stripe</li>
    </ul>

    <h2>3. How we use your data</h2>
    <p>We use your data to:</p>
    <ul>
      <li>Provide and operate the app</li>
      <li>Save and display your stories</li>
      <li>Process purchases and upgrades</li>
      <li>Improve the experience and performance of the product</li>
      <li>Communicate important account or service updates</li>
    </ul>

    <h2>4. How your data is stored</h2>
    <p>
      Your data is stored using trusted third-party providers such as Supabase, Vercel, and Stripe.
      We take reasonable steps to protect your information and keep it secure.
    </p>

    <h2>5. Sharing your data</h2>
    <p>
      We do not sell your data. We only share your data where necessary with service providers
      that help us operate the app, such as payment, hosting, and infrastructure providers.
    </p>

    <h2>6. Your rights</h2>
    <p>You may have the right to:</p>
    <ul>
      <li>Request access to the personal data we hold about you</li>
      <li>Request correction of inaccurate data</li>
      <li>Request deletion of your data</li>
    </ul>
    <p>
      To make a request, contact us at
      <a href="mailto:hello@tellmeyourstory.uk">hello@tellmeyourstory.uk</a>.
    </p>

    <h2>7. Data retention</h2>
    <p>
      We keep your data for as long as your account remains active, unless you request deletion
      or we need to retain some information for legal, security, or accounting reasons.
    </p>

    <h2>8. Cookies</h2>
    <p>
      We use cookies for essential site functionality and, where consent is given, analytics.
      Please see our
      <router-link to="/cookies">Cookies Policy</router-link>
      for more information.
    </p>

    <h2>9. Changes to this policy</h2>
    <p>
      We may update this Privacy Policy from time to time. Continued use of the service after
      changes are published means you accept the updated policy.
    </p>

    <h2>10. Contact</h2>
    <p>
      If you have any questions about this Privacy Policy, contact us at
      <a href="mailto:hello@tellmeyourstory.uk">hello@tellmeyourstory.uk</a>.
    </p>
  </LegalPageLayout>
</template>

<script setup lang="ts">
import LegalPageLayout from '../components/legal/LegalPageLayout.vue'
import { useSeo } from '../composables/useSeo'

useSeo({
  title: 'Privacy Policy | Tell Me Your Story',
  description: 'Read the Tell Me Your Story privacy policy and learn how we collect, use, and protect your data.',
})
</script>