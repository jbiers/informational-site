#!/usr/bin/env node
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const __filename = process.env.DATAFILE;
const __dirname = path.dirname(__filename);
const filepath = path.resolve(__dirname, __filename)

console.log('[CRUD] Node - File System');

const crud = {
    posts: [],
    setup() {
        if (fs.existsSync(filepath)) {
            crud.posts = JSON.parse(fs.readFileSync(filepath, { encoding: 'utf-8' }));
            return;
        }

        fs.writeFileSync(filepath, JSON.stringify(crud.posts), { encoding: 'utf-8' });
    },
    create({ content }) {
        const id = crud.posts.length + 1;
        const post = { id, content };

        crud.posts.push(post);
        fs.writeFileSync(filepath, JSON.stringify(crud.posts), { encoding: 'utf-8' });
    },
    read() {
        crud.posts = JSON.parse(fs.readFileSync(filepath, { encoding: 'utf-8' }));

        return crud.posts;
    },
    update({id, content}) {
        const postIndex = crud.posts.findIndex(post => post.id === id);
        crud.posts[postIndex].content = content;

        fs.writeFileSync(filepath, JSON.stringify(crud.posts), { encoding: 'utf-8' });
    },
    delete(id) {
        crud.posts = crud.posts.filter(post => post.id !== id);
        
        fs.writeFileSync(filepath, JSON.stringify(crud.posts), { encoding: 'utf-8' });
    }
};

crud.setup();

// Create
crud.create({ content: 'Hello, World!' });
crud.create({ content: 'Hello, People!' });

// Read
console.log(crud.read());

// Update
crud.update({ id: 1, content: 'Hello, Test!' });
// Delete
crud.delete(1);
crud.delete(2);
crud.delete(3);
crud.delete(4);

console.log(crud.read());