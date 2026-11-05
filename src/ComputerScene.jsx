import React, { useLayoutEffect, useRef, useState } from 'react';

export default function ComputerScene({ selected, symptom, components, screen, controls }) {
  const scene = useRef(null);
  const [starts, setStarts] = useState({});
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 640px)').matches);
  useLayoutEffect(() => {
    const media = window.matchMedia('(max-width: 640px)');
    const update = () => setCompact(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useLayoutEffect(() => {
    if (components) return;
    const update = () => {
      const matrix = scene.current.getScreenCTM()?.inverse();
      if (!matrix) return;
      const next = {};
      for (const id of ['performance', 'cooling', 'network']) {
        const bounds = controls.current[id].getBoundingClientRect();
        next[id] = new DOMPoint(bounds.left + bounds.width / 2, bounds.bottom).matrixTransform(matrix).x;
      }
      setStarts(next);
    };
    const observer = new ResizeObserver(update);
    [scene.current, ...Object.values(controls.current).filter(Boolean)].forEach(element => observer.observe(element));
    update();
    return () => observer.disconnect();
  }, [components, controls]);
  const highlighted = id => selected === id || (selected === 'performance' && ['storage', 'ram'].includes(id));
  const routes = {
    performance: { path: `M${starts.performance ?? 133} 0V22H104V230H184`, x: 104, y: 216 },
    cooling: { path: `M${starts.cooling ?? 400} 0V27H285V122H239`, x: 285, y: 109 },
    network: { path: `M${starts.network ?? 667} 0V22H724V245H678`, x: 724, y: 231 },
  };
  return <svg className="computer-scene" ref={scene} viewBox={compact ? '135 45 575 245' : '0 0 800 310'} role="img" aria-label={`Ilustración de monitor, torre y router. ${screen}`}>
    <defs>
      <linearGradient id="monitor-shell" x2=".9" y2="1"><stop stopColor="#596474" /><stop offset=".45" stopColor="#343e4c" /><stop offset="1" stopColor="#232c37" /></linearGradient>
      <linearGradient id="monitor-glass" x2="1" y2="1"><stop stopColor="#293746" /><stop offset="1" stopColor="#171e27" /></linearGradient>
      <linearGradient id="case-glass" x2="1" y2=".8"><stop stopColor="#60758a" stopOpacity=".17" /><stop offset="1" stopColor="#7893b3" stopOpacity=".04" /></linearGradient>
      <linearGradient id="metal-foot" x2="0" y2="1"><stop stopColor="#4a5666" /><stop offset="1" stopColor="#242d38" /></linearGradient>
      <radialGradient id="desk-shadow"><stop stopColor="#000" stopOpacity=".42" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
    </defs>
    <ellipse cx="420" cy="277" rx="300" ry="22" fill="url(#desk-shadow)" />
    <path d="M128 276H713" stroke="#8399b3" strokeOpacity=".1" />
    <path d="M278 250h41v17h260v-8h41" fill="none" stroke="#596e89" strokeOpacity=".4" />
    <g className="scene-wires" aria-hidden="true" style={{ visibility: components ? 'hidden' : undefined }}>
      {Object.entries(routes).map(([id, route]) => <g key={id} id={`connection-${id}`} className="panel-wire" data-mode={id} data-active={symptom === id}><path d={route.path} /><circle cx={route.x} cy={route.y} r="2.3" /></g>)}
    </g>
    <g className="scene-tower">
      <path d="m160 64 20-13h99v198l-17 14H160Z" fill="#1b232c" stroke="#596b80" />
      <path d="m160 64 20-13h99l-17 13Z" fill="#354252" stroke="#65778f" />
      <path d="m262 64 17-13v198l-17 14Z" fill="#222e3b" stroke="#4e6178" />
      <rect x="167" y="72" width="88" height="181" rx="3" fill="#141c24" stroke="#3b4b5d" />
      <path d="M174 185h72m-72 4h72" stroke="#3e4e63" strokeOpacity=".5" />
      <g className="scene-piece" data-component="fan" data-selected={highlighted('fan')}>
        <rect x="180" y="87" width="68" height="70" rx="5" fill="#283440" stroke="#637c9a" />
        <circle cx="214" cy="122" r="27" fill="#17222c" stroke="#7891ae" />
        <g className={`fan-rotor ${highlighted('fan') ? 'fan-preview' : ''}`} key={highlighted('fan') ? 'fan-active' : 'fan-rest'}>
          {[0, 72, 144, 216, 288].map(angle => <path key={angle} transform={`rotate(${angle} 214 122)`} d="M211 117c-20-3-17-23-5-19 9 2 14 10 12 18Z" fill="#465d76" stroke="#9bb4d1" strokeWidth=".7" />)}
        </g>
        <circle cx="214" cy="122" r="6" fill="#293d51" stroke="#a7c2e3" />
      </g>
      <g className="scene-piece" data-component="ram" data-selected={highlighted('ram')}>
        <rect x="181" y="164" width="64" height="16" rx="2" fill="#334759" stroke="#809bb9" />
        {[186,200,214,228].map(x => <rect key={x} x={x} y="167" width="10" height="9" rx="1" fill="#172430" stroke="#647f9d" strokeWidth=".6" />)}
        <path d="M188 181v3m9-3v3m9-3v3m9-3v3m9-3v3m9-3v3" stroke="#9eafc4" />
      </g>
      <g className="scene-piece" data-component="storage" data-selected={highlighted('storage')}>
        <rect x="181" y="207" width="64" height="36" rx="3" fill="#2a3949" stroke="#8299b6" />
        <rect x="190" y="214" width="44" height="20" rx="2" fill="#1c2a38" stroke="#506b8c" />
        <text x="212" y="227" textAnchor="middle" fill="#b1c7e3" fontSize="9" letterSpacing="2">SSD</text>
      </g>
      <rect x="167" y="72" width="88" height="181" rx="3" fill="url(#case-glass)" stroke="#a3bad4" strokeOpacity=".25" />
      <path d="m170 75 81 78V75Z" fill="#bfd6f0" opacity=".035" />
      <circle cx="270" cy="77" r="2" fill="#a8c5e9" /><path d="M268 92v23m0 8v23" stroke="#4b627f" />
      <path d="M174 263v5m72-5v5" stroke="#63748a" strokeWidth="5" />
    </g>
    <g className="scene-monitor">
      <path d="M322 66h244l7 6v161H322Z" fill="#202a36" stroke="#45566c" />
      <rect x="315" y="68" width="253" height="164" rx="9" fill="url(#monitor-shell)" stroke="#8194ac" strokeWidth=".8" />
      <rect x="322" y="75" width="239" height="146" rx="4" fill="url(#monitor-glass)" stroke="#111a24" />
      <path d="M326 79h231v15l-231 98Z" fill="#d1e5ff" opacity=".025" />
      <path d="M425 146v-23l24 23v-23" stroke="#b1ccef" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="441" y="171" textAnchor="middle" fill="#becfe5" fontSize="10">{screen}</text>
      <path d="M414 187h15m5 0h27m5 0h7" stroke="#829fbe" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="442" cy="226" r="1.3" fill="#9bb5d6" />
      <path d="M423 233h37l5 28h-47Z" fill="url(#metal-foot)" stroke="#46566b" />
      <path d="m403 261 75 0 15 9H391Z" fill="#465468" stroke="#7c8ca1" strokeWidth=".6" />
      <path d="M395 271h95" stroke="#26313f" strokeWidth="2" />
    </g>
    <g className="scene-piece scene-router" data-component="router" data-selected={highlighted('router')}>
      <path d="m617 232-8-45m57 46 9-46" stroke="#526980" strokeWidth="5" strokeLinecap="round" />
      <path d="m617 232-8-45m57 46 9-46" stroke="#a3b8d1" strokeWidth="1" />
      <path d="m591 243 20-15h61l17 15-16 21h-69Z" fill="#2b3a4a" stroke="#7b91ab" />
      <path d="m591 243 82 4 16-4m-16 4v17" stroke="#9eafc5" strokeWidth=".8" />
      <path d="M619 237h38" stroke="#526a85" />
      {[610,617,624].map(x => <circle key={x} cx={x} cy="254" r="1.3" fill="#abc8ed" />)}
      <g className={highlighted('router') ? 'signal-preview' : 'signal-rest'} key={highlighted('router') ? 'signal-active' : 'signal-idle'} fill="none" stroke="#a8c9f2" strokeWidth="1.3" strokeLinecap="round"><path d="M625 211q15-13 30 0m-24 6q9-8 18 0m-12 5q3-3 6 0" /></g>
    </g>
  </svg>;
}
