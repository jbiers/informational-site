#!/usr/bin/env node

import http from 'http';
import {readdir} from 'fs';
import fs from 'fs/promises';

import path from 'path';
import {fileURLToPath} from 'url';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || '127.0.0.1';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let indexFile;
let aboutFile;
let contactMeFile;
let notFoundFile;

const loadFiles = function() {
    fs.readFile(__dirname + '/pages/index.html')
    .then(content => {
        indexFile = content;
    })
    .catch(err => {
        console.error(`Could not read index.html file: ${err}`);
        process.exit(1);
    });

    fs.readFile(__dirname + '/pages/about.html')
    .then(content => {
        aboutFile = content;
    })
    .catch(err => {
        console.error(`Could not read not-found.html file: ${err}`);
        process.exit(1);
    });

    fs.readFile(__dirname + '/pages/contact-me.html')
    .then(content => {
        contactMeFile = content;
    })
    .catch(err => {
        console.error(`Could not read contact-me.html file: ${err}`);
        process.exit(1);
    });

    fs.readFile(__dirname + '/pages/not-found.html')
    .then(content => {
        notFoundFile = content;
    })
    .catch(err => {
        console.error(`Could not read contact-me.html file: ${err}`);
        process.exit(1);
    });
}

const requestListener = function(req, res) {
    res.setHeader("Content-Type", "text/html");
    switch (req.url) {
        case '/':
        case '/index.html':
            res.writeHead(200);
            res.end(indexFile);
            break
        case '/about.html':
            res.writeHead(200);
            res.end(aboutFile);
            break
        case '/contact-me.html':
            res.writeHead(200);
            res.end(contactMeFile);
            break
        default:
            res.writeHead(404);
            res.end(notFoundFile);
    }
}

const server = http.createServer(requestListener);

loadFiles();
server.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});