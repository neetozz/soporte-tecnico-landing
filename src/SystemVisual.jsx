import React, { useLayoutEffect, useRef, useState } from 'react';
import Hardware from './Hardware';

const modes = [
  { id: 'performance', className: 'storage', hardware: 'ssd', title: 'Está lenta', part: 'SSD + RAM', screen: 'Almacenamiento + memoria', text: 'Un arranque lento o programas que se traban pueden tener distintas causas. Revisamos el disco, la memoria y lo que carga al iniciar antes de sugerir una mejora.', href: '#mejoras', link: 'Ver mejoras SSD y RAM' },
  { id: 'cooling', className: 'cooling', hardware: 'fan', title: 'Se calienta', part: 'VENTILACIÓN', screen: 'Ventilación + limpieza', text: 'El polvo o una ventilación obstruida pueden elevar la temperatura. Revisamos el flujo de aire y el sistema de enfriamiento para definir el mantenimiento.', href: '#mantenimiento', link: 'Ver mantenimiento' },
  { id: 'network', className: 'network', hardware: 'router', title: 'Se corta el Wi-Fi', part: 'ROUTER + RED', screen: 'Router + cobertura', text: 'Los cortes pueden venir de la señal, del router o del proveedor. Revisamos la cobertura y la configuración para acotar dónde está el problema.', href: '#wifi', link: 'Ver configuración de redes' },
];

export default function SystemVisual({ mark }) {
  const [active, setActive] = useState(null);
  const selected = modes.find(mode => mode.id === active);
  const diagramRef = useRef(null);
  const screenRef = useRef(null);
  const buttonRefs = useRef({});
  const [connections, setConnections] = useState({});
  useLayoutEffect(() => {
    const diagram = diagramRef.current;
    const update = () => {
      const origin = diagram.getBoundingClientRect();
      const screen = screenRef.current.getBoundingClientRect();
      const next = {};
      for (const mode of modes) {
        const card = buttonRefs.current[mode.id].getBoundingClientRect();
        const fromRight = mode.id !== 'network';
        const x1 = (fromRight ? card.right : card.left) - origin.left;
        const y1 = card.top + card.height / 2 - origin.top;
        const x2 = (fromRight ? screen.left : screen.right) - origin.left;
        const screenAnchor = { performance: 0.3, cooling: 0.78, network: 0.5 }[mode.id];
        const y2 = screen.top + screen.height * screenAnchor - origin.top;
        const bend = x1 + (x2 - x1) / 2;
        next[mode.id] = { path: `M ${x1} ${y1} H ${bend} V ${y2} H ${x2}`, x: x1 + (x2 - x1) * 0.22, y: y1 };
      }
      setConnections(next);
    };
    const observer = new ResizeObserver(update);
    [diagram, screenRef.current, ...Object.values(buttonRefs.current)].forEach(element => observer.observe(element));
    update();
    return () => observer.disconnect();
  }, []);
  return <div className={`system-visual symptom-panel ${active ? `highlight-${active}` : ''}`} role="group" aria-label="Orientación ilustrativa sobre tu computadora y tu red" aria-describedby="orientation-note">
    <div className="visual-top"><span><i /> COMPUTADORA + RED</span><span>¿QUÉ NOTÁS EN TU EQUIPO?</span></div>
    <div className="diagram" ref={diagramRef}>
      <svg className="panel-connections" aria-hidden="true">
        {modes.map(mode => connections[mode.id] && <g key={mode.id} id={`connection-${mode.id}`} data-mode={mode.id} data-active={active === mode.id} className="panel-wire">
          <path d={connections[mode.id].path} />
          <circle cx={connections[mode.id].x} cy={connections[mode.id].y} r="2.3" />
        </g>)}
      </svg>
      {modes.map(mode => <button key={mode.id} id={`option-${mode.id}`} data-mode={mode.id} ref={element => { buttonRefs.current[mode.id] = element; }} type="button" className={`satellite ${mode.className}`} aria-label={mode.title} aria-pressed={active === mode.id} aria-controls="system-explanation" onClick={() => setActive(mode.id)}><Hardware type={mode.hardware} /><span>{mode.title}<small>{mode.part}</small></span></button>)}
      <div className="computer" aria-hidden="true"><div className="screen" ref={screenRef} data-mode={active || undefined}>{mark}<span>{selected ? selected.screen : 'Tu equipo, por dentro.'}</span><div className="screen-lines"><i /><i /><i /></div></div><div className="stand" /><div className="base" /></div>
    </div>
    <div className="visual-explanation" id="system-explanation">
      <span className="explanation-label"><span className="status-dot" />{selected ? selected.title : 'Elegí qué sucede'}</span>
      <div><p role="status" aria-live="polite" aria-atomic="true">{selected ? selected.text : 'Elegí una de las tres opciones para conocer qué partes revisaríamos y encontrar el servicio relacionado.'}</p>
        {selected && <a className="orientation-link text-link" href={selected.href}>{selected.link} <span aria-hidden="true">↗</span></a>}
      </div>
    </div>
    <p className="orientation-note" id="orientation-note">Ejemplo ilustrativo de los servicios</p>
  </div>;
}
