import express from "express";import cors from "cors";import inventoryRoutes from "./routes/inventoryRoutes.js";import orderRoutes from "./routes/orderRoutes.js";import reservationRoutes from "./routes/reservationRoutes.js";import {notFound,errorHandler} from "./middleware/errorMiddleware.js";


const app=express();app.use(cors({origin:process.env.CLIENT_URL||"http://localhost:5173"}));
app.use(express.json());
app.use("/api/inventory",inventoryRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/reservations",reservationRoutes);
app.use(notFound);
app.use(errorHandler);

app.get("/api/health",(req,res)=>res.json({
    success:true,service:"stock-reservation-server",
    status:"healthy",timestamp:new Date().toISOString()}
));

   
    
    
    
export default app;
