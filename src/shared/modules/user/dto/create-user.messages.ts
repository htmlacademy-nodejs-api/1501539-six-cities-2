export const CreateUserValidationMessages = {
  email: {
    invalidFormat: 'Значение должно быть почтой'
  },
  avatar: {
    invalidFormat: 'Значение должно быть строкой'
  },
  name: {
    invalidFormat: 'Значение обязательно для заполнения',
    minLength: 'Минимальная длина 1',
    maxLength: 'Максимальная длина 15'
  },
  type: {
    invalidFormat: 'Значение должно быть default или pro'
  },
  password: {
    invalidFormat: 'Значение обязательно для заполнения',
    minLength: 'Минимальная длина 6',
    maxLength: 'Максимальная длина 12'
  }
};
