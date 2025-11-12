import { Request } from 'express';
import { RequestParams } from '../../../libs/rest/types/request-params.js';
import { LoginRdo } from '../rdo/login.rdo.js';
import { ResponseBody } from '../../../libs/rest/types/response-body.js';

export type LoginUserRequest = Request<RequestParams, ResponseBody, LoginRdo>;
