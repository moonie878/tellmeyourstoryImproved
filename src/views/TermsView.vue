<template>
  <LegalPageLayout
    title="Terms of Service"
    last-updated="8 April 2026"
  >
    <h2>1. Overview</h2>
    <p>
      By using <strong>Tell Me Your Story</strong>, you agree to these Terms of Service.
      If you do not agree, please do not use the service.
    </p>

    <h2>2. Use of the service</h2>
    <p>You agree to use the service lawfully and responsibly. You must not:</p>
    <ul>
      <li>Attempt to disrupt, damage, or misuse the platform</li>
      <li>Access accounts or data that do not belong to you</li>
      <li>Use the service for unlawful or abusive purposes</li>
    </ul>

    <h2>3. Your content</h2>
    <p>
      You retain ownership of the content you create, including your written stories and uploaded images.
      By using the service, you give us permission to store and process that content in order to provide
      the product to you.
    </p>

    <h2>4. Accounts</h2>
    <p>
      You are responsible for keeping your login details secure and for any activity carried out through your account.
    </p>

    <h2>5. Payments and upgrades</h2>
    <p>
      Payments are processed securely by Stripe. Access to features depends on the plan or upgrade you purchase.
      Prices may change in the future, but any changes will not affect purchases already completed.
    </p>

    <h2>6. Refunds</h2>
    <p>
      Because this is a digital product with immediate access to paid features, refunds are generally not offered
      once access has been granted, unless required by law.
    </p>

    <h2>7. Availability</h2>
    <p>
      We aim to keep the service available and functioning well, but we do not guarantee uninterrupted access,
      error-free operation, or permanent availability.
    </p>

    <h2>8. Limitation of liability</h2>
    <p>
      To the fullest extent permitted by law, we are not liable for indirect, incidental, or consequential losses,
      including loss of data, service interruption, or business loss arising from your use of the service.
    </p>

    <h2>9. Termination</h2>
    <p>
      We may suspend or terminate access if these terms are violated or if misuse of the service is detected.
    </p>

    <h2>10. Changes to these terms</h2>
    <p>
      We may update these Terms of Service from time to time. Continued use of the service after changes are published
      means you accept the updated terms.
    </p>

    <h2>11. Contact</h2>
    <p>
      If you have any questions about these terms, contact us at
      <a href="mailto:hello@tellmeyourstory.uk">hello@tellmeyourstory.uk</a>.
    </p>
  </LegalPageLayout>
</template>

<script setup lang="ts">
import LegalPageLayout from '../components/legal/LegalPageLayout.vue'
import { useSeo } from '../composables/useSeo'

useSeo({
  title: 'Terms of Service | Tell Me Your Story',
  description: 'Read the Tell Me Your Story terms of service and understand the rules for using the platform.',
})
</script>