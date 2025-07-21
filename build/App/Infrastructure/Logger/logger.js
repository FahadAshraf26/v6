"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan_1 = __importDefault(require("bunyan"));
const log = bunyan_1.default.createLogger({
    name: 'Backend',
    streams: [
        {
            level: 'info',
            stream: process.stdout,
        },
        {
            level: 'debug',
            stream: process.stdout,
        },
        {
            level: 'error',
            stream: process.stderr,
        },
    ],
});
exports.default = log;
