const GHS_PICTOGRAMS = [
    {
        id: 'toxic',
        title: 'Toxicidad aguda',
        meaning: 'Puede causar intoxicaciones graves o incluso la muerte con pequenas cantidades.',
        examples: ['Cianuros', 'Metanol', 'Arsenico'],
        recommendations: ['Usar guantes', 'Evitar inhalacion', 'Trabajar bajo campana']
    },
    {
        id: 'flammable',
        title: 'Inflamable',
        meaning: 'Puede incendiarse facilmente en contacto con fuentes de ignicion.',
        examples: ['Etanol', 'Acetona', 'Hexano'],
        recommendations: ['Alejar de fuentes de calor', 'No fumar', 'Mantener cerrado']
    },
    {
        id: 'oxidizer',
        title: 'Comburente / Oxidante',
        meaning: 'Puede provocar o agravar incendios y explosiones en presencia de materiales combustibles.',
        examples: ['Peroxido de hidrogeno', 'Nitrato de potasio', 'Acido nitrico concentrado'],
        recommendations: ['Alejar de materiales combustibles', 'Almacenar en lugar fresco', 'No mezclar con reductores']
    },
    {
        id: 'corrosive',
        title: 'Corrosivo',
        meaning: 'Puede destruir tejidos vivos y materiales al contacto.',
        examples: ['Acido sulfurico', 'Hidroxido de sodio', 'Hipoclorito de sodio'],
        recommendations: ['Usar guantes y gafas', 'Mantener en envases adecuados', 'Trabajar con ventilacion']
    },
    {
        id: 'acute',
        title: 'Peligro para la salud / Irritante',
        meaning: 'Puede causar irritacion en piel, ojos o vias respiratorias, o efectos nocivos por ingestion.',
        examples: ['Cloroformo', 'Amoniaco diluido', 'Formaldehido'],
        recommendations: ['Evitar contacto con piel y ojos', 'Usar mascarilla', 'Lavar manos despues de usar']
    },
    {
        id: 'health',
        title: 'Peligro grave para la salud',
        meaning: 'Puede causar danos permanentes a la salud, cancer, mutagenicidad o toxicidad reproductiva.',
        examples: ['Benceno', 'Cromo hexavalente', 'Amianto'],
        recommendations: ['Usar EPP completo', 'Trabajar en campana extractora', 'Capacitacion obligatoria']
    },
    {
        id: 'gas',
        title: 'Gas a presion',
        meaning: 'Puede explotar con el calor si esta comprimido, o causar quemaduras por frio extremo.',
        examples: ['Oxigeno comprimido', 'Nitrogeno liquido', 'Gas propano'],
        recommendations: ['Mantener en posicion vertical', 'Alejar de fuentes de calor', 'No perforar ni incinerar']
    },
    {
        id: 'explosive',
        title: 'Explosivo',
        meaning: 'Puede explotar por impacto, friccion, chispa o calor.',
        examples: ['Acido picrico', 'Nitroglicerina', 'Peroxidos organicos'],
        recommendations: ['Evitar golpes y friccion', 'Almacenar en lugar seguro', 'No exponer al calor']
    },
    {
        id: 'environmental',
        title: 'Peligro para el medio ambiente',
        meaning: 'Puede causar danos graves a ecosistemas acuaticos o terrestres.',
        examples: ['Plaguicidas', 'Mercurio', 'Hidrocarburos clorados'],
        recommendations: ['No verter al drenaje', 'Desechar como residuo peligroso', 'Contener derrames']
    }
];

const NFPA_DATA = [
    {
        color: 'Azul', quad: 'blue', levels: [
            { level: 0, label: 'Sin riesgo', desc: 'No representa un riesgo significativo para la salud.' },
            { level: 1, label: 'Ligero', desc: 'Exposicion breve puede causar irritacion leve. Ej: acetona.' },
            { level: 2, label: 'Moderado', desc: 'Exposicion intensa o continua puede causar incapacidad temporal o danos residuales. Ej: cloroformo.' },
            { level: 3, label: 'Severo', desc: 'Exposicion breve puede causar danos graves temporales o residuales. Ej: acido clorhidrico.' },
            { level: 4, label: 'Extremo', desc: 'Exposicion muy breve puede causar la muerte o danos permanentes. Ej: acido fluorhidrico.' }
        ]
    },
    {
        color: 'Rojo', quad: 'red', levels: [
            { level: 0, label: 'No inflamable', desc: 'No se quema. Ej: agua.' },
            { level: 1, label: 'Ligeramente inflamable', desc: 'Requiere precalentamiento para ignition. Punto de inflamacion > 93 C. Ej: aceite mineral.' },
            { level: 2, label: 'Moderadamente inflamable', desc: 'Se inflama con calor moderado. Punto de inflamacion entre 38 C y 93 C. Ej: diesel.' },
            { level: 3, label: 'Altamente inflamable', desc: 'Se inflama a temperatura ambiente. Punto de inflamacion entre 23 C y 38 C. Ej: etanol.' },
            { level: 4, label: 'Extremadamente inflamable', desc: 'Se inflama facilmente a temperatura ambiente. Punto de inflamacion < 23 C. Ej: eter dietilico.' }
        ]
    },
    {
        color: 'Amarillo', quad: 'yellow', levels: [
            { level: 0, label: 'Estable', desc: 'Normalmente estable. No reacciona con agua. Ej: nitrogeno.' },
            { level: 1, label: 'Inestable si se calienta', desc: 'Normalmente estable pero puede volverse inestable a temperaturas elevadas. Ej: acido acetico.' },
            { level: 2, label: 'Reaccion violenta', desc: 'Puede sufrir cambio quimico violento a temperatura y presion elevadas. Ej: acido nitrico.' },
            { level: 3, label: 'Peligro de explosion', desc: 'Puede explotar por choque o calor intenso. Ej: peroxido de benzoilo.' },
            { level: 4, label: 'Puede explotar facilmente', desc: 'Material extremadamente sensible a calor o impacto. Ej: nitroglicerina.' }
        ]
    },
    {
        color: 'Blanco', quad: 'white', levels: [
            { level: 'W', label: 'Reacciona con agua', desc: 'Reacciona violentamente con agua liberando gases inflamables o toxicos.' },
            { level: 'OX', label: 'Oxidante', desc: 'Puede provocar combustion en materiales combustibles sin fuente de ignicion externa.' },
            { level: 'SA', label: 'Gas asfixiante simple', desc: 'Desplaza el oxigeno en espacios cerrados.' },
            { level: 'COR', label: 'Corrosivo', desc: 'Causa danos a piel, ojos o metales.' },
            { level: 'ACID', label: 'Acido fuerte', desc: 'Puede causar quemaduras quimicas graves.' },
            { level: 'ALK', label: 'Base fuerte', desc: 'Puede causar quemaduras quimicas graves.' }
        ]
    }
];

const LAB_MATERIALS = [
    { name: 'Vaso de precipitados', desc: 'Recipiente cilindrico utilizado para mezclar, calentar y contener liquidos. No debe utilizarse para medir con precision.' },
    { name: 'Probeta', desc: 'Sirve para medir volumenes de liquidos con mayor precision que un vaso de precipitados.' },
    { name: 'Bureta', desc: 'Se utiliza en titulaciones para agregar volumenes precisos de una solucion. Cuenta con una llave de paso en la parte inferior.' },
    { name: 'Matraz Erlenmeyer', desc: 'Matraz de forma conica ideal para mezclar liquidos por agitacion. Su forma permite evitar salpicaduras.' },
    { name: 'Matraz aforado', desc: 'Disenado para contener o medir un volumen exacto de liquido. Se usa en preparacion de soluciones.' },
    { name: 'Pipeta', desc: 'Tubo delgado que permite transferir volumenes precisos de liquidos. Puede ser volumetrica o graduada.' },
    { name: 'Tubo de ensayo', desc: 'Recipiente cilindrico pequeno usado para realizar pruebas quimicas a pequena escala.' },
    { name: 'Crisol', desc: 'Recipiente resistente a altas temperaturas usado para calcinar o fundir sustancias solidas.' },
    { name: 'Embudo de decantacion', desc: 'Permite separar liquidos inmiscibles de diferente densidad mediante la llave de paso inferior.' },
    { name: 'Mortero y pistilo', desc: 'Utensilio para triturar y moler solidos hasta obtener un polvo fino.' }
];

const PPE_ITEMS = [
    {
        title: 'Guantes de nitrilo',
        purpose: 'Protegen las manos contra sustancias quimicas, acidos y solventes.',
        when: 'Siempre que exista contacto directo con reactivos, muestras biologicas o materiales peligrosos.',
        limits: 'No protegen frente a todos los solventes organicos. Verificar la ficha tecnica del fabricante.'
    },
    {
        title: 'Gafas de seguridad',
        purpose: 'Protegen los ojos de salpicaduras quimicas, proyecciones de particulas y radiacion UV.',
        when: 'Obligatorias en todo momento dentro del laboratorio, incluso si no se esta manipulando reactivos.',
        limits: 'No protegen contra impactos de alta energia. Usar careta facial si hay riesgo de explosion.'
    },
    {
        title: 'Bata de laboratorio',
        purpose: 'Protege la piel y la ropa de salpicaduras quimicas y materiales biologicos.',
        when: 'Debe usarse siempre al ingresar al laboratorio. Preferiblemente de manga larga y algodon.',
        limits: 'No es impermeable. Retirar inmediatamente si se contamina con una sustancia peligrosa.'
    },
    {
        title: 'Campana extractora',
        purpose: 'Elimina humos, gases toxicos y vapores inflamables del area de trabajo.',
        when: 'Siempre que se manipulen compuestos volatiles, toxicos o con olores fuertes.',
        limits: 'No protege contra explosiones. Mantener la silla a una altura adecuada para su funcionamiento.'
    },
    {
        title: 'Careta facial',
        purpose: 'Protege toda la cara contra salpicaduras quimicas y proyecciones.',
        when: 'Al manipular grandes volumenes de acidos concentrados, bases fuertes o sustancias corrosivas.',
        limits: 'No reemplaza a las gafas de seguridad. Usar en combinacion con otros EPP.'
    },
    {
        title: 'Zapatos cerrados',
        purpose: 'Protegen los pies de derrames quimicos, caida de objetos y rotura de vidrio.',
        when: 'Obligatorios en todo el laboratorio. No usar sandalias, chanclas ni zapatos abiertos.',
        limits: 'Los zapatos de tela absorben liquidos. Preferir zapatos de cuero o material impermeable.'
    }
];

const COMPATIBILITY = [
    { group1: 'Acidos', group2: 'Bases', risk: 'Reaccion violenta con liberacion de calor.', severity: 'alta' },
    { group1: 'Acidos', group2: 'Metales', risk: 'Puede producir gases inflamables (hidrogeno).', severity: 'alta' },
    { group1: 'Oxidantes', group2: 'Alcoholes', risk: 'Puede provocar incendios o explosiones.', severity: 'alta' },
    { group1: 'Oxidantes', group2: 'Reductores', risk: 'Reaccion violenta inmediata.', severity: 'alta' },
    { group1: 'Peroxidos', group2: 'Metales', risk: 'Reaccion peligrosa con posibilidad de explosion.', severity: 'alta' },
    { group1: 'Agua', group2: 'Metales alcalinos', risk: 'Liberacion de hidrogeno con posible explosion.', severity: 'alta' },
    { group1: 'Acidos', group2: 'Cianuros', risk: 'Liberacion de gas cianhidrico altamente toxico.', severity: 'critica' },
    { group1: 'Acidos', group2: 'Sulfuros', risk: 'Liberacion de gas sulfurico toxico.', severity: 'critica' },
    { group1: 'Alcoholes', group2: 'Halogenos', risk: 'Reaccion violenta.', severity: 'media' },
    { group1: 'Amoniaco', group2: 'Halogenos', risk: 'Puede formar explosivos sensibles.', severity: 'alta' },
    { group1: 'Acidos', group2: 'Permanganatos', risk: 'Reaccion violenta, posible explosion.', severity: 'alta' },
    { group1: 'Hidroxidos', group2: 'Metales', risk: 'Puede generar gases inflamables.', severity: 'media' }
];

const FIRST_AID = [
    {
        title: 'Contacto con la piel',
        steps: ['Retirar inmediatamente la ropa y calzado contaminados.', 'Lavar la zona afectada con abundante agua durante al menos 15 minutos.', 'No usar jabones ni neutralizantes sin indicacion medica.', 'Cubrir la zona con gasa esteril y buscar atencion medica.']
    },
    {
        title: 'Contacto con los ojos',
        steps: ['Lavar inmediatamente con agua corriente o solucion salina durante 15 minutos.', 'Mantener los parpados abiertos con los dedos durante el lavado.', 'No frotar los ojos ni aplicar colirios sin prescripcion.', 'Acudir de inmediato al medico oftalmologo.']
    },
    {
        title: 'Inhalacion de gases',
        steps: ['Trasladar a la victima al aire libre inmediatamente.', 'Si no respira, iniciar reanimacion cardiopulmonar (RCP).', 'Aflojar la ropa ajustada.', 'Buscar atencion medica urgente. Llevar la etiqueta del producto si es posible.']
    },
    {
        title: 'Ingestion de sustancias',
        steps: ['No inducir el vomito a menos que lo indique un medico.', 'Enjuagar la boca con agua (no tragar).', 'Identificar la sustancia ingerida y contactar al centro de toxicologia.', 'Acudir inmediatamente a urgencias con la ficha de seguridad (SDS).']
    },
    {
        title: 'Quemaduras termicas o quimicas',
        steps: ['Enfriar la zona con agua corriente durante al menos 10 minutos.', 'No aplicar hielo directamente, cremas ni pomadas.', 'Cubrir con gasa humeda esteril o paño limpio.', 'No romper ampollas. Buscar atencion medica.']
    },
    {
        title: 'Descarga electrica',
        steps: ['NO tocar a la victima si aun esta en contacto con la fuente electrica.', 'Desconectar la corriente o separar a la victima con un objeto no conductor (madera, plastico).', 'Verificar si respira y tiene pulso. Iniciar RCP si es necesario.', 'Llamar a emergencias inmediatamente.']
    }
];

const SAFETY_SIGNS = [
    { label: 'Prohibido fumar', desc: 'No introducir llamas abiertas ni encendedores.' },
    { label: 'Material inflamable', desc: 'Presencia de sustancias que pueden arder facilmente.' },
    { label: 'Toxico', desc: 'Sustancias que pueden causar danos graves a la salud.' },
    { label: 'Corrosivo', desc: 'Materiales que pueden quemar la piel o corroer metales.' },
    { label: 'Radiacion', desc: 'Presencia de fuentes radiactivas o equipos que emiten radiacion ionizante.' },
    { label: 'Riesgo biologico', desc: 'Materiales que contienen microorganismos patogenos.' },
    { label: 'Salida de emergencia', desc: 'Direccion hacia la salida mas cercana en caso de emergencia.' },
    { label: 'Peligro general', desc: 'Advertencia general de riesgos no especificados en el area.' },
    { label: 'Proteccion obligatoria', desc: 'Es obligatorio el uso de gafas de seguridad en esta area.' },
    { label: 'Uso de guantes obligatorio', desc: 'Deben usarse guantes de proteccion para manipular materiales.' },
    { label: 'Ducha de emergencia', desc: 'Ubicacion de la ducha de seguridad para lavado corporal urgente.' },
    { label: 'Lavaojos', desc: 'Estacion de lavado de ojos para emergencias con salpicaduras.' }
];

const GLOSSARY = [
    { term: 'CAS', def: 'Numero unico asignado por el Chemical Abstracts Service a cada sustancia quimica. Permite identificar inequivocamente un compuesto.' },
    { term: 'SDS / MSDS', def: 'Hoja de Datos de Seguridad (Safety Data Sheet). Documento que describe los peligros, manejo y emergencias de una sustancia quimica.' },
    { term: 'pH', def: 'Medida de acidez o alcalinidad de una solucion acuosa. Escala de 0 (acido) a 14 (base), siendo 7 neutro.' },
    { term: 'Molaridad (M)', def: 'Unidad de concentracion que expresa el numero de moles de soluto por litro de solucion.' },
    { term: 'Punto de inflamacion', def: 'Temperatura minima a la que una sustancia libera vapores suficientes para formar una mezcla inflamable con el aire.' },
    { term: 'DL50', def: 'Dosis letal 50. Cantidad de una sustancia necesaria para matar al 50% de una poblacion de prueba. Indica toxicidad aguda.' },
    { term: 'GHS', def: 'Sistema Globalmente Armonizado de clasificacion y etiquetado de productos quimicos. Define pictogramas, palabras de advertencia y frases de riesgo.' },
    { term: 'NFPA 704', def: 'Norma del National Fire Protection Association que usa un diamante con codigo de colores y numeros para indicar los peligros de una sustancia.' },
    { term: 'ppm', def: 'Partes por millon. Unidad de concentracion usada para cantidades muy pequenas de una sustancia en aire o agua.' },
    { term: 'CAMPANA', def: 'Campana extractora de gases. Sistema de ventilacion localizada que protege al usuario de inhalar vapores toxicos.' },
    { term: 'Reactivo limitante', def: 'Sustancia que se consume completamente en una reaccion quimica y determina la cantidad maxima de producto formado.' },
    { term: 'Catalizador', def: 'Sustancia que acelera una reaccion quimica sin consumirse en el proceso. No altera el equilibrio termodinamico.' }
];

function ghsSection() {
    return `<div id="consulta-ghs">
        <p class="text-slate-600 mb-6">Los pictogramas del Sistema Globalmente Armonizado (GHS) identifican los peligros de las sustancias quimicas. Cada uno representa un tipo de riesgo especifico.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            ${GHS_PICTOGRAMS.map(p => `
                <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
                    <div class="flex items-center gap-4 p-5 pb-3 border-b border-slate-100">
                        <div class="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                            <img src="" alt="${p.title}" class="w-full h-full object-contain hidden" onerror="this.classList.add('hidden');this.nextElementSibling.classList.remove('hidden')">
                            <svg class="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-slate-800">${p.title}</h3>
                            <p class="text-sm text-slate-500 mt-1">${p.meaning}</p>
                        </div>
                    </div>
                    <div class="p-5 space-y-3">
                        <div>
                            <p class="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">Ejemplos</p>
                            <ul class="text-sm text-slate-600 list-disc list-inside">${p.examples.map(e => `<li>${e}</li>`).join('')}</ul>
                        </div>
                        <div>
                            <p class="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">Recomendaciones</p>
                            <ul class="text-sm text-slate-600 list-disc list-inside">${p.recommendations.map(r => `<li>${r}</li>`).join('')}</ul>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>`;
}

function nfpaSection() {
    const quads = ['blue', 'red', 'yellow', 'white'];
    const labels = ['Azul - Salud', 'Rojo - Inflamabilidad', 'Amarillo - Reactividad', 'Blanco - Especial'];
    const bgColors = { blue: '#3b82f6', red: '#ef4444', yellow: '#eab308', white: '#f1f5f9' };
    const textColors = { blue: 'white', red: 'white', yellow: '#1e293b', white: '#1e293b' };

    return `<div id="consulta-nfpa">
        <p class="text-slate-600 mb-6">El diamante NFPA 704 es un sistema de identificacion de peligros. Selecciona un nivel en cada cuadrante para ver su significado.</p>
        <div class="grid lg:grid-cols-2 gap-8">
            <div class="flex justify-center items-center">
                <div class="relative" style="width:300px;height:300px;">
                    ${quads.map((q, qi) => {
                        const data = NFPA_DATA[qi];
                        return `
                        <div class="absolute flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105"
                             style="width:150px;height:150px;${qi === 0 ? 'top:0;left:0;' : qi === 1 ? 'top:0;right:0;' : qi === 2 ? 'bottom:0;left:0;' : 'bottom:0;right:0;'}
                             background:${bgColors[q]};color:${textColors[q]};clip-path:polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);"
                             onclick="showNfpaLevel('${q}', 0)">
                            <span class="text-4xl font-black" style="margin-top:8px;" id="nfpa-val-${q}">0</span>
                            <span class="text-[10px] font-semibold uppercase tracking-wider">${labels[qi].split(' - ')[0]}</span>
                        </div>`;
                    }).join('')}
                </div>
            </div>
            <div class="space-y-5">
                ${NFPA_DATA.map((data, qi) => `
                    <div class="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-100 p-4">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="w-4 h-4 rounded-full inline-block shrink-0" style="background:${bgColors[data.quad]};border:1px solid ${data.quad === 'white' ? '#cbd5e1' : 'transparent'}"></span>
                            <h3 class="font-bold text-slate-800">${data.color} - ${labels[qi].split(' - ')[1]}</h3>
                        </div>
                        <div class="flex flex-wrap gap-2 mb-3">
                            ${data.levels.map(l => `
                                <button class="px-3 py-1.5 text-sm rounded-lg border transition font-medium ${l.level === 0 ? 'bg-brand-500 text-white border-brand-500' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'}"
                                        id="nfpa-btn-${data.quad}-${l.level}"
                                        onclick="selectNfpaLevel('${data.quad}', ${typeof l.level === 'number' ? l.level : `'${l.level}'`}, this)">
                                    ${l.level}
                                </button>
                            `).join('')}
                        </div>
                        <p class="text-sm text-slate-600" id="nfpa-desc-${data.quad}">${data.levels[0].desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>`;
}

function labMaterialsSection() {
    return `<div id="consulta-materiales">
        <p class="text-slate-600 mb-6">Instrumentos y equipos basicos de laboratorio, su uso y limitaciones.</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            ${LAB_MATERIALS.map(m => `
                <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
                    <div class="h-44 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <img src="" alt="${m.name}" class="w-full h-full object-contain p-4 hidden" onerror="this.classList.add('hidden');this.nextElementSibling.classList.remove('hidden')">
                        <div class="flex flex-col items-center justify-center text-slate-400">
                            <svg class="w-12 h-12 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            <span class="text-xs">Agregar foto</span>
                        </div>
                    </div>
                    <div class="p-5">
                        <h3 class="font-bold text-slate-800 text-lg">${m.name}</h3>
                        <p class="text-sm text-slate-600 mt-2 leading-relaxed">${m.desc}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>`;
}

function ppeSection() {
    return `<div id="consulta-ppe">
        <p class="text-slate-600 mb-6">El equipo de proteccion personal (EPP) es obligatorio en el laboratorio. Cada elemento tiene una funcion especifica.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            ${PPE_ITEMS.map(p => `
                <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
                    <div class="flex items-center gap-4 p-5 border-b border-slate-100">
                        <div class="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                            <img src="" alt="${p.title}" class="w-full h-full object-contain hidden" onerror="this.classList.add('hidden');this.nextElementSibling.classList.remove('hidden')">
                            <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        </div>
                        <h3 class="font-bold text-slate-800 text-lg">${p.title}</h3>
                    </div>
                    <div class="p-5 space-y-3 text-sm text-slate-600">
                        <div><span class="font-semibold text-slate-700">Proposito:</span> ${p.purpose}</div>
                        <div><span class="font-semibold text-slate-700">Cuando usarlo:</span> ${p.when}</div>
                        <div><span class="font-semibold text-slate-700">Limitaciones:</span> ${p.limits}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>`;
}

function compatibilitySection() {
    const severityBadge = (s) => {
        if (s === 'critica') return '<span class="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">Critica</span>';
        if (s === 'alta') return '<span class="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">Alta</span>';
        return '<span class="text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">Media</span>';
    };
    return `<div id="consulta-compatibilidad">
        <p class="text-slate-600 mb-6">Almacenar sustancias incompatibles juntas puede provocar reacciones peligrosas. Consulta esta tabla antes de guardar productos quimicos.</p>
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md border border-slate-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="bg-brand-500 text-white">
                            <th class="text-left px-5 py-3 font-semibold">Grupo 1</th>
                            <th class="text-left px-5 py-3 font-semibold">Grupo 2</th>
                            <th class="text-left px-5 py-3 font-semibold">Riesgo</th>
                            <th class="text-center px-5 py-3 font-semibold w-20">Severidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${COMPATIBILITY.map((c, i) => `
                            <tr class="${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-b border-slate-100">
                                <td class="px-5 py-3 font-medium text-slate-800">${c.group1}</td>
                                <td class="px-5 py-3 text-slate-600"><span class="text-red-400 font-bold mx-1">X</span> ${c.group2}</td>
                                <td class="px-5 py-3 text-slate-600">${c.risk}</td>
                                <td class="px-5 py-3 text-center">${severityBadge(c.severity)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </div>`;
}

function firstAidSection() {
    return `<div id="consulta-primeros">
        <p class="text-slate-600 mb-6">En caso de accidente en el laboratorio, sigue estos pasos basicos de primeros auxilios mientras llega la atencion medica.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            ${FIRST_AID.map(fa => `
                <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md border border-slate-100 overflow-hidden">
                    <div class="bg-red-50 px-5 py-3 border-b border-red-100">
                        <h3 class="font-bold text-slate-800 flex items-center gap-2">
                            <i data-lucide="alert-triangle" class="w-5 h-5 text-red-500"></i>
                            ${fa.title}
                        </h3>
                    </div>
                    <ol class="p-5 space-y-2">
                        ${fa.steps.map((s, si) => `
                            <li class="text-sm text-slate-600 flex items-start gap-2">
                                <span class="w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">${si + 1}</span>
                                <span>${s}</span>
                            </li>
                        `).join('')}
                    </ol>
                </div>
            `).join('')}
        </div>
    </div>`;
}

function safetySignsSection() {
    return `<div id="consulta-senales">
        <p class="text-slate-600 mb-6">Las senales de seguridad en el laboratorio utilizan colores y simbolos estandarizados para comunicar riesgos y obligaciones.</p>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            ${SAFETY_SIGNS.map(s => `
                <div class="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-100 p-4 text-center hover:shadow-md transition-shadow">
                    <div class="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3 overflow-hidden">
                        <img src="" alt="${s.label}" class="w-full h-full object-contain hidden" onerror="this.classList.add('hidden');this.nextElementSibling.classList.remove('hidden')">
                        <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                    <p class="text-sm font-bold text-slate-800">${s.label}</p>
                    <p class="text-xs text-slate-500 mt-1">${s.desc}</p>
                </div>
            `).join('')}
        </div>
    </div>`;
}

function glossarySection() {
    return `<div id="consulta-glosario">
        <p class="text-slate-600 mb-6">Definiciones de terminos y abreviaturas comunes en el laboratorio quimico.</p>
        <div class="space-y-2">
            ${GLOSSARY.map(g => `
                <div class="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-100 p-4 hover:border-brand-200 transition-colors">
                    <div class="flex items-start gap-4">
                        <span class="text-sm font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-lg shrink-0 mt-0.5">${g.term}</span>
                        <p class="text-sm text-slate-600">${g.def}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>`;
}

const SECTIONS = [
    { id: 'ghs', label: 'Pictogramas GHS', icon: 'triangle-alert', render: ghsSection },
    { id: 'nfpa', label: 'Diamante NFPA', icon: 'diamond', render: nfpaSection },
    { id: 'materiales', label: 'Material de laboratorio', icon: 'flask-conical', render: labMaterialsSection },
    { id: 'ppe', label: 'Equipo de proteccion', icon: 'shield', render: ppeSection },
    { id: 'compatibilidad', label: 'Compatibilidad quimica', icon: 'x-circle', render: compatibilitySection },
    { id: 'primeros', label: 'Primeros auxilios', icon: 'heart-pulse', render: firstAidSection },
    { id: 'senales', label: 'Senales de seguridad', icon: 'signpost', render: safetySignsSection },
    { id: 'glosario', label: 'Glosario', icon: 'book-open-text', render: glossarySection }
];

function activateSection(sectionId) {
    document.querySelectorAll('.consulta-tab').forEach(t => {
        t.classList.remove('bg-brand-500', 'text-white', 'shadow-md');
        t.classList.add('text-slate-600', 'hover:bg-slate-100');
    });
    const tab = document.getElementById(`consulta-tab-${sectionId}`);
    if (tab) {
        tab.classList.remove('text-slate-600', 'hover:bg-slate-100');
        tab.classList.add('bg-brand-500', 'text-white', 'shadow-md');
    }
    document.querySelectorAll('.consulta-content').forEach(c => c.classList.add('hidden'));
    const content = document.getElementById(`consulta-content-${sectionId}`);
    if (content) {
        content.classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
    }
}

function selectNfpaLevel(quad, level, btn) {
    const data = NFPA_DATA.find(d => d.quad === quad);
    if (!data) return;
    document.querySelectorAll(`[id^="nfpa-btn-${quad}-"]`).forEach(b => {
        b.classList.remove('bg-brand-500', 'text-white', 'border-brand-500');
        b.classList.add('bg-white', 'text-slate-600', 'border-slate-200', 'hover:border-brand-300');
    });
    if (btn) {
        btn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200', 'hover:border-brand-300');
        btn.classList.add('bg-brand-500', 'text-white', 'border-brand-500');
    }
    const valEl = document.getElementById(`nfpa-val-${quad}`);
    if (valEl) valEl.textContent = level;
    const descEl = document.getElementById(`nfpa-desc-${quad}`);
    if (descEl) {
        const lvl = data.levels.find(l => l.level === level);
        if (lvl) descEl.textContent = `Nivel ${level}: ${lvl.desc}`;
    }
}
window.selectNfpaLevel = selectNfpaLevel;

function showNfpaLevel(quad, level) {
    const btn = document.querySelector(`#nfpa-btn-${quad}-${level}`);
    if (btn) selectNfpaLevel(quad, level, btn);
}
window.showNfpaLevel = showNfpaLevel;

async function renderConsultaView(container) {
    container.innerHTML = `
        <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20 p-6">
            <div class="flex items-center gap-3 mb-2">
                <div class="p-2.5 rounded-2xl bg-brand-100">
                    <i data-lucide="book-open-check" class="w-6 h-6 text-brand-600"></i>
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-slate-800">Centro de Consulta</h2>
                    <p class="text-sm text-slate-500">Informacion de referencia para el laboratorio quimico</p>
                </div>
            </div>
        </div>

        <div class="mt-6 overflow-x-auto no-scrollbar">
            <div class="flex gap-2 min-w-max pb-2">
                ${SECTIONS.map(s => `
                    <button id="consulta-tab-${s.id}" class="consulta-tab flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${s.id === 'ghs' ? 'bg-brand-500 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}"
                            onclick="activateSection('${s.id}')">
                        <i data-lucide="${s.icon}" class="w-4 h-4"></i>
                        <span>${s.label}</span>
                    </button>
                `).join('')}
            </div>
        </div>

        <div class="mt-6">
            ${SECTIONS.map(s => `
                <div id="consulta-content-${s.id}" class="consulta-content ${s.id === 'ghs' ? '' : 'hidden'}">
                    ${s.render()}
                </div>
            `).join('')}
        </div>
    `;

    if (window.lucide) window.lucide.createIcons();
}
