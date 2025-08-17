// Constantes para el cálculo de sueño
const SLEEP_CYCLE_MINUTES = 90;
const RECOMMENDED_CYCLES = [6, 5, 4, 3];
const LATENCY_OPTIONS = [0, 10, 15, 20];

// Función principal para calcular horarios de sueño
export function calculateSleepTimes(mode, targetTime, latency = 15) {
  if (!targetTime) return [];
  
  const targetDate = toDate(targetTime);
  const results = [];
  
  if (mode === 'wake') {
    // Modo "Me levanto a" - calcular hora de acostarse
    results.push(...calculateBedtimeTimes(targetDate, latency));
  } else {
    // Modo "Me acuesto a" - calcular hora de despertarse
    results.push(...calculateWakeupTimes(targetDate, latency));
  }
  
  return results.sort((a, b) => b.qualityScore - a.qualityScore);
}

// Calcular horarios para acostarse (modo "me levanto a")
function calculateBedtimeTimes(wakeTime, latency) {
  const results = [];
  
  RECOMMENDED_CYCLES.forEach(cycles => {
    const totalSleepMinutes = (cycles * SLEEP_CYCLE_MINUTES) + latency;
    const bedtime = new Date(wakeTime.getTime() - (totalSleepMinutes * 60 * 1000));
    
    results.push({
      label: `${cycles} ciclos (${Math.round(totalSleepMinutes / 60)}h)`,
      time: formatHHMM(bedtime),
      quality: getQualityLabel(cycles),
      qualityScore: cycles,
      bedtime: bedtime,
      wakeTime: wakeTime,
      cycles: cycles,
      totalMinutes: totalSleepMinutes
    });
  });
  
  return results;
}

// Calcular horarios para despertarse (modo "me acuesto a")
function calculateWakeupTimes(bedtime, latency) {
  const results = [];
  
  RECOMMENDED_CYCLES.forEach(cycles => {
    const totalSleepMinutes = (cycles * SLEEP_CYCLE_MINUTES) + latency;
    const wakeTime = new Date(bedtime.getTime() + (totalSleepMinutes * 60 * 1000));
    
    results.push({
      label: `${cycles} ciclos (${Math.round(totalSleepMinutes / 60)}h)`,
      time: formatHHMM(wakeTime),
      quality: getQualityLabel(cycles),
      qualityScore: cycles,
      bedtime: bedtime,
      wakeTime: wakeTime,
      cycles: cycles,
      totalMinutes: totalSleepMinutes
    });
  });
  
  return results;
}

// Calcular siesta rápida
export function calculateNap(napType, startTime) {
  const startDate = toDate(startTime);
  let endTime, duration;
  
  if (napType === 'power') {
    duration = 20;
    endTime = new Date(startDate.getTime() + (20 * 60 * 1000));
  } else if (napType === 'full') {
    duration = 90;
    endTime = new Date(startDate.getTime() + (90 * 60 * 1000));
  }
  
  return {
    startTime: formatHHMM(startDate),
    endTime: formatHHMM(endTime),
    duration: duration,
    type: napType === 'power' ? 'Siesta energética' : 'Siesta completa'
  };
}

// Obtener etiqueta de calidad basada en número de ciclos
function getQualityLabel(cycles) {
  if (cycles >= 6) return 'óptima';
  if (cycles >= 5) return 'buena';
  return 'mínima';
}

// Convertir string de hora a Date
export function toDate(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

// Formatear hora en formato HH:MM
export function formatHHMM(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Añadir minutos a una fecha
export function addMinutes(date, minutes) {
  return new Date(date.getTime() + (minutes * 60 * 1000));
}

// Validar entrada de hora
export function validateTime(timeString) {
  if (!timeString) return false;
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(timeString);
}

// Obtener zona horaria local
export function getLocalTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Formatear hora según locale del navegador
export function formatTimeLocale(date, locale = 'es-ES') {
  const isEnglish = locale.startsWith('en');
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: isEnglish
  };
  
  return date.toLocaleTimeString(locale, options);
}

// Generar archivo ICS para calendario
export function generateICS(event) {
  const startDate = event.bedtime || event.startTime;
  const endDate = event.wakeTime || event.endTime;
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Calculadora de Sueño//ES',
    'BEGIN:VEVENT',
    `SUMMARY:${event.label}`,
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    'DESCRIPTION:Horario de sueño recomendado por la Calculadora de Sueño',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  
  return icsContent;
}

// Formatear fecha para ICS
function formatICSDate(date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

// Calcular tiempo total de sueño en formato legible
export function formatSleepDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}
