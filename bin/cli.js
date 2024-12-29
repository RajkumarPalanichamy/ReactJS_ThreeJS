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

  // Create project directories
  const directories = ['bin', 'public', 'src'];
  directories.forEach(dir => {
    fs.mkdirSync(path.join(projectPath, dir), { recursive: true });
  });

  // Create empty files
  const files = ['.gitignore', 'README.md'];
  files.forEach(file => {
    fs.writeFileSync(path.join(projectPath, file), '');
  });

  // Create package.json with basic configuration
  const packageJson = {
    name: projectName,
    version: '0.1.0',
    private: true
  };
  await fs.writeJSON(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });

  console.log(chalk.green('\nSuccess! Created', projectName));
  console.log('\nProject structure has been created. Next steps:');
  console.log(chalk.cyan('\n  cd'), projectName);
  console.log(chalk.cyan('  npm install'));
  console.log('\nHappy coding!\n');
}

init().catch((err) => {
  console.error(chalk.red('Error:'), err);
  process.exit(1);
}); 