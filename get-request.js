#!/usr/bin/env node

import * as http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const options = {
    hostname,
    port,
    path: '/',
    method: 'GET',
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

req.end();