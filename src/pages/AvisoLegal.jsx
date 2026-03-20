import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../styles/blog.css';

function AvisoLegal() {
  return (
    <div className="legal-page">
      <Helmet>
        <title>Aviso Legal | Calculadora de Sueño</title>
        <meta name="description" content="Aviso legal de calculadora-sueno.com. Información sobre el titular del sitio, actividad y exención de responsabilidad médica." />
        <link rel="canonical" href="https://calculadora-sueno.com/aviso-legal" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <header className="legal-hero">
        <div className="legal-container">
          <nav className="blog-breadcrumb">
            <Link to="/">Inicio</Link> › <span>Aviso Legal</span>
          </nav>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#37474F', margin: '0.5rem 0' }}>
            Aviso Legal
          </h1>
          <p style={{ color: '#78909C', fontSize: '0.875rem' }}>Última actualización: marzo de 2026</p>
        </div>
      </header>

      <div className="legal-body">
        <div className="legal-card">
          <h2>1. Titular del sitio web</h2>
          <p>
            El presente sitio web, accesible en <strong>calculadora-sueno.com</strong>, es titularidad del
            operador del proyecto Calculadora de Sueño. Para cualquier consulta puedes dirigirte a:{' '}
            <a href="mailto:info@calculadora-sueno.com">info@calculadora-sueno.com</a>.
          </p>

          <h2>2. Actividad</h2>
          <p>
            Calculadora de Sueño es una <strong>herramienta informativa y educativa</strong> que ayuda a los
            usuarios a calcular horarios de sueño óptimos basándose en la duración estándar de los ciclos de
            sueño (aproximadamente 90 minutos). El sitio también publica artículos de divulgación sobre
            salud del sueño, cronobiología y hábitos de descanso.
          </p>

          <h2>3. Propiedad intelectual</h2>
          <p>
            Los textos, diseños, código fuente, logotipos y demás contenidos publicados en este sitio son
            propiedad del titular salvo que se indique expresamente lo contrario. Queda prohibida su
            reproducción total o parcial sin autorización previa y por escrito.
          </p>

          <h2>4. Exención de responsabilidad médica</h2>
          <p>
            <strong>La información publicada en este sitio tiene carácter exclusivamente informativo y divulgativo.</strong>{' '}
            No constituye consejo médico, diagnóstico ni tratamiento. Los cálculos de horarios de sueño
            son orientativos y se basan en promedios estadísticos que pueden no ser adecuados para todos
            los individuos.
          </p>
          <p>
            Si padeces trastornos del sueño, insomnio crónico, apnea del sueño u otras condiciones médicas
            relacionadas, consulta con un médico especialista. Este sitio no sustituye en ningún caso la
            atención médica profesional.
          </p>

          <h2>5. Exactitud de la información</h2>
          <p>
            Aunque procuramos mantener la información actualizada y verificada, no garantizamos la exactitud,
            completitud o actualidad de los contenidos. El titular no se responsabiliza de los daños que
            pudieran derivarse del uso de la información publicada.
          </p>

          <h2>6. Enlaces externos</h2>
          <p>
            Este sitio puede contener enlaces a sitios web de terceros, incluidos enlaces de afiliado a Amazon.
            No somos responsables del contenido ni de las prácticas de privacidad de esos sitios.
          </p>

          <h2>7. Legislación aplicable</h2>
          <p>
            El presente aviso legal se rige por la legislación española. Para cualquier controversia derivada
            del uso de este sitio web, las partes se someten a la jurisdicción de los Juzgados y Tribunales
            de España.
          </p>
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

export default AvisoLegal;
