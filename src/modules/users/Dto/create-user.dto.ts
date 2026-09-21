import { IsString, IsNotEmpty, Length, Matches, IsEnum } from 'class-validator';
import { UserRole } from '../roles.enum';

export class CreateUserDto {
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  firstName!: string;
  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  lastName!: string;
  @IsString({ message: 'National ID must be a string' })
  @IsNotEmpty({ message: 'National ID is required' })
  @Length(10, 10, { message: 'National ID must be exactly 10 characters long' })
  @Matches(/^[0-9]+$/, { message: 'National ID must contain only digits' })
  nationalId!: string;
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Length(11, 11, { message: 'Phone number must be exactly 11 characters long' })
  @Matches(/^[0-9]+$/, { message: 'Phone number must contain only digits' })
  phoneNumber!: string;
  @IsNotEmpty({ message: 'Role is required' })
  @IsEnum(UserRole, { message: 'Role must be a valid user role' })
  role!: UserRole;
}
