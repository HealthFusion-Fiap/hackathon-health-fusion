import Usecase from '@/domain/usecases/usecase';

export type HttpRequest = {
  body?: Record<string, any>
  params?: Record<string, any>
  query?: Record<string, any>
  // authInfo?: AuthInfo
}

export default abstract class Controller {
  protected usecase: any;

  protected presenter: any;

  constructor(data: {
    usecase: Usecase
    presenter: any
  }) {
    this.usecase = data.usecase;
    this.presenter = data.presenter;
  }

  async executeEndpoint(input: HttpRequest) {
    const usecaseResponse = await this.usecase.execute({
      ...input.body,
      ...input.query,
      ...input.params,
    });

    return this.presenter.present(usecaseResponse);
  }
}
