import { IController, HttpRequest, HttpResponse } from '../../presentation/protocols';
import { LogErrorRepository } from '../../data/protocols/log-error-repository';

export class LogControllerDecorator implements IController {
  private readonly controller: IController;
  private readonly logErrorRepository: LogErrorRepository;

  constructor(controller: IController, logErrorRepository: LogErrorRepository) {
    this.controller = controller;
    this.logErrorRepository = logErrorRepository;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.log(httpResponse.body.stack);
    }
    return httpResponse;
  }
}