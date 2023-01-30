import { notFoundError, unauthorizedError } from "@/errors";
import { PaymentInput } from "@/protocols";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getPayments(ticketId: number, userId: number) {
  const ticketConsult = await ticketsRepository.findOneById(ticketId);
  if(!ticketConsult) throw notFoundError();
  if(ticketConsult.Enrollment.userId !== userId) throw unauthorizedError();
  
  if(!ticketId) throw new Error("TicketError");

  const ticket = ticketsRepository.findOneById(ticketId);
  if(!ticket) throw notFoundError();

  const payment = await paymentsRepository.findOneByTicketId(ticketId);
  if(!payment) throw notFoundError();

  const paymentFoundWithUserId = await paymentsRepository.findOneByUserId(ticketId, userId);
  if(!paymentFoundWithUserId) throw unauthorizedError();

  return payment;
}

async function createPayment(paymentData: PaymentInput, userId: number) {
  const ticketConsult = await ticketsRepository.findOneById(paymentData.ticketId);
  if(!ticketConsult) throw notFoundError();
  if(ticketConsult.Enrollment.userId !== userId) throw unauthorizedError();

  const updateTicket = await ticketsRepository.updateStatus(paymentData.ticketId);

  if(!updateTicket) throw notFoundError();

  const payment = await paymentsRepository.create({ ...paymentData }, updateTicket.TicketType.price);
  if(!payment) throw notFoundError();

  return payment;
}

const paymentsService = {
  getPayments,
  createPayment
};

export default paymentsService;
