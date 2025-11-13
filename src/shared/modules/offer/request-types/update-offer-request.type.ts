import { Request } from 'express';
import { RequestBody } from '../../../libs/rest/types/request-body.js';
import { RequestParams } from '../../../libs/rest/types/request-params.js';
import { CreateOfferDto } from '../dto/create-offer.dto.js';

export type UpdateOfferRequest = Request<RequestParams, RequestBody, CreateOfferDto>;
