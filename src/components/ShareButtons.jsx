import React from 'react';

const ShareButtons = ({ config, onCopy }) => {
  const handleWhatsAppShare = () => {
    const text = `Calculadora de Sueño: Descubre tu horario ideal para dormir y despertar basado en ciclos de 90 minutos. ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleTwitterShare = () => {
    const text = `Calculadora de Sueño: Tu horario ideal para dormir y despertar 🛏️💤 ${window.location.href}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleCopyURL = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      onCopy('URL copiada al portapapeles');
    } catch (error) {
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      onCopy('URL copiada al portapapeles');
    }
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Calculadora de Sueño',
          text: 'Descubre tu horario ideal para dormir y despertar basado en ciclos de 90 minutos.',
          url: window.location.href
        });
      } catch (error) {
        console.log('Error al compartir:', error);
      }
    } else {
      // Fallback: copiar URL
      handleCopyURL();
    }
  };

  return (
    <section className="share-buttons">
      <h3 style={{ 
        textAlign: 'center', 
        marginBottom: 'var(--space-4)', 
        color: 'var(--text)',
        fontSize: 'var(--font-size-lg)'
      }}>
        Comparte esta herramienta
      </h3>
      
      <div className="share-buttons">
        <button
          className="share-btn whatsapp"
          onClick={handleWhatsAppShare}
          aria-label="Compartir en WhatsApp"
        >
          📱 WhatsApp
        </button>
        
        <button
          className="share-btn twitter"
          onClick={handleTwitterShare}
          aria-label="Compartir en Twitter"
        >
          🐦 Twitter
        </button>
        
        <button
          className="share-btn copy"
          onClick={handleCopyURL}
          aria-label="Copiar URL"
        >
          🔗 Copiar URL
        </button>
        
        {navigator.share && (
          <button
            className="share-btn copy"
            onClick={handleWebShare}
            aria-label="Compartir"
          >
            📤 Compartir
          </button>
        )}
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: 'var(--space-4)', 
        color: 'var(--muted)',
        fontSize: 'var(--font-size-sm)'
      }}>
        💡 Comparte con amigos y familiares para que también puedan mejorar su descanso
      </div>
    </section>
  );
};

export default ShareButtons;
