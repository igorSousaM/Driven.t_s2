import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function findOneById(id: number) {
  return prisma.ticket.findFirst({
    where: {
      id,
    },
    include: {
      Enrollment: true
    }
  });
}

async function findOneByUserId(id: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: id,
      },
    },
    include: {
      TicketType: true,
    },
  });
}

async function findManyWithType() {
  return prisma.ticketType.findMany();
}

async function create(ticketTypeId: number, userId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      status: TicketStatus.RESERVED,
      ticketTypeId,
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function findEnrollmentByUserId(userId: number) {
  return prisma.enrollment.findUnique({
    where: {
      userId,
    },
  });
}

async function updateStatus(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
    include: {
      TicketType: true,
    },
  });
}

async function findOneByUserIdAndId(userId: number, id: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId,
      },
      id,
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketsRepository = {
  findOneByUserId,
  findManyWithType,
  findOneById,
  create,
  findEnrollmentByUserId,
  updateStatus,
  findOneByUserIdAndId,
};

export default ticketsRepository;
