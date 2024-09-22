import Presenter from '@/adapters/presenters/presenter';

export default class CreateSchedulePresenter extends Presenter {
  adaptOutput(data: any): { status: number; body: any } {
    return {
      status: 201,
      body: data,
    };
  }
}
