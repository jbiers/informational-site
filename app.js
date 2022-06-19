#!/usr/bin/env node

import * as http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1 style="color:blue;">Hello World</h1>');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});