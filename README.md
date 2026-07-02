# LabKeep - Sistema de Inventario de Laboratorio

Aplicacion web de codigo abierto para la gestion de inventario de laboratorios quimicos y didacticos. Desarrollada con Python/Flask en el backend y JavaScript vanilla + Tailwind CSS en el frontend (SPA).

## Captura

El sistema permite administrar tres tipos de elementos:

1. **Sustancias Quimicas** — reactivos con formula, numero CAS, caducidad, pictogramas de riesgo, etc.
2. **Materiales Quimicos** — vidrieria, instrumental y equipos de laboratorio.
3. **Materiales Didacticos** — modelos, carteles, recursos educativos.

Cada elemento puede incluir fotografia, codigo QR unico, PDF asociado y enlaces externos.

## Arquitectura

```
main.py               Punto de entrada del servidor
backend/
  app.py              Fabrica de aplicacion Flask (middleware, blueprints, rutas)
  database.py         Conexion SQLite, creacion de tablas y migraciones
  history_logger.py   Funcion de auditoria para registrar cambios
  routes/
    auth.py           Autenticacion de usuarios (login, registro, logout, estado)
    substances.py     CRUD de sustancias quimicas
    chem_materials.py CRUD de materiales quimicos
    did_materials.py  CRUD de materiales didacticos
    history.py        Historial de cambios (auditoria)
    tools.py          Subida de fotos/PDFs, generacion de QR, escaneo
static/
  index.html          SPA principal (carga todos los modulos JS)
  styles.css          Estilos complementarios y reglas de impresion
  js/
    state.js          Estado global de la aplicacion
    main.js           Enrutador por hash, inicializacion
    components/
      auth.js         Modales de inicio de sesion y registro
      camera.js       Captura de fotos desde camara web
      export.js       Exportacion a Excel (.xlsx) con ExcelJS
      modal.js        CRUD (formularios de crear/editar/eliminar)
      qr-scanner.js   Escaneo de codigos QR con Html5Qrcode
    views/
      dashboard.js    Panel de control con estadisticas y alertas
      substances.js   Listado de sustancias (tabla/cuadricula, busqueda, filtros)
      chem-materials.js  Listado de materiales quimicos
      didactic-materials.js  Listado de materiales didacticos
      detail.js       Vista detalle con ficha imprimible
      history.js      Historial de auditoria con filtros
      scan-qr.js      Vista de escaneo QR
  uploads/            Archivos subidos (fotos, QR, documentos PDF)
```

### Backend (Flask)

- API RESTful con autenticacion por sesion.
- Base de datos SQLite local con cinco tablas: `substances`, `chemical_materials`, `didactic_materials`, `change_history`, `users`.
- Middleware global que protege rutas de escritura (POST, PUT, DELETE) requiriendo sesion activa.
- Auditoria automatica: cada creacion, edicion o eliminacion se registra en `change_history` con responsable, campo modificado, valor anterior y valor nuevo.
- Generacion de codigos QR con la libreria `qrcode`.
- Subida de fotos y PDFs.

### Frontend (SPA)

- Single Page Application con enrutamiento por `hash` (`#/substances`, `#/history`, etc.).
- Tailwind CSS via CDN para estilos utilitarios.
- Lucide Icons para iconografia.
- ExcelJS para exportacion a Excel nativo (.xlsx) con tabla, filtros y estilos institucionales.
- Html5Qrcode para escaneo de QR con la camara.
- Vista de cuadricula/tarjetas con glassmorphism para sustancias.
- Fichas imprimibles con estilos `@media print`.
- Modal de confirmacion personalizado para eliminaciones.

## Requisitos

- Python 3.10 o superior.
- Dependencias Python (se instalan automaticamente con `pip install -r requirements.txt`):
  - Flask >= 3.0.0
  - qrcode >= 7.4.2
  - pillow >= 10.0.0
- Navegador web moderno (Chrome, Firefox, Edge).

## Instalacion y ejecucion

### Opcion 1: Windows (doble clic)

Ejecutar `run.bat`. Esto instala las dependencias e inicia el servidor.

### Opcion 2: Terminal

```bash
pip install -r requirements.txt
python main.py
```

El servidor se iniciara en `http://127.0.0.1:5000` y abrira automaticamente el navegador.

### Credenciales por defecto

- **Usuario:** `admin`
- **Contrasena:** `admin`

## Uso

1. Iniciar sesion con las credenciales por defecto.
2. En el panel de control se ven las estadisticas del inventario y alertas de sustancias proximas a caducar.
3. Navegar por las secciones: Sustancias, Materiales Quimicos, Materiales Didacticos.
4. Cada listado permite buscar, filtrar, crear, editar y eliminar elementos.
5. Desde la vista detalle se puede imprimir una ficha o exportar el listado completo a Excel.
6. El modulo de escaneo QR permite buscar un elemento por su codigo QR.
7. El historial de auditoria muestra todos los cambios realizados en el sistema.

## API REST

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | `/api/substances` | Listar sustancias (con filtros) |
| GET | `/api/substances/<id>` | Detalle de una sustancia |
| POST | `/api/substances` | Crear sustancia |
| PUT | `/api/substances/<id>` | Actualizar sustancia |
| DELETE | `/api/substances/<id>` | Eliminar sustancia |
| GET | `/api/chemical-materials` | Listar materiales quimicos |
| GET | `/api/chemical-materials/<id>` | Detalle de material quimico |
| POST | `/api/chemical-materials` | Crear material quimico |
| PUT | `/api/chemical-materials/<id>` | Actualizar material quimico |
| DELETE | `/api/chemical-materials/<id>` | Eliminar material quimico |
| GET | `/api/didactic-materials` | Listar materiales didacticos |
| GET | `/api/didactic-materials/<id>` | Detalle de material didactico |
| POST | `/api/didactic-materials` | Crear material didactico |
| PUT | `/api/didactic-materials/<id>` | Actualizar material didactico |
| DELETE | `/api/didactic-materials/<id>` | Eliminar material didactico |
| POST | `/api/upload-photo` | Subir foto (archivo o Base64) |
| POST | `/api/upload-pdf` | Subir PDF |
| POST | `/api/scan-qr` | Buscar elemento por codigo QR |
| GET | `/api/history` | Historial de cambios (con filtros por fecha, modulo, accion) |
| POST | `/api/auth/login` | Iniciar sesion |
| POST | `/api/auth/register` | Registrar nuevo usuario |
| POST | `/api/auth/logout` | Cerrar sesion |
| GET | `/api/auth/status` | Verificar estado de la sesion |

## Funcionalidades destacadas

- **Codigos QR unicos** por elemento, generados al crearse. Escaneables con camara o busqueda manual.
- **Alertas de caducidad** en el dashboard: muestra conteo de sustancias vencidas y por vencer (30 dias).
- **Vista alterna** de cuadricula o lista para sustancias quimicas.
- **Exportacion a Excel** con tabla nativa de Excel, filtros por columna, encabezado institucional, filas alternadas y paneles congelados.
- **Historial completo de auditoria** con detalle de quien realizo cada cambio, cuando, y los valores anteriores y nuevos.
- **Fichas imprimibles** desde la vista detalle, con diseno optimizado para papel.
- **Busqueda por similitud** de ubicacion y estado fisico al visualizar un elemento.
- **Captura de fotos** desde la camara web integrada en el formulario.
- **Subida de PDFs** asociados a sustancias (fichas de seguridad, protocolos).

## Licencia

Proyecto academico desarrollado para el laboratorio del ITMA II.
