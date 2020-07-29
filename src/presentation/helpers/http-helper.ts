import { HttpReponse } from '../protocols/http';

export const badRequest = (error): HttpReponse => ({
  statusCode: 400,
  body: error
});
