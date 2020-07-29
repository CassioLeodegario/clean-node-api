import { HttpRequest, HttpReponse } from './http';

export interface IController {
  handle(httpRequest: HttpRequest): HttpReponse;
}
