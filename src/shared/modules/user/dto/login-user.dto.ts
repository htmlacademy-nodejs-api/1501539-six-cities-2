import { IsEmail, IsString } from 'class-validator';
import { LoginUserMessage } from './login-user.message.js';

export class LoginUserDto {
  @IsEmail({}, {message: LoginUserMessage.email.invalidFormat})
  public email!: string;

  @IsString({message: LoginUserMessage.password.invalidFormat})
  public password!: string;
}
