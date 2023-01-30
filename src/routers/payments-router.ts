import { getPayments, postPayments } from "@/controllers/payments-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { PaymentSchema } from "@/schemas/payments-schema";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayments)
  .post("/process", validateBody(PaymentSchema), postPayments);

export { paymentsRouter };
