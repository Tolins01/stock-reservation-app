/**
 * @swagger
 * tags:
 *   - name: Health
 *   - name: Authentication
 *   - name: Dashboard
 *   - name: Users
 *   - name: Notifications
 *   - name: Inventory
 *   - name: Orders
 *   - name: Reservations
 */

/** @swagger
 * /api/health:
 *   get:
 *     tags: [Health]
 *     summary: Check API health
 *     responses:
 *       200:
 *         description: API is healthy
 */

/** @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a staff account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, example: John Doe }
 *               email: { type: string, format: email, example: john@example.com }
 *               password: { type: string, minLength: 8, example: StrongPass123! }
 *     responses:
 *       201: { description: Account created }
 *       400: { description: Invalid or missing input }
 *       409: { description: Email already exists }
 */

/** @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Log in and receive a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email, example: john@example.com }
 *               password: { type: string, example: StrongPass123! }
 *     responses:
 *       200: { description: Login successful; returns user and token }
 *       400: { description: Email and password are required }
 *       401: { description: Invalid credentials }
 */

/** @swagger
 * /api/auth/me:
 *   get:
 *     tags: [Authentication]
 *     summary: Get the current user's profile
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Current user profile }
 *       401: { description: Authentication required }
 *   patch:
 *     tags: [Authentication]
 *     summary: Update the current user's name
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string, example: John Doe }
 *     responses:
 *       200: { description: Profile updated }
 *       400: { description: Name is required }
 *       401: { description: Authentication required }
 */

/** @swagger
 * /api/dashboard:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get dashboard statistics and recent activity
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Dashboard data returned }
 *       401: { description: Authentication required }
 */

/** @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: List users (admin or manager)
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Users returned }
 *       401: { description: Authentication required }
 *       403: { description: Insufficient role }
 */
/** @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get a user by ID (admin or manager)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: User returned }
 *       404: { description: User not found }
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user (admin only)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: User deleted }
 *       400: { description: Cannot delete own account }
 *       404: { description: User not found }
 */
/** @swagger
 * /api/users/{id}/role:
 *   patch:
 *     tags: [Users]
 *     summary: Update a user's role (admin only)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [role]
 *             properties:
 *               role: { type: string, enum: [admin, manager, staff], example: manager }
 *     responses:
 *       200: { description: Role updated }
 *       400: { description: Invalid role }
 *       404: { description: User not found }
 */

/** @swagger
 * /api/notifications:
 *   get:
 *     tags: [Notifications]
 *     summary: Get the current user's notifications
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 100, default: 30 }
 *     responses:
 *       200: { description: Notifications and unread count returned }
 */
/** @swagger
 * /api/notifications/{id}/read:
 *   patch:
 *     tags: [Notifications]
 *     summary: Mark one notification as read
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Notification marked as read }
 *       404: { description: Notification not found }
 */
/** @swagger
 * /api/notifications/read-all:
 *   patch:
 *     tags: [Notifications]
 *     summary: Mark all current user's notifications as read
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Notifications marked as read }
 */

/** @swagger
 * /api/inventory:
 *   get:
 *     tags: [Inventory]
 *     summary: List inventory items
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Inventory list returned }
 *   post:
 *     tags: [Inventory]
 *     summary: Create an inventory item
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, sku, totalStock]
 *             properties:
 *               name: { type: string, example: Portland Cement }
 *               sku: { type: string, example: CEM-001 }
 *               totalStock: { type: integer, minimum: 0, example: 500 }
 *     responses:
 *       201: { description: Inventory item created }
 *       400: { description: Invalid input }
 *       409: { description: SKU already exists }
 */
/** @swagger
 * /api/inventory/{id}:
 *   get:
 *     tags: [Inventory]
 *     summary: Get an inventory item
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Inventory item returned }
 *       404: { description: Inventory item not found }
 *   patch:
 *     tags: [Inventory]
 *     summary: Update an inventory item
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: Portland Cement }
 *               sku: { type: string, example: CEM-001 }
 *               totalStock: { type: integer, minimum: 0, example: 600 }
 *     responses:
 *       200: { description: Inventory updated }
 *       400: { description: Invalid stock value }
 *       404: { description: Inventory item not found }
 *       409: { description: SKU conflict }
 *   delete:
 *     tags: [Inventory]
 *     summary: Delete an inventory item
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Inventory deleted }
 *       404: { description: Inventory item not found }
 *       409: { description: Item has reserved stock or is referenced }
 */

/** @swagger
 * /api/orders:
 *   get:
 *     tags: [Orders]
 *     summary: List orders
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Orders returned }
 *   post:
 *     tags: [Orders]
 *     summary: Create an order
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [customer, items]
 *             properties:
 *               customer:
 *                 type: object
 *                 required: [name]
 *                 properties:
 *                   name: { type: string, example: Jane Doe }
 *                   email: { type: string, example: jane@example.com }
 *               items:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required: [inventoryId, quantity]
 *                   properties:
 *                     inventoryId: { type: string, example: 68c123456789012345678901 }
 *                     quantity: { type: integer, minimum: 1, example: 10 }
 *                     unitPrice: { type: number, minimum: 0, example: 12.5 }
 *     responses:
 *       201: { description: Order created }
 *       400: { description: Invalid order data }
 *       404: { description: Inventory item not found }
 */
/** @swagger
 * /api/orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Get an order by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Order returned }
 *       404: { description: Order not found }
 *   patch:
 *     tags: [Orders]
 *     summary: Update an order
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer:
 *                 type: object
 *                 properties:
 *                   name: { type: string }
 *                   email: { type: string }
 *               status: { type: string, enum: [Pending, Processing, Shipped, Delivered, Cancelled] }
 *     responses:
 *       200: { description: Order updated }
 *       404: { description: Order not found }
 *       409: { description: Confirmed orders cannot be edited }
 *   delete:
 *     tags: [Orders]
 *     summary: Delete an order
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Order deleted }
 *       404: { description: Order not found }
 *       409: { description: Active reservation must be released first }
 */
/** @swagger
 * /api/orders/{id}/confirm:
 *   post:
 *     tags: [Orders]
 *     summary: Confirm an order and deduct reserved stock
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Order confirmed }
 */

/** @swagger
 * /api/reservations:
 *   get:
 *     tags: [Reservations]
 *     summary: List reservations, optionally filtered by status
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [Active, Released, Expired, Confirmed] }
 *     responses:
 *       200: { description: Reservations returned }
 *   post:
 *     tags: [Reservations]
 *     summary: Create a stock reservation
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Provide the order reference and reservation details required by the reservation service.
 *             properties:
 *               orderId: { type: string, example: 68c123456789012345678901 }
 *               expiresAt: { type: string, format: date-time, example: '2026-12-01T12:00:00.000Z' }
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     inventoryId: { type: string }
 *                     quantity: { type: integer, minimum: 1 }
 *     responses:
 *       201: { description: Reservation created }
 *       400: { description: Invalid reservation data }
 */
/** @swagger
 * /api/reservations/release-expired:
 *   post:
 *     tags: [Reservations]
 *     summary: Release all expired reservations
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Expired reservations processed; returns releasedCount }
 */
/** @swagger
 * /api/reservations/{id}:
 *   get:
 *     tags: [Reservations]
 *     summary: Get a reservation by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Reservation returned }
 *       404: { description: Reservation not found }
 *   patch:
 *     tags: [Reservations]
 *     summary: Update an active reservation expiry date
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [expiresAt]
 *             properties:
 *               expiresAt: { type: string, format: date-time, example: '2026-12-01T12:00:00.000Z' }
 *     responses:
 *       200: { description: Reservation updated }
 *       400: { description: Expiry must be a future date }
 *       404: { description: Reservation not found }
 *       409: { description: Only active reservations can be edited }
 *   delete:
 *     tags: [Reservations]
 *     summary: Delete a non-active reservation
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Reservation deleted }
 *       404: { description: Reservation not found }
 *       409: { description: Active reservation must be released first }
 */
/** @swagger
 * /api/reservations/{id}/release:
 *   post:
 *     tags: [Reservations]
 *     summary: Release a reservation and return stock
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Reservation released }
 */
