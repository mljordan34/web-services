import express from "express";
import shipmentRoutes from "./routes/shipment.routes";

const app = express();

app.use(express.json());

app.use("/api/shipments", shipmentRoutes)

export default app;