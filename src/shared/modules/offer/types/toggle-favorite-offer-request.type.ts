import { Request } from 'express';
import { RequestParams } from '../../../libs/rest/types/request-params.js';
import { ResponseBody } from '../../../libs/rest/types/response-body.js';
import { ToggleFavoriteDto } from '../../favorite/dto/toggle-favorite.dto.js';

export type ToggleFavoriteOfferRequest = Request<RequestParams, ResponseBody, ToggleFavoriteDto>;
