const EXPORT_COLORS = {
    primary: 'FF0D9488',
    primaryDark: 'FF0F766E',
    headerText: 'FFFFFFFF',
    bandLight: 'FFF0FDFA',
    bandWhite: 'FFFFFFFF',
    text: 'FF1E293B',
    border: 'FFCBD5E1'
};

function colLetter(n) {
    let s = '';
    while (n > 0) { n--; s = String.fromCharCode(65 + n % 26) + s; n = Math.floor(n / 26); }
    return s;
}

async function buildWorkbook(sheetName, title, headers, rows) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'LabKeep - ITMA II Laboratorio';
    workbook.created = new Date();

    const ws = workbook.addWorksheet(sheetName);

    // Title row
    const lastCol = colLetter(headers.length);
    ws.mergeCells(`A1:${lastCol}1`);
    const titleCell = ws.getCell('A1');
    titleCell.value = `ITMA II — Laboratorio de Ciencias  |  ${title}`;
    titleCell.font = { bold: true, size: 14, color: { argb: EXPORT_COLORS.primaryDark }, name: 'Calibri' };
    titleCell.alignment = { vertical: 'middle', horizontal: 'left' };
    ws.getRow(1).height = 32;

    // Subtitle row (date)
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    ws.mergeCells(`A2:${lastCol}2`);
    const dateCell = ws.getCell('A2');
    dateCell.value = `Generado el ${dateStr}  —  Total de registros: ${rows.length}`;
    dateCell.font = { italic: true, size: 9, color: { argb: 'FF94A3B8' }, name: 'Calibri' };
    dateCell.alignment = { vertical: 'middle', horizontal: 'left' };
    ws.getRow(2).height = 20;

    // Column widths
    headers.forEach((h, i) => {
        const col = ws.getColumn(i + 1);
        col.width = i === 0 ? 8 : (i === 1 ? 32 : (h === 'Observaciones' || h === 'Valor Anterior' || h === 'Valor Nuevo' ? 22 : 16));
    });

    // Real Excel table with data and auto-filters
    const tableStartRow = 3;
    const tableEndRow = tableStartRow + rows.length - 1;
    const tableRef = `A${tableStartRow}:${lastCol}${tableEndRow}`;
    ws.addTable({
        name: sheetName.replace(/[^a-zA-Z0-9_]/g, '_'),
        ref: tableRef,
        headerRow: true,
        totalsRow: false,
        style: {
            theme: 'TableStyleMedium6',
            showRowStripes: true,
            showFirstColumn: false
        },
        columns: headers.map(h => ({ name: h, filterButton: true })),
        rows: rows
    });

    // Override table header style with institutional colors
    const headerRow = ws.getRow(tableStartRow);
    headerRow.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: EXPORT_COLORS.headerText }, size: 11, name: 'Calibri' };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: EXPORT_COLORS.primary } };
        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    });
    headerRow.height = 28;

    // Style data rows
    for (let i = 0; i < rows.length; i++) {
        const row = ws.getRow(tableStartRow + 1 + i);
        const bg = i % 2 === 0 ? EXPORT_COLORS.bandWhite : EXPORT_COLORS.bandLight;
        row.eachCell((cell, j) => {
            cell.font = { size: 10, name: 'Calibri', color: { argb: EXPORT_COLORS.text } };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
            cell.alignment = j === 1 ? { vertical: 'middle', horizontal: 'left', wrapText: true } : { vertical: 'middle', horizontal: 'center', wrapText: true };
            cell.border = {
                top: { style: 'thin', color: { argb: EXPORT_COLORS.border } },
                left: { style: 'thin', color: { argb: EXPORT_COLORS.border } },
                bottom: { style: 'thin', color: { argb: EXPORT_COLORS.border } },
                right: { style: 'thin', color: { argb: EXPORT_COLORS.border } }
            };
        });
        row.height = 22;
    }

    // Freeze header rows
    ws.views = [{ state: 'frozen', ySplit: 3 }];

    return workbook;
}

function downloadXlsx(workbook, filename) {
    workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename.replace(/\.xls$/, '.xlsx');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }).catch(err => {
        alert('Error al generar el archivo Excel: ' + err.message);
    });
}

function exportTableToExcel(type) {
    let items = [];
    let sheetName = '';
    let title = '';
    let headers = [];

    if (type === 'substances') {
        items = state.substances;
        sheetName = 'Sustancias';
        title = 'Inventario de Sustancias Químicas';
        headers = ['ID', 'Sustancia', 'Grupo', 'Fórmula', 'CAS', 'Estado', 'Cantidad', 'Unidad', 'Ubicación', 'Caducidad', 'Responsable', 'Observaciones'];
    } else if (type === 'chemical_materials') {
        items = state.chemMaterials;
        sheetName = 'Material Químico';
        title = 'Inventario de Materiales Químicos';
        headers = ['ID', 'Material', 'Categoría', 'Estado', 'Cantidad', 'Unidad', 'Ubicación', 'Responsable', 'Observaciones'];
    } else if (type === 'didactic_materials') {
        items = state.didMaterials;
        sheetName = 'Material Didáctico';
        title = 'Inventario de Materiales Didácticos';
        headers = ['ID', 'Material', 'Categoría', 'Estado', 'Cantidad', 'Ubicación', 'Responsable', 'Observaciones'];
    }

    if (items.length === 0) {
        alert('No hay registros en la tabla activa para exportar.');
        return;
    }

    if (typeof ExcelJS === 'undefined') {
        alert('La librería ExcelJS no está disponible. Verifique su conexión a internet.');
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

    buildWorkbook(sheetName, title, headers, rows).then(wb => {
        downloadXlsx(wb, title.replace(/ /g, '_') + '.xlsx');
    });
}

function exportHistoryExcel() {
    if (state.history.length === 0) {
        alert('No hay registros en el historial activo para exportar.');
        return;
    }

    if (typeof ExcelJS === 'undefined') {
        alert('La librería ExcelJS no está disponible. Verifique su conexión a internet.');
        return;
    }

    const headers = ['Fecha y Hora', 'Responsable', 'Acción', 'Módulo', 'ID Registro', 'Campo', 'Valor Anterior', 'Valor Nuevo'];

    const rows = state.history.map(h => {
        const module = h.table_name === 'substances' ? 'Sustancias'
            : h.table_name === 'chemical_materials' ? 'Mat. Químico'
            : 'Mat. Didáctico';
        return [
            h.timestamp, h.user_responsible, h.action, module,
            h.record_id, h.field_name || '', h.old_value || '', h.new_value || ''
        ];
    });

    buildWorkbook('Historial', 'Historial de Auditoría', headers, rows).then(wb => {
        downloadXlsx(wb, 'Historial_Cambios_Inventario.xlsx');
    });
}
