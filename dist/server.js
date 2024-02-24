"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000; // Designate your desired port here
app.get('/', (req, res) => {
    res.send('Hello, TypeScript & Express!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});