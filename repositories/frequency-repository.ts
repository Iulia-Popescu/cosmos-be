import fs from 'fs';

const filePath = 'data/frequency.json';

export function readFrequency(): any {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function writeFrequency(data: string) {
    fs.writeFileSync(filePath, data);

    return data;
}