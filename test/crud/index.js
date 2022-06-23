#!/usr/bin/env node
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const __filename = process.env.DATAFILE;
const __dirname = path.dirname(__filename);
const filepath = path.resolve(__dirname, __filename);

console.log('[CRUD] Node - File System');

function writeToFile() {
    return fs.writeFileSync(filepath, JSON.stringify(crud.posts), { encoding: 'utf-8' });
}

function readFromFile() {
    return JSON.parse(fs.readFileSync(filepath, { encoding: 'utf-8' }));
}

const crud = {
    posts: [],
    setup() {
        if (fs.existsSync(filepath)) {
            crud.posts = readFromFile();
            return;
        }

        writeToFile();
    },
    create({ content }) {
        const numPosts = crud.posts.length;
        const id = numPosts > 0 ? crud.posts[numPosts - 1].id + 1 : 1;
        const post = { id, content };

        crud.posts.push(post);
        writeToFile();
    },
    read() {
        crud.posts = readFromFile();

        return crud.posts;
    },
    update({id, content}) {
        const postIndex = crud.posts.findIndex(post => post.id === id);
        crud.posts[postIndex].content = content;

        writeToFile();
    },
    delete(id) {
        crud.posts = crud.posts.filter(post => post.id !== id);
        
        writeToFile();
    }
};

crud.setup();

crud.create({ content: 'Hello, World!' });
crud.create({ content: 'Hello, People!' });

console.log(crud.read());

crud.update({ id: 1, content: 'Hello, Test!' });

crud.delete(2);

console.log(crud.read());