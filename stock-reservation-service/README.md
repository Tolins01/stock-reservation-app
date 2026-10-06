# stock-reservation-server
Node.js + Express + MongoDB backend for the Stock Reservation Service React MVP.

## Install
npm install

## Configure
Copy `.env.example` to `.env`.

## Seed
npm run seed

## Run
npm run dev

Server: http://localhost:5000
Health: GET /api/health

## API
GET /api/inventory
GET /api/inventory/:id
POST /api/inventory

GET /api/orders
GET /api/orders/:id
POST /api/orders
POST /api/orders/:id/confirm

GET /api/reservations
GET /api/reservations/:id
POST /api/reservations
POST /api/reservations/:id/release
POST /api/reservations/release-expired

## Reservation lifecycle
Create -> Active -> Confirmed
                 \-> Released
                 \-> Expired

Creating a reservation increases `reservedStock`.
Releasing decreases `reservedStock`.
Confirming decreases both `totalStock` and `reservedStock`.

The service uses MongoDB transactions for reservation/release/confirmation operations. For local MongoDB, use a replica set (or MongoDB Atlas) for transaction support.
