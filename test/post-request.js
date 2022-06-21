#!/usr/bin/env node

import * as http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const data = JSON.stringify({
    test:'1',
});

const options = {
    hostname,
    port,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
    }
}

const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
        process.stdout.write(d);
    });
});

req.on('error', error => {
    console.log(error);
});

req.write(data);
req.end();