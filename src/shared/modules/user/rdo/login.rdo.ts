import { Expose } from 'class-transformer';

export class LoginRdo {
  @Expose()
  public email!: string;

  @Expose()
  public password!: string;
}
