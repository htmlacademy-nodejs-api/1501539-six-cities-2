import { StatusCodes } from 'http-status-codes';
import { HttpError } from './http-error.js';

export const USER_NOT_AUTHORIZED_ERROR = new HttpError(StatusCodes.UNAUTHORIZED, 'Пользователь не авторизован', 'USER_NOT_AUTHORIZED');
