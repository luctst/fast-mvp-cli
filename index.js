#!/usr/bin/env node
const chalk = require('chalk');
const ora = require('ora');
const {getInstalledPath} = require('get-installed-path');
const { prompt, Separator } = require('inquirer');
const { type } = require('os');

(async function main() {
  const oraInstace = ora({
    text: chalk`{cyan Start process}`,
    stream: process.stdout,
  });

  try {
    await getInstalledPath('@vue');

    if (type() !== 'Darwin')
      throw new Error('Only accessible on macOS for now.');
    
    const aswr = await prompt([
      {
        type: 'confirm',
        message: chalk`Create folder at this path ? ${new Separator(process.cwd())}`,
        name: 'start',
      }
    ]);

    if (!aswr.start)
      throw new Error('Go to the folder you want create fast-mvp template');

    oraInstace.start();
  } catch (error) {
    process.stderr.write(chalk`{red ${error.message}}`);
    process.exit(-1);
  }
})()