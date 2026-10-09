import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import express from "express";
import cors from "cors";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app=express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json({ limit: "1mb" }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json({limit:"1mb"}));
app.get("/api/health",(req,res)=>res.json({success:true,service:"stock-reservation-server",status:"healthy",timestamp:new Date().toISOString()}));
app.use("/api/auth",authRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/users",userRoutes);
app.use("/api/notifications",notificationRoutes);
app.use("/api/inventory",protect,inventoryRoutes);
app.use("/api/orders",protect,orderRoutes);
app.use("/api/reservations",protect,reservationRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;
