"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const server_1 = __importDefault(require("./server"));
exports.default = {
    database: database_1.default,
    server: server_1.default,
};
