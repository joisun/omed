#! /usr/bin/env node


import { Command } from 'commander';
import { input } from "@inquirer/prompts"
import select from "@inquirer/select"
import ora from 'ora';
// with warning
// import pkg from "../package.json" assert { type: "json" };
const VERSION = '0.0.1'
const program = new Command();


type Options = {
    force: boolean
}
program.version(VERSION, '-v, --version')
program.argument('<demo-name>')
program.option('-f, --force', 'overwrite target directory if it exist') // 是否强制创建，当文件夹已经存在
program.action(async (param, options) => {
    await init(param, options)
})
program.parse();


// const projectName = await input({ message: 'name of the demo?', default: 'demo' })
async function init(demoName: string, options: Options) {
    const selectedType = await select({
        message: "type of the demo?",
        choices: [
            {
                value: 'vanilla',
            }
        ]
    })


    const spinner = ora('Loading unicorns').start();

    setTimeout(() => {
        spinner.color = 'yellow';
        spinner.text = 'Loading rainbows';
        spinner.stop()
    }, 1000);

    console.log('selectedType', selectedType)
}








