async function renderBackupView(container) {
    if (!state.isLoggedIn) {
        container.innerHTML = `
            <div class="max-w-md mx-auto mt-12 bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-8 text-center shadow-lg animate-fade-in">
                <div class="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-5 border border-amber-100">
                    <i data-lucide="lock" class="w-8 h-8"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-800">Acceso Restringido</h3>
                <p class="text-sm text-slate-500 mt-2 leading-relaxed">
                    Debes iniciar sesión como administrador para acceder a las opciones de copia de seguridad e importación de la base de datos.
                </p>
                <button onclick="openAuthModal()" class="mt-6 w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-brand-600/10">
                    <i data-lucide="log-in" class="w-4 h-4"></i>
                    <span>Iniciar Sesión</span>
                </button>
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
    }

    container.innerHTML = `
        <div class="space-y-8 animate-fade-in">
            <!-- Encabezado de la Sección -->
            <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-brand-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-slate-950/5">
                <div class="absolute -right-16 -top-16 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl"></div>
                <div class="relative z-10 max-w-2xl">
                    <span class="text-brand-400 text-sm font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <i data-lucide="database" class="w-4 h-4"></i>
                        <span>Administración de Sistema</span>
                    </span>
                    <h2 class="text-3xl font-extrabold mt-2">Copia de Seguridad (Backup)</h2>
                    <p class="text-slate-300 mt-2">
                        Exporta la base de datos completa para guardarla como copia de seguridad local, o importa un archivo de base de datos previamente respaldado.
                    </p>
                </div>
            </div>

            <!-- Panel de Control de Backup -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Columna Exportar -->
                <div class="bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                    <div class="space-y-4">
                        <div class="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center border border-teal-100">
                            <i data-lucide="download-cloud" class="w-7 h-7"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-slate-800">Exportar Base de Datos</h3>
                            <p class="text-sm text-slate-500 mt-2 leading-relaxed">
                                Descarga un archivo binario conteniendo la base de datos SQLite actual (<code>inventario.db</code>).
                                Este respaldo incluye todo el inventario de sustancias, materiales químicos y didácticos, el historial completo de auditoría, las cuentas de usuarios y la configuración del Centro de Consulta.
                            </p>
                        </div>
                    </div>
                    <div class="pt-6">
                        <button onclick="handleDbExport()" class="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl transition flex items-center justify-center gap-2 shadow-md shadow-teal-600/10">
                            <i data-lucide="file-down" class="w-5 h-5"></i>
                            <span>Descargar Respaldo (.db)</span>
                        </button>
                    </div>
                </div>

                <!-- Columna Importar -->
                <div class="bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                    <div class="space-y-4">
                        <div class="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center border border-rose-100">
                            <i data-lucide="upload-cloud" class="w-7 h-7"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-slate-800">Importar Base de Datos</h3>
                            <p class="text-sm text-slate-500 mt-2 leading-relaxed">
                                Sube un archivo de base de datos respaldado de LabKeep (<code>.db</code>).
                            </p>
                            <div class="mt-3 p-3.5 bg-rose-50 border border-rose-100 rounded-2xl text-xs text-rose-700 leading-relaxed font-semibold">
                                <i data-lucide="alert-triangle" class="w-4 h-4 inline-block align-text-top mr-1"></i>
                                ADVERTENCIA: Esta acción reemplazará por completo toda la base de datos actual del sistema. Todos los cambios realizados desde el último respaldo se perderán definitivamente.
                            </div>
                        </div>
                        
                        <div class="mt-4">
                            <label class="w-full h-32 border-2 border-dashed border-slate-200 hover:border-brand-400 rounded-2xl flex flex-col items-center justify-center gap-2 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer p-4 text-center">
                                <i data-lucide="file" class="w-8 h-8 text-slate-400"></i>
                                <span class="text-xs font-bold text-slate-600" id="import-file-name">Selecciona o arrastra el archivo .db</span>
                                <span class="text-3xs text-slate-400 font-semibold">Máximo 10MB</span>
                                <input type="file" id="db-file-input" accept=".db" class="hidden" onchange="handleImportFileSelect(this)">
                            </label>
                        </div>
                    </div>
                    <div class="pt-6">
                        <button onclick="handleDbImport()" id="btn-import-db" class="w-full py-3.5 bg-slate-800 hover:bg-rose-600 text-white font-bold rounded-2xl transition flex items-center justify-center gap-2 shadow-md">
                            <i data-lucide="refresh-cw" class="w-5 h-5"></i>
                            <span>Restaurar Base de Datos</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    if (window.lucide) window.lucide.createIcons();
}

function handleImportFileSelect(input) {
    const fileNameEl = document.getElementById('import-file-name');
    if (input.files && input.files.length > 0) {
        fileNameEl.textContent = input.files[0].name;
        fileNameEl.classList.remove('text-slate-600');
        fileNameEl.classList.add('text-brand-600');
    } else {
        fileNameEl.textContent = "Selecciona o arrastra el archivo .db";
        fileNameEl.classList.remove('text-brand-600');
        fileNameEl.classList.add('text-slate-600');
    }
}

function handleDbExport() {
    // Al descargar, redirigimos directamente a la URL de descarga.
    // Flask requiere autenticación, por lo que usará la cookie de sesión del navegador.
    window.location.href = '/api/database/export';
}

async function handleDbImport() {
    const fileInput = document.getElementById('db-file-input');
    if (!fileInput.files || fileInput.files.length === 0) {
        alert("Por favor, selecciona un archivo de base de datos (.db) antes de continuar.");
        return;
    }

    const file = fileInput.files[0];
    
    const confirmRestore = confirm("¿Está TOTALMENTE SEGURO de restaurar la base de datos?\n\nEsto reemplazará todos los reactivos, materiales, bitácora e información actual del sistema. No hay vuelta atrás.");
    if (!confirmRestore) return;

    const btn = document.getElementById('btn-import-db');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i><span>Restaurando...</span>`;
    if (window.lucide) window.lucide.createIcons();

    const formData = new FormData();
    formData.append('database', file);

    try {
        const res = await fetch('/api/database/import', {
            method: 'POST',
            body: formData
        }).then(r => r.json());

        if (res.status === 'success') {
            alert("Base de datos restaurada con éxito. El sistema se reiniciará/actualizará.");
            // Recargar la aplicación para limpiar estados del frontend y recargar la nueva BD
            window.location.href = '#/';
            window.location.reload();
        } else {
            alert("Error al restaurar: " + res.message);
        }
    } catch (err) {
        alert("Error de conexión: " + err.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
        if (window.lucide) window.lucide.createIcons();
    }
}
