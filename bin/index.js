#! /usr/bin/env node
import { __awaiter } from "tslib";
import { Command } from 'commander';
import select from "@inquirer/select";
import ora from 'ora';
const VERSION = '0.0.1';
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
                }
            ]
        });
        const spinner = ora('Loading unicorns').start();
        setTimeout(() => {
            spinner.color = 'yellow';
            spinner.text = 'Loading rainbows';
            spinner.stop();
        }, 1000);
        console.log('selectedType', selectedType);
    });
}
//# sourceMappingURL=index.js.map