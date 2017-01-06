const spawn = require('child_process').spawn;

const proc = spawn('npm', ['run', 'test'], {
  cwd: process.cwd(),
  stdio: 'inherit'
});