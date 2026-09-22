# Qory Lab — sitio web

Sitio corporativo de **Qory Laboratorios S.A.C.** Next.js 16 (App Router), React 19,
TypeScript y Tailwind v4. Todas las páginas se prerenderizan como estáticas.

```bash
npm run dev      # desarrollo en http://localhost:3000
npm run build    # build de producción
npm start        # servir el build
npm run lint
```

## Estructura

```
app/
  page.tsx                     Inicio
  nosotros/                    Historia, misión, visión, valores, organización
  maquila/                     Maquila 360°, marca privada y preguntas frecuentes
  capacidades/                 Áreas de planta y galería de fotos
  productos/                   Categorías, formatos y activos
  marcas/                      Daya, Activen y portafolio registrado
  calidad/                     BPM, asuntos regulatorios, control de calidad
  sostenibilidad/              Huella de carbono e hídrica, bio-sourcing
  contacto/                    Briefing de cotización
  legal/privacidad             Política de privacidad (borrador legal)
  legal/reclamaciones          Libro de Reclamaciones (pendiente de implementar)
  globals.css                  Sistema de diseño completo
  sitemap.ts · robots.ts · icon.png

app/intranet/                  MAQUETA VISUAL de la intranet (sin backend)
  page.tsx                     Pantalla de ingreso — campos desactivados a propósito
  panel/                       Tablero: cifras, tendencia, alertas, lotes en curso
  produccion/                  Parte de producción
  calidad/                     Registro de análisis y liberación de lote
  tareas/                      Tareas abiertas, vencidas y cerradas
  procesos/                    Mapa de procesos vivo, por pedido y por stock
  personas/                    Turno, asistencia, capacitación, productividad
  usuarios/                    Alta y baja de accesos
  auditoria/                   Bitácora de quién hizo qué

components/
  intranet/marco.tsx           Marco de la intranet + selector de rol de la demo
  site-header.tsx              Barra de navegación (cliente: menú móvil)
  site-footer.tsx              Pie
  ui.tsx                       Band, BandHead, PageHead, Grid, Pasos, Galeria, Cta, Declara
  cinta.tsx                    Cinta de formatos que fabricamos
  contador.tsx                 Cifras que suben al entrar en pantalla (cliente)
  quote-form.tsx               Briefing de cotización (cliente)

lib/empresa.ts                 Datos de la empresa, menú, pasos del proceso y fotos
lib/intranet-demo.ts           Datos de ejemplo de la maqueta de intranet
public/img/                    Logotipos y 17 fotos de planta
```

**Todo el texto y los datos de contacto salen de `lib/empresa.ts` y de los arrays al
inicio de cada página.** Para cambiar un teléfono, una dirección o un correo se edita
un solo lugar.

## Sistema de diseño

Los colores se derivan del logotipo oficial y se declaran como tokens de Tailwind v4
en el bloque `@theme` de `app/globals.css`:

| Token | Valor | Uso |
| --- | --- | --- |
| `verde` | `#47704C` | Color del wordmark. Primario, botones, titulares |
| `verde-hondo` | `#1E3327` | Fondos oscuros, portada, pie |
| `hoja` | `#6FAE22` | Acento vivo |
| `lima` | `#8CC63F` | Acento del símbolo, bordes al pasar el cursor |
| `amarillo` | `#EBDA01` | Amarillo del símbolo. Solo remates y puntos |
| `hoja-txt` | `#4A7411` | Acento legible sobre fondo claro (enlaces) |
| `hueso` / `nube` | `#F4F5EF` / `#E7E9DF` | Fondos claros |
| `tinta` / `acero` | `#1E2A20` / `#55604F` | Texto principal y secundario |

El gradiente `--gradiente-marca` (verde → lima → amarillo) reproduce el barrido del
símbolo y aparece en: la palabra «anaquel» de la portada, el filete bajo cada etiqueta
de sección, el borde superior de las tarjetas de servicio y de los pasos del proceso.

Tipografías vía `next/font` (autohospedadas, sin llamadas a Google en el navegador):
**Archivo** para todo el cuerpo y titulares, **Fraunces** para frases de marca,
**IBM Plex Mono** para etiquetas y datos.

### Movimiento

- **Entrada al cargar** (`.entra`, `.entra-1…4`): escalonada en la portada.
- **Aparición con el scroll** (`.revela`): usa `animation-timeline: view()`. Donde el
  navegador no lo soporta, el contenido simplemente se ve — nunca queda oculto.
- **Cinta de formatos**: se detiene al pasar el cursor.
- **Contadores**: el servidor imprime el valor final; la animación solo lo reemplaza.
- Todo se desactiva con `prefers-reduced-motion: reduce`.

## Qué NO se publica

El contenido salió del data room de la empresa, pero hay material que **no puede ir al
sitio**. Antes de agregar cualquier sección nueva, revisar:

- Nombres, logos y facturación de clientes — requieren autorización escrita y varios
  están bajo acuerdo de confidencialidad.
- Proveedores críticos y cadena de suministro.
- Estados financieros, márgenes, deuda y cualquier dato del diagnóstico financiero.
- El proyecto de innovación en curso: aún no tiene protección registrada.
- Actuaciones inspectivas de Digemid o Sunafil.
- Planillas, contratos, CV y reglamento interno (Ley 29733).
- Fórmulas y concentraciones de activos. Se nombra el activo; nunca el porcentaje.

Además, dos afirmaciones tienen redacción deliberada y **no deben “mejorarse”**:

1. La huella ambiental se mide **conforme a la metodología** ISO 14064-1 / ISO 14046.
   No es una certificación de tercera parte y no se presenta como tal.
2. Se dice «presencia en seis regiones», no «cobertura nacional».

La certificación **BPM de Digemid** sí es real y se comunica como tal.

## Pendientes antes de publicar

| Pendiente | Detalle |
| --- | --- |
| **Correo corporativo** | `lib/empresa.ts` usa `comercial@qorylab.com`. Hay que crear el alias en el dominio; hoy conviven una cuenta personal `@qorylab.com` y una de Gmail declarada ante SUNAT. |
| **Formulario real** | `quote-form.tsx` compone un `mailto:`. Reemplazar por una Route Handler en `app/api/cotizar/route.ts` con envío SMTP, o un servicio externo, para no depender del cliente de correo del visitante y registrar los leads. |
| **Libro de Reclamaciones** | Falta el formulario con numeración correlativa y respuesta en 15 días hábiles (Ley 29571). |
| **Política de privacidad** | Borrador. Debe aprobarlo Asesoría Legal e inscribirse el banco de datos ante la ANPD. |
| **Fotografía** | Las 17 fotos actuales son de celular, verticales, recortadas a 4:3. Sirven, pero media jornada de fotografía profesional en planta es la mejor inversión antes de publicar. Falta cesión de imagen del personal que aparezca. |
| **Revisión regulatoria** | Dirección Técnica debe validar todo texto sobre eficacia cosmética y cumplimiento. |
| **Dominio** | El sitio se publica en **`web.qorylab.com`** (CNAME a Vercel). El dominio raíz y `www` siguen en el hosting anterior, junto con el correo. Al migrar al raíz basta con cambiar `sitio` en `lib/empresa.ts` y **borrar el registro AAAA del ápice**, o los visitantes con IPv6 seguirán viendo la página vieja. `qorylab.pe` está libre. |
| **Redes** | Hay dos páginas en LinkedIn que dividen la audiencia. Unificar nombres y bios. |
| **Marca Qory** | Las seis marcas de producto están registradas ante INDECOPI; la marca madre, no. |

## Despliegue

El sitio es 100 % estático tras `next build`. Se puede desplegar en Vercel sin
configuración, o exportar con `output: "export"` en `next.config.ts` si se prefiere
subirlo al hosting actual de `qorylab.com`. Si se exporta, recordar que
`next/image` necesita `images: { unoptimized: true }`.


## La intranet es una maqueta

`/intranet` es **solo visual**: no hay base de datos, ni sesión, ni servidor de
autenticación. Todo lo que se ve sale de constantes en `lib/intranet-demo.ts` y
ningún formulario guarda nada. Se entra desde el botón **Intranet** de la barra
de servicio del sitio (arriba a la derecha) o, en móvil, al final del menú.

Para recorrerla: en `/intranet` está el botón «Entrar a la demostración». Arriba
a la derecha hay un selector **Ver como** que cambia entre Operario, Jefe de área
y Encargado, y con él cambia qué secciones aparecen en el menú lateral. Es la
forma de mostrar el modelo de permisos sin haber construido permisos.

Los campos de la pantalla de ingreso están **desactivados a propósito**: un
formulario que parece real pero no valida nada invita a escribir una contraseña
verdadera en un sitio que no la protege.

Cuando se decida construirla de verdad, lo que hay que agregar es: autenticación
con sesión y contraseñas cifradas, base de datos relacional, acciones de servidor
que verifiquen rol en cada llamada, y una bitácora de auditoría que no se pueda
modificar. La propuesta completa —roles, módulos, indicadores y fases— está en el
documento de intranet que acompaña a este proyecto.
