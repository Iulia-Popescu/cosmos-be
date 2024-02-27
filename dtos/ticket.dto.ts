export class TicketDto {
    constructor(
        public id: string,
        public numberOfBoxes: number,
        public hasSuperzahl: boolean,
        public boxes: number[][],
        public superzahl?: number,
    ) {}
}