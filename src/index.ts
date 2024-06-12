#! /usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program.version('1.0.0', '-v, --version')
    .command('init <dir>', 'generate a new project')
    .action(param => {
        console.log('param', param)
    })
    .parse();