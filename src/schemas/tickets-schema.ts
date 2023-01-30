import { TicketsInput } from "@/protocols";
import Joi from "joi";

export const ticketSchema = Joi.object<TicketsInput>({
  ticketTypeId: Joi.number().required(),
});
