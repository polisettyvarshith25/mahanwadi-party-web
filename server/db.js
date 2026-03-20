const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'party.db'));

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_en TEXT,
    title_hi TEXT,
    title_te TEXT,
    content_en TEXT,
    content_hi TEXT,
    content_te TEXT,
    image_url TEXT,
    date TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS leaders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_en TEXT,
    name_hi TEXT,
    name_te TEXT,
    position_en TEXT,
    position_hi TEXT,
    position_te TEXT,
    description_en TEXT,
    description_hi TEXT,
    description_te TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    url TEXT,
    thumbnail_url TEXT,
    caption_en TEXT,
    caption_hi TEXT,
    caption_te TEXT
  );

  CREATE TABLE IF NOT EXISTS volunteers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    subscribed_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed Data
const seedLeaders = [
  {
    name_en: 'Hon. Hari Om Singh Kushwaha',
    name_hi: 'मा. हरिओम सिंह कुशवाहा',
    name_te: 'గౌరవనీయులు హరి ఓం సింగ్ కుష్వాహా',
    position_en: 'National Patron',
    position_hi: 'राष्ट्रीय संरक्षक',
    position_te: 'జాతీయ పోషకుడు',
    description_en: 'Dedicated to public safety and strengthening the organization.',
    description_hi: 'सार्वजनिक सुरक्षा और संगठन को मजबूत करने के लिए समर्पित।',
    description_te: 'ప్రజా భద్రత మరియు సంస్థను బలోపేతం చేయడానికి అంకితభావంతో పనిచేస్తున్నారు.',
    image_url: 'https://mahanwadiparty.org/assets/leader_img/Hari_om.jpeg'
  },
  {
    name_en: 'Hon. Major Suresh Singh Shakya',
    name_hi: 'मा. मेजर सुरेश सिंह शाक्य',
    name_te: 'గౌరవనీయులు మేజర్ సురేష్ సింగ్ శాక్యా',
    position_en: 'National President',
    position_hi: 'राष्ट्रीय अध्यक्ष',
    position_te: 'జాతీయ అధ్యక్షుడు',
    description_en: 'Nation-building through discipline and education is my mission.',
    description_hi: 'अनुशासन और शिक्षा के माध्यम से राष्ट्र निर्माण ही मेरा मिशन है।',
    description_te: 'క్రమశిక్షణ మరియు విద్య ద్వారా దేశ నిర్మాణం నా లక్ష్యం.',
    image_url: 'https://mahanwadiparty.org/assets/leader_img/Suresh%20sakhya.jpeg'
  },
  {
    name_en: 'Hon. Harish Lodhi',
    name_hi: 'मा. हरीश लोधी',
    name_te: 'గౌరవనీయులు హరీష్ లోధి',
    position_en: 'National General Secretary',
    position_hi: 'राष्ट्रीय महासचिव',
    position_te: 'జాతీయ ప్రధాన కార్యదర్శి',
    description_en: 'Dedicated to public welfare.',
    description_hi: 'जनकल्याण के लिए समर्पित।',
    description_te: 'ప్రజా సంక్షేమానికి అంకితభావంతో పనిచేస్తున్నారు.',
    image_url: 'https://mahanwadiparty.org/assets/leader_img/harish%20lodhi.jpeg'
  },
  {
    name_en: 'Dr. Praveen Kushwaha',
    name_hi: 'डॉ. प्रवीण कुशवाहा',
    name_te: 'డాక్టర్ ప్రవీణ్ కుష్వాహా',
    position_en: 'National Vice President',
    position_hi: 'राष्ट्रीय उपाध्यक्ष',
    position_te: 'జాతీయ ఉపాధ్యక్షుడు',
    description_en: 'Educationist and social worker, a guiding force for youth.',
    description_hi: 'शिक्षाविद् और सामाजिक कार्यकर्ता, युवाओं के लिए एक मार्गदर्शक शक्ति।',
    description_te: 'విద్యావేత్త మరియు సామాజిక కార్యకర్త, యువతకు మార్గదర్శక శక్తి.',
    image_url: 'https://mahanwadiparty.org/assets/leader_img/Dr_praveen.jpeg'
  },
  {
    name_en: 'Hon. Jagveer Singh',
    name_hi: 'मा. जगवीर सिंह',
    name_te: 'గౌరవనీయులు జగవీర్ సింగ్',
    position_en: 'Secretary',
    position_hi: 'सचिव',
    position_te: 'కార్యదర్శి',
    description_en: 'Lasting change in society is possible only through organizational strength.',
    description_hi: 'समाज में स्थायी परिवर्तन संगठनात्मक शक्ति के माध्यम से ही संभव है।',
    description_te: 'సంస్థాగత బలం ద్వారానే సమాజంలో శాశ్వత మార్పు సాధ్యమవుతుంది.',
    image_url: 'https://mahanwadiparty.org/assets/leader_img/Jagveer_singh.jpeg'
  },
  {
    name_en: 'Hon. Anil Rathore',
    name_hi: 'मा. अनिल राठौर',
    name_te: 'గౌరవనీయులు అనిల్ రాథోడ్',
    position_en: 'National Spokesperson',
    position_hi: 'राष्ट्रीय प्रवक्ता',
    position_te: 'జాతీయ ప్రతినిధి',
    description_en: 'An energetic spokesperson who strongly represents the voice of the people.',
    description_hi: 'एक ऊर्जावान प्रवक्ता जो जनता की आवाज का मजबूती से प्रतिनिधित्व करते हैं।',
    description_te: 'ప్రజల గళాన్ని బలంగా వినిపించే శక్తివంతమైన ప్రతినిధి.',
    image_url: 'https://mahanwadiparty.org/assets/leader_img/Anil%20Kumar%20Rathore.jpeg'
  }
];

const seedNews = [
  {
    title_en: 'Mega Rally in Hyderabad',
    title_hi: 'हैदराबाद में विशाल रैली',
    title_te: 'హైదరాబాద్‌లో భారీ ర్యాలీ',
    content_en: 'Thousands gathered to support the vision of a new era.',
    content_hi: 'नए युग के दृष्टिकोण का समर्थन करने के लिए हजारों लोग एकत्रित हुए।',
    content_te: 'కొత్త యుగం యొక్క దృష్టికి మద్దతు ఇవ్వడానికి వేలాది మంది ప్రజలు గుమిగూడారు.',
    image_url: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&q=80&w=800'
  },
  {
    title_en: 'New Education Policy Released',
    title_hi: 'नई शिक्षा नीति जारी',
    title_te: 'కొత్త విద్యా విధానం విడుదల',
    content_en: 'We aim to provide free quality education to every child.',
    content_hi: 'हमारा लक्ष्य हर बच्चे को मुफ्त गुणवत्तापूर्ण शिक्षा प्रदान करना है।',
    content_te: 'ప్రతి బిడ్డకు ఉచిత నాణ్యమైన విద్యను అందించడమే మా లక్ష్యం.',
    image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800'
  }
];

const seedGallery = [
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=cover&q=80&w=400',
    caption_en: 'Youth Interaction Session',
    caption_hi: 'युवा संवाद सत्र',
    caption_te: 'యువజన ముఖాముఖి కార్యక్రమం'
  },
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1464692805480-a69dfaafdb0d?auto=format&fit=crop&q=80&w=800',
    thumbnail_url: 'https://images.unsplash.com/photo-1464692805480-a69dfaafdb0d?auto=format&fit=cover&q=80&w=400',
    caption_en: 'Community Development Program',
    caption_hi: 'सामुदायिक विकास कार्यक्रम',
    caption_te: 'కమ్యూనిటీ డెవలప్‌మెంట్ ప్రోగ్రామ్'
  }
];

function seed() {
  const leaderCount = db.prepare('SELECT COUNT(*) as count FROM leaders').get().count;
  if (leaderCount === 0) {
    const insertLeader = db.prepare(`
      INSERT INTO leaders (name_en, name_hi, name_te, position_en, position_hi, position_te, description_en, description_hi, description_te, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    seedLeaders.forEach(l => insertLeader.run(l.name_en, l.name_hi, l.name_te, l.position_en, l.position_hi, l.position_te, l.description_en, l.description_hi, l.description_te, l.image_url));
  }

  const newsCount = db.prepare('SELECT COUNT(*) as count FROM news').get().count;
  if (newsCount === 0) {
    const insertNews = db.prepare(`
      INSERT INTO news (title_en, title_hi, title_te, content_en, content_hi, content_te, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    seedNews.forEach(n => insertNews.run(n.title_en, n.title_hi, n.title_te, n.content_en, n.content_hi, n.content_te, n.image_url));
  }

  const galleryCount = db.prepare('SELECT COUNT(*) as count FROM gallery').get().count;
  if (galleryCount === 0) {
    const insertGallery = db.prepare(`
      INSERT INTO gallery (type, url, thumbnail_url, caption_en, caption_hi, caption_te)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    seedGallery.forEach(g => insertGallery.run(g.type, g.url, g.thumbnail_url, g.caption_en, g.caption_hi, g.caption_te));
  }
}

seed();

module.exports = db;
