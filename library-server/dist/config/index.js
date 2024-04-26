"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
// const MONGO_URL: string = `mongo://${MONGO_USERNAME}:${MONGO_PASSWORD}@localhost:27017/librarydb`;
const MONGO_URL = `mongodb://localhost:27017/library`;
const PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8000;
const ROUNDS = process.env.SERVER_ROUNDS ? Number(process.env.SERVER_ROUNDS) : Math.floor(Math.random() * 11);
exports.config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: PORT,
        rounds: ROUNDS
    }
};
