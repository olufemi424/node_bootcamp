const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 3;

setTimeout(() => console.log('Timer one finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('test-file.txt', () => {
  console.log('I/O finished');
  console.log('----------');

  setTimeout(() => console.log('Timer two finished'), 0);
  setTimeout(() => console.log('Timer three finished'), 3000);
  setImmediate(() => console.log('Immediate 1 finished'));

  process.nextTick(() => console.log('Process.nextTick'));

  crypto.pbkdf2('passsword', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password Encrypted');
  });

  crypto.pbkdf2('passsword', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password Encrypted');
  });

  crypto.pbkdf2('passsword', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password Encrypted');
  });
});

console.log('Hello from the top level code');
