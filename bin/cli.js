#!/usr/bin/env node

const { execSync } = require('child_process');
const prompts = require('prompts');
const chalk = require('chalk');

const runCommand = command => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
  return true;
}

async function init() {
  const response = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'What is your project named?',
    initial: 'my-r3f-app'
  });

  const projectName = response.projectName;
  const gitCheckoutCommand = `git clone --depth 1 https://github.com/RajkumarPalanichamy/reactjs_threejs ${projectName}`;
  const cleanupCommand = `cd ${projectName} && rm -rf .git bin node_modules package-lock.json`;
  const installDepsCommand = `cd ${projectName} && npm install`;

  console.log(chalk.blue(`Cloning the repository with name ${projectName}`));
  const checkedOut = runCommand(gitCheckoutCommand);
  if(!checkedOut) process.exit(-1);

  const cleanedUp = runCommand(cleanupCommand);
  if(!cleanedUp) process.exit(-1);

  console.log(chalk.blue(`Installing dependencies for ${projectName}`));
  const installedDeps = runCommand(installDepsCommand);
  if(!installedDeps) process.exit(-1);

  console.log(chalk.green('\nSuccess! Created', projectName));
  console.log('\nProject is ready! You can run:');
  console.log(chalk.cyan('\n  cd'), projectName);
  console.log(chalk.cyan('  npm install'));
  console.log(chalk.cyan('  npm start'));
  console.log('\nHappy coding!\n');
}

init().catch((err) => {
  console.error(chalk.red('Error:'), err);
  process.exit(1);
}); 