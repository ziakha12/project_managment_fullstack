# Kamoora — Multi-Tenant AI Project Management & Mini-HR SaaS

> AI-powered project management platform with built-in HR essentials, built for agencies and teams that manage client work.

Replace `Kamoora` above with your actual product name, and update the badges/links below once you have a repo, demo, and license set up.

<!--
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green)](https://mongoosejs.com/)
-->

---

## ✨ What is this?

A **multi-tenant SaaS** where any user can create their own **organization** (workspace). Inside an organization, admins can set up **departments**, add **employees**, and run **projects and tasks** — with subtasks, client comments, and file attachments.

The standout feature: an **AI layer that reads every task's comments and attachments** to automatically detect things that usually get missed manually —

- 🔁 A client sent a **revision** but it's still being counted as regular progress on the current task
- ❌ A task/project got **cancelled** — and whose fault it actually was (client vs internal team)
- ⚠️ Early signs of **miscommunication or scope issues** before they escalate

Alongside that, a lightweight **Mini-HR module** handles employee records, attendance, and payroll — so teams don't need a separate HR tool for day-to-day basics.

---

## 🧩 Core Features

### Project Management
- Multi-tenant organizations — each user creates and owns their own workspace
- Departments/collections to group teams and projects
- Projects with client info, members, deadlines, and status tracking
- Tasks with **subtasks** (nested hierarchy), priorities, and due dates
- Comments & attachments per task, with client vs internal authorship

### 🤖 AI Task Insights (Core Differentiator)
- Reads task comments + attachments automatically on new activity
- Detects **revision requests** and separates them from normal progress
- Detects **cancellations** and analyzes root cause / responsible party
- Generates a plain-language summary manager can review and act on
- **Human-in-the-loop**: AI suggests, a manager/admin approves before status changes

### Mini-HR
- Employee profiles (designation, department, employment type)
- Attendance tracking (check-in/out, leave, half-day)
- Monthly payroll with base salary, bonuses, and deductions

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (React) |
| Backend | Node.js / Express (or Next.js API routes) |
| Database | MongoDB + Mongoose |
| AI | LLM API (e.g. Claude/OpenAI) for comment/attachment analysis |
| Auth | JWT-based, organization-scoped |
| File Storage | Cloud storage (S3 or equivalent) for attachments |

*(Update this table to match your actual stack choices.)*

---

## 📐 Architecture Overview

```
Organization (tenant)
 ├── User (auth) ──1:1── Employee (HR profile)
 │                          ├── Attendance
 │                          └── Payroll
 ├── Department
 ├── Project
 │     └── Task (supports nested subtasks)
 │           ├── Comment (client / internal)
 │           ├── Attachment
 │           └── AI Insight (revision / cancellation / issue analysis)
```

Every collection is scoped by `organization`, and all queries are filtered through tenant-isolation middleware to keep data strictly separated between workspaces.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- An API key for your chosen AI provider

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Environment Variables

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_provider_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run locally

```bash
npm run dev
```

App will be available at `http://localhost:3000`.

---

## 📁 Project Structure

```
/models          → Mongoose schemas (Organization, User, Employee, Task, etc.)
/controllers      → Business logic per entity
/routes           → API routes (organization-scoped)
/middleware
   ├── auth.js         → JWT verification
   └── tenantScope.js  → Multi-tenant data isolation
/services
   ├── ai/              → AI comment/attachment analysis
   └── queue/           → Background jobs for AI processing
/pages or /app     → Next.js frontend
```

---


## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/ziakha12/project_managment_fullstack/issues) if you want to contribute.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📬 Contact

Zia Kahlid — [@your-linkedIn](https://www.linkedin.com/in/zia-khalid-b561ba281) — kzzia06@gmail.com
