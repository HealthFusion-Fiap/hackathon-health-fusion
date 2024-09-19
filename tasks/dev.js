const childProcess = require('child_process');
const fs = require('fs');
let nodeApp;

process.on('SIGINT', () => {
  nodeApp.kill('SIGINT');
});

const mainJs = 'dist/src/index.js';

const startNodeServer = () => {
  if (!fs.existsSync(mainJs)) {
    return;
  }

  if (nodeApp) {
    nodeApp.kill('SIGINT');
  }

  nodeApp = childProcess.spawn('node', [mainJs], {
    env: {
      HTTP_PORT: 3000,
      ...process.env,
    },
  });

  nodeApp.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  nodeApp.stderr.on('data', (data) => {
    console.error(data.toString());
  });
};

const tsWatch = (done) => {
  const ts = childProcess.spawn('tsc', ['-w', '--skipLibCheck']);

  ts.stdout.on('data', (data) => {
    childProcess.execSync('tsc-alias');
    console.log(data.toString());
    if (data.toString().includes('Found')) {
      startNodeServer();
    }
  });

  process.on('SIGINT', () => {
    done();
  });
};

tsWatch();
