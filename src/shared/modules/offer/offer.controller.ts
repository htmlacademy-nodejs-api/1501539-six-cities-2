import { inject, injectable } from 'inversify';
import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { OfferService } from './offer-service.interface.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../helpers/common.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferRequest } from './request-types/create-offer-request.type.js';
import { StatusCodes } from 'http-status-codes';
import { OfferDetailsRdo } from './rdo/offer-details.rdo.js';
import { UpdateOfferRequest } from './request-types/update-offer-request.type.js';
import { GetOffersRequest } from './request-types/get-offers-request.type.js';
import { GetPremiumOffersRequest } from './request-types/get-premium-offers-request.type.js';
import { CitiesName } from '../../types/cities-name.enum.js';
import { USER_NOT_AUTHORIZED_ERROR } from '../../libs/rest/errors/user-not-authorized-error.js';
import { ToggleFavoriteOfferRequest } from './request-types/toggle-favorite-offer-request.type.js';
import { FavoriteService } from '../favorite/favorite-service.interface.js';

enum OfferPaths {
  Index = '/',
  Create = '/create',
  Offer = '/:id',
  Premium = '/premium',
  Favorite = '/favorite',
}

const DEFAULT_PAGE_SIZE = '20';
const DEFAULT_PAGE = '1';
const OFFER_NOT_FOUND_ERROR = new HttpError(StatusCodes.NOT_FOUND, 'Оффер не найден', 'NOT_FOUND');

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.FavoriteService) private readonly favoriteService: FavoriteService
  ) {
    super(logger);

    this.addRoute({path: OfferPaths.Index, method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: OfferPaths.Create, method: HttpMethod.Post, handler: this.createOffer});
    this.addRoute({path: OfferPaths.Premium, method: HttpMethod.Get, handler: this.getPremiumOffers});
    this.addRoute({path: OfferPaths.Favorite, method: HttpMethod.Get, handler: this.getFavoriteOffers});
    this.addRoute({path: OfferPaths.Favorite, method: HttpMethod.Post, handler: this.toggleFavoriteOffer});
    this.addRoute({path: OfferPaths.Offer, method: HttpMethod.Get, handler: this.getOffer});
    this.addRoute({path: OfferPaths.Offer, method: HttpMethod.Patch, handler: this.updateOffer});
    this.addRoute({path: OfferPaths.Offer, method: HttpMethod.Delete, handler: this.deleteOffer});
  }

  public async index({query}: GetOffersRequest, res: Response): Promise<void> {
    const { page = DEFAULT_PAGE, limit = DEFAULT_PAGE_SIZE } = query;
    const offers = await this.offerService.find(+limit, +page);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async createOffer(
    { body, headers }: CreateOfferRequest,
    res: Response
  ) {
    const result = await this.offerService.create(body);
    const isAuthorization = !!headers.authorization;

    if (!isAuthorization) {
      throw USER_NOT_AUTHORIZED_ERROR;
    }

    this.created(res, fillDTO(OfferDetailsRdo, result));
  }

  public async getOffer({params}: Request, res: Response) {
    const {id} = params;
    const existOffer = await this.offerService.findById(id);

    if (!existOffer) {
      throw OFFER_NOT_FOUND_ERROR;
    }

    this.ok(res, fillDTO(OfferDetailsRdo, existOffer));
  }

  public async updateOffer({body, headers, params}: UpdateOfferRequest, res: Response) {
    const {id} = params;
    const isAuthorization = !!headers.authorization;
    const existedOffer = await this.offerService.findById(id);

    if (!isAuthorization) {
      throw USER_NOT_AUTHORIZED_ERROR;
    }

    if (!existedOffer) {
      throw OFFER_NOT_FOUND_ERROR;
    }

    const result = await this.offerService.updateById(id as string, body);
    this.ok(res, fillDTO(OfferDetailsRdo, result));
  }

  public async deleteOffer({params, headers}: Request, res: Response) {
    const {id} = params;
    const isAuthorization = !!headers.authorization;
    const existedOffer = await this.offerService.findById(id as string);

    if (!isAuthorization) {
      throw USER_NOT_AUTHORIZED_ERROR;
    }

    if (!existedOffer) {
      throw OFFER_NOT_FOUND_ERROR;
    }

    await this.offerService.deleteById(id as string);
    this.ok(res, {});
  }

  public async getPremiumOffers({query}: GetPremiumOffersRequest, res: Response) {
    const { city } = query;
    if (!city) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Нужно указать город', 'CITY_NOT_ENTERED');
    }

    if (!Object.values(CitiesName).includes(city)) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Нужно указать город из списка [Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf]', 'INVALID_CITY');
    }

    const result = await this.offerService.findPremiumByCity(city);
    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async getFavoriteOffers({headers}: Request, res: Response) {
    const isAuthorization = !!headers.authorization;
    if (!isAuthorization) {
      throw USER_NOT_AUTHORIZED_ERROR;
    }

    const result = await this.offerService.findFavoriteOffersForUser('68ebc8354a76a93bd861bc45');
    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async toggleFavoriteOffer({body, headers}: ToggleFavoriteOfferRequest, res: Response) {
    const isAuthorization = !!headers.authorization;
    if (!isAuthorization) {
      throw USER_NOT_AUTHORIZED_ERROR;
    }

    await this.favoriteService.toggleFavorite({
      userId: '68ebc8354a76a93bd861bc45',
      offerId: body.offerId
    });
    this.ok(res, {});
  }
}
