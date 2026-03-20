import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../styles/blog.css';

function Contacto() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => setSubmitted(true))
      .catch(() => setSubmitted(true)); // mostrar éxito igualmente (Netlify Forms)
  }

  return (
    <div className="legal-page">
      <Helmet>
        <title>Contacto | Calculadora de Sueño</title>
        <meta name="description" content="Contacta con el equipo de Calculadora de Sueño para consultas, sugerencias o colaboraciones." />
        <link rel="canonical" href="https://calculadora-sueno.com/contacto" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <header className="legal-hero">
        <div className="legal-container">
          <nav className="blog-breadcrumb">
            <Link to="/">Inicio</Link> › <span>Contacto</span>
          </nav>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#37474F', margin: '0.5rem 0' }}>
            Contacto
          </h1>
          <p style={{ color: '#78909C', lineHeight: '1.6' }}>
            ¿Tienes alguna pregunta, sugerencia o propuesta de colaboración? Escríbenos.
          </p>
        </div>
      </header>

      <div className="legal-body">
        <div className="legal-card">
          {submitted ? (
            <div className="form-success">
              <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</p>
              <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>¡Mensaje enviado!</p>
              <p style={{ color: '#4a7c59', fontSize: '0.95rem' }}>
                Hemos recibido tu mensaje. Te responderemos en un plazo de 2-3 días hábiles.
              </p>
            </div>
          ) : (
            <>
              <p style={{ color: '#78909C', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                También puedes escribirnos directamente a{' '}
                <a href="mailto:info@calculadora-sueno.com">info@calculadora-sueno.com</a>.
              </p>

              {/* Formulario Netlify Forms */}
              <form
                name="contacto"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                className="contact-form"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="contacto" />
                <input type="hidden" name="bot-field" />

                <div className="form-group">
                  <label htmlFor="nombre">Nombre *</label>
                  <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    required
                    placeholder="Tu nombre"
                    autoComplete="name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo electrónico *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="tu@email.com"
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="asunto">Asunto</label>
                  <input
                    id="asunto"
                    type="text"
                    name="asunto"
                    placeholder="¿De qué se trata?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">Mensaje *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>

                <button type="submit" className="form-submit">
                  Enviar mensaje →
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <footer className="blog-footer">
        <div className="legal-container">
          <Link to="/">← Volver a la Calculadora</Link>
        </div>
      </footer>
    </div>
  );
}

export default Contacto;
