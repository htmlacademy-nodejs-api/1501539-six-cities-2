export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  OfferModel: Symbol.for('OfferModel'),
  OfferService: Symbol.for('OfferService'),
  CommentModel: Symbol.for('CommentModel'),
  CommentService: Symbol.for('CommentService'),
  CliApplication: Symbol.for('CliApplication'),
  ImportCommand: Symbol.for('ImportCommand'),
  OfferRatingModel: Symbol.for('OfferRatingModel'),
  OfferRatingService: Symbol.for('OfferRatingService'),
  CommentRatingModel: Symbol.for('CommentRatingModel'),
  CommentRatingService: Symbol.for('CommentRatingService')
} as const;

