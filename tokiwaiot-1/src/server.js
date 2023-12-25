// server.js
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Replace these values with your own
const GOOGLE_CLIENT_ID = '1054886195040-n6ql0tqachlkie7p6jdon1hgjn274a3q.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const CALLBACK_URL = 'http://ec2-57-181-20-73.ap-northeast-1.compute.amazonaws.com:5000/auth/google/callback';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  // Verify if the user's email domain is from your organization
  const allowedDomain = 'tokiwa-corp.com'; // Replace with your organization's domain
  const userEmailDomain = profile.emails[0].value.split('@')[1];

  if (userEmailDomain === allowedDomain) {
    return done(null, profile);
  } else {
    return done(null, false, { message: 'Unauthorized domain' });
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`<h1>Hello ${req.user.displayName}</h1><a href="/logout">Logout</a>`);
  } else {
    // Display an error message if login is restricted to a specific domain
    const errorMessage = req.query.error ? `<p style="color: red;">${req.query.error}</p>` : '';
    res.send(`<h1>Login with Google</h1>${errorMessage}<a href="/auth/google">Login</a>`);
  }
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
