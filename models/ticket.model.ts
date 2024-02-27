export class Ticket {
    constructor(
        public id: string,
        public numberOfBoxes: number,
        public boxes: number[][],
        public hasSuperzahl: boolean,
        public superzahl?: number,
        public createdAt?: string,
        public createdBy?: string
    ) {}
}