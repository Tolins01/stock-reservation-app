# Stock Reservation Server

Express + MongoDB backend for the Stock Reservation application.

## Install

```bash
npm install
```

## Configure

The included `.env` is configured for a local MongoDB instance:

```text
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/stock_reservation
CLIENT_URL=http://localhost:5173
JWT_SECRET=replace-with-a-long-random-secret
```

For production, replace these values.

## Seed

```bash
npm run seed
```

The seed creates sample inventory/orders and an admin user.

Default development credentials:

```text
admin@example.com
Admin12345!
```

Override them with `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, and `SEED_ADMIN_NAME`.

## Run

```bash
npm run dev
```

Server: `http://localhost:5000`

Health check: `GET /api/health`

## CRUD API

### Inventory

```text
GET    /api/inventory
GET    /api/inventory/:id
POST   /api/inventory
PATCH  /api/inventory/:id
DELETE /api/inventory/:id
```

### Orders

```text
GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
PATCH  /api/orders/:id
DELETE /api/orders/:id
POST   /api/orders/:id/confirm
```

### Reservations

```text
GET    /api/reservations
GET    /api/reservations/:id
POST   /api/reservations
PATCH  /api/reservations/:id
DELETE /api/reservations/:id
POST   /api/reservations/:id/release
POST   /api/reservations/release-expired
```

### Users

```text
GET    /api/users
GET    /api/users/:id
PATCH  /api/users/:id/role
DELETE /api/users/:id
```

## Reservation lifecycle

Create -> Active -> Confirmed

```text
Active -> Released
Active -> Expired
```

Creating a reservation increases `reservedStock`. Releasing/expiring decreases it. Confirming decreases both `totalStock` and `reservedStock`.

Reservation/release/confirmation uses MongoDB transactions, so local MongoDB should support transactions (for example a replica set) or use MongoDB Atlas.
