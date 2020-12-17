const fileSystem = require('fs');

const a = fileSystem.readFileSync('./a.txt', 'utf-8');
console.log('Contents of file have been received');

const b = fileSystem.readFileSync('./b.txt', 'utf-8');
const c = fileSystem.readFileSync('./c.txt', 'utf-8');
const d = fileSystem.readFileSync('./d.txt', 'utf-8');

console.log('Hello world');
