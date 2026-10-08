# Stock Reservation Client

React/Vite/Tailwind frontend for the Stock Reservation application.

## Run

```bash
npm install
npm run dev
```

The frontend expects the API at `http://localhost:5000/api`. Change `VITE_API_URL` in `.env` when needed.

## Features

- Responsive sidebar with Dashboard, Inventory, Orders, New Order, Reservations, New Reservation, Notifications, Profile/Settings, Users (admin/manager), and Sign-up.
- Real API-backed dashboard.
- Inventory CRUD.
- Order CRUD.
- Reservation lifecycle and CRUD.
- Notifications.
- Authentication persisted in LocalStorage.
- GET-response cache persisted in LocalStorage for temporary backend outages.

## Build

```bash
npm run build
npm run preview
```
