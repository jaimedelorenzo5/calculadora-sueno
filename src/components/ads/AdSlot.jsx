import React from 'react';

// TODO: reemplazar con ca-pub-XXXXXXXX cuando AdSense apruebe
const ADSENSE_CLIENT = 'ca-pub-XXXXXXXX';

const slotIds = {
  'article-top':    '1111111111',
  'article-mid':    '2222222222',
  'article-bottom': '3333333333',
  'sidebar':        '4444444444',
};

function AdSlot({ slot }) {
  const consent = typeof window !== 'undefined'
    ? localStorage.getItem('cookies_consent')
    : null;

  const isProd = import.meta.env.PROD;

  // En desarrollo: mostrar placeholder visual
  if (!isProd) {
    return (
      <div className="ad-placeholder">
        AdSlot: <strong>{slot}</strong>
      </div>
    );
  }

  // En producción: solo renderizar si hay consentimiento
  if (consent !== 'all') return null;

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slotIds[slot] || '0000000000'}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

export default AdSlot;
