import test from 'node:test'
import assert from 'node:assert/strict'
import {
  calculateSleepTimes,
  calculateNap,
  formatSleepDuration,
  validateTime,
} from './src/lib/sleep.js'

test('calcula horas de acostarse restando ciclos y latencia', () => {
  const results = calculateSleepTimes('wake', '07:00', 15)

  assert.deepEqual(results.map(({ time }) => time), [
    '21:45',
    '23:15',
    '00:45',
    '02:15',
  ])
  assert.deepEqual(results.map(({ cycles }) => cycles), [6, 5, 4, 3])
})

test('calcula horas de despertar sumando ciclos y latencia', () => {
  const results = calculateSleepTimes('sleep', '23:00', 10)

  assert.deepEqual(results.map(({ time }) => time), [
    '08:10',
    '06:40',
    '05:10',
    '03:40',
  ])
})

test('calcula siestas energéticas y completas', () => {
  assert.deepEqual(calculateNap('power', '14:00'), {
    startTime: '14:00',
    endTime: '14:20',
    duration: 20,
    type: 'Siesta energética',
  })
  assert.deepEqual(calculateNap('full', '15:00'), {
    startTime: '15:00',
    endTime: '16:30',
    duration: 90,
    type: 'Siesta completa',
  })
})

test('formatea duraciones y valida horas', () => {
  assert.equal(formatSleepDuration(90), '1h 30min')
  assert.equal(formatSleepDuration(150), '2h 30min')
  assert.equal(formatSleepDuration(45), '45 min')
  assert.equal(validateTime('07:30'), true)
  assert.equal(validateTime('24:00'), false)
  assert.equal(validateTime('no-es-una-hora'), false)
})
