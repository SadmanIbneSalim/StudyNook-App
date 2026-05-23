# 📚 StudyNook — Library Study Room Booking Platform

> *Find your focus. Book your space. Own your study time.*

**Live Site 🔗 [https://studynook.vercel.app](https://studynook.vercel.app)**

---

## 🌟 What is StudyNook?

StudyNook is a full-stack web application where students and library users can **discover, list, and book private study rooms** — all in one sleek platform. Whether you need a quiet corner for solo focus or a collaborative space for group work, StudyNook has you covered.

---

## ✨ Key Features

- 🔐 **Secure JWT Authentication** — Email/password and Google OAuth login, with tokens stored in HTTP-only cookies for maximum security
- 🏠 **Room Listings & Management** — Any registered user can list their own study rooms with images, amenities, floor info, and hourly rates; owners can edit or delete their listings at any time
- 📅 **Smart Booking System** — Book rooms by date and time slot with real-time cost calculation; intelligent conflict detection automatically prevents double-bookings
- 🔍 **Search & Filter** — Find rooms by name, amenities (Whiteboard, Projector, Wi-Fi, and more), or hourly rate to quickly discover the perfect space
- 📋 **Personal Dashboard** — Track all your reservations in one place with booking status badges, total hours, and total spend; cancel upcoming bookings with a single click

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, Tailwind CSS v4 |
| Auth | better-auth (Email + Google OAuth) |
| Database | MongoDB (via official driver) |
| UI Components | HeroUI, Framer Motion |
| Notifications | React Toastify |
| Icons | React Icons |
| Backend | Node.js + Express |

---

## 📸 Pages At a Glance

| Route | Description |
|---|---|
| `/` | Home — hero banner + latest 6 rooms |
| `/rooms` | Browse all study rooms with search & filter |
| `/rooms/:id` | Full room details + booking form |
| `/add-room` | List your own room *(private)* |
| `/my-listings` | Manage rooms you own *(private)* |
| `/my-bookings` | View & cancel your reservations *(private)* |
| `/login` | Sign in with email or Google |
| `/register` | Create a new account |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google OAuth credentials

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/studynook-app.git
cd studynook-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Auth
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000

# Database
AUTH_DB_URI=your_mongodb_connection_string

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Express Server
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```

---

## 📁 Project Structure

```
studynook-app/
├── app/                  # Next.js App Router pages
│   ├── (auth)/           # Login & Register
│   ├── rooms/            # Room listing & details
│   ├── add-room/         # Add new room
│   ├── my-listings/      # Owner dashboard
│   └── my-bookings/      # User booking history
├── components/           # Reusable UI components
├── lib/                  # Auth config, DB helpers
└── public/               # Static assets
```

---

## 🔒 Security Highlights

- JWT tokens stored in **HTTP-only cookies** (not localStorage)
- All private routes protected server-side via `auth.api.getSession()`
- Bearer token forwarded to Express API for `jwtVerify` validation
- Ownership checks enforced on every edit/delete operation

---

## 📜 License

This project was built as an academic assignment. Feel free to explore the code for learning purposes.

---

<p align="center">Made with ☕ and too many late-night study sessions</p>