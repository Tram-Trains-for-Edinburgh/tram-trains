---
title: Contact Us
layout: base.njk
permalink: /contact/
---

## Contact Us

Have a question about the campaign, or want to get involved? Drop us a message and we'll get back to you.

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
      var response = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          turnstileToken: turnstileToken.value,
        }),
      });

      var result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Something went wrong. Please try again.');
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
