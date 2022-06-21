#!/usr/bin/env node
import fs from 'fs';

console.log('[CRUD] Node - File System');

const crud = {
    posts: [],
    create({ id, content }) {
        const post = { id, content };

        crud.posts.push(post);
        fs.writeFileSync('./db.json', JSON.stringify(crud.posts), { encoding: 'utf-8' });
    },
    read() {
        crud.posts = JSON.parse(fs.readFileSync('./db.json', { encoding: 'utf-8' }));
        return crud.posts;
    },
};

console.log(crud.read());

// Create
crud.create({ id: Date.now(), content: 'Hello, World!' });
crud.create({ id: Date.now(), content: 'Hello, People!' });

// Read
console.log(crud.read());

// Update

// Delete