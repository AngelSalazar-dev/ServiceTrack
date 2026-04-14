# Nutriflow - Contexto del Proyecto

> ⚠️ **INSTRUCCIONES PARA QWEN CODE - LEE ESTO AL INICIAR SESIÓN**
>
> Este archivo es tu **memoria persistente** del proyecto. Cada vez que inicies sesión, debes leerlo para ponerte en contexto.
>
> ## 📋 Qué debes hacer al iniciar sesión
> 1. **LEER este archivo completo** antes de hacer cualquier cosa
> 2. **ENTENDER** el contexto: DB, auth, estructura, problemas resueltos
> 3. **ACTUALIZAR** este archivo después de cada cambio significativo que hagas
>
> ## ✍️ Cuándo actualizar este archivo
> - Después de **crear/eliminar archivos** importantes
> - Después de **cambiar el esquema** de la base de datos
> - Después de **agregar nuevas funcionalidades** o endpoints API
> - Después de **resolver un bug** (agregarlo a la tabla de problemas resueltos)
> - Después de **cambiar variables de entorno** o credenciales
> - Después de cada **deploy** a producción (actualizar URLs si cambian)
> - Cuando el usuario **pida algo nuevo** que modifique el proyecto
>
> ## 🔄 Cómo actualizar
> - **NO reescribir** todo el archivo, solo agregar/secciones modificadas
> - **Mantener actualizada** la tabla de problemas resueltos
> - **Actualizar** la estructura si se agregan archivos/directorios
> - **Preservar** la información existente que siga siendo válida
> - Al final de cada sesión, haz un `edit` a este archivo con los cambios del día

---

## 📢 Actividad del Día — 11 de Abril, 2026

### Nutriflow — Fix Masivo de Traducciones, Suscripciones, y Base de Alimentos

**Problemas identificados y resueltos:**

1. **Error `tr is not defined`** en exercise, chat, history pages → constantes definidas fuera del componente, movidas dentro
2. **Dropdown de idioma** se abría hacia arriba → cambiado `bottom-full` a `top-full mt-2`
3. **+80 claves de traducción faltantes** → agregadas a type, en, y es
4. **Nombres de suscripción hardcoded** ("PRO", "Premium") → reemplazados globalmente por Esencial/Elite/Máximo
5. **Dashboard** mostraba "Elige tu plan PRO" a usuarios pagados → ahora muestra "Bienvenido a Elite/Máximo ✨"
6. **Imagen de fondo del login** no cargaba → reemplazada por CSS con iconos de salud animados
7. **Grammar fix**: "Tu Salud, Tu Reglas" → "Tu Salud, Tus Reglas"
8. **FAQ suscripción** con pregunta sin sentido → corregido con preguntas relevantes
9. **Botones de suscripción** sin onClick → agregados handlers funcionales
10. **Sin flujo de cancelación** → modal de confirmación, auto-cancel plan actual, previene doble cobro
11. **Base de alimentos**: +129 mexicanos + 198 internacionales verificados (250,479 total en DB)
12. **Excel generado**: `nutriflow_alimentos.xml` (58.57 MB, 250,479 filas)

**Nombres de suscripción finales:**
- Free → **Esencial** / Essential
- Premium → **Elite**
- Pro → **Máximo** / Maximum

**Archivos nuevos:**
- `scripts/seed-massive-real-foods.ts` — 129 alimentos mexicanos reales
- `scripts/seed-international-foods.ts` — 198 alimentos internacionales (USA, Italia, Japón, China, India, Tailandia, España, Francia, Corea, Líbano, Grecia)
- `scripts/export-foods-excel.ts` — Exporta toda la DB a Excel XML

**Deploy:**
- ✅ GitHub: `AngelSalazar-dev/NutriFlow_official` (main)
- ✅ Vercel: https://nutriflow-official.vercel.app

---

## 📢 Actividad del Día — 7 de Abril, 2026

### Nutriflow — Fix Chat Historial de Conversaciones

**Problema:**
El historial de chats no funcionaba correctamente. El schema de la base de datos tenía `session_id` pero el código usaba `conversation_id`. Los títulos de las conversaciones no se guardaban ni se mostraban en el sidebar.

**Soluciones:**
1. ✅ Creado script de migración: `scripts/migrate-chat-messages.ts`
2. ✅ Actualizado `database/setup.sql` con columnas `conversation_id` y `context_snapshot`
3. ✅ Fix en `/api/chat/conversations/route.ts` para extraer título desde `context_snapshot` JSON
4. ✅ Fix en `/api/chat/message/route.ts` para guardar título automáticamente en nuevos mensajes
5. ✅ Verificado que hay 4 conversaciones con 19 mensajes en la BD
6. ✅ Chat history ahora funciona correctamente con listar, cargar, renombrar y eliminar conversaciones

**Archivos nuevos:**
- `scripts/migrate-chat-messages.ts` — Migración para agregar columnas faltantes
- `scripts/backfill-chat-titles.ts` — Asigna títulos automáticos a conversaciones existentes
- `scripts/check-chat-table.ts` — Script para verificar estructura de tabla
- `scripts/test-chat-history.ts` — Test de datos de historial
- `scripts/test-conversations.ts` — Test de listado de conversaciones

**Archivos modificados:**
- `database/setup.sql` — agregadas columnas `conversation_id` y `context_snapshot`
- `app/api/chat/conversations/route.ts` — ahora extrae título desde JSON
- `app/api/chat/message/route.ts` — guarda título en context_snapshot al crear mensaje

### Nutriflow — Performance Fixes, Datos Reales, Alimentos Mexicanos, Persistencia

**Problemas:**
1. Dashboard tardaba mucho en cargar (fetch con `cache: 'no-store'` + DB remota TiDB Cloud)
2. Dashboard tenía datos inyectados/falsos (calorías, macros, gráfico semanal)
3. Base de datos de alimentos muy limitada — no encontraba tacos de camarón, marlín, etc.
4. Datos no persistían visualmente al refrescar (dashboard no recargaba datos al navegar)
5. Estado vacío del gráfico centrado incorrectamente dentro de SVG

**Soluciones:**
1. ✅ Eliminado `cache: 'no-store'` en `loadUser()` — AuthContext.tsx
2. ✅ Reducidos timeouts de MySQL: connectTimeout 20s→10s, agregados query timeout
3. ✅ Dashboard skeleton en lugar de spinner bloqueante
4. ✅ Dashboard ahora usa datos reales de `/api/stats/today`, `/api/food/today`, `/api/hydration/today`, `/api/exercise/log`
5. ✅ Eliminado `weeklyData` hardcoded — gráfico muestra empty state si no hay datos
6. ✅ Macros calculados desde `calorieGoal` del usuario + datos reales de food logs
7. ✅ Sacado empty state del `ResponsiveContainer` (SVG no respeta flexbox centering)
8. ✅ Agregado 155 alimentos mexicanos a MySQL vía `scripts/add-mexican-foods.ts` (tacos, mariscos, antojitos, sopas, guisados, bebidas, postres, botanas, salsas, frutas, verduras)
9. ✅ Actualizada `food-database.ts` con 52 alimentos mexicanos como fallback offline
10. ✅ Dashboard se refresca con `visibilitychange` event + botón manual de refresh
11. ✅ `router.refresh()` después de add/delete en food-log y hydration para revalidar servidor
12. ✅ Frutas tropicales y verduras mexicanas agregadas (mango, papaya, nopales, huitlacoche, etc.)

**Archivos nuevos:**
- `scripts/add-mexican-foods.ts` — Script para poblar tabla `foods` con comida mexicana

**Archivos modificados:**
- `context/AuthContext.tsx` — removido `cache: 'no-store'`
- `lib/mysql.ts` — timeouts optimizados
- `app/(dashboard)/dashboard/page.tsx` — datos reales, skeleton, refresh button
- `app/(dashboard)/food-log/page.tsx` — agregado `router.refresh()` en CRUD
- `lib/food-database.ts` — +52 alimentos mexicanos

### Nutriflow - Fix "Failed to fetch" Error y Profile Update
Se identificaron y arreglaron los siguientes problemas:

**Problemas:**
1. **Falta archivo .env.local** - El archivo de variables de entorno no existía en desarrollo local
2. **AuthContext faltaba `credentials: 'include'`** - En `loadUser()` y `checkChatLimit()`, causando errores de autenticación
3. **Profile update fallaba** - Lógica de recalculación de perfil requería TODOS los campos incluso cuando solo se actualizaba uno
4. **Tipos de datos incorrectos** - Weight y height venían como strings desde MySQL pero se trataban como números

**Soluciones:**
1. ✅ Creado `.env.local` con credenciales de TiDB Cloud
2. ✅ Agregado `credentials: 'include'` en `loadUser()` y `checkChatLimit()` en AuthContext.tsx
3. ✅ Refactorizada lógica de recalculación en profile/route.ts para solo recalcular cuando hay todos los campos requeridos
4. ✅ Agregada conversión segura de tipos con fallback a 0 si los valores son null/undefined
5. ✅ Agregado try/catch alrededor de `calculateUserProfile()` para permitir actualizaciones parciales

**Comandos de prueba:**
```bash
# Test DB connection
curl http://localhost:3000/api/health/db

# Test login
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"email":"founder@nutriflow.com","password":"NutriFlow2026!"}' -c cookies.txt

# Test profile update
curl -X PUT http://localhost:3000/api/auth/profile -H "Content-Type: application/json" -H "Cookie: session=TOKEN" -d '{"name":"Test","age":30,"sex":"male","weight":75,"height":175,"activityLevel":"moderate","goal":"maintain"}'
```

### Nutriflow - Deploy a Vercel
Se hizo commit, build fix, y deploy a Vercel.

| Campo | Valor |
|-------|-------|
| **URL Producción** | https://nutriflow-official.vercel.app |
| **Commits** | `daf7c1f` (major overhaul), `194959d` (build fix) |

**Cambios:**
- Migración completa de MongoDB → TiDB Cloud (MySQL)
- Eliminados archivos obsoletos de MongoDB: `lib/article-scraper.ts`, `scripts/seed.ts`, `lib/auth.ts`, `lib/mongodb.ts`
- Fix AuthContext `updateAvatar` type para coincidir con `User` interface
- Agregadas env variables en Vercel: `JWT_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- Build pasa TypeScript y compila correctamente

**GitHub:** Pendiente push — permisos denegados en repo `cuatroprueba-ops/nutriflow`. Usuario `AngelSalazar-dev` no tiene write access.

---

## 📢 Actividad del Día — 6 de Abril, 2026

### Portfolio Personal
Se creó un portfolio profesional para Ángel Salazar desde cero, deployado en Vercel.

| Campo | Valor |
|-------|-------|
| **URL** | https://angelsalazar.vercel.app |
| **Repo** | https://github.com/AngelSalazar-dev/angelsalazar-dev.github.io |
| **Stack** | Next.js 16, TypeScript, Tailwind CSS, Framer Motion |
| **Deploy** | Vercel (auto-deploy on push to main) |

**Secciones del portfolio:** Hero, About, Skills, Projects, Education, Contact, Footer
**Características:** Dark/Light mode, scroll animations, responsive, static export

---

## 🚀 Info General

| Campo | Valor |
|-------|-------|
| **Framework** | Next.js 16.2.1 (App Router) |
| **Lenguaje** | TypeScript |
| **Producción** | https://nutriflow-official.vercel.app |
| **DB** | TiDB Cloud (MySQL compatible) |

## 🗄️ Base de Datos - TiDB Cloud

```
Host: gateway01.us-east-1.prod.aws.tidbcloud.com
Port: 4000
User: 3ZxNQLB5VbKt56g.root
Password: 4BLpMj6H4QzcJ8oi
Database: nutriflow
SSL: Required (rejectUnauthorized: true)
```

### Tablas (18)
`users`, `user_profiles`, `foods`, `food_entries`, `food_image_entries`, `exercises`, `exercise_logs`, `workout_routines`, `routine_exercises`, `water_entries`, `chat_messages`, `chat_quotas`, `subscriptions`, `user_achievements`, `user_xp`, `friends`, `referrals`, `promo_codes`

## 👤 Cuenta Founder

| Campo | Valor |
|-------|-------|
| **Email** | `founder@nutriflow.com` |
| **Password** | `NutriFlow2026!` |
| **Plan** | PRO (ilimitado, subscription hasta 2038) |
| **XP** | 999,999 (Level 999) |
| **Referral** | FOUNDERIT44 |

## 🔐 Autenticación

- JWT con cookies httpOnly (`session`)
- Las cookies se fijan **directamente** en `NextResponse.cookies.set()` (NO usar `cookies()` de `next/headers` en Route Handlers)
- Middleware valida JWT antes de redirigir (evita loop infinito)
- Registro requiere `confirmPassword` (client + server)
- Emails se normalizan: `email.replace(/\s+/g, '').toLowerCase()`

## 📁 Estructura Clave

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── api/
│   ├── auth/
│   │   ├── login/route.ts      ← JWT cookie se fija aquí
│   │   ├── register/route.ts   ← Requiere confirmPassword
│   │   ├── logout/route.ts
│   │   └── me/route.ts
│   └── ... (27 API routes)
lib/
├── mysql.ts           ← Connection pool + query helper
├── auth-mysql.ts      ← JWT sign/verify + getCurrentUser
└── ...
context/
└── AuthContext.tsx    ← Auth provider (credentials: 'include')
middleware.ts          ← JWT validation + security headers
```

## ⚠️ Problemas Resueltos (No Repetir)

| Problema | Solución |
|----------|----------|
| `Unknown column 'age' in 'field list'` | Faltaban columnas en `users`: age, weight_kg, height_cm, sex, activity_level, goal, tdee, bmr, referral_code |
| `Field 'referral_code' doesn't have a default value` | Se genera automáticamente en el registro |
| `Las contraseñas no coinciden` (falso positivo) | Server no hacía `.trim()`, ahora se normaliza en client-side |
| `ERR_TOO_MANY_REDIRECTS` | Middleware validaba cookie sin verificar JWT. Ahora verifica con `jwtVerify()` antes de redirigir |
| Login no funcionaba en navegador | Faltaba `credentials: 'include'` en fetch del AuthContext |
| Cookie httpOnly no se establecía | `cookies()` de `next/headers` no funciona en Route Handlers en prod. Se fija directamente en `response.cookies.set()` |
| Email con espacio (`founder @nutriflow.com`) | AuthContext usa `email.replace(/\s+/g, '').toLowerCase()` |
| `Failed to fetch` en desarrollo | Faltaba archivo `.env.local` con credenciales de la base de datos |
| Profile update no funcionaba | AuthContext faltaba `credentials: 'include'` en `loadUser()` y `checkChatLimit()`. Profile route requería todos los campos para recalcular. Ahora usa try/catch y permite actualizaciones parciales. |
| **Chat historial no funcionaba** | Schema de `chat_messages` tenía `session_id` pero el código usaba `conversation_id`. Se creó migración (`scripts/migrate-chat-messages.ts`) para agregar `conversation_id` y `context_snapshot`. API de conversaciones ahora extrae título desde `context_snapshot`. Nuevos mensajes guardan título automáticamente. |
| **`tr is not defined` en múltiples páginas** | Constantes (`SUGGESTED_QUESTIONS`, `DAY_OPTIONS`) definidas fuera del componente. Movidas dentro de la función del componente después de `useLang()`. |
| **Texto con `_` en toda la UI** | +80 claves de traducción faltantes. Agregadas a type definition, objeto `en` y objeto `es`. |
| **"PRO" y "Premium" hardcoded en UI** | Reemplazados por `tr('sub_plan_pro_name')` y `tr('sub_plan_premium_name')` en 15+ archivos. |
| **Grammar "Tu Salud, Tu Reglas"** | Corregido a "Tu Salud, Tus Reglas" en `lib/translations.ts`. |
| **Build fail por duplicados en translations.ts** | Múltiples claves duplicadas en objetos `en` y `es`. Removidas. Type cambiado a `Partial<Translations>` para otros idiomas. |

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Deploy a Vercel
vercel --prod --force

# Test DB connection
node test-db-full.js

# Seed alimentos reales
npx tsx scripts/seed-massive-real-foods.ts

# Seed alimentos internacionales
npx tsx scripts/seed-international-foods.ts

# Exportar Excel de alimentos
npx tsx scripts/export-foods-excel.ts
```

## 📊 Variables de Entorno (Vercel)

```
MYSQL_HOST=gateway01.us-east-1.prod.aws.tidbcloud.com
MYSQL_PORT=4000
MYSQL_USER=3ZxNQLB5VbKt56g.root
MYSQL_PASSWORD=4BLpMj6H4QzcJ8oi
MYSQL_DATABASE=nutriflow
JWT_SECRET=<configured in Vercel>
```

### Nutriflow — Date Navigation + Notification System

**Date Navigation:** All data pages (exercise, food-log, water) now have `← Ayer` / `Mañana →` buttons to view and edit any day's data. APIs accept `?date=` or `date` in body.

**Notifications:** Bell icon in sidebar with daily rotating nutrition tips (31 total). Portal-rendered dropdown with z-[9999].

**Other fixes:**
- Removed `next-themes` (always light mode)
- Toast duration fix (`?? 5000` fallback)
- Macro number rounding (`Math.round()`)
- Rate limit 500, GET exempted
- Phantom notification button removed
- `exercise_logs` table recreated with correct schema
- `notifications` table created
- `chat_messages.conversation_id` column added
