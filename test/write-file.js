#!/usr/bin/env node

import fs from 'fs';

const content = 'Content to be written.'
const filename = '/home/julia/Programming/informational-site/testWrite'

fs.writeFile(filename, content, err => {
    if (err) {
        console.log(err);
    }
});