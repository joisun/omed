#! /usr/bin/env node

import { version } from "../package.json"
import { Command } from 'commander';
import { input } from "@inquirer/prompts"
import select from "@inquirer/select"
import { oraPromise } from 'ora';
console.log('oraPromise', oraPromise)
const program = new Command();


init()
async function init() {
    program.version(version, '-v, --version')
        // .command('init <dir>', 'generate a new project')
        // .action(param => {
        //     console.log('param', param)
        // })
        .parse();


    const projectName = await input({ message: 'name of the demo?', default: 'demo' })
    const selectedType = await select({
        message: "type of the demo?",
        choices: [
            {
                value: 'vanilla',
            }
        ]
    })
    // const spinner = ora('Loading unicorns').start();

    // setTimeout(() => {
    //     spinner.color = 'yellow';
    //     spinner.text = 'Loading rainbows';
    // }, 1000);

    console.log('projectName', projectName)
    console.log('selectedType', selectedType)


}






