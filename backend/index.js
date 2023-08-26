const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Set up session middleware
app.use(require('express-session')({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// Initialize Passport and restore session
app.use(passport.initialize());
app.use(passport.session());

// Replace with your Google OAuth credentials
passport.use(new GoogleStrategy({
  clientID: '366593624634-k62cp1k2e0kv01nafpc5t12nhu2ipg9d.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
  // Use the profile information to find or create a user in your database
  // For simplicity, let's assume user information is stored in an array
  const user = {
    id: profile.id,
    displayName: profile.displayName,
    email: profile.emails[0].value
  };
  return done(null, user);
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirect or respond with token if desired
    console.log("Redirecting...")
    res.redirect('http://localhost:3011/metronic8/react/demo1/dashboard');
  });

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
