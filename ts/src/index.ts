/**
 * Main application entry point.
 *
 * The following functionalities are implemented:
 * - `Register`: Displays the registration form, validates user input, and creates a new user.
 * - `Login`: Displays the login form, validates credentials, and logs the user in.
 * - `Logout`: Logs the user out and redirects to the homepage.
 * - `Request Password Reset`: Displays the request reset form and sends a password reset email.
 * - `Password Reset`: Handles the password reset form and updates the user's password.
 *
 * Middleware Used:
 * - `cors`: Enables cross-origin resource sharing (CORS).
 * - `secure`: Adds security headers to the application.
 * - `text`: Parses incoming requests as text.
 * - `cookie`: Parses cookies in the request.
 * - `json`: Parses incoming requests as JSON.
 * - `asset`: Serves static assets like images, styles, etc.
 */

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import { App } from 'bnjsx';
import { Auth } from 'bnjsx';
import { Router } from 'bnjsx';
import { text, cookie, json, asset, cors, secure } from 'bnjsx';
import { mailer } from './helpers/Mailer';

const app = new App();
const router = new Router();
const auth = Auth.break({ mailer, mode: 'smart' });

app.use(cors);
app.use(secure);
app.use(text);
app.use(cookie);
app.use(json);
app.use(asset);

router.get('/', Auth.any, async (req, res) => {
  return res.render('pages.home', { user: req.user });
});

// Register
router.get('/register', Auth.guest, async (_, res) => {
  return res.render('pages.register');
});

router.post('/register', Auth.guest, auth.register, async (req, res) => {
  if (req.errors) {
    return res.render('pages.register', {
      error: Object.values(req.errors).flat()[0],
      body: req.body,
    });
  }

  return res.redirect('/');
});

// Login
router.get('/login', Auth.guest, async (_, res) => {
  return res.render('pages.login');
});

router.post('/login', Auth.guest, auth.login, async (req, res) => {
  if (req.errors) {
    return res.render('pages.login', {
      error: Object.values(req.errors).flat()[0],
      body: req.body,
    });
  }

  return res.redirect('/');
});

// Logout
router.post('/logout', auth.logout, async (req, res) => res.redirect('/'));

// Request Reset
router.get('/request-reset', async (req, res) => {
  return res.render('pages.request_reset');
});

router.post('/request-reset', auth.requestReset, async (req, res) => {
  if (req.errors) {
    return res.render('pages.request_reset', {
      error: Object.values(req.errors).flat()[0],
      body: req.body,
    });
  }

  return res.render('pages.request_reset', {
    success: 'Check your email for a password reset link.',
  });
});

// Password Reset
router.get('/password-reset/:token', async (req, res) => {
  return res.render('pages.password_reset', { token: req.params.token });
});

router.post('/password-reset/:token', auth.passwordReset, async (req, res) => {
  if (req.errors) {
    return res.render('pages.password_reset', {
      error: Object.values(req.errors).flat()[0],
      token: req.params.token,
      body: req.body,
    });
  }

  return res.redirect('/login');
});

app.namespace('/', router);
app.start();
