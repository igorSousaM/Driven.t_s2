import { prisma } from "@/config";
import { PaymentInput } from "@/protocols";

async function findOneByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      Ticket: {
        id: ticketId,
      },
    },
  });
}

async function findOneByUserId(ticketId: number, userId: number) {
  return prisma.payment.count({
    where: {
      Ticket: {
        AND: [{ id: ticketId }, { Enrollment: { User: { id: userId } } }],
      },
    },
  });
}

async function create(payment: PaymentInput, value: number) {
  return prisma.payment.create({
    data: {
      ticketId: payment.ticketId,
      cardIssuer: payment.cardData.issuer,
      cardLastDigits: payment.cardData.number.toString().slice(-4),
      value,
    },
  });
}

const paymentsRepository = {
  findOneByTicketId,
  findOneByUserId,
  create,
};

export default paymentsRepository;
