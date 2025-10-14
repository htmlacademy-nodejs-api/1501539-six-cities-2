export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  OfferModel: Symbol.for('OfferModel'),
  OfferService: Symbol.for('OfferService'),
  CommentModule: Symbol.for('CommentModule'),
  CommentService: Symbol.for('CommentService'),
  CliApplication: Symbol.for('CliApplication'),
  ImportCommand: Symbol.for('ImportCommand'),
} as const;

