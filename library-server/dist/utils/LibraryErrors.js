"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanRecordDoesNotExistError = exports.LibraryCardDoesNotExistError = exports.BookDoesNotExistError = exports.UserDoesNotExistError = exports.InvalidUsernameOrPassword = exports.UnableToSaveUserError = void 0;
class UnableToSaveUserError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UnableToSaveUserError = UnableToSaveUserError;
class InvalidUsernameOrPassword extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidUsernameOrPassword = InvalidUsernameOrPassword;
class UserDoesNotExistError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UserDoesNotExistError = UserDoesNotExistError;
class BookDoesNotExistError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.BookDoesNotExistError = BookDoesNotExistError;
class LibraryCardDoesNotExistError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.LibraryCardDoesNotExistError = LibraryCardDoesNotExistError;
class LoanRecordDoesNotExistError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.LoanRecordDoesNotExistError = LoanRecordDoesNotExistError;
