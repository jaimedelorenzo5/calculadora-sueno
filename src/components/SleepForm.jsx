import React from 'react';

const SleepForm = ({ 
  mode, 
  time, 
  latency, 
  onModeChange, 
  onTimeChange, 
  onLatencyChange, 
  onCalculate,
  isLoading 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (time && !isLoading) {
      onCalculate();
    }
  };

  return (
    <form className="sleep-form" onSubmit={handleSubmit}>
      <div style={{
        textAlign: 'center',
        marginBottom: 'var(--space-6)',
        fontSize: 'var(--font-size-lg)',
        color: 'var(--muted)'
      }}>
        {mode === 'wake' ? '🌅' : '🌙'} 
        {mode === 'wake' ? '¿Cuándo quieres despertarte?' : '¿Cuándo quieres acostarte?'}
      </div>

      <div className="mode-toggle">
        <button
          type="button"
          className={mode === 'wake' ? 'active' : ''}
          onClick={() => onModeChange('wake')}
        >
          🌅 Me levanto a
        </button>
        <button
          type="button"
          className={mode === 'sleep' ? 'active' : ''}
          onClick={() => onModeChange('sleep')}
        >
          🌙 Me acuesto a
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="time">
          {mode === 'wake' ? '⏰ ¿A qué hora quieres despertarte?' : '🛏️ ¿A qué hora quieres acostarte?'}
        </label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          required
          aria-describedby="time-help"
        />
        <small id="time-help" style={{ 
          color: 'var(--muted)', 
          fontSize: 'var(--font-size-sm)',
          display: 'block',
          marginTop: 'var(--space-2)'
        }}>
          Selecciona la hora exacta para obtener los mejores horarios
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="latency">
          😴 ¿Cuánto tardas en quedarte dormido?
        </label>
        <select
          id="latency"
          value={latency}
          onChange={(e) => onLatencyChange(e.target.value)}
        >
          <option value="0">0 minutos - Me duermo inmediatamente</option>
          <option value="10">10 minutos - Me duermo rápido</option>
          <option value="15">15 minutos - Recomendado para la mayoría</option>
          <option value="20">20 minutos - Me cuesta dormirme</option>
        </select>
        <small style={{ 
          color: 'var(--muted)', 
          fontSize: 'var(--font-size-sm)',
          display: 'block',
          marginTop: 'var(--space-2)'
        }}>
          Tiempo desde que te acuestas hasta que te duermes
        </small>
      </div>

      <button
        type="submit"
        className="btn btn-primary calculate-btn"
        disabled={!time || isLoading}
        aria-live="polite"
      >
        {isLoading ? '🧮 Calculando...' : '✨ Calcular horarios'}
      </button>
      
      <div style={{
        textAlign: 'center',
        marginTop: 'var(--space-4)',
        fontSize: 'var(--font-size-sm)',
        color: 'var(--muted)',
        padding: 'var(--space-3)',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)'
      }}>
        💡 La calculadora considera ciclos de 90 minutos para un descanso óptimo
      </div>
    </form>
  );
};

export default SleepForm;
