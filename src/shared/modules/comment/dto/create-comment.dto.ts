import { IsNumber, IsString, MaxLength, Min, MinLength, Max, IsMongoId } from 'class-validator';
import { CreateCommentValidationMessage } from './create-comment.message.js';

export class CreateCommentDto {
  @IsString({message: CreateCommentValidationMessage.text.invalidFormat})
  @MinLength(5, {message: CreateCommentValidationMessage.text.minLength})
  @MaxLength(1024, {message: CreateCommentValidationMessage.text.maxLength})
  public text!: string;

  @IsNumber({}, {message: CreateCommentValidationMessage.rating.invalidFormat})
  @Min(1, {message: CreateCommentValidationMessage.rating.min})
  @Max(5, {message: CreateCommentValidationMessage.rating.max})
  public rating!: number;

  @IsMongoId({message: CreateCommentValidationMessage.authorId.invalidFormat})
  public authorId!: string;

  @IsMongoId({message: CreateCommentValidationMessage.offerId.invalidFormat})
  public offerId!: string;
}
