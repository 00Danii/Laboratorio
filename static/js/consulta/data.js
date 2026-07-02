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
