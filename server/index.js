const express = require('express');
const cors = require('cors');
const db = require('./db');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Nodemailer Setup
let transporter;

if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_USER !== 'your-email@gmail.com') {
  // Use real SMTP (e.g. Gmail)
  transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to 'yahoo', 'outlook', etc.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  console.log('Real Email transporter configured using ' + process.env.EMAIL_USER);
} else {
  // Fallback to Ethereal Test Account
  nodemailer.createTestAccount((err, account) => {
    if (err) {
      console.error('Failed to create a testing account. ' + err.message);
      return;
    }
    transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    console.log('Ethereal Email test transporter configured. Please set EMAIL_USER and EMAIL_PASS in .env to send real emails.');
  });
}

// API Endpoints
app.get('/api/news', (req, res) => {
  try {
    const news = db.prepare('SELECT * FROM news ORDER BY date DESC').all();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/leaders', (req, res) => {
  try {
    const leaders = db.prepare('SELECT * FROM leaders').all();
    res.json(leaders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/gallery', (req, res) => {
  try {
    const gallery = db.prepare('SELECT * FROM gallery').all();
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/volunteers', (req, res) => {
  const { name, email, phone, address } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const info = db.prepare(`
      INSERT INTO volunteers (name, email, phone, address)
      VALUES (?, ?, ?, ?)
    `).run(name, email, phone, address);
    res.status(201).json({ id: info.lastInsertRowid, message: 'Successfully registered' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const info = db.prepare(`
      INSERT INTO subscriptions (email)
      VALUES (?)
    `).run(email);

    // Send Welcome Email asynchronously
    if (transporter) {
      transporter.sendMail({
        from: '"Mahanwadi Party" <newsletter@mahanwadiparty.org>',
        to: email,
        subject: "Subscription Confirmed - Mahanwadi Party",
        text: "Thank you for subscribing to the Mahanwadi Party newsletter. We'll keep you updated!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #00008b;">Welcome to Mahanwadi Party Updates!</h2>
            <p>Dear Supporter,</p>
            <p>Thank you for subscribing directly from our website.</p>
            <p>You are now on our mailing list and will receive the latest news, statements from our leaders, and volunteer opportunities.</p>
            <br/>
            <p>Best regards,<br/><strong>The Mahanwadi Party Team</strong></p>
          </div>
        `
      }, (error, mailInfo) => {
        if (error) {
          console.error("Error sending welcome email:", error);
        } else {
          console.log("Welcome email successfully sent to: %s", email);
          console.log("Email Preview URL: %s", nodemailer.getTestMessageUrl(mailInfo));
        }
      });
    }

    res.status(201).json({ id: info.lastInsertRowid, message: 'Successfully subscribed. Check your email!' });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'This email is already subscribed' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Admin endpoint (Simple implementation)
app.post('/api/admin/news', (req, res) => {
  const { title_en, title_hi, title_te, content_en, content_hi, content_te, image_url, key } = req.body;
  
  // Simple "admin" check
  if (key !== process.env.ADMIN_KEY && key !== 'admin123') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    db.prepare(`
      INSERT INTO news (title_en, title_hi, title_te, content_en, content_hi, content_te, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(title_en, title_hi, title_te, content_en, content_hi, content_te, image_url);
    res.status(201).json({ message: 'News added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static production React files
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route to serve React's index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
