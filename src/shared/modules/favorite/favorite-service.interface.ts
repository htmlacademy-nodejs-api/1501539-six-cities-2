import { DocumentType } from '@typegoose/typegoose';
import { FavoriteEntity } from './favorite.entity.js';
import { ToggleFavoriteDto } from './dto/toggle-favorite.dto.js';

export interface FavoriteService {
  toggleFavorite(dto: ToggleFavoriteDto): Promise<void>;
  findByUserId(userId: string): Promise<DocumentType<FavoriteEntity>[]>
}
