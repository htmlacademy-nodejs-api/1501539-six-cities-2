export enum UserType {
  DEFAULT = 'default',
  PRO = 'pro'
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  type: UserType;
}
