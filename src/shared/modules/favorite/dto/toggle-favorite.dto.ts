import { IsMongoId } from 'class-validator';
import { ToggleFavoriteValidationMessage } from './toggle-favorite.message.js';

export class ToggleFavoriteDto {
  @IsMongoId({message: ToggleFavoriteValidationMessage.offerId.invalidFormat})
  public offerId!: string;

  @IsMongoId({message: ToggleFavoriteValidationMessage.userId.invalidFormat})
  public userId!: string;
}
