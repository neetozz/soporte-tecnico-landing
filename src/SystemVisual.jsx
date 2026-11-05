import React, { useRef, useState } from 'react';
import ComputerScene from './ComputerScene';
import OrientationDialog from './OrientationDialog';
import { modes } from './panelModes';

const pieces = [
  { id: 'storage', title: 'Almacenamiento SSD', short: 'SSD', text: 'Guarda el sistema, los programas y tus archivos. Un SSD compatible puede reducir la espera al encender o abrir programas.', href: '#mejoras', link: 'Ver mejoras SSD y RAM' },
  { id: 'ram', title: 'Memoria RAM', short: 'RAM', text: 'Mantiene a mano lo que estás usando. La cantidad necesaria depende de tus programas y de cuántos abrís a la vez.', href: '#mejoras', link: 'Ver mejoras SSD y RAM' },
  { id: 'fan', title: 'Ventilación', short: 'Ventilación', text: 'El ventilador mueve aire para disipar el calor. Revisamos que pueda girar y que las entradas y salidas no estén obstruidas.', href: '#mantenimiento', link: 'Ver mantenimiento' },
  { id: 'router', title: 'Router Wi-Fi', short: 'Router', text: 'Conecta tus dispositivos a la red. Su ubicación, la configuración y los obstáculos influyen en la cobertura.', href: '#wifi', link: 'Ver configuración de redes' },
];

export default function SystemVisual({ onContact }) {
  const [active, setActive] = useState(null);
  const [view, setView] = useState('symptoms');
  const [piece, setPiece] = useState('storage');
  const controls = useRef({});
  const componentToggle = useRef(null);
  const mode = modes.find(item => item.id === active);
  const selected = view === 'components' ? pieces.find(item => item.id === piece) : mode;
  const highlighted = view === 'components' ? piece : { performance: 'performance', cooling: 'fan', network: 'router' }[active];
  const screen = view === 'components' ? selected.title : mode?.screen || 'Tu equipo, por dentro.';
  return <div className="system-visual workstation" role="group" aria-label="Explorá tu computadora y tu red" aria-describedby="orientation-note" onKeyDown={event => { if (event.key === 'Escape' && view === 'components' && !event.target.closest('dialog')) { setView('symptoms'); componentToggle.current?.focus(); } }}>
    <div className="workstation-top"><span className="eyebrow"><span className="status-dot" /> COMPUTADORA + RED</span><button ref={componentToggle} className="quiet-button component-toggle" aria-expanded={view === 'components'} aria-controls="exploration-controls" onClick={() => setView(view === 'symptoms' ? 'components' : 'symptoms')}>{view === 'components' ? 'Volver a síntomas' : 'Ver componentes'} <span aria-hidden="true">{view === 'components' ? '−' : '+'}</span></button></div>
    <div id="exploration-controls" className={`exploration-controls ${view}`} aria-label={view === 'symptoms' ? 'Elegí un síntoma' : 'Elegí un componente'} role="group">
      {view === 'symptoms' ? modes.map(item => <button key={item.id} ref={element => { controls.current[item.id] = element; }} id={`option-${item.id}`} aria-pressed={active === item.id} aria-controls="system-explanation" onClick={() => setActive(item.id)}>{item.title}</button>) : pieces.map(item => <button key={item.id} id={`piece-${item.id}`} aria-pressed={piece === item.id} aria-controls="system-explanation" onClick={() => setPiece(item.id)}>{item.short}</button>)}
    </div>
    <ComputerScene selected={highlighted} symptom={active} components={view === 'components'} screen={screen} controls={controls} />
    <div className="visual-explanation" id="system-explanation"><span className="explanation-label"><span className="status-dot" />{selected?.title || 'Tu equipo, por dentro'}</span><div><p role="status" aria-live="polite" aria-atomic="true">{selected?.text || 'Elegí qué notás o explorá las piezas de la torre y el router. Es una ilustración, no una lectura de tu equipo.'}</p>{selected && <a className="orientation-link text-link" href={selected.href}>{selected.link} <span aria-hidden="true">↗</span></a>}</div></div>
    <div className="workstation-bottom"><p className="orientation-note" id="orientation-note">Ejemplo ilustrativo de los servicios</p><OrientationDialog onContact={onContact} /></div>
  </div>;
}
