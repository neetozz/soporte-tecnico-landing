import React, { useRef, useState } from 'react';
import { getOrientation, scenarios } from './orientation';

export default function OrientationDialog({ onContact }) {
  const dialog = useRef(null);
  const heading = useRef(null);
  const trigger = useRef(null);
  const continuing = useRef(false);
  const [step, setStep] = useState(0);
  const [symptom, setSymptom] = useState('');
  const [answers, setAnswers] = useState([]);
  const [include, setInclude] = useState(false);
  const move = next => { setStep(next); requestAnimationFrame(() => heading.current?.focus()); };
  const reset = () => { setSymptom(''); setAnswers([]); setInclude(false); move(0); };
  const close = () => dialog.current.close();
  const keepFocusInside = event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.current.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href], [tabindex="0"]')].filter(element => element.getClientRects().length);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === heading.current)) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  };
  const question = step === 1 || step === 2 ? scenarios[symptom].questions[step - 1] : null;
  const result = step === 3 ? getOrientation(symptom, answers) : null;
  const canContinue = step === 0 ? !!symptom : !!answers[step - 1];
  return <>
    <button className="button primary explore-trigger" ref={trigger} onClick={() => { dialog.current.showModal(); requestAnimationFrame(() => heading.current?.focus()); }}>Explorar mi problema <span aria-hidden="true">↗</span></button>
    <dialog className="orientation-dialog" ref={dialog} aria-labelledby="guide-title" aria-describedby="guide-note" onKeyDown={keepFocusInside} onClose={() => { if (!continuing.current) trigger.current?.focus(); continuing.current = false; }} onClick={event => { if (event.target === dialog.current) { const r = dialog.current.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close(); } }}>
      <div className="guide-top"><span className="eyebrow">NODO / ORIENTACIÓN</span><button className="quiet-button" onClick={close} aria-label="Cerrar orientación">Cerrar ×</button></div>
      <p className="guide-disclaimer" id="guide-note">Orientación de ejemplo; no analiza tu equipo</p>
      <p className="guide-progress">{step === 0 ? 'Elegí el síntoma' : step < 3 ? `Pregunta ${step} de 2` : 'Tu resumen'}</p>
      <h2 id="guide-title" ref={heading} tabIndex={-1}>{step === 0 ? '¿Qué está pasando?' : question ? question.title : 'Qué convendría revisar'}</h2>
      {step === 0 && <fieldset className="guide-options"><legend className="sr-only">Elegí un síntoma</legend>{Object.entries(scenarios).map(([id, scenario]) => <label key={id}><input type="radio" name="symptom" value={id} checked={symptom === id} onChange={() => { if (symptom !== id) { setSymptom(id); setAnswers([]); setInclude(false); } }} />{scenario.title}</label>)}</fieldset>}
      {question && <fieldset className="guide-options" key={`${symptom}-${step}`}><legend className="sr-only">{question.title}</legend>{question.options.map(([value, label]) => <label key={value}><input type="radio" name={`question-${step}`} value={value} checked={answers[step - 1] === value} onChange={() => { setAnswers(previous => { const next = [...previous]; next[step - 1] = value; return next; }); setInclude(false); }} />{label}</label>)}</fieldset>}
      {result && <div className="guide-result"><p className="result-symptom">{scenarios[symptom].title}</p><ul>{result.checks.map(check => <li key={check}>{check}</li>)}</ul><p>Servicio relacionado:<br /><strong>{result.serviceLabel}</strong></p><label className="include-summary"><input type="checkbox" checked={include} onChange={event => setInclude(event.target.checked)} />Agregar este resumen a mi consulta</label><p className="guide-fine">Solo si lo elegís. Se conserva lo que ya escribiste.</p></div>}
      <div className="guide-actions">{step > 0 && <button className="quiet-button" onClick={() => move(step - 1)}>← Volver</button>}{step < 3 ? <button className="button primary" disabled={!canContinue} onClick={() => move(step + 1)}>Continuar →</button> : <button className="button primary" onClick={() => { continuing.current = true; close(); onContact(result.serviceLabel, include ? result.summary : ''); }}>Continuar al contacto ↗</button>}</div>
      {(step > 0 || symptom) && <button className="restart-button" onClick={reset}>Reiniciar recorrido</button>}
    </dialog>
  </>;
}
