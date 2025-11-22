import { Request } from 'express';
import { RequestParams } from '../../../libs/rest/types/request-params.js';
import { ResponseBody } from '../../../libs/rest/types/response-body.js';
import { CreateCommentDto } from '../dto/create-comment.dto.js';

export type CreateCommentRequest = Request<RequestParams, ResponseBody, CreateCommentDto>;
