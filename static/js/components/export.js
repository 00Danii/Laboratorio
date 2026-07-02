function exportTableToExcel(type) {
    let items = [];
    let filename = '';

    if (type === 'substances') {
        items = state.substances;
        filename = 'Inventario_Sustancias_Quimicas.xlsx';
    } else if (type === 'chemical_materials') {
        items = state.chemMaterials;
        filename = 'Inventario_Materiales_Quimicos.xlsx';
    } else if (type === 'didactic_materials') {
        items = state.didMaterials;
        filename = 'Inventario_Materiales_Didacticos.xlsx';
    }

    if (items.length === 0) {
        alert("No hay registros en la tabla activa para exportar.");
        return;
    }

    const data = items.map(item => {
        const row = {
            "ID Inventario": item.id,
            "Nombre": item.name,
        };

        if (type === 'substances') {
            row["Fórmula Química"] = item.chemical_formula || '';
            row["Número CAS"] = item.cas_number || '';
            row["Composición"] = item.composition || '';
            row["Concentración"] = item.concentration || '';
            row["Estado Físico"] = item.physical_state || '';
            row["Riesgos/Advertencias"] = item.risks_warnings || '';
            row["Fecha Entrada"] = item.entry_date || '';
            row["Fecha Caducidad"] = item.expiration_date || '';
        } else {
            row["Categoría"] = item.category || '';
            row["Estado Conservación"] = item.status || '';
        }

        row["Cantidad"] = item.quantity;
        row["Unidad"] = item.unit || 'uds';
        row["Ubicación"] = item.location || '';
        row["Responsable"] = item.responsible || '';
        row["Observaciones"] = item.observations || '';
        row["Contenido QR"] = item.qr_content || '';
        row["Creado El"] = item.created_at || '';
        row["Modificado El"] = item.updated_at || '';

        return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventario");
    XLSX.writeFile(workbook, filename);
}

function exportHistoryExcel() {
    if (state.history.length === 0) {
        alert("No hay registros en el historial activo para exportar.");
        return;
    }

    const data = state.history.map(h => ({
        "Fecha y Hora": h.timestamp,
        "Responsable de Acción": h.user_responsible,
        "Acción Realizada": h.action,
        "Tabla Afectada": h.table_name === 'substances' ? 'Sustancias' : (h.table_name === 'chemical_materials' ? 'Material Químico' : 'Material Didáctico'),
        "ID del Registro": h.record_id,
        "Campo Modificado": h.field_name || '',
        "Valor Anterior": h.old_value || '',
        "Valor Nuevo": h.new_value || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Historial Auditoría");
    XLSX.writeFile(workbook, 'Historial_Cambios_Inventario.xlsx');
}
