#!/usr/bin/env node
const fs = require('fs');
const { join } = require('path');

const workingDir = process.cwd();

const pkg = JSON.parse(fs.readFileSync(join(workingDir, 'package.json'), 'utf-8'));
if (pkg.private) return;
const { files } = pkg;
files.forEach(file => {
  const fileDir = join(workingDir, file);
  if (!fs.existsSync(fileDir)) {
    throw new Error(`${fileDir} does not exist, plz run build`);
  }
});
