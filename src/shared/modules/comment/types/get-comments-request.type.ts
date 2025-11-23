import { Request } from 'express';
import { RequestParams } from '../../../libs/rest/types/request-params.js';
import { ResponseBody } from '../../../libs/rest/types/response-body.js';
import { RequestBody } from '../../../libs/rest/types/request-body.js';

type GetCommentsQueries = {
  offerId?: string
}

export type GetCommentsRequest = Request<RequestParams, ResponseBody, RequestBody, GetCommentsQueries>;
