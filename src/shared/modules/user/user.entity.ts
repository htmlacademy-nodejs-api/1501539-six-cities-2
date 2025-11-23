import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { User, UserType } from './../../types/index.js';
import { createSHA256 } from '../../helpers/hash.js';

const require = true;
const unique = true;
const trim = true;

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}
@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    unique,
    require,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    trim
  })
  public email: string;

  @prop({
    trim,
    validate: {
      validator: (value:string) => /\.(jpg|jpeg|png)$/i.test(value),
      message: 'Avatar can be only .jpg, .jpeg, .png extension'
    }
  })
  public avatar?: string;

  @prop({
    require,
    minLength: [1, 'Min length for name is 1'],
    maxlength: [15, 'Max length for name is 15'],
    trim
  })
  public name: string;

  @prop({
    type: () => String,
    enum: UserType
  })
  public type: UserType;

  @prop({
    require,
    default: ''
  })
  private password?: string;


  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatar = userData.avatar;
    this.name = userData.name;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
