#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const prompts = require('prompts');
const chalk = require('chalk');

async function init() {
  const response = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'What is your project named?',
    initial: 'my-r3f-app'
  });

  const projectName = response.projectName;
  const projectPath = path.resolve(process.cwd(), projectName);

  console.log(chalk.blue(`Creating a new R3F app in ${projectPath}...`));

  // Create project directory
  fs.mkdirSync(projectPath, { recursive: true });

  // Copy template files
  await fs.copy(path.join(__dirname, '../'), projectPath);


  // Update package.json
  const packageJson = require(path.join(projectPath, 'package.json'));
  packageJson.name = projectName;
  await fs.writeJSON(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });

  console.log(chalk.green('\nSuccess! Created', projectName));
  console.log('\nInside that directory, you can run several commands:');
  console.log(
    chalk.cyan('\n  npm start'),
    '\n    Starts the development server.'
  );
  console.log(
    chalk.cyan('\n  npm run build'),
    '\n    Bundles the app for production.'
  );
  console.log('\nWe suggest that you begin by typing:');
  console.log(chalk.cyan('\n  cd'), projectName);
  console.log(chalk.cyan('  npm install'));
  console.log(chalk.cyan('  npm start'));
  console.log('\nHappy hacking!\n');
}

init().catch((err) => {
  console.error(chalk.red('Error:'), err);
  process.exit(1);
}); 