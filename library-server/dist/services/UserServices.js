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
exports.removeUser = exports.modifyUser = exports.findUsersById = exports.findAllUsers = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const UserDao_1 = __importDefault(require("../daos/UserDao"));
const LibraryErrors_1 = require("../utils/LibraryErrors");
function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const ROUNDS = config_1.config.server.rounds;
        try {
            const hashedPassword = yield bcrypt_1.default.hash(user.password, ROUNDS);
            const saved = new UserDao_1.default(Object.assign(Object.assign({}, user), { password: hashedPassword }));
            return yield saved.save();
        }
        catch (error) {
            throw new LibraryErrors_1.UnableToSaveUserError(error.message);
        }
    });
}
exports.register = register;
function login(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = credentials;
        try {
            const user = yield UserDao_1.default.findOne({ email });
            if (!user) {
                throw new LibraryErrors_1.InvalidUsernameOrPassword("Invalid username or password");
            }
            else {
                const validPassword = yield bcrypt_1.default.compare(password, user.password);
                if (validPassword) {
                    return user;
                }
                else {
                    throw new LibraryErrors_1.InvalidUsernameOrPassword("Invalid username or password");
                }
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.login = login;
function findAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield UserDao_1.default.find();
            return users;
        }
        catch (error) {
            return [];
        }
    });
}
exports.findAllUsers = findAllUsers;
function findUsersById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield UserDao_1.default.findById(userId);
            if (user)
                return user;
            throw new LibraryErrors_1.UserDoesNotExistError("User does not exist with this id");
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.findUsersById = findUsersById;
function modifyUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = yield UserDao_1.default.findByIdAndUpdate(user._id, user, { new: true });
            if (!id)
                throw new LibraryErrors_1.UserDoesNotExistError("User does not exist with this id");
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.modifyUser = modifyUser;
function removeUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let deleted = yield UserDao_1.default.findByIdAndDelete(userId);
            if (!deleted)
                throw new LibraryErrors_1.UserDoesNotExistError("User does not exist with this id");
            return "User delete successfully";
        }
        catch (error) {
            throw error;
        }
    });
}
exports.removeUser = removeUser;
