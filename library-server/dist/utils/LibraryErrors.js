"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidUsernameOrPassword = exports.UnableToSaveUserError = void 0;
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
