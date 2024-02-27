import { Ticket } from '../models/ticket.model';
import { TicketGridDto } from '../dtos/ticket-grid.dto';
import {TicketDto} from '../dtos/ticket.dto';

export function mapTicketToTicketGridDTO(ticket: Ticket): TicketGridDto {
    return new TicketGridDto(ticket.id, ticket.numberOfBoxes, ticket.hasSuperzahl);
}

export function mapTicketToTicketDTO(ticket: Ticket): TicketDto {
    return new TicketDto(ticket.id, ticket.numberOfBoxes, ticket.hasSuperzahl, ticket.boxes, ticket.superzahl);
}
