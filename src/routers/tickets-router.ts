import { getTickets, getTicketsTypes, postTicket } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketSchema } from "@/schemas/tickets-schema";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .get("/types", getTicketsTypes)
  .post("/", validateBody(ticketSchema), postTicket);

export { ticketsRouter };
