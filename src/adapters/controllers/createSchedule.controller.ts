import Controller from './controller';

export class CreateScheduleController extends Controller {
  constructor(container: any) {
    super({
      usecase: container.createScheduleUseCase,
      presenter: container.schedulePresenter,
    });
  }
}
