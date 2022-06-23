#!/usr/bin/env node

import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

eventEmitter.on('start', filename => {
    console.log(`started ${filename}`);
});

eventEmitter.emit('start', 'events.js');