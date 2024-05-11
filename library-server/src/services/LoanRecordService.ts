import LoanRecordDao, { ILoanRecordModel } from "../daos/LoanRecordDao";
import { findBookById, modifyBook } from "./BookService";
import { ILoanRecord } from '../models/LoanRecors';
import { LoanRecordDoesNotExistError } from "../utils/LibraryErrors";

export async function generateRecord(record: ILoanRecord): Promise<ILoanRecordModel> {
    try {
        let createRecord = new LoanRecordDao(record);
        createRecord = await createRecord.save();

        let book = await findBookById(record.item);
        let records = book.records;

        records = [createRecord, ...records];
        book.records = records;

        await modifyBook(book);

        return createRecord;
    } catch (error) {
        throw error;
    }
}

export async function modifyRecord(record: ILoanRecordModel): Promise<ILoanRecordModel> {
    try {
        let updateRecord = await LoanRecordDao.findOneAndUpdate({ _id: record._id }, record, { new: true });

        if (updateRecord) {
            let book = await findBookById(record.item);
            let records = book.records;

            records[0] = updateRecord;

            await modifyBook(book);

            return updateRecord;
        }

        throw new LoanRecordDoesNotExistError("The recors does not exist");
    } catch (error) {
        throw error;
    }
}

export async function findAllRecords(): Promise<ILoanRecordModel[]> {
    try {
        return await LoanRecordDao.find();
    } catch (error) {
        throw error;
    }
}

export async function queryRecords(params: { property: string, value: string | Date }): Promise<ILoanRecordModel[]> {
    try {
        return await LoanRecordDao.find({ [params.property]: params.value }).populate("item").sort("-loanDate");
    } catch (error) {
        throw error;
    }
}