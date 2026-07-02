function buildExcelHtml(title, subtitle, headers, rows) {
    const thead = headers.map(h =>
        `<th style="background-color:#0d9488;color:#ffffff;font-weight:700;font-size:11pt;padding:10px 12px;text-align:left;border:1px solid #0f766e;font-family:Calibri,Arial,sans-serif;letter-spacing:0.3px;">${h}</th>`
    ).join('');

    const tbody = rows.map((row, i) => {
        const bg = i % 2 === 0 ? '#ffffff' : '#f0fdfa';
        const cells = row.map(cell => {
            const val = cell == null ? '' : String(cell);
            return `<td style="background-color:${bg};padding:7px 12px;border:1px solid #cbd5e1;font-size:10pt;font-family:Calibri,Arial,sans-serif;color:#1e293b;">${val}</td>`;
        }).join('');
        return `<tr>${cells}</tr>`;
    }).join('');

    const now = new Date();
    const dateStr = now.toLocaleDateString('es-MX', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:Calibri,Arial,sans-serif;padding:20px;margin:0;">
    <table style="width:100%;border-collapse:collapse;margin-bottom:18px;border-bottom:3px solid #0d9488;">
        <tr>
            <td style="text-align:left;vertical-align:middle;padding:8px 0;">
                <span style="background-color:#0d9488;color:#ffffff;font-size:11pt;font-weight:700;padding:6px 14px;border-radius:4px;display:inline-block;vertical-align:middle;margin-right:10px;">ITMA II</span>
                <span style="font-size:10pt;color:#64748b;vertical-align:middle;">Laboratorio de Ciencias</span>
            </td>
            <td style="text-align:right;vertical-align:middle;padding:8px 0;">
                <span style="font-size:8pt;color:#94a3b8;">${dateStr}</span>
            </td>
        </tr>
    </table>
    <h2 style="color:#1e293b;font-size:15pt;margin:0 0 4px 0;font-weight:600;">${title}</h2>
    ${subtitle ? `<p style="color:#64748b;font-size:10pt;margin:0 0 14px 0;">${subtitle}</p>` : ''}
    <table style="border-collapse:collapse;width:100%;">
        <thead>${thead}</thead>
        <tbody>${tbody}</tbody>
    </table>
    <p style="text-align:center;color:#94a3b8;font-size:7.5pt;margin-top:16px;border-top:1px solid #e2e8f0;padding-top:10px;">
        LabKeep — Sistema de Inventario de Laboratorio v1.0.0
    </p>
</body>
</html>`;
}

function downloadXls(html, filename) {
    const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.replace(/\.xlsx$/, '.xls');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function exportTableToExcel(type) {
    let items = [];
    let title = '';
    let headers = [];

    if (type === 'substances') {
        items = state.substances;
        title = 'Inventario de Sustancias Químicas';
        headers = ['ID', 'Sustancia', 'Grupo', 'Fórmula', 'CAS', 'Estado', 'Cantidad', 'Unidad', 'Ubicación', 'Caducidad', 'Responsable', 'Observaciones'];
    } else if (type === 'chemical_materials') {
        items = state.chemMaterials;
        title = 'Inventario de Materiales Químicos';
        headers = ['ID', 'Material', 'Categoría', 'Estado', 'Cantidad', 'Unidad', 'Ubicación', 'Responsable', 'Observaciones'];
    } else if (type === 'didactic_materials') {
        items = state.didMaterials;
        title = 'Inventario de Materiales Didácticos';
        headers = ['ID', 'Material', 'Categoría', 'Estado', 'Cantidad', 'Ubicación', 'Responsable', 'Observaciones'];
    }

    if (items.length === 0) {
        alert("No hay registros en la tabla activa para exportar.");
        return;
    }

    let rows;
    if (type === 'substances') {
        rows = items.map(s => [
            s.id, s.name, s.substance_group || '', s.chemical_formula || '',
            s.cas_number || '', s.physical_state || '', s.quantity, s.unit,
            s.location || '', s.expiration_date || '', s.responsible || '', s.observations || ''
        ]);
    } else if (type === 'chemical_materials') {
        rows = items.map(m => [
            m.id, m.name, m.category || '', m.status || '', m.quantity, m.unit,
            m.location || '', m.responsible || '', m.observations || ''
        ]);
    } else {
        rows = items.map(d => [
            d.id, d.name, d.category || '', d.status || '', d.quantity,
            d.location || '', d.responsible || '', d.observations || ''
        ]);
    }

    const totalText = `Total de registros: ${items.length}`;
    const html = buildExcelHtml(title, totalText, headers, rows);
    downloadXls(html, title.replace(/ /g, '_') + '.xls');
}

function exportHistoryExcel() {
    if (state.history.length === 0) {
        alert("No hay registros en el historial activo para exportar.");
        return;
    }

    const title = 'Historial de Auditoría';
    const headers = ['Fecha y Hora', 'Responsable', 'Acción', 'Módulo', 'ID Registro', 'Campo', 'Valor Anterior', 'Valor Nuevo'];

    const rows = state.history.map(h => {
        const module = h.table_name === 'substances' ? 'Sustancias' :
            (h.table_name === 'chemical_materials' ? 'Mat. Químico' : 'Mat. Didáctico');
        return [
            h.timestamp, h.user_responsible, h.action, module,
            h.record_id, h.field_name || '', h.old_value || '', h.new_value || ''
        ];
    });

    const totalText = `Total de eventos registrados: ${state.history.length}`;
    const html = buildExcelHtml(title, totalText, headers, rows);
    downloadXls(html, 'Historial_Cambios_Inventario.xls');
}
