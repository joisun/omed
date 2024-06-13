#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var package_json_1 = require("../package.json");
var commander_1 = require("commander");
var prompts_1 = require("@inquirer/prompts");
var select_1 = require("@inquirer/select");
var ora_1 = require("ora");
console.log('oraPromise', ora_1.oraPromise);
var program = new commander_1.Command();
init();
function init() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var projectName, selectedType;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    program.version(package_json_1.version, '-v, --version')
                        .parse();
                    return [4, (0, prompts_1.input)({ message: 'name of the demo?', default: 'demo' })];
                case 1:
                    projectName = _a.sent();
                    return [4, (0, select_1.default)({
                            message: "type of the demo?",
                            choices: [
                                {
                                    value: 'vanilla',
                                }
                            ]
                        })];
                case 2:
                    selectedType = _a.sent();
                    console.log('projectName', projectName);
                    console.log('selectedType', selectedType);
                    return [2];
            }
        });
    });
}
//# sourceMappingURL=index.js.map