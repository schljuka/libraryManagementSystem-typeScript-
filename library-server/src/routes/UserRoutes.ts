import express from 'express';

import UserContoller from '../controllers/UserContoller';

import { Schemas, ValidateSchema } from '../middlewares/Validation';

const router = express.Router();

router.get('/', UserContoller.getAllUsers);
router.get('/:userId', ValidateSchema(Schemas.user.userId, 'params'), UserContoller.getUserById);
router.put('/', ValidateSchema(Schemas.user.update, 'body'), UserContoller.updateUser);
router.delete('/:userId', ValidateSchema(Schemas.user.userId, 'params'), UserContoller.deleteUser);

export = router;
