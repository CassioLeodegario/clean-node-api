import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import { HttpRequest, HttpResponse, IController } from '../../protocols';

export class LoginController implements IController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))));
  }
}
