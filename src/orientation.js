export const serviceLabels = {
  maintenance: 'Mantenimiento de computadoras',
  upgrades: 'Mejoras SSD y memoria RAM',
  network: 'Configuración de Wi-Fi y redes',
};

export const scenarios = {
  performance: {
    title: 'Está lenta',
    questions: [
      { title: '¿Cuándo notás más la lentitud?', options: [['startup', 'Al encender'], ['apps', 'Con varios programas abiertos'], ['unknown', 'No lo tengo claro']] },
      { title: '¿Qué sabés del espacio del disco?', options: [['low', 'Aparece un aviso de poco espacio'], ['enough', 'Todavía tiene espacio disponible'], ['unknown', 'No lo sé']] },
    ],
  },
  cooling: {
    title: 'Se calienta',
    questions: [
      { title: '¿Dónde apoyás el equipo al usarlo?', options: [['soft', 'Sobre tela o una superficie blanda'], ['desk', 'Sobre una mesa despejada'], ['unknown', 'No estoy seguro']] },
      { title: '¿Qué notás en el ventilador?', options: [['loud', 'Se escucha más de lo habitual'], ['quiet', 'Se escucha poco o nada'], ['unknown', 'No lo puedo distinguir']] },
    ],
  },
  network: {
    title: 'Se corta el Wi-Fi',
    questions: [
      { title: '¿En cuántos dispositivos pasa?', options: [['one', 'Solo en uno'], ['all', 'En varios dispositivos'], ['unknown', 'Todavía no lo comparé']] },
      { title: '¿Dónde ocurre el corte?', options: [['far', 'Lejos del router'], ['near', 'También cerca del router'], ['unknown', 'No lo comprobé']] },
    ],
  },
};

// These rules organize a conversation. They never infer hardware health.
export function getOrientation(symptom, answers) {
  const scenario = scenarios[symptom];
  if (!scenario || !Array.isArray(answers) || answers.length !== 2 || scenario.questions.some((q, i) => !q.options.some(([value]) => value === answers[i]))) {
    throw new Error('Elegí un síntoma y una respuesta válida para cada pregunta.');
  }
  const [first, second] = answers;
  let checks, service;
  if (symptom === 'performance') {
    checks = [
      { startup: 'Revisar los programas de inicio y el almacenamiento.', apps: 'Revisar el uso de memoria al abrir los programas que usás.', unknown: 'Comparar el arranque y la apertura de programas para ubicar la lentitud.' }[first],
      { low: 'Revisar qué ocupa el disco y acordar un respaldo antes de liberar espacio.', enough: 'Con espacio disponible, revisar el sistema y la compatibilidad de SSD/RAM antes de proponer cambios.', unknown: 'Comprobar cuánto espacio queda; todavía no hay datos para recomendar un componente.' }[second],
    ];
    service = second === 'enough' && first !== 'unknown' ? 'upgrades' : 'maintenance';
  } else if (symptom === 'cooling') {
    checks = [
      { soft: 'Revisar si la superficie está tapando las entradas de aire; usar una base firme y despejada.', desk: 'Revisar las entradas de aire y la acumulación de polvo aunque la mesa esté despejada.', unknown: 'Identificar las entradas de aire y comprobar que queden libres.' }[first],
      { loud: 'Revisar el ventilador y las tareas que coinciden con el aumento de ruido.', quiet: 'Comprobar el funcionamiento del ventilador; el silencio por sí solo no permite saber si está bien.', unknown: 'Observar la ventilación durante el uso antes de definir el mantenimiento.' }[second],
    ];
    service = 'maintenance';
  } else {
    checks = [
      { one: 'Revisar la conexión y configuración del dispositivo afectado antes de cambiar el router.', all: 'Revisar el router y la conexión del proveedor, ya que el corte se repite en varios dispositivos.', unknown: 'Comparar otro dispositivo en el mismo lugar para acotar el problema.' }[first],
      { far: 'Revisar la cobertura y los obstáculos entre el equipo y el router.', near: 'Comparar la conexión cerca del router y, si es posible, por cable para separar cobertura de conexión.', unknown: 'Comparar el mismo dispositivo cerca y lejos del router.' }[second],
    ];
    service = 'network';
  }
  const responseLabels = scenario.questions.map((q, i) => q.options.find(([value]) => value === answers[i])[1]);
  return {
    checks, service, serviceLabel: serviceLabels[service],
    summary: `Orientación de ejemplo: ${scenario.title}.\n${scenario.questions.map((q, i) => `${q.title} ${responseLabels[i]}`).join('\n')}\nQué convendría revisar: ${checks.join(' ')}\nServicio relacionado: ${serviceLabels[service]}.`,
  };
}
