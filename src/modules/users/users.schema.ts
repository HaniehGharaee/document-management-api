import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from './roles.enum';

@Schema()
// Define this class as the source for a Mongoose schema.
export class User {
  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({ required: true, unique: true })
  phoneNumber!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true , enum: UserRole })
  role!: UserRole;
}
const  UserSchema = SchemaFactory.createForClass(User);