---
title: Join
layout: base.njk
permalink: /join/
---

## Join Tram Trains for Edinburgh

We welcome anyone who shares our vision for better public transport in Edinburgh. Whether you want to attend meetings, help with campaigning, or simply lend your name to the cause, your support makes a difference.

As a member, you get to help decide strategy, attend member meetings several times a year, and find out more about how communities get around the city. Membership costs just £10 per annum.

### Aims and Objectives

The aims of Tram Trains for Edinburgh will be:

- Generally to promote the construction and use of public transport in Edinburgh by the use of tram-train technology, and to integrate such developments with the existing tram and/or rail networks
- To promote the reopening of the 'South Suburban' railway for use by passenger traffic, together with any extensions or connections to the route, which integrate the route with existing or planned public transport developments
- To campaign and generally persuade and engage with the residents, businesses, educational institutions, political parties and other lobby groups, in order to promote the reopening of the South Suburban railway by the use of tram-train technology
- To encourage and support the City Council, Transport Scotland, the Scottish Government and UK Government (and other regional bodies as appropriate, such as SESTran) to plan, develop and finance the public transport developments referred to above. This shall include participation in, submitting evidence to, or offering detailed expertise to, any relevant feasibility study or analysis carried out by or on behalf of any of the organisations listed above

### Membership conditions

Membership is open to anyone who fulfils the 3 following conditions:

- Supports the aims of Tram Trains for Edinburgh and pays the relevant subscription fee
- Is aged at least 16 years old, and agrees to abide by Constitution of the organisation
- Lives in Edinburgh, the Lothians, Fife or Borders (or has a practical connection with the City, to the satisfaction of the Committee)

### Equal Opportunities

The Group will not discriminate on the grounds of sex, race (including colour, ethnic or national origin), sexual orientation, disability, gender reassignment, religious or political belief, pregnancy or maternity, marital status or age.

Please complete the form below to join.

<form id="membership-form" class="contact-form" novalidate>
  <div class="form-row">
    <div class="form-group form-group--half">
      <label for="join-first-name">First Name</label>
      <input type="text" id="join-first-name" name="first-name" required>
    </div>
    <div class="form-group form-group--half">
      <label for="join-last-name">Last Name</label>
      <input type="text" id="join-last-name" name="last-name" required>
    </div>
  </div>
  <div class="form-group">
    <label for="join-email">Email Address</label>
    <input type="email" id="join-email" name="email" required>
  </div>
  <div class="form-group">
    <label for="join-address-1">Address Line 1</label>
    <input type="text" id="join-address-1" name="address-line-1" autocomplete="address-line1">
  </div>
  <div class="form-group">
    <label for="join-address-2">Address Line 2</label>
    <input type="text" id="join-address-2" name="address-line-2" autocomplete="address-line2">
  </div>
  <div class="form-row">
    <div class="form-group form-group--half">
      <label for="join-city">City / Town</label>
      <input type="text" id="join-city" name="city" autocomplete="address-level1">
    </div>
    <div class="form-group form-group--half">
      <label for="join-postcode">Postcode</label>
      <input type="text" id="join-postcode" name="postcode" autocomplete="postal-code">
    </div>
  </div>
  <div class="form-group form-group--checkbox">
    <label>
      <input type="checkbox" id="join-agree" name="agree-aims" required>
      I agree with the Membership Conditions of Tram Trains for Edinburgh
    </label>
  </div>
  <div class="cf-turnstile" data-sitekey="{{ site.turnstileSiteKey }}" data-theme="light"></div>
  <div id="join-status" class="form-status" hidden></div>
  <button type="submit" class="cta-button">Join Us</button>
</form>

<script>
  document.getElementById('membership-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    var form = this;
    var btn = form.querySelector('button[type="submit"]');
    var status = document.getElementById('join-status');
    var firstName = form.querySelector('#join-first-name').value.trim();
    var lastName = form.querySelector('#join-last-name').value.trim();
    var email = form.querySelector('#join-email').value.trim();
    var agreeChecked = form.querySelector('#join-agree').checked;
    var turnstileToken = form.querySelector('[name="cf-turnstile-response"]');

    if (!firstName || !lastName || !email) {
      status.hidden = false;
      status.className = 'form-status form-status--error';
      status.textContent = 'Please enter your name and email address.';
      return;
    }

    if (!agreeChecked) {
      status.hidden = false;
      status.className = 'form-status form-status--error';
      status.textContent = 'Please agree to the Membership Conditions to join.';
      return;
    }

    if (!turnstileToken || !turnstileToken.value) {
      status.hidden = false;
      status.className = 'form-status form-status--error';
      status.textContent = 'Please complete the verification.';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Submitting…';
    status.hidden = true;

    try {
      var response = await fetch('/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          addressLine1: form.querySelector('#join-address-1').value.trim(),
          addressLine2: form.querySelector('#join-address-2').value.trim(),
          city: form.querySelector('#join-city').value.trim(),
          postcode: form.querySelector('#join-postcode').value.trim(),
          agreeAims: agreeChecked,
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
      status.textContent = 'Welcome aboard! We\'ll be in touch with details about membership.';
    } catch (err) {
      status.hidden = false;
      status.className = 'form-status form-status--error';
      status.textContent = err.message;
    }

    btn.disabled = false;
    btn.textContent = 'Join Us';
  });
</script>

<img src="/assets/images/join-murrayfield-stop.webp" alt="Murrayfield tram stop" class="page-image" loading="lazy">
