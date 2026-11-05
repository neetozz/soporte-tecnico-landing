# soporte-tecnico-landing

Landing de muestra para soporte técnico.

## Nodo — Tecnología en su punto

Versión final de portafolio de una marca ficticia, construida con React, Vite y CSS. Es un proyecto desarrollado con asistencia de IA en implementación, contenido y verificación, con dirección y revisión de la persona responsable del portafolio. No representa un negocio operativo ni acredita experiencia comercial, clientes o certificaciones.

Incluye mantenimiento de computadoras, mejoras SSD/RAM, configuración de Wi-Fi, proceso, preguntas frecuentes y contacto de demostración. Inspiración de dirección visual: https://www.onorca.dev/, con composición e ilustraciones SVG propias.

## Requisitos e instalación

Node.js 20.19+ o 22.12+ (verificado con Node 24) y npm.

```sh
npm install
npm run dev
```

Abrir la dirección que muestra Vite en la terminal. Para usar el mismo puerto de la revisión:

```sh
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

## Compilar y revisar producción

```sh
npm run build
npm run preview
```

La compilación se genera en `dist/`. No se ha configurado publicación ni backend.

El archivo `package-lock.json` fija las dependencias. Para reproducir la instalación desde una copia limpia, se puede usar `npm ci`.

## Funciones

- Navegación por secciones, menú móvil y enlace para volver al inicio.
- Conjunto SVG propio con monitor, torre translúcida, ventilador, RAM, almacenamiento SSD y router. Tres síntomas destacan las piezas relacionadas y muestran una explicación y acceso al servicio.
- Modo «Ver componentes» con botones de selección accesibles. El ventilador y la señal tienen animaciones breves, sin ciclos continuos y desactivadas con movimiento reducido.
- Conexiones independientes por identificador, alineadas con cada control mediante sus posiciones reales. En celular se ocultan para evitar ambigüedad.
- «Explorar mi problema» abre un diálogo modal: síntoma, dos preguntas y resumen basado en reglas locales. Permite retroceder, cambiar respuestas, reiniciar y cerrar con Escape, restaurando el foco.
- Al continuar al contacto, se selecciona el servicio; el resumen se agrega únicamente si el usuario marca la casilla, conservando el texto existente. No se añade dos veces el mismo resumen.
- Servicios con ilustraciones ligeras y etiquetas informativas separadas por puntos. Sus enlaces seleccionan el servicio en el formulario sin borrar nombre ni mensaje.
- Preguntas desplegables y formulario con validación nativa y confirmación local accesible.
- Respuestas visuales al foco y al cursor, y respeto por movimiento reducido.

## Estructura

- `src/main.jsx`: contenido, navegación móvil, servicios, preguntas y formulario.
- `src/SystemVisual.jsx`: controles de síntomas y exploración de componentes.
- `src/ComputerScene.jsx`: ilustración original, conexiones y selección de piezas.
- `src/OrientationDialog.jsx`: recorrido modal y navegación entre sus pasos.
- `src/orientation.js`: preguntas y reglas puras de orientación. Las dos respuestas afectan las recomendaciones; solo se sugieren mejoras para una lentitud ubicada y con espacio disponible. En otros casos se propone una revisión inicial. El calor remite a mantenimiento y los cortes a configuración de redes.
- `src/panelModes.js`: textos y servicios asociados a cada síntoma del panel.
- `tests/orientation.test.js`: cobertura de las 27 combinaciones válidas, respuestas desconocidas, selección de servicios y rechazo de entradas incompletas o inválidas.
- `src/Hardware.jsx`: ilustraciones SVG originales de ventilador, SSD, RAM y router, sin dependencias gráficas.
- `src/styles.css`: estilos, diseño adaptable y preferencias de movimiento reducido.
- `src/workstation.css`: escena, controles y diálogo; conserva la dirección visual de la landing.
- `public/favicon.svg`: símbolo provisional de Nodo.
- `index.html`: idioma, título y metadatos.

## Contacto de demostración

El formulario usa validación nativa y muestra una confirmación en la página que indica que no se envió ni guardó ningún dato. No hace solicitudes de red, no envía mensajes, no guarda datos ni agenda visitas. No pide correo ni teléfono. Usar datos de ejemplo. Los valores solo permanecen en la página abierta y se pierden al recargar.

## Limitaciones

- El panel no mide rendimiento, temperatura ni señal; sus explicaciones no constituyen diagnósticos.
- No hay atención real, reservas, presupuestos, backend, analítica, cookies de aplicación ni almacenamiento persistente.
- Google Fonts entrega la tipografía mediante una solicitud externa al abrir la página; el formulario no transmite su contenido. Sin conexión se usa la fuente sans-serif local.
- No se ha publicado el proyecto ni se ha definido una URL pública.

## Qué personalizar

- Marca, símbolo, favicon, textos y metadatos.
- Servicios, alcance, compatibilidad, proceso y preguntas según la operación real.
- Zona de atención, horarios, canales y condiciones, una vez definidos. No se incluyen datos personales, teléfonos, clientes, testimonios, estadísticas ni certificaciones.
- Antes de habilitar contacto real: implementar un backend, validación de servidor, protección contra abuso y los avisos de privacidad correspondientes; actualizar los mensajes de demostración.
- Tipografía: DM Sans se obtiene de Google Fonts, con fallback local sans-serif. Para eliminar la dependencia externa, alojar sus archivos y sustituir el `@import` por `@font-face`.

## Accesibilidad y diseño

HTML semántico, enlace para saltar al contenido, etiquetas de formulario, foco visible, preguntas nativas con `details`, menú con estado expandido y confirmación con `role="status"`. El CSS respeta `prefers-reduced-motion`. Diseño adaptable a móvil y escritorio, sin recursos gráficos pesados.

## Verificación de la entrega

```sh
npm test
npm run build
```

Las reglas del recorrido no acceden a sensores, procesos, archivos ni conexiones del dispositivo. Los resultados organizan una consulta de ejemplo y no afirman una falla ni reemplazan una revisión técnica.

Compilación con `npm run build` y revisión real en navegador Chromium/Edge a 360, 390, 768 y 1440 px. Comprobaciones de desbordamiento, panel y enlaces, navegación móvil, preguntas, validación y confirmación sin solicitudes de formulario ni almacenamiento, foco de teclado y movimiento reducido. Esta revisión no equivale a una certificación de accesibilidad ni a pruebas en todos los dispositivos o lectores de pantalla.
