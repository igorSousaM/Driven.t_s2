import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const tickets = await ticketsService.getTicketsByUserId(userId);
    res.status(200).send(tickets);
  } catch (err) {
    res.sendStatus(404);
  }
}

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketsType = await ticketsService.getTicketsWithTypes();
    res.status(200).send(ticketsType);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const ticketTypeId = Number(req.body.ticketTypeId);
  const userId = Number(req.userId);

  try {
    const ticket = await ticketsService.createTicket(ticketTypeId, userId);
    res.status(201).send(ticket);
  } catch (err) {
    res.sendStatus(404);
  }
}
