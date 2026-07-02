function renderScanQrView(container) {
    container.innerHTML = `
        <div class="max-w-xl mx-auto space-y-6 animate-fade-in text-center no-print">
            <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center">
                <div class="bg-brand-50 text-brand-600 p-4 rounded-2xl mb-4">
                    <i data-lucide="qr-code" class="w-8 h-8"></i>
                </div>
                <h3 class="font-bold text-slate-900 text-lg">Escanear mediante Cámara Web</h3>
                <p class="text-sm text-slate-500 mt-1 max-w-sm">
                    Enciende la cámara y apunta hacia el código QR de un reactivo o material para abrir su ficha de inventario automáticamente.
                </p>

                <div class="w-full mt-6 bg-slate-900 rounded-2xl overflow-hidden aspect-video border relative">
                    <div id="reader" class="w-full"></div>
                    <div id="scanner-feedback" class="absolute inset-0 flex items-center justify-center bg-slate-900/80 text-sm font-semibold text-slate-400">
                        Esperando activación de cámara...
                    </div>
                </div>

                <div class="flex gap-3 w-full mt-6">
                    <button id="btn-start-scanner" onclick="startQrScanner()" class="flex-1 py-3 bg-brand-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-700 transition">
                        <i data-lucide="play" class="w-4 h-4"></i>
                        <span>Iniciar Cámara</span>
                    </button>
                    <button id="btn-stop-scanner" onclick="stopQrScanner()" class="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-2 transition hidden">
                        <i data-lucide="square" class="w-4 h-4"></i>
                        <span>Detener Cámara</span>
                    </button>
                </div>
            </div>

            <div class="bg-slate-100 p-5 rounded-2xl border text-left">
                <h4 class="font-bold text-sm text-slate-800 mb-2">Ingresar código manualmente</h4>
                <div class="flex gap-2">
                    <input id="manual-qr-input" type="text" placeholder="Ej. LAB-SUBSTANCES-1" class="flex-1 bg-white border px-3 py-2 rounded-xl text-sm outline-none">
                    <button onclick="handleManualQrSubmit()" class="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-sm font-semibold transition">
                        Buscar
                    </button>
                </div>
            </div>
        </div>
    `;
    if (window.lucide) window.lucide.createIcons();
}

async function handleManualQrSubmit() {
    const input = document.getElementById('manual-qr-input').value.trim();
    if (!input) return;

    try {
        const res = await fetch('/api/scan-qr', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ qr_code: input })
        }).then(r => r.json());

        if (res.status === 'success') {
            const categoryUrl = res.type === 'substance' ? 'substances' : (res.type === 'chemical_material' ? 'chemical-materials' : 'didactic-materials');
            window.location.hash = `#/${categoryUrl}/${res.data.id}`;
        } else {
            alert(res.message);
        }
    } catch (err) {
        alert(err.message);
    }
}
