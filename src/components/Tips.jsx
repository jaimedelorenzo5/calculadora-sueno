import React from 'react';

const Tips = () => {
  const tips = [
    {
      icon: '🌙',
      title: 'Mantén un horario consistente',
      description: 'Acuéstate y levántate a la misma hora todos los días, incluso los fines de semana. Esto ayuda a regular tu reloj biológico interno y mejora la calidad del sueño.'
    },
    {
      icon: '🛁',
      title: 'Crea una rutina relajante',
      description: 'Desarrolla un ritual de 30-60 minutos antes de dormir: lectura ligera, meditación, música suave o un baño caliente. Esto le dice a tu cuerpo que es hora de descansar.'
    },
    {
      icon: '❄️',
      title: 'Optimiza tu entorno',
      description: 'Mantén tu habitación fresca (18-22°C), oscura y silenciosa. Usa cortinas opacas, considera tapones para los oídos y mantén la temperatura ideal para un sueño reparador.'
    },
    {
      icon: '📱',
      title: 'Evita pantallas antes de dormir',
      description: 'La luz azul de dispositivos puede suprimir la melatonina, la hormona del sueño. Deja de usar pantallas al menos 1 hora antes de acostarte para un descanso más profundo.'
    },
    {
      icon: '🥗',
      title: 'Cuida tu alimentación',
      description: 'Evita comidas pesadas, cafeína y alcohol 3-4 horas antes de dormir. Una cena ligera y equilibrada es ideal para un sueño reparador y sin interrupciones.'
    },
    {
      icon: '🏃‍♀️',
      title: 'Haz ejercicio regular',
      description: 'La actividad física regular mejora la calidad del sueño y reduce el estrés, pero evita ejercicios intensos 3 horas antes de acostarte para no interferir con el descanso.'
    }
  ];

  return (
    <section className="tips" id="tips">
      <h2 className="section-title">Consejos para un mejor sueño</h2>
      
      {tips.map((tip, index) => (
        <div key={index} className="tip-item">
          <div style={{
            position: 'absolute',
            top: 'var(--space-4)',
            left: 'var(--space-4)',
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, var(--brand-3), var(--brand-4))',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--font-size-xl)',
            color: 'white',
            boxShadow: 'var(--shadow-md)',
            zIndex: 1
          }}>
            {tip.icon}
          </div>
          
          <div style={{ marginLeft: '70px' }}>
            <h3>{tip.title}</h3>
            <p>{tip.description}</p>
          </div>
        </div>
      ))}
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: 'var(--space-8)', 
        color: 'var(--muted)',
        fontSize: 'var(--font-size-sm)',
        padding: 'var(--space-6)',
        background: 'var(--card)',
        borderRadius: 'var(--radius)',
        border: '2px solid var(--border)',
        backdropFilter: 'blur(10px)'
      }}>
        🌟 Estos consejos te ayudarán a mejorar la calidad de tu sueño y aprovechar mejor los horarios calculados. 
        Recuerda que cada persona es diferente, así que experimenta para encontrar lo que mejor funciona para ti.
      </div>
    </section>
  );
};

export default Tips;
