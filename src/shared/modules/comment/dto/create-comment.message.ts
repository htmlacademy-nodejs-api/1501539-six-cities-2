export const CreateCommentValidationMessage = {
  text: {
    invalidFormat: 'Поле обязательное для заполнения',
    minLength: 'Минимальная длина 5 символов',
    maxLength: 'Максимальная длина 1024 символа'
  },
  rating: {
    invalidFormat: 'Значение должно быть числом',
    min: 'Минимально значение 1',
    max: 'Максимальное значение 10'
  },
  authorId: {
    invalidFormat: 'Значение должно соответствовать ObjectId из MongoDB'
  },
  offerId: {
    invalidFormat: 'Значение должно соответствовать ObjectId из MongoDB'
  }
};
