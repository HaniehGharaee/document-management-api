import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';

export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
}
