# ticktock — Frontend Developer Technical Assessment | Tentwenty (Next.js Edition)

A pixel-perfect, responsive, state-of-the-art timesheet management web application built with **Next.js 15 App Router**, **React 19**, and **Tailwind CSS v4** for the **Tentwenty Frontend Technical Assessment**.

---

## 🌟 Overview & Key Features

**ticktock** enables employees and managers to track weekly work hours, manage daily task entries, filter timesheets, and view real-time productivity progress towards a 40-hour weekly target.

### 🎨 Design & Figma Compliance
- **Google Font Inter**: Integrated across the application as required.
- **Split Login Screen**: 2-column layout with form validation (`ajay@gmail.com` / `admin@123`), "Remember me" option, and branding sidebar with blue backdrop.
- **Weekly Timesheets Table View**:
  - Filterable by **Date Range** (with multi-week coverage support) and **Status** (`COMPLETED`, `INCOMPLETE`, `MISSING`).
  - Sortable columns (`WEEK #`, `DATE`).
  - Dynamic status recalculation based on recorded hours:
    - **`COMPLETED`**: 40+ hours added by user.
    - **`INCOMPLETE`**: < 40 hours added by user.
    - **`MISSING`**: 0 hours added by user.
  - Action buttons (`View`, `Update`, `Create`) navigating directly to detail view.
  - Custom pagination (`5 per page` dropdown, page selection).
- **Daily Timesheet Detail View**:
  - Grouped by day (`Jan 21`, `Jan 22`, etc.).
  - Visual progress bar showing accumulated hours (e.g. `20/40 hrs`, `50%`).
  - Task cards showing task description, duration (`hrs`), and project badges.
  - Interactive horizontal 3-dots action menu (`Edit`, `Delete`).
  - `+ Add new task` button for each specific day.
- **Add / Edit Entry Modal**:
  - Project dropdown selection with info tooltip icons.
  - Type of Work dropdown selection with info tooltip icons.
  - Task description textarea with extra note guidance.
  - Custom connected segmented stepper control for hours (`[-] 12 [+]`).
  - Black asterisks (`*`) for required fields matching Figma design.

---

## 🔌 API & Mock Architecture

Per the Figma assessment requirements:
> *"Create api endpoints locally within the files. Do not call the mock data directly on the components. We want to test your API integration skill as well."*

We implemented a clean asynchronous API service layer in [`src/services/api.js`](src/services/api.js):
- **Simulated Latency**: Adds artificial network latency (`Promise` delays) to simulate real-world REST API network requests.
- **Endpoints Implemented**:
  - `POST /api/login` & `POST /api/logout`
  - `GET /api/timesheets` (supports filtering, sorting, pagination)
  - `GET /api/timesheets/:id`
  - `POST /api/timesheets/:id/entries`
  - `PUT /api/timesheets/:id/entries/:entryId`
  - `DELETE /api/timesheets/:id/entries/:entryId`
  - `GET /api/projects` & `GET /api/work-types`
- **Data Persistence**: Uses `localStorage` so any added, updated, or deleted tasks persist seamlessly across page reloads.

---

## 🛠️ Frameworks & Libraries Used

- **Framework**: Next.js 15 (App Router)
- **UI Core**: React 19
- **Styling**: Tailwind CSS v4
- **Typography**: Google Font Inter
- **Icons & Graphics**: Custom Inline SVG Icons

---

## 🚀 Setup & Installation Instructions

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn / pnpm

### Steps to Run Locally

1. **Navigate to the Next.js project directory**:
   ```bash
   cd ticktock-nextjs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000`.

5. **Demo Credentials**:
   - **Email**: `ajay@gmail.com`
   - **Password**: `admin@123`

---

## ⚡ Build for Production

To build and verify the production bundle:
```bash
npm run build
npm run start
```

---

© 2024 tentwenty. All rights reserved.
