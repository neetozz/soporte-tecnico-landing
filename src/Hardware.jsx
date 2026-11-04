import React from 'react';

export default function Hardware({ type, labelled = false }) {
  const label = { fan: 'Ventilador de enfriamiento', ssd: 'Unidad SSD', ram: 'Memoria RAM', router: 'Router Wi-Fi' }[type];
  return <svg className={`hardware hardware-${type}`} viewBox="0 0 120 80" fill="none" aria-hidden={labelled ? undefined : true} role={labelled ? 'img' : undefined} aria-label={labelled ? label : undefined}>
    {type === 'fan' && <>
      <rect x="31" y="10" width="58" height="58" rx="6" fill="#272f39" stroke="#788ba4" />
      <circle cx="60" cy="39" r="23" fill="#1c232c" stroke="#53647b" />
      {[0, 90, 180, 270].map(angle => <path key={angle} transform={`rotate(${angle} 60 39)`} d="M57 35C43 34 43 21 53 20c7-1 12 5 10 14Z" fill="#3b4b5f" stroke="#8aa2c1" strokeWidth=".8" />)}
      <circle cx="60" cy="39" r="6" fill="#283341" stroke="#a7bfde" />
      {[[36,15],[84,15],[36,63],[84,63]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" fill="#a1b5d0" />)}
      <path d="M72 68v5h20" stroke="#71849f" strokeLinecap="round" />
    </>}
    {type === 'ssd' && <>
      <path d="M24 16 91 12l8 48-67 7Z" fill="#272d35" stroke="#596577" />
      <path d="m30 21 55-3 6 35-55 6Z" fill="#20262e" stroke="#3d495a" />
      <path d="m38 32 29-2 2 14-29 2Z" fill="#343e4c" stroke="#7287a3" />
      <path d="m75 29 5-.4m-4 6 5-.4m-4 6 5-.4M43 55l35-3" stroke="#90aed7" strokeLinecap="round" />
      <path d="m42 65 1 5m5-6 1 5m5-5 1 5m5-6 1 5m5-6 1 5m5-5 1 4" stroke="#95a3b7" strokeWidth="2" />
      <circle cx="29" cy="20" r="1" fill="#a7bad6" /><circle cx="93" cy="57" r="1" fill="#a7bad6" />
    </>}
    {type === 'ram' && <>
      <path d="m10 32 97-9 3 31-96 9Z" fill="#29333e" stroke="#61758d" />
      {[0, 1, 2, 3].map(i => <path key={i} d={`m${21+i*21} 35 14-1 1 15-14 1Z`} fill="#1a2027" stroke="#526074" />)}
      <path d="m19 58 1 6m5-6 1 6m5-7 1 6m5-7 1 6m5-6 1 5m5-6 1 6m5-7 1 6m5-6 1 5m5-6 1 6m5-7 1 6m5-6 1 5m5-6 1 6m5-7 1 6" stroke="#a5b5cb" strokeWidth="2" />
      <path d="m16 38 1 12m86-20 1 12" stroke="#a4bddf" />
    </>}
    {type === 'router' && <>
      <path d="M34 42 28 10m57 31 6-31" stroke="#526174" strokeWidth="5" strokeLinecap="round" />
      <path d="M34 40 29 11m56 29 6-29" stroke="#96a8c0" strokeWidth="1.5" strokeLinecap="round" />
      <path d="m18 47 18-12 60 1 10 14-15 14-66-2Z" fill="#2c3440" stroke="#65758a" />
      <path d="m18 47 72 3 16 0M90 50l1 14" stroke="#8a9cb4" />
      <path d="m41 43 35 1" stroke="#4b596d" />
      {[31, 38, 45].map(x => <circle key={x} cx={x} cy="55" r="1.3" fill="#accbff" />)}
      <path d="M51 24q9-7 18 0m-13 5q4-3 8 0" stroke="#8fabd3" strokeLinecap="round" />
    </>}
  </svg>;
}
