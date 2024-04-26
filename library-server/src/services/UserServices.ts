import bcrypt from 'bcrypt';
import { config } from '../config';
import UserDao, { IUserModel } from '../daos/UserDao';
import { IUser } from '../models/IUser';
import { UnableToSaveUserError } from '../utils/LibraryErrors';


export async function register(user: IUser): Promise<IUserModel> {
    const ROUNDS = config.server.rounds;

    try {
        const hashedPassword = await bcrypt.hash(user.password, ROUNDS);

        const saved = new UserDao({ ...user, password: hashedPassword });

        return await saved.save();

    } catch (error: any) {
        throw new UnableToSaveUserError(error.message);

    }
}