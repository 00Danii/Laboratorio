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
    const bgColors = {
        blue: '#3b82f6',
        red: '#ef4444',
        yellow: '#eab308',
        white: '#ffffff'
    };
    const textColors = {
        blue: '#ffffff',
        red: '#ffffff',
        yellow: '#1e293b',
        white: '#1e293b'
    };

    const positions = [
        'top:0;left:0;',
        'top:0;right:0;',
        'bottom:0;left:0;',
        'bottom:0;right:0;'
    ];

    return `
    <div id="consulta-nfpa">
        <p class="text-slate-600 mb-6">
            El diamante NFPA 704 es un sistema de identificación de peligros.
            Selecciona un nivel en cada cuadrante para ver su significado.
        </p>

        <div class="grid lg:grid-cols-2 gap-8">

            <!-- Diamante -->
            <div class="flex justify-center items-center">

                <div
                    class="relative overflow-hidden border-4 border-slate-800 shadow-lg"
                    style="
                        width:260px;
                        height:260px;
                        transform:rotate(45deg);
                        background:white;
                    "
                >

                    <!-- División vertical -->
                    <div
                        style="
                            position:absolute;
                            left:50%;
                            top:0;
                            width:4px;
                            height:100%;
                            background:#1e293b;
                            transform:translateX(-50%);
                        ">
                    </div>

                    <!-- División horizontal -->
                    <div
                        style="
                            position:absolute;
                            top:50%;
                            left:0;
                            width:100%;
                            height:4px;
                            background:#1e293b;
                            transform:translateY(-50%);
                        ">
                    </div>

                    ${quads.map((q, qi) => `
                        <div
                            onclick="showNfpaLevel('${q}',0)"
                            class="absolute flex items-center justify-center cursor-pointer transition-all hover:brightness-110"
                            style="
                                ${positions[qi]}
                                width:50%;
                                height:50%;
                                background:${bgColors[q]};
                                color:${textColors[q]};
                            "
                        >
                            <span
                                id="nfpa-val-${q}"
                                style="
                                    transform:rotate(-45deg);
                                    font-size:2.6rem;
                                    font-weight:900;
                                    user-select:none;
                                "
                            >
                                0
                            </span>
                        </div>
                    `).join('')}

                </div>

            </div>

            <!-- Panel derecho -->
            <div class="space-y-5">

                ${NFPA_DATA.map((data, qi) => `
                    <div class="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-100 p-4">

                        <div class="flex items-center gap-3 mb-3">

                            <span
                                class="w-4 h-4 rounded-full shrink-0"
                                style="
                                    background:${bgColors[data.quad]};
                                    border:1px solid ${data.quad === 'white' ? '#cbd5e1' : 'transparent'};
                                ">
                            </span>

                            <h3 class="font-bold text-slate-800">
                                ${data.color} - ${labels[qi].split(' - ')[1]}
                            </h3>

                        </div>

                        <div class="flex flex-wrap gap-2 mb-3">

                            ${data.levels.map(l => `
                                <button
                                    id="nfpa-btn-${data.quad}-${l.level}"
                                    class="px-3 py-1.5 text-sm rounded-lg border transition font-medium
                                    ${l.level === 0
            ? 'bg-brand-500 text-white border-brand-500'
            : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'}"

                                    onclick="selectNfpaLevel(
                                        '${data.quad}',
                                        ${typeof l.level === 'number' ? l.level : `'${l.level}'`},
                                        this
                                    )"
                                >
                                    ${l.level}
                                </button>
                            `).join('')}

                        </div>

                        <p
                            class="text-sm text-slate-600"
                            id="nfpa-desc-${data.quad}"
                        >
                            ${data.levels[0].desc}
                        </p>

                    </div>
                `).join('')}

            </div>

        </div>
    </div>
    `;
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
    const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));
    const first = sorted[0];
    return `<div id="consulta-glosario">
        <p class="text-slate-600 mb-6">Selecciona un termino para ver su definicion.</p>
        <div class="flex flex-col md:flex-row gap-4">
            <div class="w-full md:w-64 shrink-0">
                <input type="text" id="glossary-search" placeholder="Buscar termino..." class="w-full mb-3 px-3 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none" oninput="filterGlossary()">
                <div id="glossary-terms" class="space-y-1 max-h-96 overflow-y-auto pr-1">
                    ${sorted.map(g => `
                        <button class="glossary-term w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${g.term === first.term ? 'bg-brand-500 text-white' : 'text-slate-600 hover:bg-slate-100'}"
                                data-term="${g.term}"
                                onclick="selectGlossaryTerm('${g.term}')">
                            ${g.term}
                        </button>
                    `).join('')}
                </div>
            </div>
            <div class="flex-1" id="glossary-detail">
                <div class="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-100 p-6">
                    <h3 class="text-xl font-bold text-slate-800 mb-2">${first.term}</h3>
                    <p class="text-sm text-slate-600 leading-relaxed">${first.def}</p>
                </div>
            </div>
        </div>
    </div>`;
}
