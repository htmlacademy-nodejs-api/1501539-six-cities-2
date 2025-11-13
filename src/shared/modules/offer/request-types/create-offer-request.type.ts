import { Request } from 'express';
import { RequestParams } from '../../../libs/rest/types/request-params.js';
import { CreateOfferDto } from '../dto/create-offer.dto.js';
import { ResponseBody } from '../../../libs/rest/types/response-body.js';

export type CreateOfferRequest = Request<RequestParams, ResponseBody, CreateOfferDto>;
