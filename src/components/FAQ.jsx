import React, { useState } from 'react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const faqs = [
    {
      question: '¿Cómo funciona la calculadora de sueño?',
      answer: 'La calculadora se basa en la ciencia de los ciclos de sueño. Cada ciclo dura aproximadamente 90 minutos y se compone de diferentes fases del sueño. Al despertar al final de un ciclo completo, te sentirás más descansado que si te despiertas en medio de uno.'
    },
    {
      question: '¿Cuántos ciclos de sueño necesito cada noche?',
      answer: 'La mayoría de adultos necesitan entre 4-6 ciclos completos por noche, lo que equivale a 6-9 horas de sueño. La calculadora te muestra opciones para que puedas elegir según tus necesidades individuales y horarios.'
    },
    {
      question: '¿Qué es la latencia al dormir y por qué es importante?',
      answer: 'La latencia es el tiempo que tardas en quedarte dormido desde que te acuestas. Es importante considerarla porque afecta el tiempo total de sueño. Si tardas 15 minutos en dormirte, necesitarás añadir ese tiempo a tu horario de acostarte.'
    },
    {
      question: '¿Puedo usar la calculadora para siestas?',
      answer: '¡Absolutamente! La calculadora incluye opciones para siestas de 20 minutos (energética) y 90 minutos (completa). Las siestas de 20 minutos te dan energía sin afectar el sueño nocturno, mientras que las de 90 minutos completan un ciclo completo.'
    },
    {
      question: '¿Los horarios calculados son exactos para todos?',
      answer: 'Los horarios se calculan científicamente basándose en la duración promedio de los ciclos de sueño, pero cada persona es única. Úsalos como guía y ajusta según tu experiencia personal. Algunas personas pueden necesitar ciclos ligeramente más cortos o largos.'
    },
    {
      question: '¿Por qué es mejor despertar al final de un ciclo?',
      answer: 'Despertar al final de un ciclo te permite completar todas las fases del sueño (ligero, profundo y REM) de manera natural. Si te despiertas en medio de un ciclo, especialmente durante el sueño profundo, puedes sentirte aturdido y cansado.'
    },
    {
      question: '¿Cómo puedo mejorar la calidad de mi sueño?',
      answer: 'Mantén un horario consistente, crea una rutina relajante antes de dormir, optimiza tu entorno (temperatura, oscuridad, silencio), evita pantallas antes de dormir, cuida tu alimentación y haz ejercicio regular. Todos estos factores contribuyen a un sueño más reparador.'
    },
    {
      question: '¿Qué hago si no puedo seguir exactamente los horarios sugeridos?',
      answer: 'Los horarios son una guía, no una regla estricta. Si no puedes seguirlos exactamente, intenta acercarte lo máximo posible. Incluso pequeños ajustes pueden mejorar significativamente la calidad de tu sueño. Lo más importante es la consistencia.'
    }
  ];

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="faq">
      <h2 className="section-title">Preguntas frecuentes</h2>
      
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <button
            className="faq-question"
            onClick={() => toggleItem(index)}
            aria-expanded={openItems.has(index)}
            aria-controls={`faq-answer-${index}`}
          >
            {faq.question}
            <span style={{ fontSize: 'var(--font-size-xl)' }}>
              {openItems.has(index) ? '−' : '+'}
            </span>
          </button>
          
          {openItems.has(index) && (
            <div 
              id={`faq-answer-${index}`}
              className="faq-answer"
              aria-hidden="false"
            >
              {faq.answer}
            </div>
          )}
        </div>
      ))}
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: 'var(--space-6)', 
        color: 'var(--muted)',
        fontSize: 'var(--font-size-sm)'
      }}>
        ❓ ¿Tienes más preguntas? Los consejos de arriba también pueden ayudarte a entender mejor cómo optimizar tu sueño.
      </div>
    </section>
  );
};

export default FAQ;
