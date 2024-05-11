"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRecords = exports.findAllRecords = exports.modifyRecord = exports.generateRecord = void 0;
const LoanRecordDao_1 = __importDefault(require("../daos/LoanRecordDao"));
const BookService_1 = require("./BookService");
const LibraryErrors_1 = require("../utils/LibraryErrors");
function generateRecord(record) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let createRecord = new LoanRecordDao_1.default(record);
            createRecord = yield createRecord.save();
            let book = yield (0, BookService_1.findBookById)(record.item);
            let records = book.records;
            records = [createRecord, ...records];
            book.records = records;
            yield (0, BookService_1.modifyBook)(book);
            return createRecord;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.generateRecord = generateRecord;
function modifyRecord(record) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let updateRecord = yield LoanRecordDao_1.default.findOneAndUpdate({ _id: record._id }, record, { new: true });
            if (updateRecord) {
                let book = yield (0, BookService_1.findBookById)(record.item);
                let records = book.records;
                records[0] = updateRecord;
                yield (0, BookService_1.modifyBook)(book);
                return updateRecord;
            }
            throw new LibraryErrors_1.LoanRecordDoesNotExistError("The recors does not exist");
        }
        catch (error) {
            throw error;
        }
    });
}
exports.modifyRecord = modifyRecord;
function findAllRecords() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield LoanRecordDao_1.default.find();
        }
        catch (error) {
            throw error;
        }
    });
}
exports.findAllRecords = findAllRecords;
function queryRecords(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield LoanRecordDao_1.default.find({ [params.property]: params.value }).populate("item").sort("-loanDate");
        }
        catch (error) {
            throw error;
        }
    });
}
exports.queryRecords = queryRecords;
