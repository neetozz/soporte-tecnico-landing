import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import Hardware from './Hardware';
import SystemVisual from './SystemVisual';

function NodeSymbol() { return <svg className="node-symbol" viewBox="0 0 24 16" fill="none" aria-hidden="true"><path d="M2 12h5l5-4h10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" /><circle cx="12" cy="8" r="2.3" fill="currentColor" /></svg>; }
const Arrow = () => <span aria-hidden="true">↗</span>;
function Mark() { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M7 25V7l18 18V7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
const services = [
  { id: 'mantenimiento', title: '¿Se calienta o hace mucho ruido?', label: 'Mantenimiento de computadoras', contact: 'Consultar mantenimiento', text: 'Revisamos temperaturas, ventilación y programas que cargan al iniciar. Limpiamos el interior y ajustamos el sistema según lo que encontremos.', tags: ['Limpieza y cuidado', 'Diagnóstico', 'Sistema operativo'], hardware: ['fan'] },
  { id: 'mejoras', title: '¿Tarda en arrancar o se traba?', label: 'Mejoras SSD y memoria RAM', contact: 'Consultar mejoras SSD y RAM', text: 'Un SSD puede reducir la espera al encender; más RAM puede ayudar si usás varios programas a la vez. Revisamos tu equipo y la compatibilidad antes de recomendar un cambio.', tags: ['Actualización a SSD', 'Ampliación de RAM', 'Compatibilidad'], hardware: ['ssd', 'ram'] },
  { id: 'wifi', title: '¿El Wi-Fi se corta o no llega?', label: 'Configuración de Wi-Fi y redes', contact: 'Consultar redes y Wi-Fi', text: 'Comprobamos dónde se pierde la señal, la ubicación del router y la configuración de la red. También revisamos la contraseña y el acceso de tus dispositivos.', tags: ['Cobertura Wi-Fi', 'Router y red local', 'Seguridad de acceso'], hardware: ['router'] },
];
const faqs = [
  ['¿Cómo sé qué servicio necesita mi equipo?', 'Contanos qué sucede y cuándo empezó. Una revisión inicial permite identificar la causa y proponer los siguientes pasos; no hace falta que conozcas el nombre técnico del problema.'],
  ['¿Conviene mejorar mi computadora o cambiarla?', 'Depende del estado del equipo, sus componentes y el uso que le das. Primero se revisa la compatibilidad de SSD y RAM para valorar si una actualización tiene sentido.'],
  ['¿Tengo que respaldar mis archivos?', 'Sí. Siempre es recomendable tener una copia de seguridad antes de cualquier intervención. Un respaldo y el alcance del trabajo se acuerdan antes de realizar cambios.'],
  ['¿Cuánto cuesta y cuánto tiempo tarda?', 'El costo y el plazo dependen del diagnóstico y de los repuestos necesarios. En un servicio real se entregarían para tu aprobación antes de comenzar. Esta demostración no ofrece presupuestos ni reservas.'],
  ['¿Puedo solicitar una visita desde esta página?', 'Esta página es un proyecto de demostración de un negocio ficticio. Podés probar el formulario, pero no se envían mensajes ni se programan visitas.'],
];

function App() {
  const [menu, setMenu] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState('No estoy seguro todavía');
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="header"><a className="brand" href="#inicio" aria-label="Nodo, inicio"><Mark />nodo<span className="brand-dot">.</span></a>
      <button className="menu-toggle" aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? 'Cerrar −' : 'Menú +'}</button>
      <nav id="navigation" className={menu ? 'nav open' : 'nav'} aria-label="Navegación principal" onClick={() => setMenu(false)}><a href="#servicios">Servicios</a><a href="#proceso">Cómo trabajamos</a><a href="#preguntas">Preguntas</a><a className="nav-cta" href="#contacto">Hablemos <Arrow /></a></nav>
    </header>
    <main id="contenido">
      <section className="hero wrap" id="inicio">
        <div className="eyebrow"><NodeSymbol /> SOPORTE TÉCNICO, SIN COMPLICACIONES</div>
        <h1>Que la tecnología<br />vuelva a <span>fluir.</span></h1>
        <p className="hero-copy">Si tu computadora tarda en arrancar, se calienta o el Wi-Fi se corta,<br className="desktop-break" /> revisamos la causa y te explicamos qué se puede hacer.</p>
        <div className="hero-actions"><a className="button primary" href="#contacto">Contanos qué pasa <Arrow /></a><a className="text-link" href="#servicios">Explorar servicios <span aria-hidden="true">↓</span></a></div>
        <SystemVisual mark={<Mark />} />
        <div className="principles"><span>Diagnóstico antes de actuar</span><span>Explicaciones sin tecnicismos</span><span>Vos decidís el siguiente paso</span></div>
      </section>
      <section className="services wrap section" id="servicios"><div className="section-intro"><span className="eyebrow"><NodeSymbol />LO QUE HACEMOS</span><h2>¿Qué está fallando?</h2><p>Tres áreas de soporte para tu computadora y tu red.<br />Contanos qué notás, aunque no sepas la causa.</p></div>
        {services.map(s => <article className="service-row" id={s.id} key={s.id}><span className="service-number"><NodeSymbol /></span><div className="service-heading"><span className="service-label">{s.label}</span><h3>{s.title}</h3><div className="service-hardware">{s.hardware.map(type => <Hardware key={type} type={type} labelled />)}</div></div><div className="service-detail"><p>{s.text}</p><ul className="tags">{s.tags.map(t => <li key={t}>{t}</li>)}</ul><a className="service-link" href="#contacto" onClick={() => { setService(s.label); setSubmitted(false); }}>{s.contact} <Arrow /></a></div></article>)}
      </section>
      <section className="process-section" id="proceso"><div className="wrap process-layout"><div><span className="eyebrow"><NodeSymbol />ASÍ DE SIMPLE</span><h2>De la primera revisión<br />al equipo funcionando.</h2><p className="process-copy">Te explicamos qué encontramos y qué proponemos.<br />Vos aprobás el trabajo antes de empezar.</p><a href="#contacto" className="text-link">Empecemos por tu problema <Arrow /></a></div><ol className="steps"><li><span>01</span><div><h3>Nos contás qué pasa</h3><p>Qué equipo usás, qué notás y qué necesitás. No hace falta hablar en técnico.</p></div></li><li><span>02</span><div><h3>Revisamos y te explicamos</h3><p>Identificamos el problema y proponemos una solución, con alcance y costo antes de avanzar.</p></div></li><li><span>03</span><div><h3>Probamos el resultado con vos</h3><p>Después del trabajo, comprobamos el arranque, las temperaturas o la conexión, según el problema. Te explicamos los cambios y cómo cuidar el equipo.</p></div></li></ol></div></section>
      <section className="faq-section wrap section" id="preguntas"><div><span className="eyebrow"><NodeSymbol />DUDAS FRECUENTES</span><h2>Antes de revisar<br />tu equipo</h2></div><div className="faq-list">{faqs.map(([q,a]) => <details key={q}><summary>{q}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
      <section className="contact-section wrap" id="contacto"><div className="contact-copy"><span className="eyebrow"><NodeSymbol />EL PRIMER PASO</span><h2>Contanos<br /><span>qué falla.</span></h2><p>Decinos qué equipo usás, qué sucede<br className="desktop-break" /> y desde cuándo lo notás.</p><div className="demo-note"><span aria-hidden="true">↳</span><p>Estás en un proyecto de demostración.<br />La marca es ficticia y este formulario no envía ni guarda información. Usá datos de ejemplo.</p></div></div>
        <form className="contact-form" onSubmit={e => { e.preventDefault(); setSubmitted(true); }} onChange={() => setSubmitted(false)}>
          <label htmlFor="name">¿Cómo te llamás?</label><input id="name" name="name" placeholder="Un nombre de ejemplo" required maxLength={80} autoComplete="off" />
          <label htmlFor="service">¿En qué podemos ayudarte?</label><select id="service" value={service} onChange={e => setService(e.target.value)}><option>No estoy seguro todavía</option>{services.map(s => <option key={s.id}>{s.label}</option>)}</select>
          <label htmlFor="message">Contanos qué sucede</label><textarea id="message" name="message" rows="3" placeholder="Por ejemplo: mi computadora tarda mucho en encender…" required maxLength={2000} />
          <button className="button primary" type="submit">Probar consulta <Arrow /></button><p className="form-caption">Modo demostración · Sin envío de mensajes</p><div className="form-status" role="status">{submitted && 'Listo: así se vería la confirmación de tu consulta. No se envió ni se guardó ningún dato.'}</div>
        </form>
      </section>
    </main>
    <footer className="wrap footer"><a className="brand" href="#inicio"><Mark />nodo<span className="brand-dot">.</span></a><p>Tecnología en su punto.</p><span>Marca ficticia · Proyecto de demostración · {new Date().getFullYear()}<br />El formulario no envía ni guarda información.</span><a href="#inicio" className="back-top" aria-label="Volver al inicio">↑</a></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
