#! /usr/bin/env node


import { Command } from 'commander';
import { input } from "@inquirer/prompts"
import confirm from "@inquirer/confirm"


import select from "@inquirer/select"
import { TemplateDownloader } from "./utils/TemplateDownloader.js"
import { SelectedTemplateType } from './types/index.js';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
// with warning
// import pkg from "../package.json" assert { type: "json" };
const VERSION = '1.0.2'
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


async function init(demoName: string, options: Options) {
    const selectedType: SelectedTemplateType = await select({
        message: "type of the demo?",
        choices: [
            {
                value: 'vanilla',
            }
        ]
    }) as SelectedTemplateType

    const dest = resolve(process.cwd(), demoName)

    const exist = await existsSync(dest)
    if (exist) {
        const answer = await confirm({ message: 'Folder already exist. Continue?' });
        if (!answer) return
    }
    const downloader = new TemplateDownloader(selectedType)
    const success = await downloader.download(dest, demoName)



}










