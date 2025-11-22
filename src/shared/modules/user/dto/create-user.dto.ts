import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UserType } from '../../../types/user.interface.js';
import { CreateUserValidationMessages } from './create-user.messages.js';

export class CreateUserDto {
  @IsEmail({}, {message: CreateUserValidationMessages.email.invalidFormat})
  public email!: string;

  @IsOptional()
  @IsString({message: CreateUserValidationMessages.avatar.invalidFormat})
  public avatar?: string;

  @IsString({message: CreateUserValidationMessages.name.invalidFormat})
  @MinLength(1, {message: CreateUserValidationMessages.name.minLength})
  @MaxLength(15, {message: CreateUserValidationMessages.name.maxLength})
  public name!: string;

  @IsEnum(UserType, {message: CreateUserValidationMessages.type.invalidFormat})
  public type!: UserType;

  @IsString({message: CreateUserValidationMessages.password.invalidFormat})
  @MinLength(6, {message: CreateUserValidationMessages.password.minLength})
  @MaxLength(12, {message: CreateUserValidationMessages.password.maxLength})
  public password!: string;
}
