// Archivo de prueba para sleep.js
// Ejecutar en consola del navegador o con Node.js

import { calculateSleepTimes, calculateNap, formatSleepDuration } from './src/lib/sleep.js';

console.log('🧪 Probando Calculadora de Sueño...\n');

// Test 1: Modo "Me levanto a" 07:00 + latencia 15
console.log('📅 Test 1: Me levanto a las 07:00 (latencia 15 min)');
const wakeResults = calculateSleepTimes('wake', '07:00', 15);
console.log('Resultados:', wakeResults);
console.log('Horarios esperados: ~22:30, 00:00, 01:30, 03:00\n');

// Test 2: Modo "Me acuesto a" 23:00 + latencia 10
console.log('📅 Test 2: Me acuesto a las 23:00 (latencia 10 min)');
const sleepResults = calculateSleepTimes('sleep', '23:00', 10);
console.log('Resultados:', sleepResults);
console.log('Horarios esperados: ~04:40, 06:10, 07:40, 09:10\n');

// Test 3: Siesta de 20 minutos
console.log('💤 Test 3: Siesta energética de 20 min (empezando a las 14:00)');
const nap20 = calculateNap('power', '14:00');
console.log('Resultado:', nap20);
console.log('Esperado: 14:00 - 14:20 (20 min)\n');

// Test 4: Siesta de 90 minutos
console.log('💤 Test 4: Siesta completa de 90 min (empezando a las 15:00)');
const nap90 = calculateNap('full', '15:00');
console.log('Resultado:', nap90);
console.log('Esperado: 15:00 - 16:30 (90 min)\n');

// Test 5: Formateo de duración
console.log('⏱️ Test 5: Formateo de duración');
console.log('90 min →', formatSleepDuration(90));
console.log('150 min →', formatSleepDuration(150));
console.log('45 min →', formatSleepDuration(45));

console.log('\n✅ Pruebas completadas. Verifica que los horarios sean razonables.');
console.log('💡 Los horarios se basan en ciclos de 90 minutos + latencia.');
