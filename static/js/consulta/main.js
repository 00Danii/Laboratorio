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
