# ServiceTrack — Ministry Activity Tracker

> A free, beautiful SaaS web application for Jehovah's Witnesses publishers and pioneers to track their ministry activity.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.x-green)
![Database](https://img.shields.io/badge/Database-TiDB_(MySQL)-orange)

## ✨ Features

- **🔐 Secure Authentication** — JWT cookie-based auth with bcrypt password hashing
- **📊 Dashboard** — Real-time stats, weekly activity charts, recent activity feed
- **📝 Ministry Logs** — Full CRUD for logging hours, return visits, Bible studies
- **📈 Reports** — Monthly summaries, visual charts (bar + pie), print-to-PDF export
- **⚙️ Settings** — Profile management (name, congregation)
- **🎨 Modern UI** — Tailwind CSS + shadcn/ui components, dark/light mode ready
- **📱 Responsive** — Works on mobile and desktop
- **💸 100% Free** — No payments, no subscriptions, no ads

## 🧩 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS 3.x + shadcn/ui |
| **Database** | TiDB Cloud (MySQL compatible) |
| **ORM** | Prisma 6.x |
| **Auth** | JWT + httpOnly cookies (jose library) |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

## 📁 Project Structure

```
servicetrack-app/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx       # Login page
│   │   └── register/page.tsx    # Registration page
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx   # Main dashboard with charts
│   │   ├── logs/page.tsx        # Ministry logs CRUD
│   │   ├── reports/page.tsx     # Monthly reports + charts
│   │   └── settings/page.tsx    # Profile settings
│   ├── api/
│   │   ├── auth/                # Auth API routes
│   │   │   ├── login/route.ts
│   │   │   ├── register/route.ts
│   │   │   ├── logout/route.ts
│   │   │   ├── me/route.ts
│   │   │   └── profile/route.ts
│   │   ├── logs/                # Logs CRUD API
│   │   │   ├── route.ts         # GET all, POST create
│   │   │   └── [id]/route.ts    # GET, PUT, DELETE single
│   │   └── stats/route.ts       # Dashboard statistics
│   ├── layout.tsx               # Root layout + AuthProvider
│   ├── globals.css              # Global styles + Tailwind
│   └── page.tsx                 # Landing page
├── components/
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── badge.tsx
│   │   └── textarea.tsx
│   └── layout/
│       └── DashboardLayout.tsx  # Dashboard wrapper + sidebar
├── context/
│   └── AuthContext.tsx          # Client-side auth state
├── lib/
│   ├── auth.ts                  # JWT auth helpers
│   ├── prisma.ts                # Prisma client singleton
│   └── utils.ts                 # Utility functions
├── types/
│   └── index.ts                 # TypeScript types
├── prisma/
│   └── schema.prisma            # Database schema
├── middleware.ts                # Route protection
├── .env.example                 # Environment variables template
└── vercel.json                  # Vercel deployment config
```

## 🗄️ Database Schema

```prisma
model User {
  id           String   @id @default(uuid())
  name         String
  email        String   @unique
  password     String
  congregation String?
  logs         Log[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Log {
  id           String   @id @default(uuid())
  user         User     @relation(fields: [userId], references: [id])
  userId       String
  date         DateTime
  hours        Float
  returnVisits Int
  bibleStudies Int
  notes        String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A TiDB Cloud cluster (free tier available)

### 1. Clone and Install

```bash
cd servicetrack-app
npm install
```

### 2. Configure TiDB Database

1. Go to [TiDB Cloud](https://cloud.tidbcloud.com/) and create a free cluster
2. Create a database called `servicetrack`
3. Get your connection string from the TiDB Cloud dashboard
4. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

5. Update `.env.local` with your TiDB credentials:

```env
DATABASE_URL="mysql://<USER>:<PASSWORD>@<HOST>:4000/servicetrack?sslaccept=strict"
JWT_SECRET="your-secret-key-generate-with-openssl-rand-base64-64"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Run Prisma Migrations

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:studio` | Open Prisma Studio (database GUI) |

## 🌐 Deploy to Vercel

### Option 1: CLI

```bash
npm i -g vercel
vercel
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project" and import your repository
4. Add environment variables:
   - `DATABASE_URL` — Your TiDB connection string
   - `JWT_SECRET` — A secure random string
   - `NEXT_PUBLIC_APP_URL` — Your Vercel deployment URL
5. Click "Deploy"

### Option 3: Using your Vercel Project

Based on your project setup:
- **Project:** `servicetrack` (vercel.com/.../servicetrack)
- **Project ID:** `prj_qFfHlUI9vQSNo8OFrRLXPlMr3x54`

```bash
vercel --project-name servicetrack
```

## 🔐 Security Features

- **JWT cookie-based authentication** with httpOnly, secure cookies
- **Password hashing** with bcrypt (10 salt rounds)
- **Route protection** via Next.js middleware
- **Security headers** (HSTS, X-Frame-Options, CSP, etc.)
- **Input validation** on all API routes
- **User isolation** — all queries scoped to authenticated user

## 🎨 UI Components

Built with shadcn/ui patterns:
- **Button** — default, outline, ghost, destructive variants
- **Card** — with header, content, footer
- **Dialog** — modal dialogs for forms
- **Input/Textarea** — form inputs with validation styles
- **Badge** — status indicators
- **Label** — accessible form labels

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Hero, features, CTA sections |
| Login | `/login` | Email + password sign in |
| Register | `/register` | Create account (name, email, congregation, password) |
| Dashboard | `/dashboard` | Stats cards, weekly chart, recent activity |
| Logs | `/logs` | Full CRUD table with add/edit modal |
| Reports | `/reports` | Monthly summary, bar/pie charts, print export |
| Settings | `/settings` | Update name and congregation |

## 🔄 API Routes

### Auth
- `POST /api/auth/login` — Sign in
- `POST /api/auth/register` — Create account
- `POST /api/auth/logout` — Sign out
- `GET /api/auth/me` — Get current user
- `PUT /api/auth/profile` — Update profile

### Logs
- `GET /api/logs` — Get all logs (with pagination + date filters)
- `POST /api/logs` — Create log entry
- `GET /api/logs/[id]` — Get single log
- `PUT /api/logs/[id]` — Update log entry
- `DELETE /api/logs/[id]` — Delete log entry

### Stats
- `GET /api/stats?type=weekly|monthly` — Get dashboard statistics

## 🚧 Future Enhancements

- [ ] Calendar view for ministry logs
- [ ] AI-powered ministry insights
- [ ] Team/congregation leaderboards
- [ ] Export to CSV/Excel
- [ ] Mobile app (React Native)
- [ ] Pioneer hour tracking
- [ ] Territory management
- [ ] Notification reminders

## 📄 License

MIT

## 🙏 Acknowledgments

Built with patterns from NutriFlow, a health tracking application. ServiceTrack is designed specifically for Jehovah's Witnesses publishers to simplify ministry record keeping.

---

**ServiceTrack** — Track your ministry with clarity and simplicity.
