import fs from 'fs';
import {Ticket} from '../models/ticket.model';

const filePath = 'data/tickets.json';

export function readTickets(): {nrOfTickets: number, tickets: Ticket[]} {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function writeTicket(data: string) {
    fs.writeFileSync(filePath, data);

    return data;
}