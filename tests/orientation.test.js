import test from 'node:test';
import assert from 'node:assert/strict';
import { getOrientation, scenarios, serviceLabels } from '../src/orientation.js';

test('las 27 combinaciones válidas dan recomendaciones y un servicio conocido', () => {
  let count = 0;
  for (const [symptom, scenario] of Object.entries(scenarios)) {
    for (const [first] of scenario.questions[0].options) for (const [second] of scenario.questions[1].options) {
      const result = getOrientation(symptom, [first, second]);
      assert.equal(result.checks.length, 2);
      assert.equal(result.serviceLabel, serviceLabels[result.service]);
      assert.ok(result.summary.includes(scenario.title));
      assert.ok(!result.summary.includes('undefined'));
      assert.ok(result.checks.every(check => typeof check === 'string' && check.length > 30));
      count++;
    }
  }
  assert.equal(count, 27);
});

test('cada respuesta afecta su recomendación, incluso cuando no se sabe', () => {
  for (const [symptom, scenario] of Object.entries(scenarios)) {
    const baseline = scenario.questions.map(q => q.options[0][0]);
    for (const index of [0, 1]) {
      const recommendations = scenario.questions[index].options.map(([value]) => {
        const answers = [...baseline]; answers[index] = value;
        return getOrientation(symptom, answers).checks[index];
      });
      assert.equal(new Set(recommendations).size, 3);
    }
  }
});

test('no recomienda mejoras ante poco espacio o una lentitud sin ubicar', () => {
  assert.equal(getOrientation('performance', ['apps', 'low']).service, 'maintenance');
  assert.equal(getOrientation('performance', ['unknown', 'enough']).service, 'maintenance');
  assert.equal(getOrientation('performance', ['startup', 'unknown']).service, 'maintenance');
  assert.equal(getOrientation('performance', ['apps', 'enough']).service, 'upgrades');
  assert.equal(getOrientation('performance', ['startup', 'enough']).service, 'upgrades');
});

test('calor y conexión apuntan a sus servicios sin afirmar una falla', () => {
  assert.equal(getOrientation('cooling', ['desk', 'quiet']).service, 'maintenance');
  const result = getOrientation('network', ['one', 'far']);
  assert.equal(result.service, 'network');
  assert.match(result.checks[0], /dispositivo afectado/);
  assert.match(result.checks[1], /cobertura/);
});

test('rechaza síntomas desconocidos, preguntas incompletas y opciones ajenas', () => {
  for (const [symptom, answers] of [['other', ['x', 'y']], ['performance', []], ['cooling', ['desk']], ['network', ['soft', 'near']], ['network', ['all', 'near', 'extra']], ['performance', null]]) {
    assert.throws(() => getOrientation(symptom, answers), /respuesta válida/);
  }
});
