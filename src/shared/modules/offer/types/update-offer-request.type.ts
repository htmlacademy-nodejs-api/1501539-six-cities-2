import { Request } from 'express';
import { RequestBody } from '../../../libs/rest/types/request-body.js';
import { CreateOfferDto } from '../dto/create-offer.dto.js';
import { ParamOfferId } from './params-offerid.type.js';

export type UpdateOfferRequest = Request<ParamOfferId, RequestBody, CreateOfferDto>;
