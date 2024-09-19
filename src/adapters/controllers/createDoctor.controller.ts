import Controller from './controller';

export default class CreateDoctorController extends Controller {
  constructor(container: any) {
    super({
      usecase: container.createDoctorUsecase,
      presenter: container.createDoctorPresenter,
    });
  }
}
