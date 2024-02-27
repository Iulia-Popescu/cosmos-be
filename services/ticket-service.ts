import {Ticket} from '../models/ticket.model';
import {randomInt} from 'crypto';
import {readTickets, writeTicket} from '../repositories/ticket-repository';
import {mapTicketToTicketDTO, mapTicketToTicketGridDTO} from '../utils/ticket.mapper';
import {TicketDto} from '../dtos/ticket.dto';
import {TicketGridDto} from '../dtos/ticket-grid.dto';
import {readFrequency, writeFrequency} from '../repositories/frequency-repository';
import {mapFrequencyToFrequencyDto} from '../utils/frequency.mapper';
import {FrequencyDto} from '../dtos/frequency.dto';

export function createTicket(requestBody: {numberOfBoxes: number, hasSuperzahl: boolean}) {
    const { numberOfBoxes, hasSuperzahl } = requestBody;

    if (!numberOfBoxes) {
        throw new Error('Number of boxes is required');
    }

    let data: {nrOfTickets: number, tickets: Ticket[]} = readTickets();
    let boxes: number[][] = [];

    data.nrOfTickets = data.nrOfTickets + 1;

    for (let i = 0; i < numberOfBoxes; i++) {
        const box: number[] = [];
        for (let j = 0; j < 6; j++) {
            let randomNumber = randomInt(1, 50);

            while (box.length === j) {
                if (!box.includes(randomNumber)) {
                    box.push(randomNumber);

                    // Update frequency of generated number
                    updateFrequency(randomNumber);
                } else {
                    randomNumber = randomInt(1, 50);
                }
            }
        }

        box.sort((a, b) => a - b);
        boxes.push(box);
    }



    const newTicket: Ticket = {
        id: data.nrOfTickets.toString(),
        numberOfBoxes,
        boxes,
        hasSuperzahl,
        superzahl: hasSuperzahl ? randomInt(0, 10) : undefined,
        createdAt: new Date().toISOString(),
        createdBy: 'cosmos'
    };

    data.tickets.push(newTicket);

    writeTicket(JSON.stringify(data));

    return mapTicketToTicketDTO(newTicket);
}

export function getFrequency(): FrequencyDto {
    return mapFrequencyToFrequencyDto(readFrequency());
}

export function updateFrequency(randomNumber: number) {
    let frequency = readFrequency();
    frequency.counter[randomNumber - 1] = frequency.counter[randomNumber - 1] + 1;
    writeFrequency(JSON.stringify(frequency));
}

export function getAllGridTickets(): TicketGridDto[] {
    let data: {nrOfTickets: number, tickets: Ticket[]} = readTickets();

    return data.tickets.map((ticket: Ticket) => mapTicketToTicketGridDTO(ticket)).reverse();
}

export function getAllTickets(): TicketDto[] {
    let data: {nrOfTickets: number, tickets: Ticket[]} = readTickets();

    return data.tickets.map((ticket: Ticket) => mapTicketToTicketDTO(ticket));
}

export function getTicketDetails(ticketId: string): TicketDto {
    if (!ticketId) {
        throw new Error('Ticket ID is required');
    }

    const tickets: TicketDto[] = getAllTickets();
    const ticket = tickets.find((ticket: TicketDto) => ticket.id === ticketId);

    if (!ticket) {
        throw new Error('Ticket not found');
    }

    return ticket;
}

export function getTicketsPage(
    reqQuery: {
        page: string,
        pageSize: string
    }): {
        page: number,
        pageSize: number,
        totalItems: number,
        totalPages: number,
        data: TicketGridDto[]
    } {
    if (!reqQuery.page || !reqQuery.pageSize) {
        throw new Error('Page and pageSize are required query parameters');
    }

    const tickets = getAllGridTickets();

    const page = parseInt(reqQuery.page) || 1;
    const pageSize = parseInt(reqQuery.pageSize) || 5;

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedResources = tickets.slice(startIndex, endIndex);

    return {
        page,
        pageSize,
        totalItems: tickets.length,
        totalPages: Math.ceil(tickets.length / pageSize),
        data: paginatedResources
    }
}