#! /usr/bin/env node
import { __awaiter } from "tslib";
import { Command } from 'commander';
import confirm from "@inquirer/confirm";
import select from "@inquirer/select";
import { TemplateDownloader } from "./utils/TemplateDownloader.js";
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import VERSION from './utils/getVersion.js';
const program = new Command();
program.version(VERSION, '-v, --version');
program.argument('<demo-name>');
program.option('-f, --force', 'overwrite target directory if it exist');
program.action((param, options) => __awaiter(void 0, void 0, void 0, function* () {
    yield init(param, options);
}));
program.parse();
function init(demoName, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const selectedType = yield select({
            message: "type of the demo?",
            choices: [
                {
                    value: 'vanilla',
                },
                {
                    value: 'react',
                }
            ]
        });
        const dest = resolve(process.cwd(), demoName);
        const exist = yield existsSync(dest);
        if (exist) {
            const answer = yield confirm({ message: 'Folder already exist. Continue?' });
            if (!answer)
                return;
        }
        const downloader = new TemplateDownloader(selectedType);
        const success = yield downloader.download(dest, demoName);
    });
}
//# sourceMappingURL=index.js.map