import { Expose } from 'class-transformer';
import { UserType } from '../../../types/user.interface.js';

export class UserRdo {
  @Expose()
  public id!:string;

  @Expose()
  public email!:string;

  @Expose()
  public avatar!: string;

  @Expose()
  public name!: string;

  @Expose()
  public type!: UserType;
}
