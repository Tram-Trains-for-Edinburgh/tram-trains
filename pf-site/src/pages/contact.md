---
title: Contact Us
layout: base.njk
permalink: /contact/
---

## Contact Us

Have a question about the campaign, or want to get involved? Drop us a message and we'll get back to you.

<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="contact-form">
  <p class="hidden-field">
    <label>Don't fill this out: <input name="bot-field"></label>
  </p>
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
  <button type="submit" class="cta-button">Send Message</button>
</form>
