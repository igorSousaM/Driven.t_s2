import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";

async function getPayments(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.userId);
  const { ticketId } = req.query;

  try {
    const payment = await paymentsService.getPayments(Number(ticketId), userId);
    res.status(200).send(payment);
  } catch (err) {
    if (err.name === "UnauthorizedError") {
      res.sendStatus(401);
    } else if (err.name === "NotFoundError") {
      res.sendStatus(404);
    } else {
      res.sendStatus(400);
    }
  }
}

async function postPayments(req: AuthenticatedRequest, res: Response) {
  const newPayment = req.body;
  const userId = Number(req.userId);

  try {
    const payment = await paymentsService.createPayment({ ...newPayment }, userId);
    res.status(200).send(payment);
  } catch (err) {
    if (err.name === "UnauthorizedError") {
      return res.sendStatus(401);
    } else if (err.name === "NotFoundError") {
      return res.sendStatus(404);
    } else {
      return res.sendStatus(500);
    }
  }
}

export { getPayments, postPayments };
