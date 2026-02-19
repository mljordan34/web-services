import { Router, Request, Response } from "express";
import { createShipmentValidators } from "../validators/shipment.validator.ts";
import { validate } from "../middleware/validate";

const router = Router();

router.post("/", validate(createShipmentValidators), (req: Request, res: Response) => {
    const shipment = req.body;

    const trackingNumber = `SWF-${Date.now()}`;

    const estimatedDelivery = new Date();

    const priority = shipment.options.priority;

    if (priority === "standard") {
      // 5–7 days → choose 6 for simplicity
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 6);
    } else if (priority === "express") {
      // 2–3 days → choose 3
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);
    } else if (priority === "overnight") {
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 1);
    }

    return res.status(201).json({
      success: true,
      message: "Shipment created successfully",
      data: {
        trackingNumber,
        estimatedDelivery: estimatedDelivery
          .toISOString()
          .split("T")[0], // format YYYY-MM-DD
        sender: shipment.sender,
        recipient: shipment.recipient,
        package: shipment.package,
        options: shipment.options
      }
    });
  }
);

export default router;
