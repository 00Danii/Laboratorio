function startQrScanner() {
    const feedback = document.getElementById('scanner-feedback');
    feedback.classList.add('hidden');

    document.getElementById('btn-start-scanner').classList.add('hidden');
    document.getElementById('btn-stop-scanner').classList.remove('hidden');

    state.html5QrScanner = new Html5Qrcode("reader");

    state.html5QrScanner.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: { width: 250, height: 250 }
        },
        async (decodedText, decodedResult) => {
            stopQrScanner();

            if (decodedText.startsWith('http://') || decodedText.startsWith('https://')) {
                const openLink = confirm(`El código QR contiene un enlace externo:\n\n${decodedText}\n\n¿Desea abrirlo en una nueva pestaña?`);
                if (openLink) {
                    window.open(decodedText, '_blank');
                }
                return;
            }

            try {
                const res = await fetch('/api/scan-qr', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ qr_code: decodedText })
                }).then(r => r.json());

                if (res.status === 'success') {
                    const categoryUrl = res.type === 'substance' ? 'substances' : (res.type === 'chemical_material' ? 'chemical-materials' : 'didactic-materials');
                    window.location.hash = `#/${categoryUrl}/${res.data.id}`;
                } else {
                    alert(res.message);
                }
            } catch (err) {
                alert(`Error al procesar QR: ${err.message}`);
            }
        },
        (errorMessage) => {
        }
    ).catch(err => {
        feedback.classList.remove('hidden');
        feedback.innerHTML = `<span class="text-red-500 font-bold p-4">Error al abrir cámara: ${err}</span>`;
        stopQrScanner();
    });
}

function stopQrScanner() {
    const startBtn = document.getElementById('btn-start-scanner');
    const stopBtn = document.getElementById('btn-stop-scanner');
    if (startBtn && stopBtn) {
        startBtn.classList.remove('hidden');
        stopBtn.classList.add('hidden');
    }

    if (state.html5QrScanner) {
        state.html5QrScanner.stop().then(() => {
            state.html5QrScanner = null;
        }).catch(err => console.error(err));
    }
}
