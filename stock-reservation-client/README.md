# Stock Reservation Service — React MVP

A runnable React/Vite/Tailwind frontend for the Stock Reservation Service UI.

## Included
- Dashboard
- Reservations
- Reservation details
- Inventory
- Orders
- Modal Examples: Create, Release, Confirm, Release Expired
- Settings
- Responsive layout and reusable components
- Mock data ready to replace with your Express API

## Run
1. Install Node.js 18+ (20+ recommended).
2. Open this folder in VS Code.
3. Run:

```bash
npm install
npm run dev
```

Then open the URL shown by Vite, normally `http://localhost:5173`.

## Build
```bash
npm run build
npm run preview
```

## Suggested API integration
```text
GET  /api/inventory
GET  /api/products
GET  /api/orders
GET  /api/reservations
GET  /api/reservations/:id
POST /api/reservations
POST /api/reservations/:id/release
POST /api/orders/:id/confirm
POST /api/reservations/release-expired
```

Replace the data in `src/data/mockData.js` with calls to your backend when the API is ready.

## Reservation lifecycle
Create reservation → stock becomes reserved → confirm order OR release manually → expired reservations are automatically released.
