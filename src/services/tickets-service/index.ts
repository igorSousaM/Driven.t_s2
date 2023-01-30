import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsByUserId(userId: number) {
  const tickets = await ticketsRepository.findOneByUserId(userId);
  if(!tickets) throw notFoundError();
  return tickets;
}

async function getTicketsWithTypes() {
  const ticketType = await ticketsRepository.findManyWithType();
  if(!ticketType) return [];
  return ticketType;
}

async function createTicket(ticketTypeId: number, userId: number) {
  const enrollment = await ticketsRepository.findEnrollmentByUserId(userId);
  if(!enrollment) throw notFoundError();
  const ticket = await ticketsRepository.create(ticketTypeId, userId, enrollment.id);

  return ticket;
}

const ticketsService = {
  getTicketsByUserId,
  getTicketsWithTypes,
  createTicket
};

export default ticketsService;
