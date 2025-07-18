<<<<<<< HEAD
# Portfolio
Full Stack Developer skilled in Laravel, PHP, MySQL, and front-end tech. This portfolio showcases real &amp; dummy projects, admin panels, and live sites I’ve built. Open to freelance or full-time roles. Explore my work and code style!
=======
# Contact Form Setup Instructions

> **IMPORTANT UPDATE**: The public key has been updated to "ORdIU76HbKc3IOJoX" and the service ID has been updated to "service_brydt8l", but you still need to update the template ID in script.js for the contact form to work properly. See the "Recent Fixes" section for details.

This document provides instructions on how to set up the contact form to send emails using EmailJS.

// EmailJS Setup

1. **Create an EmailJS Account**
   - Go to [EmailJS](https://www.emailjs.com/) and create a free account.

2. **Create an Email Service**
   - In your EmailJS dashboard, go to the "Email Services" tab.
   - Click "Add New Service" and select your email provider (Gmail, Outlook, etc.).
   - Follow the instructions to connect your email account.
   - Note the Service ID (e.g., `service_abc123`).

3. **Create an Email Template**
   - Go to the "Email Templates" tab.
   - Click "Create New Template".
   - Design your email template using the following variables:
     - `{{from_name}}`: The name of the person sending the message
     - `{{from_email}}`: The email address of the person sending the message
     - `{{subject}}`: The subject of the message
     - `{{message}}`: The content of the message
   - Set the "To email" field to `kvonline9878@gmail.com` (or your preferred email).
   - Note the Template ID (e.g., `template_xyz789`).

4. **Get Your Public Key**
   - Go to the "Account" tab.
   - Find your Public Key in the "API Keys" section.

// Update the Code

1. **Update index.php**
   - Open `index.php`.
   - Find the EmailJS initialization section (around line 892).
   - Replace `"public_key"` with your actual EmailJS Public Key.

2. **Update script.js**
   - Open `js/script.js`.
   - Find the EmailJS send method (around line 189).
   - Replace `'service_id'` with your actual Service ID.
   - Replace `'template_id'` with your actual Template ID.

// Recent Fixes

The following fixes have been implemented to resolve various errors:

1. **Updated EmailJS Configuration (Latest Update)**
   - Fixed "The Public Key is invalid" and "The service ID not found" errors by updating the credentials:
     - Public key in `index.php` updated to "ORdIU76HbKc3IOJoX"
     - Service ID in `script.js` updated to "service_brydt8l"
     - Template ID in `script.js` still needs to be updated from "YOUR_TEMPLATE_ID" to your actual template ID
   - You must replace all placeholder values with your actual EmailJS credentials for the form to work properly

2. **Previous Fix for "Account not found" Error**
   - Reset EmailJS credentials to placeholder values:
     - Public key in `index.php` was reset to "YOUR_PUBLIC_KEY" (now updated to "ORdIU76HbKc3IOJoX")
     - Service ID in `script.js` reset to "YOUR_SERVICE_ID" (now updated to "service_brydt8l")
     - Template ID in `script.js` reset to "YOUR_TEMPLATE_ID" (still needs updating)

3. **Improved Form Status Display**
   - Moved the form status message div to a more visible position after the submit button
   - Enhanced error messages to show more specific information about what went wrong

4. **Enhanced Error Handling**
   - Added detailed error logging to the browser console
   - Improved error message display to show specific error details when available
   - Removed unnecessary 'to_email' parameter that might have been causing conflicts

// Testing

After completing the setup:
1. Open your website.
2. Navigate to the contact form.
3. Fill out the form and submit it.
4. You should receive an email at the specified address.

// Troubleshooting

If you encounter the "Oops! Something went wrong. Please try again later." error:

1. **Check your EmailJS configuration:**
   - Verify that you've replaced all placeholder values:
     - The public key in `index.php` (updated to "ORdIU76HbKc3IOJoX")
     - The service ID in `script.js` (updated to "service_brydt8l")
     - The template ID in `script.js` (currently set to "YOUR_TEMPLATE_ID") - **NEEDS TO BE UPDATED**
   - Make sure these values match your actual EmailJS account settings.
   - If you see "Error: Account not found", it means your public key is invalid or the account doesn't exist.

2. **Check the browser console for detailed error messages:**
   - Open your browser's developer tools (F12 or right-click > Inspect)
   - Go to the Console tab
   - Look for any error messages related to EmailJS
   - The enhanced error handling will now show more specific error details.

3. **Verify your EmailJS account:**
   - Ensure your EmailJS account is active and has not exceeded the free tier limits (200 emails/month).
   - Check that your email service connection is working properly in the EmailJS dashboard.
   - Test the template directly from the EmailJS dashboard to verify it works.

4. **Check your network connection:**
   - Ensure you have a stable internet connection when testing the form.
   - Some firewalls or network restrictions might block the EmailJS service.

// Fixing "Account not found" Error

If you specifically see the "Account not found" error:

1. **Create a new EmailJS account:**
   - Go to [EmailJS](https://www.emailjs.com/) and sign up for a new account.
   - Follow the steps in the "EmailJS Setup" section above.

2. **Update your credentials:**
   - Get your new public key from the EmailJS dashboard (Account > API Keys).
   - Replace the public key in `index.php` with your new public key (currently set to "ORdIU76HbKc3IOJoX").
   - Create a new email service and note the Service ID.
   - Replace the service ID in `script.js` with your new Service ID (currently set to "service_brydt8l").
   - Create a new email template and note the Template ID.
   - Replace "YOUR_TEMPLATE_ID" in `script.js` with your new Template ID.

3. **Test the form:**
   - After updating all credentials, test the form again.
   - Check the browser console for any errors.

This error typically occurs when the EmailJS account associated with the public key no longer exists or has been deactivated.
>>>>>>> 18f18f6 (Initial commit - Portfolio)
