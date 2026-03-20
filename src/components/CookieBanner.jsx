import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'cookies_consent';

function loadThirdPartyScripts() {
  // Google Analytics GA4
  if (!document.getElementById('ga-script')) {
    const s = document.createElement('script');
    s.id = 'ga-script';
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-LRMP9LBLRR';
    document.head.appendChild(s);
  }
  // AdSense
  if (!document.getElementById('adsense-script')) {
    const a = document.createElement('script');
    a.id = 'adsense-script';
    a.async = true;
    a.crossOrigin = 'anonymous';
    a.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6578039396347330';
    document.head.appendChild(a);
  }
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setVisible(true);
    } else if (saved === 'all') {
      loadThirdPartyScripts();
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'all');
    loadThirdPartyScripts();
    setVisible(false);
  }

  function handleReject() {
    localStorage.setItem(STORAGE_KEY, 'essential');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Consentimiento de cookies">
      <p className="cookie-text">
        Usamos cookies propias y de terceros (Google Analytics, Google AdSense) para mejorar
        el servicio y mostrarte publicidad contextual.{' '}
        <Link to="/cookies">Más información</Link>.
      </p>
      <div className="cookie-actions">
        <button className="cookie-btn-reject" onClick={handleReject}>
          Solo esenciales
        </button>
        <button className="cookie-btn-accept" onClick={handleAccept}>
          Aceptar todas
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;
