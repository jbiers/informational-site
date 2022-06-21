#!/usr/bin/env node

import * as fs from 'fs/promises';

async function example() {
    const filename = '/home/julia/Programming/informational-site/text.json'

    try {
        const data = await fs.readFile(filename, 'utf8');
        const parsedData = JSON.parse(data);

        console.log('Data from file:')
        console.log(parsedData);

    } catch (err) {
        console.log(err);
    }
};

example();