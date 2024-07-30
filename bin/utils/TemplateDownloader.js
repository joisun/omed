import { SelectedTemplateType } from '../types/index.js';
import download from 'download-git-repo';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import util from "node:util";
import ora from 'ora';
import chalk from "chalk";
const RequestUrls = {
    [SelectedTemplateType.Vanilla]: 'jaycethanks/omed-vanilla-vite-template',
    [SelectedTemplateType.React]: 'jaycethanks/omed-react-vite-template'
};
export class TemplateDownloader {
    constructor(type) {
        Object.defineProperty(this, "downloader", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "spinner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "requestUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.spinner = ora('Loading unicorns').start();
        this.downloader = util.promisify(download);
        this.requestUrl = RequestUrls[type];
    }
    startSpin() {
        this.spinner.text = "Download Template...";
        this.spinner.start();
    }
    succeed() {
        this.spinner.text = "Download Completed.";
        this.spinner.succeed();
    }
    failed(err) {
        console.log(err);
        this.spinner.fail();
    }
    stopSpin() {
        this.spinner.stop();
    }
    download(destPath, demoName) {
        return new Promise((resolve, reject) => {
            this.startSpin();
            this.downloader(this.requestUrl, destPath).then((res) => {
                this.succeed();
                this.vanillaSuccessHandler(destPath, demoName);
                resolve(true);
            }).catch((err) => {
                this.failed(err);
                resolve(false);
            }).finally(() => {
                this.stopSpin();
            });
        });
    }
    vanillaSuccessHandler(destPath, demoName) {
        const content = `VITE_APP_TITLE=${demoName}`;
        writeFileSync(resolve(destPath, ".env"), content);
        console.log(`Done. create project in path: ${destPath}`);
        console.log(`
Now run：

  ${chalk.green('cd')} ${demoName}
  ${chalk.green('pnpm install')}
  ${chalk.green('pnpm run dev')}


omed :)

`);
    }
}
//# sourceMappingURL=TemplateDownloader.js.map