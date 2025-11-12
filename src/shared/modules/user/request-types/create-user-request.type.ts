import { Request } from 'express';
import { RequestParams } from '../../../libs/rest/types/request-params.js';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { ResponseBody } from '../../../libs/rest/types/response-body.js';

export type CreateUserRequest = Request<RequestParams, ResponseBody, CreateUserDto>;
