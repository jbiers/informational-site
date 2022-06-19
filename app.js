#!/usr/bin/env node

import * as http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hello`);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});