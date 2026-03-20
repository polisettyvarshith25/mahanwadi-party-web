import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        leaders: 'Leaders',
        news: 'News',
        gallery: 'Gallery',
        volunteer: 'Volunteer',
      },
      hero: {
        title: 'For a Prosperous and Strong Nation',
        subtitle: 'Join the movement for change. Your voice, our vision.',
        cta: 'Join Us Today',
      },
      leaders: {
        title: 'Our Leaders',
        viewMore: 'View Details',
      },
      news: {
        title: 'Latest Updates',
        readMore: 'Read More',
      },
      gallery: {
        title: 'Media Gallery',
      },
      volunteer: {
        title: 'Register as a Volunteer',
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        address: 'Residential Address',
        submit: 'Register Now',
        success: 'Thank you for registering!',
      },
    },
  },
  hi: {
    translation: {
      nav: {
        home: 'होम',
        leaders: 'नेता',
        news: 'समाचार',
        gallery: 'गैलरी',
        volunteer: 'स्वयंसेवक',
      },
      hero: {
        title: 'एक समृद्ध और शक्तिशाली राष्ट्र के लिए',
        subtitle: 'परिवर्तन के आंदोलन में शामिल हों। आपकी आवाज़, हमारा दृष्टिकोण।',
        cta: 'आज ही शामिल हों',
      },
      leaders: {
        title: 'हमारे नेता',
        viewMore: 'विवरण देखें',
      },
      news: {
        title: 'नवीनतम अपडेट',
        readMore: 'अधिक पढ़ें',
      },
      gallery: {
        title: 'मीडिया गैलरी',
      },
      volunteer: {
        title: 'स्वयंसेवक के रूप में पंजीकरण करें',
        name: 'पूरा नाम',
        email: 'ईमेल पता',
        phone: 'फ़ोन नंबर',
        address: 'आवासीय पता',
        submit: 'अभी पंजीकरण करें',
        success: 'पंजीकरण करने के लिए धन्यवाद!',
      },
    },
  },
  te: {
    translation: {
      nav: {
        home: 'హోమ్',
        leaders: 'నాయకులు',
        news: 'వార్తలు',
        gallery: 'గ్యాలరీ',
        volunteer: 'స్వచ్ఛంద కార్యకర్త',
      },
      hero: {
        title: 'అభివృద్ధి చెందిన మరియు బలమైన దేశం కోసం',
        subtitle: 'మార్పు కోసం సాగుతున్న ఉద్యమంలో చేరండి. మీ గొంతుక, మా దార్శనికత.',
        cta: 'ఈరోజే చేరండి',
      },
      leaders: {
        title: 'మా నాయకులు',
        viewMore: 'వివరాలు చూడండి',
      },
      news: {
        title: 'తాజా అప్‌డేట్‌లు',
        readMore: 'మరింత చదవండి',
      },
      gallery: {
        title: 'మీడియా గ్యాలరీ',
      },
      volunteer: {
        title: 'స్వచ్ఛంద కార్యకర్తగా నమోదు చేసుకోండి',
        name: 'పూర్తి పేరు',
        email: 'ఈమెయిల్ చిరునామా',
        phone: 'ఫోన్ నంబర్',
        address: 'నివాస చిరునామా',
        submit: 'ఇప్పుడే నమోదు చేసుకోండి',
        success: 'నమోదు చేసుకున్నందుకు ధన్యవాదాలు!',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
