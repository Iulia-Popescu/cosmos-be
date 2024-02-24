// server.ts
import express from "express";

const app = express();
const PORT = 3000; // Designate your desired port here

app.get('/', (req, res) => {
    res.send('Hello, TypeScript & Express!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
