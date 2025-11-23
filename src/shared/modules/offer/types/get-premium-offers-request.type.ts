import { Request } from 'express';
import { RequestParams } from '../../../libs/rest/types/request-params.js';
import { ResponseBody } from '../../../libs/rest/types/response-body.js';
import { RequestBody } from '../../../libs/rest/types/request-body.js';
import { CitiesName } from '../../../types/cities-name.enum.js';

type GetPremiumOffersQuery = {
  city?: CitiesName
}

export type GetPremiumOffersRequest = Request<RequestParams, ResponseBody, RequestBody, GetPremiumOffersQuery>
