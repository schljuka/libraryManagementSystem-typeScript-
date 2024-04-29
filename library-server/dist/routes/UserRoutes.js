"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const UserContoller_1 = __importDefault(require("../controllers/UserContoller"));
const Validation_1 = require("../middlewares/Validation");
const router = express_1.default.Router();
router.get('/', UserContoller_1.default.getAllUsers);
router.get('/:userId', (0, Validation_1.ValidateSchema)(Validation_1.Schemas.user.userId, 'params'), UserContoller_1.default.getUserById);
router.put('/', (0, Validation_1.ValidateSchema)(Validation_1.Schemas.user.update, 'body'), UserContoller_1.default.updateUser);
router.delete('/:userId', (0, Validation_1.ValidateSchema)(Validation_1.Schemas.user.userId, 'params'), UserContoller_1.default.deleteUser);
module.exports = router;
