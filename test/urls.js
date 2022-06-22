#!/usr/bin/env node

import { URL } from 'node:url';

const username = 'jbiers';

const myProfileURL = new URL(`/${username}`, 'https://github.com');
console.log(myProfileURL);