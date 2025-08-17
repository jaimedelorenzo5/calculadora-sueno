import React from 'react';

const AdSlot = () => {
  return (
    <div className="ad-slot">
      <div style={{ textAlign: 'center' }}>
        <p>📢 Espacio publicitario</p>
        <small style={{ fontSize: 'var(--font-size-xs)' }}>
          Para insertar AdSense, añade el script en el HTML y reemplaza este div
        </small>
      </div>
      
      {/* 
        INSTRUCCIONES PARA ADSENSE:
        1. Añade el script de AdSense en el <head> del index.html
        2. Reemplaza este div con: <ins className="adsbygoogle" data-ad-client="..." data-ad-slot="..." data-ad-format="auto" data-full-width-responsive="true"></ins>
        3. Ejecuta: (adsbygoogle = window.adsbygoogle || []).push({});
        
        Este placeholder tiene height fijo para evitar CLS (Cumulative Layout Shift)
      */}
    </div>
  );
};

export default AdSlot;
