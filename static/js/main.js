function setActiveTab(id) {
    const tab = document.getElementById(id);
    if (tab) {
        tab.classList.remove('text-slate-300', 'hover:bg-slate-800', 'hover:text-white');
        tab.classList.add('bg-brand-500', 'text-slate-900', 'font-bold');
    }
}

function router() {
    state.activeRoute = window.location.hash || '#/';

    stopQrScanner();
    stopWebcam();

    document.querySelectorAll('aside nav a').forEach(a => {
        a.classList.remove('bg-brand-500', 'text-slate-900', 'bg-slate-800', 'text-white');
        a.classList.add('text-slate-300', 'hover:bg-slate-800', 'hover:text-white');
    });

    const titleEl = document.getElementById('page-title');
    const mainEl = document.getElementById('main-content');

    if (state.activeRoute === '#/') {
        setActiveTab('nav-dashboard');
        titleEl.textContent = "Panel de Control";
        renderDashboard(mainEl);
    }
    else if (state.activeRoute.startsWith('#/substances')) {
        setActiveTab('nav-substances');
        titleEl.textContent = "Reactivos y Sustancias Químicas";
        const parts = state.activeRoute.split('/');
        if (parts.length === 3) {
            renderItemDetail(mainEl, 'substances', parts[2]);
        } else {
            renderSubstancesList(mainEl);
        }
    }
    else if (state.activeRoute.startsWith('#/chemical-materials')) {
        setActiveTab('nav-chem-materials');
        titleEl.textContent = "Materiales Químicos";
        const parts = state.activeRoute.split('/');
        if (parts.length === 3) {
            renderItemDetail(mainEl, 'chemical-materials', parts[2]);
        } else {
            renderChemicalMaterialsList(mainEl);
        }
    }
    else if (state.activeRoute.startsWith('#/didactic-materials')) {
        setActiveTab('nav-did-materials');
        titleEl.textContent = "Materiales Didácticos";
        const parts = state.activeRoute.split('/');
        if (parts.length === 3) {
            renderItemDetail(mainEl, 'didactic-materials', parts[2]);
        } else {
            renderDidacticMaterialsList(mainEl);
        }
    }
    else if (state.activeRoute === '#/scan-qr') {
        setActiveTab('nav-scan-qr');
        titleEl.textContent = "Escaneo de Códigos QR";
        renderScanQrView(mainEl);
    }
    else if (state.activeRoute === '#/history') {
        setActiveTab('nav-history');
        titleEl.textContent = "Historial de Auditoría";
        renderHistoryView(mainEl);
    }
    else if (state.activeRoute === '#/consulta') {
        setActiveTab('nav-consulta');
        titleEl.textContent = "Centro de Consulta";
        renderConsultaView(mainEl);
    }
    else if (state.activeRoute === '#/backup') {
        setActiveTab('nav-backup');
        titleEl.textContent = "Base de Datos";
        renderBackupView(mainEl);
    }
    else {
        mainEl.innerHTML = `<div class="p-8 text-center text-red-500 font-bold">Ruta no encontrada.</div>`;
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

async function initApp() {
    const savedViewMode = localStorage.getItem('itma2_substances_view_mode');
    if (savedViewMode) {
        state.substancesViewMode = savedViewMode;
    }
    await checkSessionStatus();
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', initApp);
