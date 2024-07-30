import { SelectedTemplateType } from '../types/index.js';
import download from 'download-git-repo';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import util from "node:util"
import ora, { Ora } from 'ora';
import chalk from "chalk"
const RequestUrls = {
    [SelectedTemplateType.Vanilla]: 'jaycethanks/omed-vanilla-vite-template',
    [SelectedTemplateType.React]: 'jaycethanks/omed-react-vite-template'
}

export class TemplateDownloader {
    downloader: Function
    spinner: Ora
    requestUrl: string
    constructor(type: SelectedTemplateType) {
        this.spinner = ora('Loading unicorns').start();
        this.downloader = util.promisify(download);
        this.requestUrl = RequestUrls[type]
    }

    startSpin() {
        // this.spinner.color = 'yellow';
        this.spinner.text = "Download Template..."
        this.spinner.start()
    }
    succeed() {
        this.spinner.text = "Download Completed."
        this.spinner.succeed()
    }
    failed(err: any) {
        console.log(err)
        this.spinner.fail()
    }
    stopSpin() {
        this.spinner.stop()
    }
    download(destPath: string, demoName: string) {
        return new Promise((resolve, reject) => {
            this.startSpin()
            this.downloader(this.requestUrl, destPath).then((res: any) => {
                this.succeed()
                this.vanillaSuccessHandler(destPath, demoName)
                resolve(true)
            }).catch((err: any) => {
                this.failed(err)
                resolve(false)
            }).finally(() => {
                this.stopSpin()
            })
        })
    }

    // vanilla 项目中的  .env/VITE_APP_TITLE 是index 中的title 注入变量，在这里注入
    vanillaSuccessHandler(destPath: string, demoName: string) {
        const content = `VITE_APP_TITLE=${demoName}`
        writeFileSync(resolve(destPath, ".env"), content)
        console.log(`Done. create project in path: ${destPath}`)
        console.log(`
Now run：

  ${chalk.green('cd')} ${demoName}
  ${chalk.green('pnpm install')}
  ${chalk.green('pnpm run dev')}


omed :)

`)
    }
}
