import { IsLatitude, IsLongitude, ArrayNotEmpty, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsNumber, Max, MaxLength, Min, MinLength, ValidateNested, IsOptional, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { CitiesName, Coordinates, OfferConvenience, OfferType } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.message.js';
import { Type } from 'class-transformer';

class CoordinatesDto implements Coordinates {
  @IsLatitude({message: CreateOfferValidationMessage.coordinates.latitude})
  public latitude!: number;

  @IsLongitude({message: CreateOfferValidationMessage.coordinates.longitude})
  public longitude!: number;
}

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, {message: CreateOfferValidationMessage.name.minLength})
  @MaxLength(100, {message: CreateOfferValidationMessage.name.maxLength})
  public name?: string;

  @IsOptional()
  @MinLength(20, {message: CreateOfferValidationMessage.description.minLength})
  @MaxLength(1024, {message: CreateOfferValidationMessage.description.maxLength})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: CreateOfferValidationMessage.datePublished.invalidFormat})
  public datePublished?: Date;

  @IsOptional()
  @IsEnum(CitiesName, {message: CreateOfferValidationMessage.city.invalid})
  public city?: string;

  @IsOptional()
  @MaxLength(256, {message: CreateOfferValidationMessage.previewImage.maxLength})
  public previewImage?: string;

  @IsOptional()
  @IsArray({message: CreateOfferValidationMessage.images.invalidFormat})
  @ArrayMinSize(6, {message: CreateOfferValidationMessage.images.length})
  @ArrayMaxSize(6, {message: CreateOfferValidationMessage.images.length})
  public images?: string[];

  @IsOptional()
  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({message: CreateOfferValidationMessage.isFavorite.invalidFormat})
  public isFavorite?: boolean;

  @IsOptional()
  @IsNumber({maxDecimalPlaces: 1}, {message: CreateOfferValidationMessage.rating.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.rating.min})
  @Max(5, {message: CreateOfferValidationMessage.rating.max})
  public rating?: number;

  @IsOptional()
  @IsEnum(OfferType, {message: CreateOfferValidationMessage.type.invalid})
  public type?: OfferType;

  @IsOptional()
  @IsInt({message:CreateOfferValidationMessage.roomsNumber.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.roomsNumber.min})
  @Max(8, {message: CreateOfferValidationMessage.roomsNumber.max})
  public roomsNumber?: number;

  @IsOptional()
  @IsInt({message: CreateOfferValidationMessage.guestNumber.invalidFormat})
  @Min(1,{message: CreateOfferValidationMessage.guestNumber.min})
  @Max(10,{message: CreateOfferValidationMessage.guestNumber.max})
  public guestNumber?: number;

  @IsOptional()
  @IsInt({message: CreateOfferValidationMessage.price.invalidFormat})
  @Min(100,{message: CreateOfferValidationMessage.price.min})
  @Max(100000,{message: CreateOfferValidationMessage.price.max})
  public price?: number;

  @IsOptional()
  @IsArray({message: CreateOfferValidationMessage.convenience.invalidFormat})
  @ArrayNotEmpty({message: CreateOfferValidationMessage.convenience.empty})
  @IsEnum(OfferConvenience, {each: true, message: CreateOfferValidationMessage.convenience.invalid})
  public convenience?: OfferConvenience[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  public coordinates?: Coordinates;

  @IsOptional()
  @IsNumber({}, {message: CreateOfferValidationMessage.commentNumber.invalidFormat})
  public commentsNumber?: number;
}
