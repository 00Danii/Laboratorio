async function startWebcamCapture() {
    const modal = document.getElementById('camera-modal');
    const video = document.getElementById('webcam-preview');

    modal.classList.remove('hidden');

    try {
        state.webcamStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
            audio: false
        });
        video.srcObject = state.webcamStream;
    } catch (err) {
        alert(`No se pudo acceder a la webcam: ${err.message}`);
        closeCameraModal();
    }
}

function closeCameraModal() {
    document.getElementById('camera-modal').classList.add('hidden');
    stopWebcam();
}

function stopWebcam() {
    if (state.webcamStream) {
        state.webcamStream.getTracks().forEach(track => track.stop());
        state.webcamStream = null;
    }
}

async function capturePhoto() {
    const video = document.getElementById('webcam-preview');
    const canvas = document.getElementById('webcam-canvas');

    if (!video.srcObject) return;

    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Image = canvas.toDataURL('image/jpeg');

    closeCameraModal();

    try {
        const res = await fetch('/api/upload-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64Image })
        }).then(r => r.json());

        if (res.status === 'success') {
            setFormPhoto(res.image_path);
        } else {
            alert(res.message);
        }
    } catch (err) {
        alert(err.message);
    }
}
