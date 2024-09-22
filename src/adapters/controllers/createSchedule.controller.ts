import Controller from '@/adapters/controllers/controller';

export default class CreateScheduleController extends Controller {
  constructor(container: any) {
    super({
      usecase: container.createScheduleUsecase,
      presenter: container.createSchedulePresenter,
    });
  }
}
