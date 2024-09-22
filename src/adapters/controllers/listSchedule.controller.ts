import Controller from '@/adapters/controllers/controller';

export default class ListScheduleController extends Controller {
  constructor(container: any) {
    super({
      usecase: container.listScheduleUsecase,
      presenter: container.listSchedulePresenter,
    });
  }
}
