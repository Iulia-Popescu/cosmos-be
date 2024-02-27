// server.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import {
    createTicket,
    getAllTickets, getFrequency,
    getTicketDetails,
    getTicketsPage,
} from './services/ticket-service';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/ticket', (req, res) => {
    try {
        res.status(201).json(createTicket(req.body));
    } catch (error) {
        res.status(400).send(error);
        return;
    }
});

app.get('/api/tickets', (req, res) => {
    try {
        res.status(200).json(getAllTickets());
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/tickets-page', (req, res) => {
    try {
        res.status(200).json(getTicketsPage({page: req.query.page as string, pageSize: req.query.pageSize as string}));
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/ticket/:id', (req, res) => {
    try {
        res.status(200).json(getTicketDetails(req.params.id));
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/frequency', (req, res) => {
    try {
        res.status(200).json(getFrequency());
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
