---
title: Contact Us
layout: base.njk
permalink: /contact/
---

## Contact Us

Have a question about the campaign, or want to get involved? Drop us a message and we'll get back to you.

<!-- Hidden form for Netlify Forms detection at build time -->
<form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
  <input name="name">
  <input name="email">
  <textarea name="message"></textarea>
</form>

<form id="contact-form" class="contact-form" novalidate>
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="6" required></textarea>
  </div>
  <div class="cf-turnstile" data-sitekey="{{ site.turnstileSiteKey }}" data-theme="light"></div>
  <div id="form-status" class="form-status" hidden></div>
  <button type="submit" class="cta-button">Send Message</button>
</form>

<script>
  document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    var form = this;
    var btn = form.querySelector('button[type="submit"]');
    var status = document.getElementById('form-status');
    var name = form.querySelector('#name').value.trim();
    var email = form.querySelector('#email').value.trim();
    var message = form.querySelector('#message').value.trim();
    var turnstileToken = form.querySelector('[name="cf-turnstile-response"]');

    if (!name || !email || !message) {
      status.hidden = false;
      status.className = 'form-status form-status--error';
      status.textContent = 'Please fill in all fields.';
      return;
    }

    if (!turnstileToken || !turnstileToken.value) {
      status.hidden = false;
      status.className = 'form-status form-status--error';
      status.textContent = 'Please complete the verification.';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.hidden = true;

    try {
      // Step 1: Verify Turnstile token server-side
      var verifyResponse = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ turnstileToken: turnstileToken.value })
      });

      var verifyResult = await verifyResponse.json();

      if (!verifyResponse.ok || !verifyResult.success) {
        throw new Error(verifyResult.error || 'Verification failed.');
      }

      // Step 2: Submit to Netlify Forms
      var formData = new URLSearchParams();
      formData.append('form-name', 'contact');
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', message);

      var formResponse = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      });

      if (!formResponse.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      form.reset();
      if (window.turnstile) turnstile.reset();
      status.hidden = false;
      status.className = 'form-status form-status--success';
      status.textContent = 'Thanks for your message! We\'ll be in touch.';
    } catch (err) {
      status.hidden = false;
      status.className = 'form-status form-status--error';
      status.textContent = err.message;
    }

    btn.disabled = false;
    btn.textContent = 'Send Message';
  });
</script>
